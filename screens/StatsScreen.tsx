import React, { useState, useCallback, useMemo } from "react"
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
import { Tab, PlacarObject, Naipes } from "@types"
import InGamePlayerStats from "@components/Stats/InGamePlayerStats"
import InGameGeralStats from "@components/Stats/InGameGeralStats"

const geralTab = {
  id: "geral",
  label: "Geral",
}

type Props = BottomTabScreenProps<TabelaParamList, RouteNames.TabelaScreen>

export default function StatsScreen({ navigation }: Props) {
  const current: CurrentState = useSelector(({ current }: RootState) => current)
  const { players, placar, naipes } = current

  const [tabs, setTabs] = useState<Tab[]>([])
  const [selectedTab, setSelectedTab] = useState<Tab>(geralTab)

  const theme = useTheme()
  const themedStyle = styles(theme)

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

  const totais = useMemo(() => Object.values(placar).map((p) => p.final), [
    placar,
  ])

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
            <InGamePlayerStats placar={placar} id={selectedTab.id} />
          ) : (
            <InGameGeralStats naipes={naipes} totais={totais} placar={placar} />
          )}
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
  })
