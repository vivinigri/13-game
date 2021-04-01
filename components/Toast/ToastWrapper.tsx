import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Portal } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { RootState, dispatch } from '@store';
import Toast from './Toast';
import { theme } from '@core/theme';

const ToastWrapper = () => {
  const toasts = useSelector(({ toasts }: RootState) => toasts);

  return (
    <Portal>
      <View style={styles.container}>
        {toasts.map(({ id, variant, content, duration, tryAgain, label }) => (
          <Toast
            key={id}
            id={id}
            variant={variant}
            onClose={() => dispatch.toasts.hide(id)}
            content={content}
            duration={duration}
            tryAgain={tryAgain}
            label={label}
          />
        ))}
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    top: theme.spacings.section + getStatusBarHeight(),
    zIndex: 20000,
    elevation: 9,
  },
});

export default memo(ToastWrapper);
