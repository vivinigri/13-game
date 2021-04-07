import * as React from "react"
import { StyleSheet, View } from "react-native"
import Text from "@components/Text"
import Button from "@components/Buttons/ActionButton"
import Divider from "@components/Divider"
import Logo from "@assets/icons/logo"
import { useTheme } from "react-native-paper"
import { LinearGradient } from "expo-linear-gradient"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "@types"

type Props = StackScreenProps<RootStackParamList, "StartScreen">

const menu = [
  { label: "✨ Novo jogo", redirect: "SelectTableScreen" },
  { label: "💡 Continuar", redirect: "Root" },
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
        colors={[theme.colors.primary, theme.colors.background]}
        style={themedStyle.background}
      />
      <Logo color={theme.colors.yellow} />
      <Text
        type="header"
        align="center"
        variant="white"
        family="bold"
        style={{
          marginTop: 30,
          marginBottom: 15,
        }}
      >
        Um jogo de estratégia!
      </Text>
      <Text type="title" align="center" variant="white">
        ❝do francês strategie, do grego strátegìa, do latim...❞
      </Text>
      <Divider />
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

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
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
  })
