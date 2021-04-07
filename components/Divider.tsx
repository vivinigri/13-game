import React from "react"
import { useTheme, Divider as DefaultDivider } from "react-native-paper"

const Divider = () => {
  const theme = useTheme()
  return (
    <DefaultDivider
      style={{
        backgroundColor: theme.colors.textLight,
        marginVertical: theme.spacings.padding,
        width: "80%",
      }}
    />
  )
}

export default Divider
