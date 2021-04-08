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
        label="♥️"
        color={color(Naipes.COPAS)}
        onPress={() => setTrunfo(Naipes.COPAS)}
      />
      <CircleButton
        size={size}
        label="♦️"
        color={color(Naipes.OUROS)}
        onPress={() => setTrunfo(Naipes.OUROS)}
      />
      <Text type="title" align="center" variant="white">
        Trunfo
      </Text>
      <CircleButton
        size={size}
        label="♠️"
        color={color(Naipes.ESPADAS)}
        onPress={() => setTrunfo(Naipes.ESPADAS)}
      />
      <CircleButton
        size={size}
        label="♣️"
        color={color(Naipes.PAUS)}
        onPress={() => setTrunfo(Naipes.PAUS)}
      />
    </CardView>
  )
}

export default TrunfoCard
