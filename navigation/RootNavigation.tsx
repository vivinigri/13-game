import React, { useState, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { AppState, AppStateStatus, Text, StatusBar } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { SafeAreaProvider } from "react-native-safe-area-context"

import { useMediaQuery } from "@hooks/useMediaQuery"
import MobileTabBar from "@components/Navigation/MobileTabBar"
import CrossPlatformDrawer from "@components/Navigation/CrossPlatformDrawer"
import WebStaticDrawerComponent from "@components/Navigation/WebStaticDrawer"
import MobileTabBarWellness from "@components/Navigation/MobileTabBarWellness"
import { RootState, dispatch } from "@store"
import { getCurrentLinking } from "./linking"
import StoreRehydrate from "@screens/StoreRehydrate"
import NotFoundScreen from "@screens/NotFoundScreen"
import {
  MainStackParamList,
  DrawerParamList,
  MobileTabsParamList,
  WebStaticDrawerParamList,
  NavigationStacks,
  DrawerSaParamList,
} from "./types"
import { LoginStack, InnerStack, OnboardingStack } from "./stacks"
import { RouteNames } from "./RouteNames"
import { config } from "@core/config"

const WebDrawerNavigator = createDrawerNavigator<WebStaticDrawerParamList>()
const MobileTabsNavigator = createBottomTabNavigator<MobileTabsParamList>()
const MenuDrawerNavigator = createDrawerNavigator<DrawerParamList>()
const MainStack = createStackNavigator<MainStackParamList>()

function WebStaticDrawer() {
  return (
    <WebDrawerNavigator.Navigator
      key="WebStaticDrawer"
      drawerType="permanent"
      drawerContent={(props) => <WebStaticDrawerComponent {...props} />}
    >
      <WebDrawerNavigator.Screen
        name={NavigationStacks.InnerStack}
        component={InnerStack}
        options={{ title: "Dashboard" }}
      />
    </WebDrawerNavigator.Navigator>
  )
}

function MobileTabs() {
  return (
    <MobileTabsNavigator.Navigator
      tabBar={(props) => <MobileTabBar {...props} />}
    >
      <MobileTabsNavigator.Screen
        name={NavigationStacks.InnerStack}
        component={InnerStack}
        options={{ title: "Dashboard" }}
      />
    </MobileTabsNavigator.Navigator>
  )
}

function MobileTabsWellness() {
  const MobileTabsNavigator = createBottomTabNavigator<MobileTabsParamList>()
  return (
    <MobileTabsNavigator.Navigator
      tabBar={(props) => <MobileTabBarWellness {...props} />}
    >
      <MobileTabsNavigator.Screen
        name={NavigationStacks.InnerStack}
        component={InnerStack}
        options={{ title: "Dashboard" }}
      />
    </MobileTabsNavigator.Navigator>
  )
}

function DrawerNavWellness() {
  const MenuDrawer = createDrawerNavigator<DrawerSaParamList>()
  return (
    <MenuDrawer.Navigator
      drawerContent={(props) => <CrossPlatformDrawer {...props} />}
    >
      <MenuDrawer.Screen
        name={NavigationStacks.PlatformWiseNavigator}
        component={MobileTabsWellness}
        options={{ title: "Dashboard" }}
      />
    </MenuDrawer.Navigator>
  )
}

function DrawerNav() {
  const { isTabletOrDesktop } = useMediaQuery()
  return (
    <MenuDrawerNavigator.Navigator
      drawerContent={(props) => <CrossPlatformDrawer {...props} />}
    >
      <MenuDrawerNavigator.Screen
        name={NavigationStacks.PlatformWiseNavigator}
        component={isTabletOrDesktop ? WebStaticDrawer : MobileTabs}
        options={{ title: "Dashboard" }}
      />
    </MenuDrawerNavigator.Navigator>
  )
}

const RootNavigation = () => {
  const { session_token: isLoggedIn } = useSelector(
    ({ profile }: RootState) => profile
  )
  const { shouldBeChallenged, hasPinOrBiometrics } = useSelector(
    ({ security }: RootState) => security
  )
  const onboarding = useSelector(({ onboarding }: RootState) => onboarding)
  const { welcomeOnboardingCompleted } = onboarding
  const [loadingFromAsyncStorage, toggleLoadingFromAsyncStorage] = useState(
    true
  )

  const linking = useMemo(
    () =>
      getCurrentLinking({
        isLoggedIn: !!isLoggedIn,
        shouldBeChallenged,
        welcomeOnboardingCompleted,
      }),
    [isLoggedIn, shouldBeChallenged, welcomeOnboardingCompleted]
  )

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "background" && hasPinOrBiometrics) {
        dispatch.security.toggleChallenge(true)
      }
    }
    AppState.addEventListener("change", handleAppStateChange)
    return () => AppState.removeEventListener("change", handleAppStateChange)
  }, [hasPinOrBiometrics])

  return loadingFromAsyncStorage ? (
    <StoreRehydrate
      toggleLoadingFromAsyncStorage={toggleLoadingFromAsyncStorage}
    />
  ) : (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <MainStack.Navigator>
          {isLoggedIn && !shouldBeChallenged ? (
            <>
              {config.APP_VARIANT == "us" ? (
                <>
                  {!welcomeOnboardingCompleted ? (
                    <MainStack.Screen
                      name={RouteNames.WelcomeOnboarding}
                      component={OnboardingStack}
                      options={{ headerShown: false, title: "Welcome" }}
                    />
                  ) : null}
                  <MainStack.Screen
                    name={RouteNames.LoggedIn}
                    component={DrawerNav}
                    options={{ headerShown: false, title: "Logged In" }}
                  />
                </>
              ) : (
                <>
                  {!welcomeOnboardingCompleted ? (
                    <>
                      <MainStack.Screen
                        name={RouteNames.WelcomeOnboarding}
                        component={OnboardingStack}
                        options={{ headerShown: false }}
                      />
                    </>
                  ) : null}
                  <MainStack.Screen
                    name={RouteNames.LoggedIn}
                    component={DrawerNavWellness}
                    options={{ headerShown: false, title: "Logged In" }}
                  />
                </>
              )}
            </>
          ) : (
            <MainStack.Screen
              name={NavigationStacks.LoginStack}
              component={LoginStack}
              options={{ headerShown: false, title: "Login" }}
            />
          )}
          <MainStack.Screen
            name={RouteNames.NotFoundScreen}
            component={NotFoundScreen}
            options={{ headerShown: false, title: "Not Found" }}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default RootNavigation
