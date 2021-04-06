import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import * as React from "react"

import NotFoundScreen from "@screens/NotFoundScreen"
import StartScreen from "@screens/StartScreen"
import SelectTableScreen from "@screens/SelectTableScreen"
import SelectPlayersScreen from "@screens/SelectPlayersScreen"
import SelectGameScreen from "@screens/SelectGameScreen"
import OrderPlayersScreen from "@screens/OrderPlayersScreen"
import { RootStackParamList } from "../types"
import BottomTabNavigator from "./BottomTabNavigator"
import LinkingConfiguration from "./LinkingConfiguration"

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
// { colorScheme }: { colorScheme: ColorSchemeName }
export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      {/* theme={colorScheme === "dark" ? DarkTheme : DefaultTheme} */}
      <RootNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  )
}
