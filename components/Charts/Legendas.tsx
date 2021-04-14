import React from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "@components"
import { useTheme } from "react-native-paper"
import { Legend } from "@types"

type Props = {
  legendas: Legend[]
}

type LegendaProps = {
  legenda: Legend
}

export default function Legendas({ legendas }: Props) {
  const theme = useTheme()
  const themedStyle = styles(theme)

  return (
    <View style={themedStyle.legenda}>
      {legendas.map((legenda) => (
        <Legenda legenda={legenda} key={legenda.label} />
      ))}
    </View>
  )
}

const Legenda = ({ legenda }: LegendaProps) => {
  const theme = useTheme()
  const themedStyle = styles(theme)

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={[themedStyle.circle, { backgroundColor: legenda.color }]} />
      <Text
        variant="dark"
        type="title"
        style={{ marginRight: theme.spacings.padding }}
      >
        {legenda.label}
      </Text>
    </View>
  )
}

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    legenda: {
      flexDirection: "row",
      marginVertical: spacings.padding,
      marginHorizontal: spacings.padding,
    },
    circle: {
      width: spacings.padding * 1.5,
      height: spacings.padding * 1.5,
      borderRadius: spacings.padding * 1.5,
      marginRight: spacings.padding * 0.5,
    },
    certo: {
      backgroundColor: colors.green,
    },
    errado: {
      backgroundColor: colors.error,
    },
  })
