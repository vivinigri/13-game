import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import Text from '@components/Text';
import { theme } from '@core/theme';

type Props = {
  isActive: boolean;
  name: string;
  onPress: () => void;
};

const WebStaticDrawerItem = ({ name, onPress, isActive }: Props) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={onPress}
    style={[
      styles.container,
      {
        borderLeftWidth: isActive ? 4 : 0,
        backgroundColor: isActive
          ? theme.colors.sideMenuFocus
          : theme.colors.sideMenu,
      },
    ]}
  >
    <Text
      type="subheading"
      variant="light"
      textTransform="uppercase"
      family="medium"
    >
      {name}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    borderLeftColor: theme.colors.primary,
    borderStyle: 'solid',
  },
});

export default memo(WebStaticDrawerItem);
