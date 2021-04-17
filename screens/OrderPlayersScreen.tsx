import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "react-native-paper"
import { StackScreenProps } from "@react-navigation/stack"
import { Player } from "@types"
import { GradientView, Text, TopView } from "@components"
import BottomMenu from "@components/Footers/BottomMenu"
import { RoundedScrollView } from "@components/Themed"
import PlayerOrder from "@components/Cards/PlayerOrder"
import { CurrentState } from "@store/models/current"
import { GlobalState } from "@store/models/global"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { RootStackParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"

type Props = StackScreenProps<RootStackParamList, RouteNames.OrderPlayersScreen>

const OrderPlayersScreen = ({ navigation }: Props) => {
  const global: GlobalState = useSelector(({ global }: RootState) => global)
  const current: CurrentState = useSelector(({ current }: RootState) => current)
  const { players } = current

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [playerOrder, setPlayerOrder] = useState<Player[]>(players)

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
    // navigation.navigate(RouteNames.Tabs)
    navigation.navigate(RouteNames.Drawer)
  }

  return (
    <GradientView>
      <TopView
        title="Como os jogadores estão sentados?"
        subtitle="Ordene do primeiro a fazer a aposta na primeira rodada ao último"
      />
      <RoundedScrollView>
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
        <BottomMenu
          onConfirm={goToNext}
          confirmLabel="Continuar ➝"
          disabled={false}
        />
      </RoundedScrollView>
    </GradientView>
  )
}

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: "flex-start",
      width: "100%",
      maxWidth: 600,
    },
  })

export default OrderPlayersScreen
