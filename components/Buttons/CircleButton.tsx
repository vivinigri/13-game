import React from "react"
import Text from "@components/Text"
import { View, TouchableOpacity, GestureResponderEvent } from "react-native"
import { Ionicons } from "@expo/vector-icons"

type CircleButtonProps = {
  onPress?: (event: GestureResponderEvent) => void | undefined
  disabled?: boolean
  size: number
  label?: string
  icon?: string
  color: string
} & View["props"]

const CircleButton = ({
  label,
  icon,
  size,
  color = "white",
  disabled = false,
  onPress = undefined,
  ...props
}: CircleButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size,
            borderWidth: 2,
            borderColor: color,
            opacity: disabled ? 0.3 : 1,
            justifyContent: "center",
          },
          props.style || {},
        ]}
      >
        {label ? (
          <Text
            type="mainheading"
            align="center"
            style={{ color: color, fontSize: size * 0.5 }}
          >
            {label}
          </Text>
        ) : (
          <Ionicons size={30} name={icon} color={color} />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(CircleButton)
