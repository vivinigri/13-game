import React from "react"
import { View } from "react-native"
import { Text } from "@components"
import { useTheme } from "react-native-paper"

type Props = {
  title?: string
  subtitle?: string
  children?: React.ReactNode
}

const TopView = ({ title, subtitle, children }: Props) => {
  const theme = useTheme()
  return (
    <View
      style={{ justifyContent: "flex-start", width: "100%", maxWidth: 600 }}
    >
      {title ? (
        <Text
          type="header"
          align="center"
          variant="white"
          family="bold"
          style={{
            marginVertical: theme.spacings.padding,
          }}
        >
          {title}
        </Text>
      ) : null}
      {subtitle ? (
        <Text type="title" align="center" variant="white">
          {subtitle}
        </Text>
      ) : null}
      {children}
    </View>
  )
}

export default TopView
