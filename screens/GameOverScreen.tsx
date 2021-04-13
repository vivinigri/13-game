import React, { useCallback, useState } from "react"
import { StyleSheet, View, useWindowDimensions } from "react-native"
import { useTheme } from "react-native-paper"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import Text from "@components/Text"
import GradientView from "@components/GradientView"
import BottomMenu from "@components/Footers/BottomMenu"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { ApostasParamList, RootStackParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"
import { RoundedScrollView } from "@components/Themed"
import { BarChart, Grid } from "react-native-svg-charts"
import { Text as TextSvg } from "react-native-svg"
import { CurrentState } from "@store/models/current"

type Props = BottomTabScreenProps<ApostasParamList, RouteNames.GameOverScreen>

type LabelsType = {
  data: number[]
  x: Function
  y: Function
  bandwidth: number
}

const GameOverScreen = ({ navigation, route }: Props) => {
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
  const labels = ids.map((id) => players.find((p) => p.id === id)?.name)
  const height = useWindowDimensions().height - 320
  const CUT_OFF = 20

  const Values = ({ x, y, bandwidth, data }: LabelsType) =>
    data.map((value: number, index: number) => (
      <TextSvg
        key={index}
        x={x(index) + bandwidth / 2}
        y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
        fontSize={14}
        fill={value >= CUT_OFF ? "white" : theme.colors.dark}
        alignmentBaseline={"middle"}
        textAnchor={"middle"}
        fontWeight={"bold"}
      >
        {value}
      </TextSvg>
    ))

  const Labels = ({ x, y, bandwidth, data }: LabelsType) =>
    data.map((value: number, index: number) => (
      <TextSvg
        key={index}
        x={x(index) + bandwidth / 2}
        y={value < CUT_OFF ? y(value) - 40 : y(value) - 15}
        fontSize={14}
        fill={theme.colors.dark}
        alignmentBaseline={"middle"}
        textAnchor={"middle"}
        fontWeight={"bold"}
      >
        {labels[index]}
      </TextSvg>
    ))

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
          Game Over
        </Text>
        <Text type="title" align="center" variant="white">
          Resultado final do jogo
        </Text>
      </View>
      <View style={{ width: "100%", flex: 1 }}>
        <RoundedScrollView>
          <View style={[themedStyle.mainContainer, { alignItems: "center" }]}>
            <BarChart
              style={{
                height: height,
                width: "100%",
                marginHorizontal: theme.spacings.padding * 2,
                paddingHorizontal: theme.spacings.padding * 2,
              }}
              data={data}
              animate={false}
              animationDuration={0}
              svg={{ fill: theme.colors.hover }}
              contentInset={{ top: 30, bottom: 30 }}
            >
              <Grid />
              <Labels />
              <Values />
            </BarChart>
          </View>
          <BottomMenu
            onConfirm={startNew}
            confirmLabel="Novo Jogo"
            onCancel={goToMenu}
            cancelLabel="Menu"
            disabled={false}
          />
        </RoundedScrollView>
      </View>
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
    input: {
      height: 50,
      color: colors.white,
      borderColor: colors.yellow,
      backgroundColor: colors.backdrop,
      padding: spacings.padding,
      borderRadius: 50,
      marginHorizontal: spacings.padding,
    },
  })
