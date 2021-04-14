import React from "react"
import { PieChart } from "react-native-svg-charts"
import { Text } from "react-native-svg"
import { useTheme } from "react-native-paper"
import { PlacarObject } from "@types"

type Props = {
  height: number
  placar: PlacarObject
}

type PieChartData = {
  value: number
  svg: any
  key: string
}

export default function MyPieChart({ height, placar }: Props) {
  const theme = useTheme()

  const pieData: PieChartData[] = [
    {
      value: placar.errou,
      key: "error",
      svg: {
        fill: theme.colors.error,
      },
    },
    {
      value: placar.acertou,
      key: "correct",
      svg: {
        fill: theme.colors.green,
      },
    },
  ]

  const Labels = ({ slices, height, width }: any) => {
    return slices.map((slice: any, index: number) => {
      const { labelCentroid, pieCentroid, data } = slice
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={theme.colors.dark}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={24}
          stroke={"none"}
          strokeWidth={0.2}
        >
          {data.value}
        </Text>
      )
    })
  }

  return (
    <PieChart
      style={{ height, marginTop: theme.spacings.padding * 2 }}
      data={pieData}
      valueAccessor={({ item }) => item.value}
      outerRadius={"95%"}
    >
      <Labels />
    </PieChart>
  )
}
