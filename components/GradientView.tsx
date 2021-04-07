import React from "react"
import { useTheme } from "react-native-paper"
import { LinearGradient } from "expo-linear-gradient"
import { StyleSheet, View } from "react-native"

export type ViewProps = View["props"]

const GradientView = ({ children }: ViewProps) => {
  const theme = useTheme()
  const themedStyle = styles(theme)

  return (
    <View style={themedStyle.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.background]}
        style={themedStyle.background}
      />
      {children}
    </View>
  )
}

export default GradientView

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
