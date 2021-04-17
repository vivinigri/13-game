import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import TabelaScreen from "@screens/TabelaScreen"
import StatsScreen from "@screens/StatsScreen"
import ApostasScreen from "@screens/ApostasScreen"
import ResultadosScreen from "@screens/ResultadosScreen"
import GameOverScreen from "@screens/GameOverScreen"
import {
  BottomTabParamList,
  ApostasParamList,
  TabelaParamList,
  StatsParamList,
  DrawerParamList,
} from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"
import { useTheme } from "react-native-paper"
import { headerOptions } from "@core/config"

const Drawer = createDrawerNavigator<DrawerParamList>()
export function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name={RouteNames.Drawer}
        component={BottomTabNavigator}
        options={{ drawerLabel: "Profile" }}
      />
    </Drawer.Navigator>
  )
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>()
export function BottomTabNavigator() {
  const theme = useTheme()

  return (
    <BottomTab.Navigator
      initialRouteName={RouteNames.Apostas}
      tabBarOptions={{
        activeTintColor: theme.colors.yellow,
        inactiveTintColor: theme.colors.textLight,
        activeBackgroundColor: theme.colors.background,
        inactiveBackgroundColor: theme.colors.primary,
      }}
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

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"]
  color: string
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

const ApostaStack = createStackNavigator<ApostasParamList>()
function ApostasNavigator() {
  const theme = useTheme()
  return (
    <ApostaStack.Navigator screenOptions={{ headerShown: true }}>
      <ApostaStack.Screen
        name={RouteNames.ApostasScreen}
        component={ApostasScreen}
        options={headerOptions("", theme)}
      />
      <ApostaStack.Screen
        name={RouteNames.ResultadosScreen}
        component={ResultadosScreen}
        options={headerOptions("", theme)}
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
  const theme = useTheme()
  return (
    <TabelaStack.Navigator screenOptions={{ headerShown: false }}>
      <TabelaStack.Screen
        name={RouteNames.TabelaScreen}
        component={TabelaScreen}
        // options={headerOptions("", theme)}
      />
    </TabelaStack.Navigator>
  )
}

const StatsStack = createStackNavigator<StatsParamList>()
function StatsNavigator() {
  const theme = useTheme()
  return (
    <StatsStack.Navigator screenOptions={{ headerShown: false }}>
      <StatsStack.Screen
        name={RouteNames.StatsScreen}
        component={StatsScreen}
        // options={headerOptions("", theme)}
      />
    </StatsStack.Navigator>
  )
}
