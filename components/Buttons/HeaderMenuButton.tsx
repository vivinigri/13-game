import React from "react"
import { TouchableOpacity, GestureResponderEvent } from "react-native"
import { Text } from "@components"
import { theme } from "@core/theme"

type Props = {
  onPress: (event: GestureResponderEvent) => void | undefined
}

export default function HeaderMenuButton({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        type="mainheading"
        variant="white"
        style={{ marginLeft: theme.spacings.padding }}
      >
        ☰
      </Text>
    </TouchableOpacity>
  )
}
