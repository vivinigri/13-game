import * as React from "react"
import { StyleSheet, View } from "react-native"
import Text from "@components/Text"
import { ActionButton } from "@components/Buttons"
import Cards from "@assets/icons/cards"
import { useTheme } from "react-native-paper"
import { LinearGradient } from "expo-linear-gradient"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"

type Props = StackScreenProps<RootStackParamList, RouteNames.StartScreen>
type MenuItem = {
  label: string
  redirect: RouteNames
}

const menu: MenuItem[] = [
  { label: "✨ Novo jogo", redirect: RouteNames.SelectTableScreen },
  { label: "⚙️ Ajustes", redirect: RouteNames.SettingsScreen },
  { label: "📚 Sobre", redirect: RouteNames.SobreScreen },
  /* { label: "⌛ Continuar", redirect: RouteNames.SelectTableScreen },
  { label: "📊 Estatísticas", redirect: RouteNames.StatsScreen }, */
]

export default function StartScreen({ navigation }: Props) {
  const theme = useTheme()
  const themedStyle = styles(theme)

  const navigate = (screen: RouteNames) =>
    navigation.navigate(screen as keyof RootStackParamList)

  return (
    <View style={themedStyle.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.background]}
        style={themedStyle.background}
      />
      <View
        style={{
          width: "100%",
          maxWidth: 600,
          alignItems: "center",
          padding: theme.spacings.padding * 2,
        }}
      >
        <View
          style={{
            maxWidth: 400,
            maxHeight: 400,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Cards color={theme.colors.hover} />
        </View>
        <Text
          type="header"
          align="center"
          variant="white"
          family="bold"
          style={{
            marginTop: theme.spacings.padding * 3,
            marginBottom: theme.spacings.padding * 2,
          }}
        >
          Um jogo de estratégia!
        </Text>
        <Text
          type="title"
          align="center"
          variant="white"
          style={{ marginBottom: theme.spacings.padding * 3 }}
        >
          ❝do francês strategie, do grego strátegìa, do latim...❞
        </Text>
        {menu.map((el) => (
          <ActionButton
            key={el.label}
            label={el.label}
            onPress={() => navigate(el.redirect)}
          />
        ))}
      </View>
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
