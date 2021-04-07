import React, { useState } from "react"
import { CardView } from "@components/Themed"
import CircleButton from "@components/Buttons/CircleButton"
import { useTheme } from "react-native-paper"
import Text from "@components/Text"
import Divider from "@components/Divider"
import { View } from "react-native"

type ApostaCardProps = {
  name: string
  id: string
  numCards: number
  index: number
  confirm: (id: string, aposta: number) => void
  cancel: () => void
  selected: number | null
}

const ApostaCard = ({
  name,
  id,
  confirm,
  numCards,
  cancel,
  selected,
  index,
}: ApostaCardProps) => {
  const theme = useTheme()
  const [aposta, setAposta] = useState<number | null>(selected)
  const color = (i: number) =>
    aposta === i ? theme.colors.yellow : theme.colors.textLight

  return (
    <CardView style={{ flexDirection: "column" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={{ minWidth: 70 }}></View>
        <Text type="title" variant="white" align="center">
          {name}
        </Text>
        <View
          style={{
            minWidth: 70,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {index !== 0 ? (
            <CircleButton
              size={theme.spacings.padding * 2}
              label="✗"
              color={theme.colors.textPrimary}
              onPress={() => cancel()}
              style={{ marginRight: theme.spacings.padding * 0.5 }}
            />
          ) : null}
          <CircleButton
            size={theme.spacings.padding * 2}
            label="🗸"
            color={theme.colors.green}
            onPress={() => confirm(id, aposta || 0)}
            disabled={aposta === null}
          />
        </View>
      </View>

      <Divider />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {Array.from(Array(numCards + 1).keys()).map((i: number) => (
          <CircleButton
            size={theme.spacings.padding * 3}
            label={i.toString()}
            color={color(i)}
            onPress={() => setAposta(i)}
            style={{
              marginHorizontal: theme.spacings.padding * 0.5,
              marginVertical: theme.spacings.padding * 0.5,
            }}
          />
        ))}
      </View>
    </CardView>
  )
}

export default ApostaCard
