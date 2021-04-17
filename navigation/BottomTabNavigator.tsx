import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import {
  BottomTabParamList,
  ApostasParamList,
  TabelaParamList,
  StatsParamList,
} from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"
// style
import { headerOptions, tabBarOPtions } from "@core/config"
//screens
import TabelaScreen from "@screens/TabelaScreen"
import StatsScreen from "@screens/StatsScreen"
import ApostasScreen from "@screens/ApostasScreen"
import ResultadosScreen from "@screens/ResultadosScreen"
import GameOverScreen from "@screens/GameOverScreen"

const BottomTab = createBottomTabNavigator<BottomTabParamList>()
export function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName={RouteNames.Apostas}
      tabBarOptions={tabBarOPtions}
    >
      <BottomTab.Screen
        name={RouteNames.Apostas}
        component={ApostasNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="pencil" color={color} />,
          // tabBarLabel: () => "",
        }}
      />
      <BottomTab.Screen
        name={RouteNames.Tabela}
        component={TabelaNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="grid-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name={RouteNames.Stats}
        component={StatsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

const ApostaStack = createStackNavigator<ApostasParamList>()
function ApostasNavigator() {
  return (
    <ApostaStack.Navigator screenOptions={{ headerShown: true }}>
      <ApostaStack.Screen
        name={RouteNames.ApostasScreen}
        component={ApostasScreen}
        options={headerOptions("")}
      />
      <ApostaStack.Screen
        name={RouteNames.ResultadosScreen}
        component={ResultadosScreen}
        options={headerOptions("")}
      />
      <ApostaStack.Screen
        name={RouteNames.GameOverScreen}
        component={GameOverScreen}
        options={{ headerShown: false }}
      />
    </ApostaStack.Navigator>
  )
}

const TabelaStack = createStackNavigator<TabelaParamList>()
function TabelaNavigator() {
  return (
    <TabelaStack.Navigator screenOptions={{ headerShown: false }}>
      <TabelaStack.Screen
        name={RouteNames.TabelaScreen}
        component={TabelaScreen}
        // options={headerOptions("")}
      />
    </TabelaStack.Navigator>
  )
}

const StatsStack = createStackNavigator<StatsParamList>()
function StatsNavigator() {
  return (
    <StatsStack.Navigator screenOptions={{ headerShown: false }}>
      <StatsStack.Screen
        name={RouteNames.StatsScreen}
        component={StatsScreen}
        // options={headerOptions("")}
      />
    </StatsStack.Navigator>
  )
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"]
  color: string
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}
