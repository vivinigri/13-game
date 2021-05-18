import React, { useState, useCallback, useMemo } from "react"
import { StyleSheet, View } from "react-native"
import { TabelaParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { GradientView, TopView, Text } from "@components"
import { RoundedScrollView } from "@components/Themed"
import { useTheme } from "react-native-paper"
import { GlobalState } from "@store/models/global"
import { useSelector } from "react-redux"
import { RootState, dispatch } from "@store"
import { useFocusEffect } from "@react-navigation/native"
import TabView from "@components/TabView"
import { Tab, Table } from "@types"

const tabs = [
  {
    id: "mesas",
    label: "Mesas",
  },
  {
    id: "jogadores",
    label: "Jogadores",
  },
]

type Props = BottomTabScreenProps<TabelaParamList, RouteNames.TabelaScreen>

export default function SettingsScreen({ navigation }: Props) {
  const global: GlobalState = useSelector(({ global }: RootState) => global)
  const { players, tables } = global

  // const [tabs, setTabs] = useState<Tab[]>(Tabs)
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0])

  const theme = useTheme()
  const themedStyle = styles(theme)

  return (
    <GradientView>
      <TopView title="Ajustes" subtitle="Edite ou remova mesas ou jogadores" />
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

          <View>
            {selectedTab.id === "mesas" &&
              Object.values(tables).map((el: Table) => (
                <Text type="header" key={el.id}>
                  {el.name}
                </Text>
              ))}
          </View>
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
