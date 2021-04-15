import React, { useCallback } from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "@components"
import { useTheme } from "react-native-paper"
import { Naipes } from "@types"
import MyPieChart, { PieChartData } from "@components/Charts/MyPieChart"
import Legendas from "@components/Charts/Legendas"
import { Legend } from "@types"
import { theme } from "@core/theme"

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
}

export default function InGameGeralStats({ naipes }: Props) {
  const theme = useTheme()
  const themedStyle = styles(theme)

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

  return (
    <View style={[themedStyle.mainContainer, themedStyle.chartContainer]}>
      <Text variant="dark" type="subheading" family="bold">
        Trunfos
      </Text>
      <Legendas legendas={PIE_CHART_TRUNFO_LEGEND} />
      <MyPieChart height={150} pieData={getPieTrunfoData(naipes)} />
    </View>
  )
}

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: "flex-start",
      width: "100%",
    },
    chartContainer: {
      maxWidth: 600,
      alignItems: "center",
      paddingTop: spacings.padding * 2,
    },
  })
