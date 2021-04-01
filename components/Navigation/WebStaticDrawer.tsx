import React, { memo, useEffect, useCallback, useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';

import { theme } from '@core/theme';
import WebStaticDrawerItem from './WebStaticDrawerItem';
import SavviLogo from '@assets/icons/savvi_logo_icon';
import NavBarButton from './NavBarButton';
import { RootState, dispatch } from '@store';
import Text from '@components/Text';
import { formatUpdatedAt } from '@core/helpers';
import { RouteNames } from '@navigation/RouteNames';
import AccountListItem from '@components/AccountListItem';
import {
  StaleWarning,
  accountListHasStaleEntry,
} from '@components/AccountList/StaleWarning';

enum TabNames {
  Home = 'Home',
  Accounts = 'Accounts',
  Cashflow = 'Cashflow',
  Transactions = 'Transactions'
}

const links = [
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
    name: TabNames.Cashflow,
    navName: RouteNames.Cashflow,
    icon: null,
  },
  {
    name: TabNames.Transactions,
    navName: RouteNames.TransactionsScreen,
    icon: null,
  },
];

const WebStaticDrawer = (
  props: DrawerContentComponentProps<DrawerContentOptions>
) => {
  const [focusedTab, setFocusedTab] = useState(0);
  const { data } = useSelector(({ accounts }: RootState) => accounts);
  const { items = {}, updated_at } = data;

  const toggleParentDrawer = useCallback(() => {
    const parentNav = props.navigation.dangerouslyGetParent();
    if (parentNav) {
      parentNav.toggleDrawer();
    }
  }, [props.navigation]);

  useEffect(() => {
    dispatch.accounts.fetchAccountsData();
  }, []);

  const navigateHome = useCallback(() => {
    setFocusedTab(0);
    props.navigation.navigate('Home');
  }, [props.navigation]);

  const hasStaleAccount = useMemo(
    () => accountListHasStaleEntry(items, updated_at),
    [items, updated_at]
  );

  return (
    <DrawerContentScrollView style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={navigateHome}>
          <SavviLogo />
        </TouchableOpacity>
        <NavBarButton
          fill={theme.colors.textLight}
          onPress={toggleParentDrawer}
        />
      </View>
      {links.map((item, index) => {
        const isFocused = focusedTab === index;
        return (
          <WebStaticDrawerItem
            key={item.name}
            name={item.name}
            isActive={isFocused}
            onPress={() => {
              setFocusedTab(index);
              props.navigation.replace(item.navName);
            }}
          />
        );
      })}
      <View style={styles.dataContainer}>
        <View style={styles.itemsContainer}>
          {Object.keys(items).map(category => (
            <AccountListItem
              isSideMenu
              category={items[category]}
              key={category}
              lastListUpdate={updated_at}
            />
          ))}
          <Text type="label" variant="light" style={styles.date}>
            {formatUpdatedAt(updated_at)}
          </Text>
          {hasStaleAccount ? <StaleWarning isSideMenu={true} /> : null}
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    backgroundColor: theme.colors.sideMenu,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  itemsContainer: {
    backgroundColor: theme.colors.sideMenuFocus,
    padding: theme.spacings.insideContent,
    borderRadius: theme.spacings.insideContent,
    marginBottom: 16,
    marginHorizontal: 12,
  },
  date: {
    width: '100%',
    padding: theme.spacings.insideContent,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default memo(WebStaticDrawer);
