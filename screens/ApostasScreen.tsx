import React, { useCallback, useState } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { useTheme } from "react-native-paper"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { Naipes } from "@types"
import { Text, GradientView } from "@components"
import { CurrentState } from "@store/models/current"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { TrunfoCard, ApostaCard, PlayerBubble } from "@components/Cards"
import BottomMenu from "@components/Footers/BottomMenu"
import { ApostasParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"
import { RoundedScrollView } from "@components/Themed"

type Props = BottomTabScreenProps<ApostasParamList, RouteNames.ApostasScreen>

// TODO header undo all button (so limpar as apostas useState)
const ApostasScreen = ({ navigation }: Props) => {
  const current: CurrentState = useSelector(({ current }: RootState) => current)
  const { currentRound, players, hands } = current

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [trunfo, setTrunfo] = useState<Naipes>(Naipes.UNDEFINED)
  const [aposta, setAposta] = useState<number[]>([])
  const [index, setIndex] = useState<number>(0)

  useFocusEffect(
    useCallback(() => {
      setTrunfo(Naipes.UNDEFINED)
      setAposta([])
      setIndex(0)
    }, [currentRound])
  )

  const confirmAposta = (id: string, value: number) => {
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

  const closeApostas = async () => {
    const response = await dispatch.current.setApostas(aposta)
    navigation.navigate(RouteNames.ResultadosScreen)
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
          {`${hands[current.currentRound]} carta${
            hands[current.currentRound] > 1 ? "s" : ""
          }`}
        </Text>
        <Text type="title" align="center" variant="white">
          {players[players.length - 1].name} distribui - Façam suas apostas!
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
              { alignItems: "center", zIndex: 10 },
            ]}
          >
            <TrunfoCard trunfo={trunfo} setTrunfo={setTrunfo} />
            <ApostaCard
              name={players[index].name}
              id={players[index].id}
              numCards={hands[currentRound]}
              selected={aposta[index] || null}
              index={index}
              confirm={confirmAposta}
              cancel={cancelAposta}
              totalPlayers={players.length}
              totalApostas={aposta.length ? aposta.reduce((a, b) => a + b) : 0}
            />
            <View style={themedStyle.bubblesContainer}>
              {aposta.map((a: number, i: number) => (
                <PlayerBubble
                  key={i}
                  color={theme.colors.hover}
                  label={a.toString()}
                  name={players[i].name}
                  id={players[i].id}
                />
              ))}
            </View>
          </View>
          <BottomMenu
            onConfirm={closeApostas}
            confirmLabel="Confirmar"
            disabled={
              trunfo === Naipes.UNDEFINED ||
              index < players.length - 1 ||
              aposta.length < players.length
            }
          />
        </RoundedScrollView>
      </View>
    </GradientView>
  )
}

export default ApostasScreen

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: "flex-start",
      width: "100%",
      maxWidth: 600,
    },
    bubblesContainer: {
      flexDirection: "row",
      maxWidth: "100%",
      flexWrap: "wrap",
      justifyContent: "center",
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
