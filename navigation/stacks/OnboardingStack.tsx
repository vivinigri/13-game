import React, { memo } from 'react';

import {
  WelcomeScreen,
  OnboardingLinkAccountsScreen,
  OnboardingBudgetInterviewScreen,
  OnboardingTransactionsSetupScreen,
  OnboardingEditCashflowBudgetsScreen,
  OnboardingBudgetReviewScreen,
  TransactionDetailsScreen,
  OnboardingCompleteScreen,
  OnboardingTransactionsScreen,
  OnboardingExplainerScreen,
  OnboardingAddLinkedAccountsScreen,
  GoalsSelectorScreen,
  GoalsConfirmationScreen,
} from '@screens';

import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeOnboardingParamList } from '@navigation/types';
import { RouteNames } from '../RouteNames';
import { config } from '@core/config';
import PollScreen from '@screens/PollScreen';
import ConfidenceQuestionScreen from '@screens/ConfidenceQuestionScreen';

const WelcomeOnboardingNavigator = createStackNavigator<
  WelcomeOnboardingParamList
>();

const OnboardingStack = () => {
  switch (config.APP_VARIANT) {
    case 'us':
      return (
        <WelcomeOnboardingNavigator.Navigator>
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.OnboardingExplainerScreen}
            component={OnboardingExplainerScreen}
            initialParams={{ key: '1' }}
            options={{ headerShown: false }}
          />
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.WelcomeScreen}
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.OnboardingLinkAccountsScreen}
            component={OnboardingLinkAccountsScreen}
            options={{ title: 'Link Accounts' }}
          />
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.OnboardingBudgetInterviewScreen}
            component={OnboardingBudgetInterviewScreen}
            options={{ headerShown: false }}
          />
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.OnboardingTransactionsSetupScreen}
            component={OnboardingTransactionsSetupScreen}
            options={{ headerShown: false }}
          />
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.OnboardingBudgetReviewScreen}
            component={OnboardingBudgetReviewScreen}
            options={{ headerShown: false }}
          />
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.OnboardingEditCashflowBudgetsScreen}
            component={OnboardingEditCashflowBudgetsScreen}
            options={{ title: 'Edit Cashflow Budgets' }}
          />
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.OnboardingTransactionsScreen}
            component={OnboardingTransactionsScreen}
          />
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.TransactionDetailsScreen}
            component={TransactionDetailsScreen}
          />
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.OnboardingCompleteScreen}
            component={OnboardingCompleteScreen}
            options={{ headerShown: false }}
          />
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.OnboardingAddLinkedAccountsScreen}
            component={OnboardingAddLinkedAccountsScreen}
            options={{ headerShown: false }}
          />
        </WelcomeOnboardingNavigator.Navigator>
      );
    case 'sa':
      return (
        <WelcomeOnboardingNavigator.Navigator>
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.ConfidenceQuestionScreen}
            component={ConfidenceQuestionScreen}
            options={{
              headerShown: false,
            }}
          />
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.PollScreen}
            component={PollScreen}
            options={{
              headerShown: false,
            }}
          />
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.GoalsSelectorScreen}
            component={GoalsSelectorScreen}
            options={{
              headerShown: false,
            }}
          />
          <WelcomeOnboardingNavigator.Screen
            name={RouteNames.GoalsConfirmationScreen}
            component={GoalsConfirmationScreen}
            options={{
              headerShown: false,
            }}
          />
        </WelcomeOnboardingNavigator.Navigator>
      );

    default:
      return <></>;
  }
};

export default memo(OnboardingStack);
