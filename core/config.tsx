import Constants from "expo-constants"
import { StackNavigationOptions } from "@react-navigation/stack"

export const config = Constants.manifest.extra

export const headerOptions = (title: string, theme: ReactNativePaper.Theme) => {
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
