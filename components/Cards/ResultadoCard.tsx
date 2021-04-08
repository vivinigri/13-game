import React, { useState } from "react"
import { CardView } from "@components/Themed"
import CircleButton from "@components/Buttons/CircleButton"
import { useTheme } from "react-native-paper"
import Text from "@components/Text"
import Divider from "@components/Divider"
import { View } from "react-native"

type Props = {
  name: string
  numCards: number
  index: number
  setResultado: (index: number, resultado: number) => void
  aposta: number
}

const ResultadoCard = ({
  name,
  index,
  numCards,
  setResultado,
  aposta,
}: Props) => {
  const theme = useTheme()
  const [acertou, setAcertou] = useState<boolean | null>()
  const [levou, setLevou] = useState<number | null>()

  const color = (i: number) =>
    levou === i ? theme.colors.yellow : theme.colors.textLight

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
          <CircleButton
            size={theme.spacings.padding * 3}
            label="✗"
            color={theme.colors.textPrimary}
            onPress={() => setAcertou(false)}
            style={{
              marginRight: theme.spacings.padding * 0.5,
              opacity: acertou !== false ? 0.3 : 1,
            }}
          />
          <CircleButton
            size={theme.spacings.padding * 3}
            label="🗸"
            color={theme.colors.green}
            onPress={() => {
              setAcertou(true)
              setResultado(index, aposta)
            }}
            style={{ opacity: acertou ? 1 : 0.3 }}
          />
        </View>
      </View>
      {acertou === false ? (
        <View style={{ width: "100%", alignItems: "center" }}>
          <Divider width="100%" />
          <Text
            type="caption"
            variant="white"
            align="center"
            style={{ marginBottom: theme.spacings.padding * 0.5 }}
          >
            Levou
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {Array.from(Array(numCards + 1).keys()).map((i: number) => {
              if (i !== aposta) {
                return (
                  <CircleButton
                    key={i}
                    size={theme.spacings.padding * 3}
                    label={i.toString()}
                    color={color(i)}
                    onPress={() => {
                      setLevou(i)
                      setResultado(index, i)
                    }}
                    style={{
                      marginHorizontal: theme.spacings.padding * 0.5,
                      marginVertical: theme.spacings.padding * 0.5,
                    }}
                  />
                )
              }
            })}
          </View>
        </View>
      ) : null}
    </CardView>
  )
}

export default ResultadoCard
