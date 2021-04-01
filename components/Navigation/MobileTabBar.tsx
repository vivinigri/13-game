import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { RouteNames } from '@navigation/RouteNames';
import HomeIcon from '@assets/icons/home_icon';
import AccountsIcon from '@assets/icons/accounts_icon';
import BudgetIcon from '@assets/icons/budget_icon';
import TransactionsIcon from '@assets/icons/transactions_icon';
import Text from '@components/Text';
import { theme } from '@core/theme';

enum TabNames {
  Home = 'Home',
  Accounts = 'Accounts',
  Budget = 'Budget',
  Transactions = 'Transactions',
}

const tabs = [
  {
    name: TabNames.Home,
    navName: RouteNames.Home,
    icon: null,
  },
  {
    name: TabNames.Accounts,
    navName: RouteNames.Accounts,
    icon: null,
  },
  {
    name: TabNames.Budget,
    navName: RouteNames.BudgetScreen,
    icon: null,
  },
  {
    name: TabNames.Transactions,
    navName: RouteNames.TransactionsScreen,
    icon: null,
  },
];

const returnIcon = (name: TabNames, focused: boolean) => {
  if (name === TabNames.Home) {
    return <HomeIcon focused={focused} />;
  }
  if (name === TabNames.Accounts) {
    return <AccountsIcon focused={focused} />;
  }
  if (name === TabNames.Budget) {
    return <BudgetIcon focused={focused} />;
  }
  if (name === TabNames.Transactions) {
    return <TransactionsIcon focused={focused} />;
  }
};

export default function MobileTabBar({ state, navigation }: BottomTabBarProps) {
  const [focusedTab, setFocusedTab] = useState(0);
  const { bottom } = useSafeAreaInsets();
  const innerStackRoutes = state?.routes?.[0]?.state?.routes || [];
  const currentInnerStackTopScreen =
    innerStackRoutes[innerStackRoutes.length - 1];
  const currentInnerStackTopScreenName =
    currentInnerStackTopScreen?.name || 'Home';
  // none of main screens is displayed now - hide tabbar
  if (
    tabs.findIndex(tab => tab.navName === currentInnerStackTopScreenName) === -1
  ) {
    return null;
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        // use safe area bottom padding in new iPhones or 10 in other phones
        paddingBottom: bottom || 10,
        paddingTop: 10,
      }}
    >
      {tabs.map((route, index) => {
        const isFocused = focusedTab === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.navName,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            setFocusedTab(index);
            navigation.replace(route.navName);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.navName,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {returnIcon(route.name, isFocused)}
            <Text
              type="label"
              style={isFocused ? styles.focused : styles.label}
            >
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: theme.colors.border,
  },
  focused: {
    color: theme.colors.primary,
  },
});
