import React, { useCallback, useState, useEffect } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { useTheme } from "react-native-paper"
import { StackScreenProps } from "@react-navigation/stack"
import { Player, RootStackParamList, Table } from "@types"
import Text from "@components/Text"
import GradientView from "@components/GradientView"
import BottomMenu from "@components/Footers/BottomMenu"
import TitleHeader from "@components/Headers/TitleHeader"
import RoundedHeaderDecoration from "@components/Headers/RoundedHeaderDecoration"
import PlayerOrder from "@components/Cards/PlayerOrder"
import { CurrentState } from "@store/models/current"
import { GlobalState } from "@store/models/global"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"

type Props = StackScreenProps<RootStackParamList, "OrderPlayersScreen">

const OrderPlayersScreen = ({ navigation }: Props) => {
  const global: GlobalState = useSelector(({ global }: RootState) => global)
  const current: CurrentState = useSelector(({ current }: RootState) => current)
  const { players } = global
  const { table } = current

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [playerOrder, setPlayerOrder] = useState<Player[]>([])

  /* useFocusEffect(
    useCallback(() => {
      dispatch.global.getPlayers()
    }, [])
  ) */

  useEffect(() => {
    const myPlayers: Player[] = players.filter((a: Player) =>
      table.players.some((p) => p === a.id)
    )
    setPlayerOrder(myPlayers)
  }, [table])

  const insertAndShift = (arr: Player[], to: number, from: number) => {
    let newArray: Player[] = []
    const fromItem = arr[from]
    if (from > to) {
      const startToTo = to > 0 ? arr.slice(0, to) : []
      const toToFrom = arr.slice(to, from)
      const fromToEnd = arr.slice(from + 1, arr.length)
      newArray = newArray.concat(startToTo, [fromItem], toToFrom, fromToEnd)
    }
    if (to > from) {
      const startToFrom = from > 0 ? arr.slice(0, from) : []
      const fromToTo = arr.slice(from + 1, to + 1)
      const toToEnd = arr.slice(to + 1, arr.length)
      newArray = newArray.concat(startToFrom, fromToTo, fromItem, toToEnd)
    }
    return newArray
  }

  const playerDown = (index: number) =>
    setPlayerOrder(insertAndShift(playerOrder, index + 1, index))
  const playerUp = (index: number) =>
    setPlayerOrder(insertAndShift(playerOrder, index - 1, index))

  const goToNext = () => {
    dispatch.current.setPlayers(playerOrder)
    dispatch.current.initPlacar()
    navigation.navigate("Root")
  }

  return (
    <GradientView>
      <TitleHeader title="Ordem" />
      <View style={themedStyle.mainContainer}>
        <Text
          type="header"
          align="center"
          variant="white"
          family="bold"
          style={{
            marginBottom: theme.spacings.padding,
          }}
        >
          Como os jogadores estão sentados?
        </Text>
        <Text
          type="title"
          align="center"
          variant="white"
          style={{
            marginBottom: theme.spacings.padding * 2,
          }}
        >
          Ordene do primeiro a fazer a aposta na primeira rodada ao último
        </Text>
      </View>
      <View style={{ width: "100%", flex: 1 }}>
        <RoundedHeaderDecoration backgroundColor={theme.colors.textLight} />
        <ScrollView
          contentContainerStyle={{ alignItems: "center" }}
          style={[
            {
              backgroundColor: theme.colors.textLight,
              marginBottom: 70,
              height: 300,
            },
          ]}
        >
          <View style={[themedStyle.mainContainer, { alignItems: "center" }]}>
            {playerOrder.length
              ? playerOrder.map((p: Player, i: number) => (
                  <PlayerOrder
                    key={p.id}
                    len={playerOrder.length}
                    name={p.name}
                    index={i}
                    playerDown={playerDown}
                    playerUp={playerUp}
                  />
                ))
              : null}
          </View>
        </ScrollView>
      </View>
      <BottomMenu
        onConfirm={goToNext}
        confirmLabel="Continuar ➝"
        disabled={false}
      />
    </GradientView>
  )
}

export default OrderPlayersScreen

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: "flex-start",
      width: "100%",
      maxWidth: 600,
    },
  })
