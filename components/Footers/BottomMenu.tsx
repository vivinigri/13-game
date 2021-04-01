import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import Text from '@components/Text';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

type BottomMenuProps = {
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  disabled?: boolean;
};

const BottomMenu = ({
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
  disabled = false,
}: BottomMenuProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const themedStyle = styles(theme);
  return (
    <View
      style={[
        themedStyle.bottomMenu,
        {
          justifyContent: !onConfirm || !onCancel ? 'center' : 'space-between',
        },
      ]}
    >
      {onConfirm ? (
        <TouchableOpacity
          onPress={() => {
            if (disabled) {
              return;
            }
            onConfirm();
          }}
        >
          <View
            style={[themedStyle.confirmBtn, { opacity: disabled ? 0.3 : 1 }]}
          >
            <Text
              type="header"
              variant="light"
              family="bold"
              textTransform="uppercase"
            >
              {`${confirmLabel ? confirmLabel : t('common.confirmButton')}`}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
      {onCancel ? (
        <TouchableOpacity onPress={onCancel}>
          <Text
            type="header"
            variant="highlight"
            family="bold"
            textTransform="uppercase"
          >
            {`${cancelLabel ? cancelLabel : t('common.backButton')}`}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = ({ colors }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    bottomMenu: {
      width: '100%',
      flexDirection: 'row-reverse',
      alignItems: 'center',
      height: 70,
      padding: 15,
      backgroundColor: colors.textLight,
    },
    confirmBtn: {
      backgroundColor: colors.highlight,
      borderRadius: 30,
      paddingTop: Platform.OS === 'ios' ? 7 : 10,
      paddingBottom: 10,
      paddingHorizontal: 20,
    },
  });

export default BottomMenu;
