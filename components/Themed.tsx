import * as React from "react"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useTheme } from "react-native-paper"

function theme() {
  const theme = useTheme()
  const { colors, spacings } = theme
  return { colors, spacings }
}

export type ViewProps = View["props"]
export function CardView(props: ViewProps) {
  const { style, ...otherProps } = props
  return (
    <View
      style={[
        {
          backgroundColor: theme().colors.primary,
          width: "80%",
          marginBottom: theme().spacings.padding,
          padding: theme().spacings.padding,
          borderRadius: theme().spacings.section,
          borderWidth: 2,
          borderColor: theme().colors.primary,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        style,
      ]}
      {...otherProps}
    />
  )
}

export type ScrollViewProps = ScrollView["props"]
export function RoundedScrollView(props: ScrollViewProps) {
  const { style, contentContainerStyle, ...otherProps } = props
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <ScrollView
        contentContainerStyle={[
          {
            alignItems: "center",
            height: "100%",
            paddingTop: theme().spacings.padding * 2,
          },
          contentContainerStyle,
        ]}
        style={[
          {
            backgroundColor: theme().colors.textLight,
            borderTopLeftRadius: theme().spacings.padding * 2,
            borderTopRightRadius: theme().spacings.padding * 2,
            marginTop: theme().spacings.padding * 2,
          },
          style,
        ]}
        {...otherProps}
      />
    </View>
  )
}
