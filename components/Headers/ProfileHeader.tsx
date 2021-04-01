import React, { useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from '@components/Text';
import { useTheme } from 'react-native-paper';
import { WellnessState } from '@store/models/wellness';
import { RootState, dispatch } from '@store';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import MedalIcon from '@assets/icons/medal_icon';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ProfileHeader = () => {
  const wellness: WellnessState = useSelector(
    (rootState: RootState) => rootState.wellness
  );

  const { t } = useTranslation();
  const theme = useTheme();
  const themedStyle = styles(theme);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      dispatch.wellness.loadProfile();
    }, [])
  );

  return (
    <View style={themedStyle.header}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <View style={themedStyle.userName}>
          <Text
            family="bold"
            type="mainheading"
            textTransform="uppercase"
            align="center"
          >
            {`${wellness.profile?.first_name[0] || 'S'}`}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={themedStyle.leftDisplay}>
        <View style={themedStyle.pointsDisplay}>
          <View style={{ marginLeft: 20, marginRight: 10 }}>
            <Text
              style={{ height: 30, color: '#C15505' }}
              family="bold"
              type="mainheading"
            >
              {wellness.profile ? wellness.profile.points : '0'}
            </Text>
            <Text type="caption" textTransform="uppercase">
              {t('activities.points')}
            </Text>
          </View>
          <View style={{ marginRight: 10, height: 40 }}>
            <MedalIcon />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = ({ colors }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 17,
      paddingVertical: 5,
      backgroundColor: colors.textLight,
    },
    leftDisplay: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    pointsDisplay: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 40,
      padding: 5,
    },
    userName: {
      backgroundColor: colors.background,
      borderRadius: 56,
      borderColor: '#DEF0FD',
      borderWidth: 1,
      width: 56,
      height: 56,
      padding: 10,
    },
  });
