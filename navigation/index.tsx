import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import * as React from "react"

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

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={RouteNames.StartScreen}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={RouteNames.StartScreen} component={StartScreen} />
      <Stack.Screen
        name={RouteNames.SelectTableScreen}
        component={SelectTableScreen}
      />
      <Stack.Screen
        name={RouteNames.SelectGameScreen}
        component={SelectGameScreen}
      />
      <Stack.Screen
        name={RouteNames.OrderPlayersScreen}
        component={OrderPlayersScreen}
      />
      <Stack.Screen
        name={RouteNames.SelectPlayersScreen}
        component={SelectPlayersScreen}
      />
      <Stack.Screen name={RouteNames.Root} component={BottomTabNavigator} />
      <Stack.Screen
        name={RouteNames.NotFoundScreen}
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  )
}
