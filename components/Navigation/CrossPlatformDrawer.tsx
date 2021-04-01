import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { Divider } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import { NavigationState, PartialState, Route } from '@react-navigation/native';

import Text from '@components/Text';
import { dispatch, RootState } from '@store';
import { theme } from '@core/theme';
import { signOutUser } from '@api/auth-api';
import PersonIcon from '@assets/icons/person_icon';
import { RouteNames } from '@navigation/RouteNames';
import { NavigationStacks } from '@navigation/types';
import { config } from '@core/config';

type DrawerLinkProps = {
  hasDivider?: boolean;
  friendlyName?: string;
  description?: string;
  onboarding?: boolean;
};

export type DrawerParamList = {
  [key: string]: DrawerLinkProps;
};

type RouteType = Route<string> & {
  state?: NavigationState | PartialState<NavigationState>;
  params: {
    hasDivider?: boolean;
    friendlyName?: string;
    description?: string;
  };
};

const routes = [
  ...(config.APP_VARIANT !== 'sa'
    ? [
        {
          name: RouteNames.ExplainerScreen,
          params: {
            onboarding: false,
            description: 'Our approach to budgeting explained',
            friendlyName: 'How It Works',
          },
        },
        {
          name: RouteNames.EditCashflowBudgetsScreen,
          params: {
            description: 'Make changes to your budget settings',
            friendlyName: 'Adjust Your Budget',
            hasDivider: true,
          },
        },
      ]
    : []),
  {
    name: RouteNames.UserSettingsScreen,
    params: {
      friendlyName: 'User Settings',
    },
  },
  ...(Platform.OS !== 'web'
    ? [
        {
          name: RouteNames.DeviceSettingsScreen,
          params: {
            friendlyName: 'Device Settings',
            hasDivider: true,
          },
        },
      ]
    : []),
  ...(config.APP_VARIANT !== 'sa'
    ? [
        {
          name: RouteNames.TermsOfUseScreen,
          params: {
            friendlyName: 'Terms of Use',
          },
        },
      ]
    : []),
];

const DrawerItem = ({
  onPress,
  title,
  description,
}: {
  onPress: () => void;
  title: string;
  description?: string;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.menuItem}>
    <Text type="paragraph">{title}</Text>
    {description ? (
      <Text type="caption" variant="secondary" style={{ paddingTop: 4 }}>
        {description}
      </Text>
    ) : null}
  </TouchableOpacity>
);

function Drawer(props: DrawerContentComponentProps<DrawerContentOptions>) {
  const profile = useSelector(({ profile }: RootState) => profile);
  const { first_name = '', last_name = '', email = '' } = profile.user || {};
  const website = 'https://help.savvifi.com';

  const logoutUser = async () => {
    await signOutUser(profile.session_token);
    dispatch.profile.logoutUser();
  };

  const openHelp = () => {
    if (Platform.OS === 'web') {
      window.open(website, '_newtab');
    } else {
      props.navigation.navigate(RouteNames.WebViewContentScreen, {
        uri: website,
      });
    }
  };

  return (
    <DrawerContentScrollView style={styles.container} bounces={false}>
      <View style={styles.profile}>
        <PersonIcon />
        <Text
          type="subheading"
          variant="dark"
          family="medium"
          style={{ paddingTop: 12 }}
        >
          {first_name} {last_name}
        </Text>
        <Text type="label" variant="secondary" style={{ paddingTop: 4 }}>
          {email}
        </Text>
      </View>
      {routes.map((item, index) => {
        const currentItem = item as RouteType;
        return (
          <View key={index}>
            <DrawerItem
              key={index}
              title={currentItem.params?.friendlyName || currentItem.name}
              onPress={() => {
                props.navigation.navigate(
                  NavigationStacks.PlatformWiseNavigator,
                  {
                    screen: NavigationStacks.InnerStack,
                    params: { screen: item.name },
                  }
                );
              }}
              description={currentItem.params?.description || undefined}
            />
            {currentItem.params?.hasDivider ? <Divider /> : null}
          </View>
        );
      })}
      {config.APP_VARIANT !== 'sa' && (
        <DrawerItem title="Help Center" onPress={openHelp} />
      )}
      <DrawerItem title="Sign Out" onPress={logoutUser} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  profile: {
    padding: theme.spacings.section,
    paddingTop: theme.spacings.section + getStatusBarHeight(),
    backgroundColor: theme.colors.hover,
  },
  menuItem: {
    paddingHorizontal: theme.spacings.section,
    paddingVertical: 16,
  },
});

export default memo(Drawer);
