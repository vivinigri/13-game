import React, { useState, useCallback } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { useTheme } from "react-native-paper"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { Text, GradientView } from "@components"
import { CurrentState } from "@store/models/current"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { ResultadoCard } from "@components/Cards"
import { ActionButton } from "@components/Buttons"
import BottomMenu from "@components/Footers/BottomMenu"
import { RoundedScrollView } from "@components/Themed"
import { ApostasParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"

type Props = BottomTabScreenProps<ApostasParamList, RouteNames.ResultadosScreen>

// TODO header resetar rodada. Deu algo errado e tem que recomecar as apostas
// voltar para apostas e limpar elas do current

const ResultadosScreen = ({ navigation }: Props) => {
  const current: CurrentState = useSelector(({ current }: RootState) => current)
  const { currentRound, players, hands } = current

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [resultados, setResultados] = useState<number[]>([])
  const [error, setError] = useState<string>("")

  useFocusEffect(
    useCallback(() => {
      setResultados([])
      setError("")
    }, [currentRound])
  )

  const confirmResultado = (index: number, levou: number) => {
    const newResultados = [...resultados]
    newResultados[index] = levou
    setResultados(newResultados)
    if (index === players.length - 1 || resultados.length === players.length) {
      const total = newResultados.reduce((a, b) => a + b)
      if (total !== hands[currentRound]) {
        if (total > hands[currentRound]) {
          setError(`${total - hands[currentRound]} apostas a mais`)
        } else {
          setError(`${hands[currentRound] - total} apostas a mais`)
        }
      } else {
        setError("")
      }
    }
  }

  const saveResults = () => {
    dispatch.current.setResultados(resultados)
    if (currentRound >= hands.length - 1) {
      navigation.navigate(RouteNames.GameOverScreen)
    } else {
      dispatch.current.nextRound()
      navigation.navigate(RouteNames.ApostasScreen)
    }
  }

  return (
    <GradientView>
      <View style={themedStyle.mainContainer}>
        <Text
          type="header"
          align="center"
          variant="white"
          family="bold"
          style={{
            marginVertical: theme.spacings.padding,
          }}
        >
          {`Resultado da rodada ${current.currentRound + 1}`}
        </Text>
        <Text type="title" align="center" variant="white">
          Hora da verdade
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <RoundedScrollView>
          <View
            style={[
              themedStyle.mainContainer,
              { alignItems: "center", zIndex: 10, marginTop: 20 },
            ]}
          >
            {players.map((p, i) => (
              <ResultadoCard
                key={p.id}
                name={p.name}
                index={i}
                numCards={hands[currentRound]}
                aposta={current.placar[p.id].apostas[currentRound]}
                setResultado={confirmResultado}
              />
            ))}
          </View>
          {error !== "" ? (
            <Text
              type="title"
              align="center"
              variant="error"
              family="bold"
              style={{ marginBottom: 20 }}
            >
              {`Resultados não corretos - ${error}`}
            </Text>
          ) : null}
          <BottomMenu
            onConfirm={saveResults}
            confirmLabel="Confirmar"
            disabled={resultados.length < players.length || error !== ""}
          />
        </RoundedScrollView>
      </View>
    </GradientView>
  )
}

export default ResultadosScreen

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: "flex-start",
      width: "100%",
      maxWidth: 600,
    },
  })
