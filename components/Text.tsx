import React, { memo } from 'react';
import { StyleProp, Text as NativeText, TextStyle } from 'react-native';

import { useTheme } from 'react-native-paper';

type Props = React.ComponentProps<typeof NativeText> & {
  type:
    | 'giga'
    | 'mainheading'
    | 'header'
    | 'subheading'
    | 'title'
    | 'paragraph'
    | 'label'
    | 'caption';
  children: React.ReactNode;
  family?: 'bold' | 'medium' | 'regular' | 'cursive';
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'light'
    | 'dark'
    | 'error'
    | 'warning'
    | 'disabled'
    | 'default'
    | 'highlight'
    | 'green'
    | 'atention';
  align?: 'left' | 'center' | 'right';
  textTransform?: 'none' | 'uppercase';
  style?: StyleProp<TextStyle>;
};

const Text = ({
  type = 'label',
  family = 'regular',
  align = 'left',
  textTransform = 'none',
  variant = 'default',
  style,
  ...rest
}: Props) => {
  const { colors, fontSizes, fonts } = useTheme();

  const textColor = {
    primary: colors.primary,
    secondary: colors.textSecondary,
    tertiary: colors.textTertiary,
    light: colors.textLight,
    dark: colors.textDark,
    error: colors.error,
    warning: colors.yellow,
    disabled: colors.grey,
    default: colors.textPrimary,
    highlight: colors.highlight,
    atention: colors.orange,
    green: colors.green,
  };

  const textStyle: StyleProp<TextStyle> = {
    textAlign: align,
    color: textColor[variant],
    fontFamily: fonts[family].fontFamily,
    fontSize: fontSizes[type],
    textTransform,
  };

  return <NativeText {...rest} style={[textStyle, style]} />;
};

export default memo(Text);
