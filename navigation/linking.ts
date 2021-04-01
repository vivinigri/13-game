import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

import { RouteNames } from './RouteNames';
import { NavigationStacks } from './types';
import { config } from '@core/config';

const prefix = Linking.makeUrl('/');

export const getCurrentLinking = ({
  isLoggedIn,
  shouldBeChallenged,
  welcomeOnboardingCompleted,
}: {
  isLoggedIn: boolean;
  shouldBeChallenged: boolean;
  welcomeOnboardingCompleted: boolean;
}): LinkingOptions => ({
  prefixes: [prefix, config.WEB_URL],
  config: {
    screens: {
      ...(isLoggedIn && !shouldBeChallenged
        ? {
            ...(!welcomeOnboardingCompleted && {
              [RouteNames.WelcomeOnboarding]: {
                path: 'onboarding',
                initialRouteName: RouteNames.WelcomeScreen,
                screens: {
                  [RouteNames.OnboardingExplainerScreen]: 'explainer/:key',
                  [RouteNames.WelcomeScreen]: 'welcome',
                  [RouteNames.OnboardingLinkAccountsScreen]: 'link-accounts',
                  [RouteNames.OnboardingBudgetInterviewScreen]:
                    'budget-interview',
                  [RouteNames.OnboardingTransactionsSetupScreen]:
                    'transactions-setup',
                  [RouteNames.OnboardingBudgetReviewScreen]: 'budget-review',
                  [RouteNames.OnboardingEditCashflowBudgetsScreen]:
                    'edit-casflow-budgets',
                  [RouteNames.OnboardingTransactionsScreen]:
                    'transactions/:cashflowType?',
                  [RouteNames.TransactionDetailsScreen]:
                    'transaction-details/:transaction',
                  [RouteNames.OnboardingCompleteScreen]: 'complete',
                  [RouteNames.OnboardingCompleteScreen]: 'complete',
                  [RouteNames.PollScreen]: 'poll',
                  [RouteNames.GoalsSelectorScreen]: 'select-goals',
                  [RouteNames.GoalsConfirmationScreen]: 'confirm-goals',
                },
              },
            }),
            [RouteNames.LoggedIn]: {
              initialRouteName: NavigationStacks.PlatformWiseNavigator,
              screens: {
                [NavigationStacks.PlatformWiseNavigator]: {
                  initialRouteName: NavigationStacks.InnerStack,
                  screens: {
                    [NavigationStacks.InnerStack]: {
                      initialRouteName: RouteNames.Home,
                      screens: {
                        [RouteNames.Home]: { path: 'home', exact: true },
                        [RouteNames.Accounts]: {
                          path: 'accounts',
                          exact: true,
                        },
                        [RouteNames.Cashflow]: {
                          path: 'cashflow',
                          exact: true,
                        },
                        [RouteNames.TransactionsScreen]: {
                          path: 'transactions/:cashflowType?',
                          exact: true,
                        },
                        [RouteNames.ExplainerScreen]: {
                          path: 'explainer/:key',
                          exact: true,
                        },
                        [RouteNames.EditCashflowBudgetsScreen]: {
                          path: 'edit-cashflow-budgets/:mode?',
                          exact: true,
                        },
                        // TODO: use settings link seems to be glitchy
                        [RouteNames.UserSettingsScreen]: {
                          path: 'user-settings',
                          exact: true,
                        },
                        [RouteNames.UserProfileScreen]: {
                          path: 'user-profile',
                          exact: true,
                        },
                        ...(Platform.OS !== 'web' && {
                          [RouteNames.DeviceSettingsScreen]: {
                            path: 'device-settings',
                            exact: true,
                          },
                          [RouteNames.PinSetupScreen]: {
                            path: 'pin-setup',
                            exact: true,
                          },
                        }),
                        [RouteNames.TransactionDetailsScreen]: {
                          path: 'transaction-details/:transactionId',
                          exact: true,
                        },
                        [RouteNames.BudgetInterviewScreen]: {
                          path: 'budget-interview',
                          exact: true,
                        },
                        [RouteNames.EditAccountsScreen]: {
                          path: 'edit-accounts',
                          exact: true,
                        },
                        [RouteNames.TransactionsSetupScreen]: {
                          path: 'transactions-setup',
                          exact: true,
                        },
                        [RouteNames.EditAccountDetailsScreen]: {
                          path: 'edit-account-details/:account',
                          exact: true,
                        },
                        [RouteNames.AddLinkedAccountsScreen]: {
                          path: 'add-linked-account',
                          exact: true,
                        },
                        [RouteNames.CashflowItemDetailsScreen]: {
                          path: 'cashflow-item-details/:category?/:period?',
                          exact: true,
                        },
                        [RouteNames.LinkAccountsScreen]: {
                          path: 'link-accounts/:link_id?',
                          exact: true,
                        },
                        [RouteNames.WebViewContentScreen]: {
                          path: 'webview/:uri/:title?',
                          exact: true,
                        },
                        [RouteNames.BudgetReviewScreen]: {
                          path: 'budget-review',
                          exact: true,
                        },
                        [RouteNames.TermsOfUseScreen]: {
                          path: 'terms-of-use',
                          exact: true,
                        },
                        [RouteNames.ActivitiesScreen]: {
                          path: 'activities',
                          exact: true,
                        },
                        [RouteNames.ArticleActivityScreen]: {
                          path: 'activities/article/:activityId',
                          exact: true,
                        },
                        [RouteNames.QuizActivityScreen]: {
                          path: 'activities/quiz/:activityId',
                          exact: true,
                        },
                        [RouteNames.VideoActivityScreen]: {
                          path: 'activities/video/:activityId',
                          exact: true,
                        },
                        [RouteNames.CelebrationScreen]: {
                          path: 'activities/celebration/:activityId',
                          exact: true,
                        },
                        [RouteNames.BudgetScreen]: {
                          path: 'budget',
                          exact: true,
                        },
                        [RouteNames.BudgetDetailsScreen]: {
                          path: 'budget/details',
                          exact: true,
                        },
                        [RouteNames.ActionPlanScreen]: {
                          path: 'actions',
                          exact: true,
                        },
                        [RouteNames.ActionDetailsScreen]: {
                          path: 'actions/:actionId',
                          exact: true,
                        },
                        [RouteNames.UpdateSavingsScreen]: {
                          path: 'savings',
                          exact: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          }
        : {
            [NavigationStacks.LoginStack]: {
              initialRouteName: RouteNames.LoginScreen,
              screens: {
                [RouteNames.LoginScreen]: 'login',
                [RouteNames.WellnessWelcomeScreen]: 'welcome',
                [RouteNames.SignUpScreen]: 'signup/:inviteCode',
                [RouteNames.BiometricsVerificationScreen]: 'biometrics-auth',
                ...(Platform.OS !== 'web' && {
                  [RouteNames.PinAuthScreen]: {
                    path: 'pin-auth',
                  },
                }),
                [RouteNames.TermsOfUseScreen]: 'terms-of-use',
                [RouteNames.PrivacyPolicyScreen]: 'privacy-policy',
                [RouteNames.EmployerInviteScreen]: 'invite-code/:employerId',
                [RouteNames.InviteCodeScreen]: 'invite-code/',
                [RouteNames.PasswordLessScreen]: 'passwordless-auth/:email',
                [RouteNames.PasswordLessCompleteScreen]: 'signin/:token',
                [RouteNames.MultiFactorAuthScreen]:
                  'multi-factor-auth/:next_url',
                [RouteNames.EmployerSearchScreen]: 'employer-search',
              },
            },
          }),
      NotFoundScreen: '*',
    },
  },
});
