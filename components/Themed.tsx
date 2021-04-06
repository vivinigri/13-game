import * as React from "react"
import { View } from "react-native"
import { useTheme } from "react-native-paper"

/* import { Text as DefaultText, View as DefaultView } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
} */

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
