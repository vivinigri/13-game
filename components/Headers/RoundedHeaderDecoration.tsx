import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
  backgroundColor?: string;
};

const RoundedHeaderDecoration = ({ backgroundColor = '#fff' }: Props) => {
  const theme = useTheme();
  const themedStyle = styles(theme);

  return <View style={[themedStyle.header, { backgroundColor }]}></View>;
};

export default RoundedHeaderDecoration;

const styles = ({ colors }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      marginTop: 20,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      shadowColor: colors.textDark,
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
      width: '100%',
      height: 20,
    },
  });
