import React, { memo } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import { theme } from '@core/theme';

type Props = {
  header?: React.ReactNode;
  bgColor?: string;
};

const Loading = ({ header, bgColor = '' }: Props) => {
  return (
    <>
      {header}
      <View style={[styles.container, { backgroundColor: bgColor ? bgColor : theme.colors.surface }]}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(Loading);
