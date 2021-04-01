import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import {
  CashflowType,
  Transaction,
  EditAccountItem,
  CashflowItem,
  Activity,
  GoalItem,
  ActionDetails,
} from '@types';
import { RouteNames } from './RouteNames';

export type LoginParamList = {
  [RouteNames.LoginScreen]: undefined;
  [RouteNames.SignUpScreen]: {
    inviteCode: string;
  };
  [RouteNames.TermsOfUseScreen]: undefined;
  [RouteNames.PrivacyPolicyScreen]: undefined;
  [RouteNames.InviteCodeScreen]: undefined;
  [RouteNames.EmployerInviteScreen]: {
    employerId: string;
  };
  [RouteNames.PasswordLessScreen]: {
    email: string;
  };
  [RouteNames.PasswordLessCompleteScreen]: {
    token: string;
  };
  [RouteNames.MultiFactorAuthScreen]: {
    next_url: string;
  };
  [RouteNames.BiometricsVerificationScreen]: undefined;
  [RouteNames.PinAuthScreen]: undefined;
  [RouteNames.EmployerSearchScreen]: undefined;
  [RouteNames.WellnessWelcomeScreen]: undefined;
};
export type WelcomeOnboardingParamList = {
  [RouteNames.OnboardingExplainerScreen]: ExplainerStepProps;
  [RouteNames.WelcomeScreen]: undefined;
  [RouteNames.OnboardingLinkAccountsScreen]: undefined;
  [RouteNames.OnboardingBudgetInterviewScreen]: undefined;
  [RouteNames.OnboardingTransactionsSetupScreen]: undefined;
  [RouteNames.OnboardingBudgetReviewScreen]: undefined;
  [RouteNames.OnboardingEditCashflowBudgetsScreen]: undefined;
  [RouteNames.OnboardingTransactionsScreen]: {
    cashflowType: CashflowType;
  };
  [RouteNames.TransactionDetailsScreen]: {
    transactionId: Transaction['id'];
  };
  [RouteNames.OnboardingCompleteScreen]: undefined;
  [RouteNames.OnboardingAddLinkedAccountsScreen]: undefined;
  [RouteNames.GoalsSelectorScreen]: {
    isOnboarding: boolean;
  };
  [RouteNames.GoalsConfirmationScreen]: undefined;
  [RouteNames.PollScreen]: undefined;
  [RouteNames.ConfidenceQuestionScreen]: undefined;
};

export type InnerStackParamList = {
  [RouteNames.Home]: undefined;
  [RouteNames.Accounts]: undefined;
  [RouteNames.Cashflow]: undefined;
  [RouteNames.ExplainerScreen]: ExplainerStepProps;
  [RouteNames.EditCashflowBudgetsScreen]: {
    mode?: 'editing';
  };
  [RouteNames.UserSettingsScreen]: undefined;
  [RouteNames.UserProfileScreen]: undefined;
  [RouteNames.DeviceSettingsScreen]: undefined;
  [RouteNames.PinSetupScreen]: undefined;
  [RouteNames.TransactionDetailsScreen]: {
    transactionId: Transaction['id'];
  };
  [RouteNames.BudgetInterviewScreen]: undefined;
  [RouteNames.EditAccountsScreen]: undefined;
  [RouteNames.TransactionsSetupScreen]: undefined;
  [RouteNames.EditAccountDetailsScreen]: {
    account: EditAccountItem;
  };
  [RouteNames.AddLinkedAccountsScreen]: undefined;
  [RouteNames.CashflowItemDetailsScreen]: {
    period: string;
    category: CashflowItem;
  };
  [RouteNames.LinkAccountsScreen]: {
    link_id?: string;
  };
  [RouteNames.WebViewContentScreen]: {
    title: string;
    uri: string;
  };
  [RouteNames.BudgetReviewScreen]: undefined;
  [RouteNames.TransactionsScreen]: {
    cashflowType: CashflowType;
  };
  [RouteNames.ExplainerScreen]: ExplainerStepProps;
  [RouteNames.TermsOfUseScreen]: undefined;
  [RouteNames.ActivitiesScreen]: undefined;
  [RouteNames.ArticleActivityScreen]: {
    activityId: string;
  };
  [RouteNames.VideoActivityScreen]: {
    activityId: string;
  };
  [RouteNames.CelebrationScreen]: {
    completed: Activity | ActionDetails;
    isAction?: boolean;
  };
  [RouteNames.ActionPlanScreen]: undefined;
  [RouteNames.BudgetScreen]: undefined;
  [RouteNames.BudgetDetailsScreen]: {
    type: string;
    amount: number;
    id: string;
  };
  [RouteNames.WellnessGoalConfigScreen]: {
    goal: GoalItem;
  };
  [RouteNames.QuizActivityScreen]: {
    activityId: string;
  };
  [RouteNames.ActionDetailsScreen]: {
    actionId: string;
  };
  [RouteNames.GoalsSelectorScreen]: {
    isOnboarding: boolean;
  };
  [RouteNames.GoalsConfirmationScreen]: undefined;
  [RouteNames.UpdateSavingsScreen]: undefined;
  [RouteNames.GoalDetailsScreen]: {
    goal: GoalItem;
  };
};

export type WebStaticDrawerParamList = {
  InnerStack: undefined;
};

export type MobileTabsParamList = {
  InnerStack: undefined;
};

export type DrawerSaParamList = {
  PlatformWiseNavigator: undefined;
};

export type DrawerParamList = {
  PlatformWiseNavigator: undefined;
};

export type MainStackParamList = {
  WelcomeOnboarding?: undefined;
  LoggedIn?: undefined;
  LoginStack?: {
    shouldBeChallenged?: boolean;
    deviceHasBiometrics?: boolean;
  };
  [NavigationStacks.InnerStack]: undefined;
  [RouteNames.NotFoundScreen]: undefined;
};

export type LoginStackMemberNavigationProp<
  Member extends keyof LoginParamList
> = CompositeNavigationProp<
  StackNavigationProp<LoginParamList, Member>,
  StackNavigationProp<MainStackParamList>
>;

export type WelcomeOnboardingMemberNavigationProp<
  Member extends keyof WelcomeOnboardingParamList
> = CompositeNavigationProp<
  StackNavigationProp<WelcomeOnboardingParamList, Member>,
  StackNavigationProp<MainStackParamList>
>;

export type InnerStackMemberNavigationProp<
  Member extends keyof InnerStackParamList
> = CompositeNavigationProp<
  StackNavigationProp<InnerStackParamList, Member>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MobileTabsParamList>,
    CompositeNavigationProp<
      DrawerNavigationProp<DrawerParamList>,
      StackNavigationProp<MainStackParamList>
    >
  >
>;

export enum NavigationStacks {
  InnerStack = 'InnerStack',
  OnboardingStack = 'OnboardingStack',
  LoginStack = 'LoginStack',
  PlatformWiseNavigator = 'PlatformWiseNavigator',
}

export type ExplainerStepProps = {
  key: '1' | '2' | '3' | '4' | '5';
};

export type IntroductionStepProps = {
  key: '1' | '2' | '3';
};
