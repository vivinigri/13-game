import React, { useCallback, useMemo } from "react"
import { View } from "react-native"
import { Text } from "@components"
import { Naipes } from "@types"
import MyPieChart, { PieChartData } from "@components/Charts/MyPieChart"
import Legendas from "@components/Charts/Legendas"
import { Legend, Placar } from "@types"
import { theme } from "@core/theme"
import MyLineChart from "@components/Charts/MyLineChart"
import { styles } from "./styles"

const PIE_CHART_TRUNFO_LEGEND: Legend[] = [
  {
    label: "Copas",
    color: theme.colors.toastError,
  },
  {
    label: "Paus",
    color: theme.colors.toastSuccess,
  },
  {
    label: "Ouros",
    color: theme.colors.toastWarning,
  },
  {
    label: "Espadas",
    color: theme.colors.toastInfo,
  },
]

type Props = {
  naipes: Naipes[]
  totais: number[]
  placar: Placar
}

export default function InGameGeralStats({ naipes, totais, placar }: Props) {
  const getPieTrunfoData = useCallback(
    (naipes: Naipes[]) => {
      const pieData: PieChartData[] = [
        {
          value: naipes.filter((n) => n === Naipes.COPAS).length,
          key: "copas",
          svg: {
            fill: theme.colors.toastError,
          },
        },
        {
          value: naipes.filter((n) => n === Naipes.PAUS).length,
          key: "paus",
          svg: {
            fill: theme.colors.toastSuccess,
          },
        },
        {
          value: naipes.filter((n) => n === Naipes.OUROS).length,
          key: "ouros",
          svg: {
            fill: theme.colors.toastWarning,
          },
        },
        {
          value: naipes.filter((n) => n === Naipes.ESPADAS).length,
          key: "espadas",
          svg: {
            fill: theme.colors.toastInfo,
          },
        },
      ]
      return pieData.filter((d) => d.value > 0)
    },
    [naipes]
  )

  const media = useMemo(
    () => Math.round(totais.reduce((a, b) => a + b) / totais.length),
    [totais]
  )

  const desempenho = useMemo(() => {
    const numPlayers = Object.keys(placar).length
    const lenPlacar = Object.values(placar)[0].placar.length
    const des = []
    let sum = 0
    for (let j = 0; j < lenPlacar; j++) {
      sum = 0
      for (let i = 0; i < numPlayers; i++) {
        sum += Object.values(placar)[i].placar[j] > 0 ? 1 : 0
      }
      des.push(sum)
    }
    return des
  }, [placar])

  return (
    <View style={styles.chartContainer}>
      <Text
        variant="dark"
        type="subheading"
        family="bold"
        style={{ marginBottom: theme.spacings.padding * 2 }}
      >
        {`Média de pontos: ${media}`}
      </Text>
      <Text variant="dark" type="subheading" family="bold">
        Trunfos
      </Text>
      <Legendas legendas={PIE_CHART_TRUNFO_LEGEND} />
      <MyPieChart height={150} pieData={getPieTrunfoData(naipes)} />
      <Text
        variant="dark"
        type="subheading"
        family="bold"
        style={{ marginTop: theme.spacings.padding * 2 }}
      >
        Desempenho
      </Text>
      <MyLineChart height={200} data={desempenho} />
    </View>
  )
}
