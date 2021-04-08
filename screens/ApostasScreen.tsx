import React, { useCallback, useState } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { useTheme } from "react-native-paper"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { Player, BottomTabParamList, Naipes } from "@types"
import { Text, GradientView } from "@components"
import RoundedHeaderDecoration from "@components/Headers/RoundedHeaderDecoration"
import { CurrentState } from "@store/models/current"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { TrunfoCard, ApostaCard, PlayerBubble } from "@components/Cards"
import { ActionButton } from "@components/Buttons"
import Background from "@assets/icons/background"

import { DataTable } from "react-native-paper"
import { CardView } from "@components/Themed"
import CircleButton from "@components/Buttons/CircleButton"

type Props = BottomTabScreenProps<BottomTabParamList, "Apostas">

// TODO ao apostar adicionar bubble com nome e aposta abaixa
// TODO btn central de confirmar apostas disabled se nao for ultima pessoa
const ApostasScreen = () => {
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
    // navigation.navigate("GameScreen")
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
          contentContainerStyle={{ alignItems: "center" }}
          style={{
            backgroundColor: theme.colors.textLight,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
        >
          {/* <View
            style={{
              backgroundColor: theme.colors.orange,
              opacity: 0.2,
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
            onLayout={(e) => {
              const { width, height } = e.nativeEvent.layout
              console.log("width, height", width, height)
            }}
          ></View> */}
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
            />
            <View style={themedStyle.bubblesContainer}>
              {aposta.map((a: number, i: number) => (
                <PlayerBubble
                  key={i}
                  color={theme.colors.yellow}
                  label={a.toString()}
                  name={players[i].name}
                  id={players[i].id}
                />
              ))}
            </View>
            {/* <Background color={theme.colors.yellow} /> */}
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
