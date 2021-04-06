import { Ionicons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import * as React from "react"

import StartScreen from "@screens/StartScreen"
import TabTwoScreen from "@screens/TabTwoScreen"
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from "../types"
import { useTheme } from "react-native-paper"

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator() {
  const theme = useTheme()

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{
        activeTintColor: theme.colors.white,
        inactiveTintColor: theme.colors.textLight,
        activeBackgroundColor: theme.colors.background,
        inactiveBackgroundColor: theme.colors.primary,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
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

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>()

function TabOneNavigator() {
  const theme = useTheme()

  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: theme.colors.background,
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

const TabTwoStack = createStackNavigator<TabTwoParamList>()

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title" }}
      />
    </TabTwoStack.Navigator>
  )
}
