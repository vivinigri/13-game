import React from "react"
import {
  StyleSheet,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from "react-native"

import Text from "@components/Text"
import { useTheme } from "react-native-paper"

type ButtonProps = {
  label: string
  onPress?: (event: GestureResponderEvent) => void | undefined
  disabled?: boolean
  secondary?: boolean
} & View["props"]

const Button = ({
  label,
  onPress,
  disabled = false,
  secondary = false,
  ...props
}: ButtonProps) => {
  const theme = useTheme()
  const themedStyle = styles(theme)

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        themedStyle.button,
        {
          opacity: disabled ? 0.5 : 1,
          backgroundColor: secondary ? theme.colors.dark : theme.colors.yellow,
        },
        props.style || {},
      ]}
    >
      <Text
        type="title"
        family="bold"
        align="center"
        variant={secondary ? "warning" : "dark"}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.yellow,
      width: "100%",
      maxWidth: 300,
      height: 46,
      borderRadius: 46,
      marginBottom: spacings.padding * 2,
      justifyContent: "center",
    },
  })

export default Button
