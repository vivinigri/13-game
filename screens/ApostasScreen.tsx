import React, { useCallback, useState } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { useTheme } from "react-native-paper"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { Naipes, ApostasParamList } from "@types"
import { Text, GradientView } from "@components"
import { CurrentState } from "@store/models/current"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { TrunfoCard, ApostaCard, PlayerBubble } from "@components/Cards"
import { ActionButton } from "@components/Buttons"

type Props = BottomTabScreenProps<ApostasParamList, "ApostasScreen">

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

  const closeApostas = () => {
    dispatch.current.setApostas(aposta)
    navigation.navigate("ResultadosScreen")
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
        </ScrollView>
        <View style={themedStyle.actionBtnView}>
          <ActionButton
            label="Confirmar"
            disabled={trunfo === Naipes.UNDEFINED || index < players.length - 1}
            onPress={closeApostas}
            style={{ maxWidth: 200 }}
          />
        </View>
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