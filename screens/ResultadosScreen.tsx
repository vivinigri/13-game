import React, { useState } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { useTheme } from "react-native-paper"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { ApostasParamList } from "@types"
import { Text, GradientView } from "@components"
import { CurrentState } from "@store/models/current"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { ResultadoCard } from "@components/Cards"
import { ActionButton } from "@components/Buttons"

type Props = BottomTabScreenProps<ApostasParamList, "ResultadosScreen">

// TODO header resetar rodada. Deu algo errado e tem que recomecar as apostas
// voltar para apostas e limpar elas do current

// TODO validar total de levadas
const ResultadosScreen = ({ navigation }: Props) => {
  const current: CurrentState = useSelector(({ current }: RootState) => current)
  const { currentRound, players, hands } = current

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [resultados, setResultados] = useState<number[]>([])
  const [hasError, setHasError] = useState<boolean>(false)

  const confirmResultado = (index: number, levou: number) => {
    const newResultados = [...resultados]
    newResultados[index] = levou
    setResultados(newResultados)
  }

  /* const confirmAposta = (id: string, value: number) => {
    const newApostas = [...aposta]
    newApostas[index] = value
    setAposta(newApostas)
    if (index < players.length - 1) {
      setIndex(index + 1)
    }
  }

  const cancelAposta = () => {
    const newApostas = [...aposta]
    newApostas.pop()
    setAposta(newApostas)
    setIndex(index - 1)
  }
 */
  const closeApostas = () => {
    // TODO dispatch.current.setResultados(aposta)
    // TODO dispatch.current.currentRound++
    // navigation.navigate("ApostasScreen")
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
          {`Round ${current.currentRound}/${current.rounds}`}
        </Text>
        <Text type="title" align="center" variant="white">
          Façam suas apostas
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <ScrollView
          contentContainerStyle={{ alignItems: "center", height: "100%" }}
          style={{
            backgroundColor: theme.colors.textLight,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
        >
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
        </ScrollView>
        <View style={themedStyle.actionBtnView}>
          <ActionButton
            label="Confirmar"
            disabled={resultados.length < players.length || hasError}
            onPress={closeApostas}
            style={{ maxWidth: 200 }}
          />
        </View>
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
    actionBtnView: {
      width: "100%",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
    },
  })
