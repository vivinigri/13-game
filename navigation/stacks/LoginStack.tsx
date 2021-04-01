import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Platform } from 'react-native';
import { config } from '@core/config';
import {
  EmployerSearchScreen,
  EmployerInviteScreen,
  LoginScreen,
  MultiFactorAuthScreen,
  PasswordLessScreen,
  PinAuthScreen,
  SignUpScreen,
  TermsOfUseScreen,
  PrivacyPolicyScreen,
  BiometricsVerificationScreen,
  PasswordLessCompleteScreen,
  WellnessWelcomeScreen,
} from '@screens';
import { createStackNavigator } from '@react-navigation/stack';
import { RootState } from '@store';
import { LoginParamList } from '../types';
import { RouteNames } from '../RouteNames';
import { inviteCodeValidator } from '@core/validators/inviteCodeValidator';
import InviteCodeScreen from '@screens/InviteCodeScreen';

const LoginStackNavigator = createStackNavigator<LoginParamList>();

const LoginStack = () => {
  const { shouldBeChallenged, deviceHasBiometrics } = useSelector(
    ({ security }: RootState) => security
  );
  const initialScreen = useMemo(() => {
    if (shouldBeChallenged) {
      return deviceHasBiometrics
        ? RouteNames.BiometricsVerificationScreen
        : RouteNames.PinAuthScreen;
    }
    return undefined;
  }, [deviceHasBiometrics, shouldBeChallenged]);

  return (
    <LoginStackNavigator.Navigator
      initialRouteName={initialScreen}
      screenOptions={{ headerShown: false }}
    >
      {config.APP_VARIANT == 'sa' && (
        <LoginStackNavigator.Screen
          name={RouteNames.WellnessWelcomeScreen}
          component={WellnessWelcomeScreen}
          options={{ headerShown: false }}
        />
      )}
      <LoginStackNavigator.Screen
        name={RouteNames.LoginScreen}
        component={LoginScreen}
        options={{ title: 'Log In' }}
      />
      <LoginStackNavigator.Screen
        name={RouteNames.SignUpScreen}
        component={SignUpScreen}
        options={{ title: 'Sign Up' }}
      />
      <LoginStackNavigator.Screen
        name={RouteNames.BiometricsVerificationScreen}
        component={BiometricsVerificationScreen}
        options={{ headerShown: false, title: 'Biometrics Verification' }}
      />
      {Platform.OS !== 'web' ? (
        <LoginStackNavigator.Screen
          name={RouteNames.PinAuthScreen}
          component={PinAuthScreen}
          options={{ title: 'PIN Verification' }}
        />
      ) : null}
      <LoginStackNavigator.Screen
        name={RouteNames.TermsOfUseScreen}
        component={TermsOfUseScreen}
        options={{
          headerShown: true,
          title: 'Terms of Use',
          headerBackTitle: 'Back',
        }}
      />
      <LoginStackNavigator.Screen
        name={RouteNames.PrivacyPolicyScreen}
        component={PrivacyPolicyScreen}
        options={{
          headerShown: true,
          title: 'Privacy Policy',
          headerBackTitle: 'Back',
        }}
      />
      <LoginStackNavigator.Screen
        name={RouteNames.EmployerInviteScreen}
        component={EmployerInviteScreen}
        options={{ title: 'Invite Code' }}
      />
      <LoginStackNavigator.Screen
        name={RouteNames.InviteCodeScreen}
        component={InviteCodeScreen}
        options={{ title: 'Invite Code' }}
      />
      <LoginStackNavigator.Screen
        name={RouteNames.PasswordLessScreen}
        component={PasswordLessScreen}
        options={{ title: 'Passwordless Sign In' }}
      />
      <LoginStackNavigator.Screen
        name={RouteNames.PasswordLessCompleteScreen}
        component={PasswordLessCompleteScreen}
        options={{ title: 'Sign In Success' }}
      />
      <LoginStackNavigator.Screen
        name={RouteNames.MultiFactorAuthScreen}
        component={MultiFactorAuthScreen}
        options={{ title: 'MFA Verification' }}
      />
      <LoginStackNavigator.Screen
        name={RouteNames.EmployerSearchScreen}
        component={EmployerSearchScreen}
        options={{ title: 'Employer Search' }}
      />
    </LoginStackNavigator.Navigator>
  );
};

export default memo(LoginStack);
