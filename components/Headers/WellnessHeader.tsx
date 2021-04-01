import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@components/Text';
import AlertIcon from '@assets/icons/alert_icon';
import { useTheme } from 'react-native-paper';
import { wellness } from '@store/models/wellness';
import SavviLogo from '@assets/icons/savvi_logo_simple';

const WellnessHeader = ({ welcome }: any) => {
  const theme = useTheme();
  const themedStyle = styles(theme);

  return (
    <View style={themedStyle.heading}>
      {wellness ? (
        <SavviLogo />
      ) : (
        <View style={themedStyle.profileIcon}>
          <Text type="label">AL</Text>
        </View>
      )}
      <AlertIcon />
    </View>
  );
};

export default WellnessHeader;

const styles = ({ colors }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    heading: {
      backgroundColor: colors.textLight,
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 46,
      paddingHorizontal: 17,
      paddingVertical: 5,
      flexDirection: 'row',
    },
    profileIcon: {
      backgroundColor: '#DFDFDF',
      height: 34,
      width: 34,
      borderRadius: 17,
      justifyContent: 'center',
      alignItems: 'center',
    },
    monthTag: {
      backgroundColor: colors.highlight,
      justifyContent: 'center',
      alignItems: 'center',
      height: 25,
      paddingRight: 30,
      paddingLeft: 30,
      borderRadius: 12,
    },
  });
