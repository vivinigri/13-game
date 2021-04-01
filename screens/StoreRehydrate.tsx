import React, { memo, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { v4 as uuidv4 } from 'uuid';

import { theme } from '@core/theme';
import {
  getSessionTokenFromStorage,
  saveSessionTokenInStorage,
  getDeviceIdFromStorage,
  saveDeviceIdToStorage,
} from '@api/storage-api';
import { loginUserWithTokenExchange, fetchUserProfile } from '@api/auth-api';
import { dispatch } from '@store';
import { getWelcomeOnboardingStatus } from '@api/onboarding-api';
import { getHasPinOrBiometricsFromStorage } from '@api/security-challenge-api';
import { TokenStatus, validateToken } from '@core/helpers/validateToken';

type Props = {
  toggleLoadingFromAsyncStorage: (loading: boolean) => void;
};

const StoreRehydrate = ({ toggleLoadingFromAsyncStorage }: Props) => {
  useEffect(() => {
    // check if we're not logged in yet
    async function loadAuth() {
      const welcomeOnboardingStatus = await getWelcomeOnboardingStatus();
      if (welcomeOnboardingStatus === 'true') {
        dispatch.onboarding.setWelcomeOnboardingCompleted();
      }

      const hasPinOrBiometrics = await getHasPinOrBiometricsFromStorage();
      const deviceHasBiometrics = await LocalAuthentication.hasHardwareAsync();
      dispatch.security.setupAllKeys({
        deviceHasBiometrics: deviceHasBiometrics,
        shouldBeChallenged: hasPinOrBiometrics,
        hasPinOrBiometrics: hasPinOrBiometrics,
      });

      let deviceId = await getDeviceIdFromStorage();
      if (deviceId === '') {
        deviceId = uuidv4();
        saveDeviceIdToStorage(deviceId);
      }
      dispatch.security.setDeviceId(deviceId);

      const token = await getSessionTokenFromStorage();
      if (!token.session_token) {
        toggleLoadingFromAsyncStorage(false);
        return;
      }
      // if we have token in storage and is valid save to redux state
      const tokenStatus = validateToken(token.expires_at, token.renew_by);
      if (tokenStatus === TokenStatus.valid) {
        try {
          const user = await fetchUserProfile(token.session_token);
          const profile = {
            ...token,
            user,
          };
          dispatch.profile.updateUserProfile(profile);
          toggleLoadingFromAsyncStorage(false);
        } catch (e) {
          toggleLoadingFromAsyncStorage(false);
          return;
        }
      } else if (tokenStatus === TokenStatus.renew) {
        try {
          const response = await loginUserWithTokenExchange(
            token.session_token,
            deviceId
          );
          if (response.session_token) {
            // user successfully logged in
            dispatch.profile.updateUserProfile(response);
            saveSessionTokenInStorage(response);
            toggleLoadingFromAsyncStorage(false);
          } else {
            toggleLoadingFromAsyncStorage(false);
          }
        } catch (e) {
          toggleLoadingFromAsyncStorage(false);
          return;
        }
      }
      if (tokenStatus === TokenStatus.expired) {
        toggleLoadingFromAsyncStorage(false);
        return;
      }
    }
    loadAuth();
  }, [toggleLoadingFromAsyncStorage]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(StoreRehydrate);
