import React from "react"
import Text from "@components/Text"
import { View, TouchableOpacity, GestureResponderEvent } from "react-native"

type CircleButtonProps = {
  onPress?: (event: GestureResponderEvent) => void | undefined
  disabled?: boolean
  size: number
  label: string
  color: string
}

const CircleButton = ({
  label,
  size,
  color = "white",
  disabled = false,
  onPress = undefined,
}: CircleButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size,
          borderWidth: 2,
          borderColor: color,
          opacity: disabled ? 0.3 : 1,
          justifyContent: "center",
        }}
      >
        <Text
          type="mainheading"
          align="center"
          style={{ color: color, fontSize: size * 0.5 }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(CircleButton)
