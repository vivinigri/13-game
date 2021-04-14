import React from "react"
import { LineChart, XAxis, YAxis, Grid } from "react-native-svg-charts"
import { View } from "react-native"
import { useTheme } from "react-native-paper"
import { PlacarObject } from "@types"

type Props = {
  height?: number
  data: number[]
}

export default function MyLineChart({ data, height = 200 }: Props) {
  const theme = useTheme()

  const axesSvg = { fontSize: 12, fill: theme.colors.dark }
  const verticalContentInset = { top: 10, bottom: 10 }
  const xAxisHeight = 30

  return (
    <View
      style={{
        height: height,
        width: "100%",
        paddingVertical: theme.spacings.padding,
        paddingHorizontal: theme.spacings.padding * 2,
        flexDirection: "row",
      }}
    >
      <YAxis
        data={data}
        style={{ marginBottom: xAxisHeight }}
        contentInset={verticalContentInset}
        formatLabel={(value, index) => (data.includes(value) ? value : "")}
        svg={axesSvg}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <LineChart
          style={{ flex: 1 }}
          data={data}
          contentInset={verticalContentInset}
          svg={{ stroke: theme.colors.dark, strokeWidth: 4 }}
        >
          <Grid />
        </LineChart>
        <XAxis
          style={{ marginHorizontal: -10, height: xAxisHeight }}
          data={data}
          formatLabel={(value, index) => index}
          contentInset={{ left: 10, right: 10 }}
          svg={axesSvg}
        />
      </View>
    </View>
  )
}
