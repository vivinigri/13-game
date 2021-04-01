import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { RouteNames } from '@navigation/RouteNames';
import LearningIcon from '@assets/icons/menu-wellness/learning';
import GoalsIcon from '@assets/icons/menu-wellness/goals';
import BudgetIcon from '@assets/icons/menu-wellness/investments';
import Text from '@components/Text';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

enum TabNames {
  Learning = 'Learning',
  ActionPlan = 'ActionPlan',
  Budget = 'Budget',
}

const tabs = [
  {
    name: TabNames.Learning,
    navName: RouteNames.ActivitiesScreen,
    icon: null,
  },
  {
    name: TabNames.ActionPlan,
    navName: RouteNames.ActionPlanScreen,
    icon: null,
  },
  {
    name: TabNames.Budget,
    navName: RouteNames.BudgetScreen,
    icon: null,
  },
];

const returnIcon = (name: TabNames, focused: boolean) => {
  if (name === TabNames.Learning) {
    return <LearningIcon focused={focused} />;
  }
  if (name === TabNames.ActionPlan) {
    return <GoalsIcon focused={focused} />;
  }
  if (name === TabNames.Budget) {
    return <BudgetIcon focused={focused} />;
  }
};

export default function MobileTabBar({ state, navigation }: BottomTabBarProps) {
  const [focusedTab, setFocusedTab] = useState(0);
  const { bottom } = useSafeAreaInsets();
  const innerStackRoutes = state?.routes?.[0]?.state?.routes || [];
  const currentInnerStackTopScreen =
    innerStackRoutes[innerStackRoutes.length - 1];
  const theme = useTheme();
  const { t } = useTranslation();
  const currentInnerStackTopScreenName =
    currentInnerStackTopScreen?.name || 'ActivitiesScreen';

  useEffect(() => {
    setFocusedTab(
      tabs.findIndex(tab => tab.navName === currentInnerStackTopScreenName)
    );
  }, [currentInnerStackTopScreenName]);

  if (focusedTab === -1) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.primary,
        // use safe area bottom padding in new iPhones or 10 in other phones
        paddingBottom: bottom || 3,
        paddingTop: 3,
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
            style={[
              {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 16,
                height: 58,
              },
              isFocused ? { backgroundColor: '#1A1D1E' } : {},
            ]}
          >
            {returnIcon(route.name, isFocused)}
            {isFocused && (
              <Text type="label" variant="light">
                {t(`common.tabNames.${route.name}`)}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = ({ colors }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    label: {
      color: colors.border,
    },
    focused: {
      color: colors.primary,
    },
  });
