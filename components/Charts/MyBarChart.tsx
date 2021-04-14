import React from "react"
import { BarChart, Grid } from "react-native-svg-charts"
import { Text as TextSvg } from "react-native-svg"
import { useTheme } from "react-native-paper"

type Props = {
  height: number
  data: number[]
  labels: string[]
}

type LabelsType = {
  data: number[]
  x: Function
  y: Function
  bandwidth: number
}

const CUT_OFF = 20

export default function MyBarChart({ height, data, labels }: Props) {
  const theme = useTheme()

  const Values = ({ x, y, bandwidth, data }: LabelsType) =>
    data.map((value: number, index: number) => (
      <TextSvg
        key={index}
        x={x(index) + bandwidth / 2}
        y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
        fontSize={14}
        fill={value >= CUT_OFF ? "white" : theme.colors.dark}
        alignmentBaseline={"middle"}
        textAnchor={"middle"}
        fontWeight={"bold"}
      >
        {value}
      </TextSvg>
    ))

  const Labels = ({ x, y, bandwidth, data }: LabelsType) =>
    data.map((value: number, index: number) => (
      <TextSvg
        key={index}
        x={x(index) + bandwidth / 2}
        y={value < CUT_OFF ? y(value) - 40 : y(value) - 15}
        fontSize={14}
        fill={theme.colors.dark}
        alignmentBaseline={"middle"}
        textAnchor={"middle"}
        fontWeight={"bold"}
      >
        {labels[index]}
      </TextSvg>
    ))

  return (
    <BarChart
      style={{
        height: height,
        width: "100%",
        marginHorizontal: theme.spacings.padding * 2,
        paddingHorizontal: theme.spacings.padding * 2,
      }}
      data={data}
      animate={false}
      animationDuration={0}
      svg={{ fill: theme.colors.hover }}
      contentInset={{ top: 30, bottom: 30 }}
    >
      <Grid />
      <Labels />
      <Values />
    </BarChart>
  )
}
