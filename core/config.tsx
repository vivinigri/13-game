import Constants from "expo-constants"
import { StackNavigationOptions } from "@react-navigation/stack"

export const config = Constants.manifest.extra
import { theme } from "@core/theme"

export const headerOptions = (title: string) => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: theme.colors.dark,
      borderBottomColor: theme.colors.background,
    },
    headerTintColor: theme.colors.white,
    headerTitleStyle: {
      fontWeight: "bold",
    },
  } as StackNavigationOptions
}

export const drawerOptions = {
  activeBackgroundColor: theme.colors.dark,
  activeTintColor: theme.colors.textLight,
  style: {
    backgroundColor: theme.colors.background,
  },
}

export const tabBarOPtions = {
  activeTintColor: theme.colors.yellow,
  inactiveTintColor: theme.colors.textLight,
  activeBackgroundColor: theme.colors.background,
  inactiveBackgroundColor: theme.colors.primary,
}
