import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import TabTwoScreen from "@screens/TabTwoScreen"
import ApostasScreen from "@screens/ApostasScreen"
import {
  BottomTabParamList,
  ApostasParamList,
  TabelaParamList,
  StatsParamList,
} from "../types"
import { useTheme } from "react-native-paper"

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const theme = useTheme()

  return (
    <BottomTab.Navigator
      initialRouteName="Apostas"
      tabBarOptions={{
        activeTintColor: theme.colors.yellow,
        inactiveTintColor: theme.colors.textLight,
        activeBackgroundColor: theme.colors.background,
        inactiveBackgroundColor: theme.colors.primary,
      }}
    >
      <BottomTab.Screen
        name="Apostas"
        component={ApostasNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="pencil" color={color} />,
          // tabBarLabel: () => "",
        }}
      />
      <BottomTab.Screen
        name="Tabela"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="grid-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Stats"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"]
  color: string
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />
}

const TabOneStack = createStackNavigator<ApostasParamList>()
function ApostasNavigator() {
  const theme = useTheme()
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="ApostasScreen"
        component={ApostasScreen}
        options={{
          title: "Apostas",
          headerStyle: {
            backgroundColor: theme.colors.dark,
            borderBottomColor: theme.colors.background,
          },
          headerTintColor: theme.colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </TabOneStack.Navigator>
  )
}

const TabTwoStack = createStackNavigator<TabelaParamList>()
function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabelaScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  )
}
