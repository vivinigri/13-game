import React from "react"
import {
  StyleSheet,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native"
import { useTheme } from "react-native-paper"
import Text from "@components/Text"
import { Ionicons } from "@expo/vector-icons"

type BallButtonProps = {
  label?: string
  icon?: string
  onPress?: (event: GestureResponderEvent) => void | undefined
}

const BallButton = ({ label, icon, onPress }: BallButtonProps) => {
  const theme = useTheme()
  const themedStyle = styles(theme)

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={themedStyle.addButton}>
        {label ? (
          <Text type="mainheading" align="center" variant="dark" family="bold">
            {label}
          </Text>
        ) : (
          <Ionicons
            size={30}
            name={icon}
            color={theme.colors.textDark}
            style={{ alignSelf: "center" }}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    addButton: {
      backgroundColor: colors.yellow,
      width: spacings.section * 2,
      height: spacings.section * 2,
      borderRadius: spacings.section * 2,
      position: "absolute",
      right: spacings.padding,
      top: -46,
      justifyContent: "center",
    },
  })

export default BallButton
