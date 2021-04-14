import React, { useState, useCallback } from "react"
import { StyleSheet, View } from "react-native"
import { TabelaParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { GradientView, TopView, Text } from "@components"
import { RoundedScrollView } from "@components/Themed"
import { useTheme } from "react-native-paper"
import { CurrentState } from "@store/models/current"
import { useSelector } from "react-redux"
import { RootState, dispatch } from "@store"
import { useFocusEffect } from "@react-navigation/native"
import TabView from "@components/TabView"
import { Tab } from "@types"
import MyPieChart from "@components/Charts/MyPieChart"
import MyLineChart from "@components/Charts/MyLineChart"
import Legendas from "@components/Charts/Legendas"
import { Legend } from "@types"
import { theme } from "@core/theme"

const geralTab = {
  id: "geral",
  label: "Geral",
}

const PIE_CHART_LEGEND: Legend[] = [
  {
    label: "Acertos",
    color: theme.colors.green,
  },
  {
    label: "Erros",
    color: theme.colors.error,
  },
]

type Props = BottomTabScreenProps<TabelaParamList, RouteNames.TabelaScreen>

export default function StatsScreen({ navigation }: Props) {
  const current: CurrentState = useSelector(({ current }: RootState) => current)
  const { players, placar } = current

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [tabs, setTabs] = useState<Tab[]>([])
  const [selectedTab, setSelectedTab] = useState<Tab>(geralTab)

  useFocusEffect(
    useCallback(() => {
      let myTabs = [geralTab]
      players.map((p) => {
        myTabs.push({
          id: p.id,
          label: p.name,
        })
      })
      setTabs(myTabs)
    }, [players])
  )

  return (
    <GradientView>
      <TopView title="Estatísticas" subtitle="Acompanhe este jogo em números" />
      <RoundedScrollView contentContainerStyle={{ paddingTop: 0 }}>
        <View
          style={[
            themedStyle.mainContainer,
            { alignItems: "center", zIndex: 10 },
          ]}
        >
          <TabView
            tabs={tabs}
            currentTab={selectedTab}
            onTabChange={(tab: Tab) => setSelectedTab(tab)}
          />

          {selectedTab !== geralTab ? (
            <View
              style={[themedStyle.mainContainer, themedStyle.chartContainer]}
            >
              <Text variant="dark" type="subheading" family="bold">
                Aproveitamento
              </Text>
              <Legendas legendas={PIE_CHART_LEGEND} />
              <MyPieChart height={150} placar={placar[selectedTab.id]} />
              <Text variant="dark" type="subheading" family="bold">
                Desempenho
              </Text>
              <MyLineChart height={200} placar={placar[selectedTab.id]} />
            </View>
          ) : null}
        </View>
      </RoundedScrollView>
    </GradientView>
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
    legenda: {
      flexDirection: "row",
      marginVertical: spacings.padding,
    },
    circle: {
      width: spacings.padding * 1.5,
      height: spacings.padding * 1.5,
      borderRadius: spacings.padding * 1.5,
      marginRight: spacings.padding * 0.5,
    },
    certo: {
      backgroundColor: colors.green,
    },
    errado: {
      backgroundColor: colors.error,
    },
  })
