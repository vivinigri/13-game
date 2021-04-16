import { StyleSheet } from "react-native"
import { theme } from "@core/theme"

export const styles = StyleSheet.create({
  chartContainer: {
    justifyContent: "flex-start",
    width: "100%",
    maxWidth: 600,
    alignItems: "center",
    paddingTop: theme.spacings.padding * 2,
  },
})
