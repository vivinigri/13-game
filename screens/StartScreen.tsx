import * as React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"

import { View } from "../components/Themed"
import Text from "@components/Text"
import Logo from "@assets/icons/logo"
import { useTheme } from "react-native-paper"
import { LinearGradient } from "expo-linear-gradient"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { BottomTabParamList } from "@types"

type Props = BottomTabScreenProps<BottomTabParamList, "TabOne">

const menu = [
  { label: "✨ Novo jogo", redirect: "TabTwo" },
  { label: "💡 Continuar", redirect: "TabTwo" },
  { label: "🪑 Mesas", redirect: "TabTwo" },
  { label: "👪 Jogadores", redirect: "TabTwo" },
  { label: "📊 Estatísticas", redirect: "TabTwo" },
]

export default function StartScreen({ navigation }: Props) {
  const theme = useTheme()
  const themedStyle = styles(theme)

  const navigate = (screen: string) => navigation.navigate(screen)

  return (
    <View style={themedStyle.container}>
      <LinearGradient
        colors={[theme.colors.background, theme.colors.dark]}
        style={themedStyle.background}
      />
      <Logo color={theme.colors.textPrimary} />
      <Text type="header" style={themedStyle.title}>
        Um jogo de estratégia!
      </Text>
      <Text type="title" style={themedStyle.title}>
        ❝do francês strategie, do grego strátegìa, do latim...❞
      </Text>
      <View
        style={themedStyle.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {menu.map((el) => (
        <Button
          key={el.label}
          label={el.label}
          navigate={() => navigate(el.redirect)}
        />
      ))}
    </View>
  )
}

type ButtonProps = {
  label: string
  navigate: () => void
}

const Button = ({ label, navigate }: ButtonProps) => {
  const theme = useTheme()
  const themedStyle = styles(theme)

  return (
    <View style={themedStyle.button}>
      <TouchableOpacity onPress={navigate}>
        <Text
          type="subheading"
          family="medium"
          textTransform="uppercase"
          align="center"
          variant="white"
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = ({ colors }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
    },
    background: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: "100%",
      zIndex: -1,
    },
    title: {
      fontWeight: "bold",
      marginTop: 20,
      color: colors.white,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
      maxWidth: 600,
    },
    button: {
      // backgroundColor: colors.textPrimary,
      backgroundColor: colors.transparent,
      width: "100%",
      maxWidth: 300,
      height: 46,
      borderRadius: 40,
      marginBottom: 20,
      borderWidth: 2,
      borderColor: colors.textPrimary,
      justifyContent: "center",
    },
  })
