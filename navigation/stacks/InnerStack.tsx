import React, { memo } from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  TransactionsScreen,
  TransactionDetailsScreen,
  HomeScreen,
  AccountsScreen,
  CashflowScreen,
  ExplainerScreen,
  EditCashflowBudgetsScreen,
  UserSettingsScreen,
  UserProfileScreen,
  DeviceSettingsScreen,
  BudgetInterviewScreen,
  EditAccountsScreen,
  TransactionsSetupScreen,
  EditAccountDetailsScreen,
  AddLinkedAccountsScreen,
  CashflowItemDetailsScreen,
  LinkAccountsScreen,
  WebViewContentScreen,
  BudgetReviewScreen,
  TermsOfUseScreen,
  ActivitiesScreen,
  PinSetupScreen,
  ArticleActivityScreen,
  CelebrationScreen,
  ActionPlanScreen,
  ActionDetailsScreen,
  WellnessGoalConfigScreen,
  QuizActivityScreen,
  VideoActivityScreen,
  BudgetScreen,
  GoalsSelectorScreen,
  GoalsConfirmationScreen,
  GoalDetailsScreen,
  UpdateSavingsScreen,
  BudgetDetailsScreen,
} from '@screens';
import { InnerStackParamList } from '../types';
import NavBarButton from '@components/Navigation/NavBarButton';
import SettingsIcon from '@assets/icons/settings_icon';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { RouteNames } from '../RouteNames';
import { config } from '@core/config';

const InnerStack = () => {
  const { isTabletOrDesktop } = useMediaQuery();
  const InnerStackNavigator = createStackNavigator<InnerStackParamList>();

  switch (config.APP_VARIANT) {
    case 'us':
      return (
        <InnerStackNavigator.Navigator>
          <InnerStackNavigator.Screen
            name={RouteNames.Home}
            component={HomeScreen}
            options={({ navigation }) => ({
              animationEnabled: false,
              headerTransparent: true,
              headerTitle: '',
              headerLeft: () =>
                isTabletOrDesktop ? null : (
                  <NavBarButton onPress={() => navigation.toggleDrawer()} />
                ),
              title: 'Home',
            })}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.Accounts}
            component={AccountsScreen}
            options={({ navigation }) => ({
              animationEnabled: false,
              headerLeft: () =>
                isTabletOrDesktop ? null : (
                  <NavBarButton onPress={() => navigation.toggleDrawer()} />
                ),
              headerRight: () => (
                <NavBarButton
                  onPress={() =>
                    navigation.navigate(RouteNames.EditAccountsScreen)
                  }
                  icon={SettingsIcon}
                />
              ),
              title: 'Accounts',
            })}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.Cashflow}
            component={CashflowScreen}
            options={({ navigation }) => ({
              animationEnabled: false,
              headerLeft: () =>
                isTabletOrDesktop ? null : (
                  <NavBarButton onPress={() => navigation.toggleDrawer()} />
                ),
              title: 'Cashflow',
            })}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.TransactionsScreen}
            component={TransactionsScreen}
            options={({ navigation }) => ({
              animationEnabled: false,
              title: 'Transactions',
              headerLeft: () =>
                isTabletOrDesktop ? null : (
                  <NavBarButton onPress={() => navigation.toggleDrawer()} />
                ),
            })}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.ExplainerScreen}
            component={ExplainerScreen}
            initialParams={{
              key: '1',
            }}
            options={{ title: 'How It Works', headerTitle: () => null }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.EditCashflowBudgetsScreen}
            component={EditCashflowBudgetsScreen}
            options={{ title: 'Adjust your budget' }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.UserSettingsScreen}
            component={UserSettingsScreen}
            options={{ title: 'User Settings' }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.UserProfileScreen}
            component={UserProfileScreen}
            options={{ title: 'Profile' }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.DeviceSettingsScreen}
            component={DeviceSettingsScreen}
            options={{ title: 'Device Settings' }}
          />
          {Platform.OS !== 'web' ? (
            <InnerStackNavigator.Screen
              name={RouteNames.PinSetupScreen}
              component={PinSetupScreen}
              options={{ title: 'PIN Setup' }}
            />
          ) : null}
          <InnerStackNavigator.Screen
            name={RouteNames.TransactionDetailsScreen}
            component={TransactionDetailsScreen}
            options={{
              headerBackTitle: 'All',
              title: 'Transaction Details',
              headerTitle: () => null,
            }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.BudgetInterviewScreen}
            component={BudgetInterviewScreen}
            options={{
              title: 'Budgte Interview',
              headerTitle: () => null,
              headerBackTitle: 'Adjust Your Budget',
            }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.EditAccountsScreen}
            component={EditAccountsScreen}
            options={{ title: 'Edit Accounts' }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.TransactionsSetupScreen}
            component={TransactionsSetupScreen}
            options={{ title: 'Transactions Setup', headerTitle: () => null }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.EditAccountDetailsScreen}
            component={EditAccountDetailsScreen}
            options={{ title: 'Edit Account Details' }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.AddLinkedAccountsScreen}
            component={AddLinkedAccountsScreen}
            options={{ title: 'Add Linked Accounts', headerLeft: () => null }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.CashflowItemDetailsScreen}
            component={CashflowItemDetailsScreen}
            options={{ title: 'Cashflow Item Details' }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.LinkAccountsScreen}
            component={LinkAccountsScreen}
            options={{ title: 'Link Account' }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.WebViewContentScreen}
            component={WebViewContentScreen}
            options={{
              title: 'Learn More',
              headerTitle: () => null,
              headerBackTitle: 'Back',
            }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.BudgetReviewScreen}
            component={BudgetReviewScreen}
            options={{ headerShown: false, title: 'Budget Review' }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.TermsOfUseScreen}
            component={TermsOfUseScreen}
            options={{
              headerShown: true,
              title: 'Terms of Use',
              headerBackTitle: 'Back',
            }}
          />
        </InnerStackNavigator.Navigator>
      );
    case 'sa':
      return (
        <InnerStackNavigator.Navigator>
          <InnerStackNavigator.Screen
            name={RouteNames.ActivitiesScreen}
            component={ActivitiesScreen}
            options={{ headerShown: false }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.ArticleActivityScreen}
            component={ArticleActivityScreen}
            options={{ headerShown: false }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.QuizActivityScreen}
            component={QuizActivityScreen}
            options={{ headerShown: false }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.VideoActivityScreen}
            component={VideoActivityScreen}
            options={{ headerShown: false }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.CelebrationScreen}
            component={CelebrationScreen}
            options={{ headerShown: false }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.ActionPlanScreen}
            component={ActionPlanScreen}
            options={{ headerShown: false }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.ActionDetailsScreen}
            component={ActionDetailsScreen}
            options={{ headerShown: false }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.WellnessGoalConfigScreen}
            component={WellnessGoalConfigScreen}
            options={{ headerShown: false }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.BudgetScreen}
            component={BudgetScreen}
            options={{ headerShown: false }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.BudgetDetailsScreen}
            component={BudgetDetailsScreen}
            options={{ headerShown: false }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.GoalsSelectorScreen}
            component={GoalsSelectorScreen}
            options={{ headerShown: false }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.UpdateSavingsScreen}
            component={UpdateSavingsScreen}
            options={{ headerShown: false }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.GoalsConfirmationScreen}
            component={GoalsConfirmationScreen}
            options={{
              headerShown: false,
            }}
          />
          <InnerStackNavigator.Screen
            name={RouteNames.GoalDetailsScreen}
            component={GoalDetailsScreen}
            options={{
              headerShown: false,
            }}
          />
        </InnerStackNavigator.Navigator>
      );

    default:
      return <></>;
  }
};

export default memo(InnerStack);
