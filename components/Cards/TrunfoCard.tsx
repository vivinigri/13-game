import React from "react"
import { CardView } from "@components/Themed"
import CircleButton from "@components/Buttons/CircleButton"
import { useTheme } from "react-native-paper"
import { Naipes } from "@types"
import Text from "@components/Text"

type TrunfoCardProps = {
  trunfo: Naipes
  setTrunfo: (trunfo: Naipes) => void
}

const TrunfoCard = ({ trunfo, setTrunfo }: TrunfoCardProps) => {
  const theme = useTheme()
  const size = theme.spacings.padding * 3
  const color = (type: Naipes) =>
    type === trunfo ? theme.colors.yellow : theme.colors.textLight

  return (
    <CardView>
      <CircleButton
        size={size}
        // label="♡"
        label="♥️"
        color={color("copas")}
        onPress={() => setTrunfo("copas")}
      />
      <CircleButton
        size={size}
        // label="♢"
        label="♦️"
        color={color("ouros")}
        onPress={() => setTrunfo("ouros")}
      />
      <Text type="title" align="center" variant="white">
        Trunfo
      </Text>
      <CircleButton
        size={size}
        // label="♡"
        label="♠️"
        color={color("espadas")}
        onPress={() => setTrunfo("espadas")}
      />
      <CircleButton
        size={size}
        // label="♢"
        label="♣️"
        color={color("paus")}
        onPress={() => setTrunfo("paus")}
      />
    </CardView>
  )
}

export default TrunfoCard
