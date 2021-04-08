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
  disabled: boolean
} & View["props"]

const Button = ({
  label,
  onPress,
  disabled = false,
  ...props
}: ButtonProps) => {
  const theme = useTheme()
  const themedStyle = styles(theme)

  return (
    <View
      style={[
        themedStyle.button,
        { opacity: disabled ? 0.5 : 1 },
        props.style || {},
      ]}
    >
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Text type="title" family="bold" align="center" variant="dark">
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    button: {
      // backgroundColor: colors.transparent,
      backgroundColor: colors.yellow,
      width: "100%",
      maxWidth: 300,
      height: 46,
      borderRadius: 46,
      marginBottom: spacings.padding * 2,
      // borderWidth: 2,
      // borderColor: colors.cyan,
      justifyContent: "center",
    },
  })

export default Button
