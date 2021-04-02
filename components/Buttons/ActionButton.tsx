import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"

import { View } from "@components/Themed"
import Text from "@components/Text"
import { useTheme } from "react-native-paper"

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
          type="title"
          family="medium"
          // textTransform="uppercase"
          align="center"
          variant="white"
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.transparent,
      width: "100%",
      maxWidth: 300,
      height: 46,
      borderRadius: 40,
      marginBottom: spacings.padding * 2,
      borderWidth: 2,
      borderColor: colors.cyan,
      justifyContent: "center",
    },
  })

export default Button
