import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import * as React from "react"

import NotFoundScreen from "@screens/NotFoundScreen"
import StartScreen from "@screens/StartScreen"
import SelectTableScreen from "@screens/SelectTableScreen"
import SelectPlayersScreen from "@screens/SelectPlayersScreen"
import SelectGameScreen from "@screens/SelectGameScreen"
import OrderPlayersScreen from "@screens/OrderPlayersScreen"
import ApostasScreen from "@screens/ApostasScreen"
import { RootStackParamList } from "../types"
import BottomTabNavigator from "./BottomTabNavigator"
import LinkingConfiguration from "./LinkingConfiguration"

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
      initialRouteName="StartScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="SelectTableScreen" component={SelectTableScreen} />
      <Stack.Screen name="SelectGameScreen" component={SelectGameScreen} />
      <Stack.Screen name="OrderPlayersScreen" component={OrderPlayersScreen} />
      <Stack.Screen
        name="SelectPlayersScreen"
        component={SelectPlayersScreen}
      />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="NotFound"
        component={StartScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  )
}
