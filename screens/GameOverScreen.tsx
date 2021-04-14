import React from "react"
import { StyleSheet, View, useWindowDimensions } from "react-native"
import { useTheme } from "react-native-paper"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { GradientView, TopView } from "@components"
import BottomMenu from "@components/Footers/BottomMenu"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { ApostasParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"
import { RoundedScrollView } from "@components/Themed"
import MyBarChart from "@components/Charts/MyBarChart"
import { CurrentState } from "@store/models/current"

type Props = BottomTabScreenProps<ApostasParamList, RouteNames.GameOverScreen>

const GameOverScreen = ({ navigation }: Props) => {
  const current: CurrentState = useSelector(({ current }: RootState) => current)
  const { placar, players } = current

  const theme = useTheme()
  const themedStyle = styles(theme)

  const goToMenu = () => navigation.navigate(RouteNames.StartScreen)
  const startNew = () => {
    dispatch.current.initPlacar()
    navigation.navigate(RouteNames.ApostasScreen)
  }

  const data = Object.values(placar).map((p) => p.final)
  const ids = Object.keys(placar).map((p) => p)
  const labels = ids.map((id) => players.find((p) => p.id === id)!!.name)
  const height = useWindowDimensions().height - 300

  return (
    <GradientView>
      <TopView title="Game Over" subtitle="Resultado final do jogo" />
      <RoundedScrollView>
        <View style={[themedStyle.mainContainer, { alignItems: "center" }]}>
          <MyBarChart data={data} labels={labels} height={height} />
        </View>
        <BottomMenu
          onConfirm={startNew}
          confirmLabel="Novo Jogo"
          onCancel={goToMenu}
          cancelLabel="Menu"
          disabled={false}
        />
      </RoundedScrollView>
    </GradientView>
  )
}

export default GameOverScreen

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: "flex-start",
      width: "100%",
      maxWidth: 600,
    },
  })
