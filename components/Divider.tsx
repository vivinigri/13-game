import React from "react"
import { useTheme, Divider as DefaultDivider } from "react-native-paper"

type Props = {
  width?: string
}

const Divider = ({ width = "80%" }: Props) => {
  const theme = useTheme()
  return (
    <DefaultDivider
      style={{
        backgroundColor: theme.colors.textLight,
        marginVertical: theme.spacings.padding,
        width: width,
      }}
    />
  )
}

export default Divider
