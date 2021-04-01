import React, { memo, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { Toast as ToastType } from '@types';
import { theme } from '@core/theme';
import {
  ToastSuccess,
  ToastError,
  ToastInfo,
  ToastWarning,
} from '@assets/icons/toasts';
import CloseIcon from '@assets/icons/close_icon';
import Text from '@components/Text';

type Props = ToastType & {
  onClose: () => void;
  label: string;
};

const toastIcons = {
  success: <ToastSuccess />,
  error: <ToastError />,
  info: <ToastInfo />,
  warning: <ToastWarning />,
};

const toastColor = {
  success: theme.colors.toastSuccess,
  error: theme.colors.toastError,
  info: theme.colors.toastInfo,
  warning: theme.colors.toastWarning,
};

const Toast = ({
  onClose,
  content,
  variant,
  duration,
  tryAgain,
  label,
}: Props) => {
  const [opacityAnimation] = useState(new Animated.Value(0));
  const [translateAnimation] = useState(new Animated.Value(-100));

  const { t } = useTranslation();

  useEffect(() => {
    if (duration && !tryAgain) {
      setTimeout(onClose, duration);
    }
  }, [duration, onClose, tryAgain]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateAnimation, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacityAnimation, translateAnimation]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: toastColor[variant],
          opacity: opacityAnimation,
          transform: [{ translateY: translateAnimation }],
        },
      ]}
    >
      <View style={styles.iconContainer}>{toastIcons[variant]}</View>

      <View style={styles.contentContainer}>
        <Text type="title" variant="light" family="medium">
          {content}
        </Text>
      </View>

      {tryAgain && (
        <TouchableOpacity
          style={styles.tryAgainContainer}
          onPress={() => {
            onClose();
            tryAgain();
          }}
        >
          <Text
            type="title"
            family="bold"
            style={{
              color:
                variant === 'info' ? theme.colors.cyan : theme.colors.surface,
            }}
          >
            {label ? label : t('common.tryAgain')}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={onClose} style={styles.close}>
        <CloseIcon width={12} height={12} fill={theme.colors.surface} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacings.insideContent,
    minWidth: 300,
    width: '80%',
    maxWidth: 340,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: theme.colors.dark,
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  iconContainer: {
    paddingRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  close: {
    marginLeft: 16,
  },
  tryAgainContainer: {
    marginLeft: 16,
  },
});

export default memo(Toast);
