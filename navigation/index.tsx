import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import NotFoundScreen from "@screens/NotFoundScreen"
import StartScreen from "@screens/StartScreen"
import SelectTableScreen from "@screens/SelectTableScreen"
import SelectPlayersScreen from "@screens/SelectPlayersScreen"
import SelectGameScreen from "@screens/SelectGameScreen"
import OrderPlayersScreen from "@screens/OrderPlayersScreen"
import { RootStackParamList } from "@navigation/navTypes"
import BottomTabNavigator from "@navigation/BottomTabNavigator"
import LinkingConfiguration from "@navigation/LinkingConfiguration"
import { RouteNames } from "@navigation/RouteNames"
import { headerOptions } from "@core/config"
import { useTheme } from "react-native-paper"

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  const theme = useTheme()
  return (
    // <Stack.Navigator screenOptions={headerOptions("", theme)}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={RouteNames.StartScreen} component={StartScreen} />
      <Stack.Screen
        name={RouteNames.SelectTableScreen}
        component={SelectTableScreen}
        options={headerOptions("", theme)}
      />
      <Stack.Screen
        name={RouteNames.SelectGameScreen}
        component={SelectGameScreen}
        options={headerOptions("", theme)}
      />
      <Stack.Screen
        name={RouteNames.OrderPlayersScreen}
        component={OrderPlayersScreen}
        options={headerOptions("", theme)}
      />
      <Stack.Screen
        name={RouteNames.SelectPlayersScreen}
        component={SelectPlayersScreen}
        options={headerOptions("", theme)}
      />
      <Stack.Screen name={RouteNames.Root} component={BottomTabNavigator} />
      <Stack.Screen
        name={RouteNames.NotFoundScreen}
        component={NotFoundScreen}
        options={headerOptions("", theme)}
      />
    </Stack.Navigator>
  )
}
