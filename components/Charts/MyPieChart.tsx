import React from "react"
import { PieChart } from "react-native-svg-charts"
import { Text } from "react-native-svg"
import { useTheme } from "react-native-paper"

type Props = {
  height: number
  pieData: PieChartData[]
}

export type PieChartData = {
  value: number
  svg: any
  key: string
}

export default function MyPieChart({ height, pieData }: Props) {
  const theme = useTheme()

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
      style={{ height, width: height, marginVertical: theme.spacings.padding }}
      data={pieData}
      valueAccessor={({ item }) => item.value}
      outerRadius={"95%"}
    >
      <Labels />
    </PieChart>
  )
}
