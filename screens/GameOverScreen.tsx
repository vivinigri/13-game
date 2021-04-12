import React, { useCallback, useState } from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "react-native-paper"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { Placar } from "@types"
import Text from "@components/Text"
import GradientView from "@components/GradientView"
import BottomMenu from "@components/Footers/BottomMenu"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { ApostasParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"
import { RoundedScrollView } from "@components/Themed"

type Props = BottomTabScreenProps<ApostasParamList, RouteNames.GameOverScreen>

const GameOverScreen = ({ navigation, route }: Props) => {
  const placar: Placar = useSelector(({ current }: RootState) => current.placar)

  const theme = useTheme()
  const themedStyle = styles(theme)

  const goToNext = () => {
    // navigation.navigate(RouteNames.StartScreen)
  }

  console.log("placar", placar)

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
          <View
            style={[themedStyle.mainContainer, { alignItems: "center" }]}
          ></View>
          <BottomMenu
            onConfirm={goToNext}
            confirmLabel="Novo Jogo"
            onCancel={goToNext}
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
