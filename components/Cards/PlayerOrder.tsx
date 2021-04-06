import React from "react"
import Text from "@components/Text"
import { useTheme } from "react-native-paper"
import CircleButton from "@components/Buttons/CircleButton"
import { CardView } from "@components/Themed"

type PlayerOrderProps = {
  name: string
  len: number
  index: number
  playerUp: (index: number) => void
  playerDown: (index: number) => void
}

const PlayerOrder = ({
  name,
  len,
  index,
  playerUp,
  playerDown,
}: PlayerOrderProps) => {
  const theme = useTheme()
  return (
    <CardView>
      <CircleButton
        onPress={() => playerUp(index)}
        label="🡡"
        size={theme.spacings.padding * 3}
        color={theme.colors.yellow}
        disabled={index === 0}
      />
      <Text
        type="header"
        variant="white"
        align="center"
        style={{
          marginBottom: theme.spacings.padding,
        }}
      >
        {name}
      </Text>
      <CircleButton
        onPress={() => playerDown(index)}
        label="🡣"
        size={theme.spacings.padding * 3}
        color={theme.colors.yellow}
        disabled={index >= len - 1}
      />
    </CardView>
  )
}

export default PlayerOrder
