import React, { useState, useCallback } from "react"
import { StyleSheet, View } from "react-native"
import { TabelaParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { GradientView, TopView } from "@components"
import { RoundedScrollView } from "@components/Themed"
import { useTheme } from "react-native-paper"
import { CurrentState } from "@store/models/current"
import { useSelector } from "react-redux"
import { RootState, dispatch } from "@store"
import { useFocusEffect } from "@react-navigation/native"
import TabView from "@components/TabView"
import { Tab } from "@types"

type Props = BottomTabScreenProps<TabelaParamList, RouteNames.TabelaScreen>
export default function StatsScreen({ navigation }: Props) {
  const current: CurrentState = useSelector(({ current }: RootState) => current)
  const { players } = current

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [tabs, setTabs] = useState<Tab[]>([])

  useFocusEffect(
    useCallback(() => {
      let myTabs = [
        {
          id: "geral",
          label: "Geral",
        },
      ]
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
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <RoundedScrollView contentContainerStyle={{ paddingTop: 0 }}>
          <View
            style={[
              themedStyle.mainContainer,
              { alignItems: "center", zIndex: 10 },
            ]}
          >
            <TabView tabs={tabs} currentTab={tabs[0]} onTabChange={() => {}} />
          </View>
        </RoundedScrollView>
      </View>
    </GradientView>
  )
}

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: "flex-start",
      width: "100%",
      // maxWidth: 600,
    },
  })
