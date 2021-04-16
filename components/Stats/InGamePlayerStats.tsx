import React, { useCallback } from "react"
import { View } from "react-native"
import { Text } from "@components"
import { PlacarObject, Placar } from "@types"
import MyPieChart, { PieChartData } from "@components/Charts/MyPieChart"
import MyLineChart from "@components/Charts/MyLineChart"
import Legendas from "@components/Charts/Legendas"
import { Legend } from "@types"
import { theme } from "@core/theme"
import { styles } from "./styles"

const PIE_CHART_PLAYER_LEGEND: Legend[] = [
  {
    label: "Acertos",
    color: theme.colors.toastSuccess,
  },
  {
    label: "Erros",
    color: theme.colors.toastError,
  },
]

type Props = {
  placar: Placar
  id: string
}

export default function InGamePlayerStats({ placar, id }: Props) {
  const getPiePlayerData = useCallback(
    (placar: PlacarObject) => {
      const pieData: PieChartData[] = [
        {
          value: placar.errou,
          key: "error",
          svg: {
            fill: theme.colors.toastError,
          },
        },
        {
          value: placar.acertou,
          key: "correct",
          svg: {
            fill: theme.colors.toastSuccess,
          },
        },
      ]
      return pieData
    },
    [placar]
  )

  return (
    <View style={styles.chartContainer}>
      <Text variant="dark" type="subheading" family="bold">
        Aproveitamento
      </Text>
      <Legendas legendas={PIE_CHART_PLAYER_LEGEND} />
      <MyPieChart height={150} pieData={getPiePlayerData(placar[id])} />
      <Text
        variant="dark"
        type="subheading"
        family="bold"
        style={{ marginTop: theme.spacings.padding * 2 }}
      >
        Desempenho
      </Text>
      <MyLineChart height={200} data={placar[id].placar} />
    </View>
  )
}
