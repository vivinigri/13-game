import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import NotFoundScreen from "@screens/NotFoundScreen"
import StartScreen from "@screens/StartScreen"
import SelectTableScreen from "@screens/SelectTableScreen"
import SelectPlayersScreen from "@screens/SelectPlayersScreen"
import SelectGameScreen from "@screens/SelectGameScreen"
import OrderPlayersScreen from "@screens/OrderPlayersScreen"
import { MainStackParamList, RootStackParamList } from "@navigation/navTypes"
import { DrawerNavigator } from "@navigation/BottomTabNavigator"
import LinkingConfiguration from "@navigation/LinkingConfiguration"
import { RouteNames } from "@navigation/RouteNames"
import { headerOptions } from "@core/config"
import { useTheme } from "react-native-paper"

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <MainNavigator />
    </NavigationContainer>
  )
}

const MainStack = createStackNavigator<MainStackParamList>()
function MainNavigator() {
  const theme = useTheme()
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen
        name={RouteNames.Root}
        component={RootNavigator}
        options={headerOptions("", theme)}
      />
      <MainStack.Screen
        name={RouteNames.Drawer}
        component={DrawerNavigator}
        options={headerOptions("", theme)}
      />
      <MainStack.Screen
        name={RouteNames.NotFoundScreen}
        component={NotFoundScreen}
        options={headerOptions("", theme)}
      />
    </MainStack.Navigator>
  )
}

const RootStack = createStackNavigator<RootStackParamList>()
function RootNavigator() {
  const theme = useTheme()
  return (
    <RootStack.Navigator screenOptions={{ headerShown: true }}>
      <RootStack.Screen
        name={RouteNames.StartScreen}
        component={StartScreen}
        // options={headerOptions("", theme)}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={RouteNames.SelectTableScreen}
        component={SelectTableScreen}
        options={headerOptions("", theme)}
      />
      <RootStack.Screen
        name={RouteNames.SelectGameScreen}
        component={SelectGameScreen}
        options={headerOptions("", theme)}
      />
      <RootStack.Screen
        name={RouteNames.OrderPlayersScreen}
        component={OrderPlayersScreen}
        options={headerOptions("", theme)}
      />
      <RootStack.Screen
        name={RouteNames.SelectPlayersScreen}
        component={SelectPlayersScreen}
        options={headerOptions("", theme)}
      />
    </RootStack.Navigator>
  )
}

{
  /* <MainStack.Screen
        name={RouteNames.Tabs}
        component={BottomTabNavigator}
        options={headerOptions("", theme)}
      /> */
}
