import React, { memo } from "react"
import { StyleSheet, View, Image } from "react-native"
import { useTheme } from "react-native-paper"
import { StackScreenProps } from "@react-navigation/stack"
import { TopView, GradientView, Text } from "@components"
import { RoundedScrollView } from "@components/Themed"
import { RootStackParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"

type Props = StackScreenProps<RootStackParamList, RouteNames.SelectTableScreen>
const SobreScreen = ({ navigation }: Props) => {
  const theme = useTheme()
  const themedStyle = styles(theme)

  return (
    <GradientView>
      <TopView title="Como se ganha esse jogo?" subtitle="" />

      <RoundedScrollView>
        <View style={themedStyle.cardsContainer}>
          <Image
            source={require("@assets/images/dilma.jpg")}
            style={{ width: 200, height: 200 }}
          />
          <Text
            variant="dark"
            type="header"
            family="bold"
            align="center"
            style={{ marginTop: theme.spacings.padding * 2 }}
          >
            “nem quem ganhar nem perder, vai ganhar ou perder”
          </Text>
          <Text variant="dark" type="subheading" family="bold" align="center">
            O importante é ganhar e perder - somente o necessário
          </Text>
        </View>
      </RoundedScrollView>
    </GradientView>
  )
}

export default memo(SobreScreen)

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: "flex-start",
      width: "100%",
      maxWidth: 600,
    },
    cardsContainer: {
      justifyContent: "flex-start",
      width: "100%",
      maxWidth: 600,
      alignItems: "center",
      padding: spacings.padding * 2,
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
