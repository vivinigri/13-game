import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { MainStackParamList, RootStackParamList } from "@navigation/navTypes"
import { DrawerNavigator } from "@navigation/DrawerNavigator"
import LinkingConfiguration from "@navigation/LinkingConfiguration"
import { RouteNames } from "@navigation/RouteNames"
import { headerOptions } from "@core/config"
//screens
import NotFoundScreen from "@screens/NotFoundScreen"
import StartScreen from "@screens/StartScreen"
import SelectTableScreen from "@screens/SelectTableScreen"
import SelectPlayersScreen from "@screens/SelectPlayersScreen"
import SelectGameScreen from "@screens/SelectGameScreen"
import OrderPlayersScreen from "@screens/OrderPlayersScreen"
import SobreScreen from "@screens/SobreScreen"

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <MainNavigator />
    </NavigationContainer>
  )
}

const MainStack = createStackNavigator<MainStackParamList>()
function MainNavigator() {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen
        name={RouteNames.Root}
        component={RootNavigator}
        options={headerOptions("")}
      />
      <MainStack.Screen
        name={RouteNames.Drawer}
        component={DrawerNavigator}
        options={headerOptions("")}
      />
      <MainStack.Screen
        name={RouteNames.NotFoundScreen}
        component={NotFoundScreen}
        options={headerOptions("")}
      />
    </MainStack.Navigator>
  )
}

const RootStack = createStackNavigator<RootStackParamList>()
function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: true }}>
      <RootStack.Screen
        name={RouteNames.StartScreen}
        component={StartScreen}
        // options={headerOptions("", theme)}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={RouteNames.SobreScreen}
        component={SobreScreen}
        // options={headerOptions("", theme)}
        options={headerOptions("")}
      />
      <RootStack.Screen
        name={RouteNames.SelectTableScreen}
        component={SelectTableScreen}
        options={headerOptions("")}
      />
      <RootStack.Screen
        name={RouteNames.SelectGameScreen}
        component={SelectGameScreen}
        options={headerOptions("")}
      />
      <RootStack.Screen
        name={RouteNames.OrderPlayersScreen}
        component={OrderPlayersScreen}
        options={headerOptions("")}
      />
      <RootStack.Screen
        name={RouteNames.SelectPlayersScreen}
        component={SelectPlayersScreen}
        options={headerOptions("")}
      />
    </RootStack.Navigator>
  )
}
