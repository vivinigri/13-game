import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';

import MenuIcon from '@assets/icons/menu_icon';

type Props = {
  onPress: () => void;
  icon?: typeof MenuIcon;
  fill?: string;
};
const NavBarIconButton = ({ onPress, icon: Icon, fill }: Props) => (
  <TouchableOpacity style={styles.menuIconContainer} onPress={onPress}>
    {Icon ? <Icon /> : <MenuIcon fill={fill} />}
  </TouchableOpacity>
);

type TextButtonProps = {
  onPress: () => void;
  label: string;
  disabled?: boolean;
};
export const NavBarTextButton = ({
  onPress,
  label,
  disabled,
}: TextButtonProps) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={styles.textButtonContainer}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.textButtonLabel,
          {
            color: Platform.select({
              ios: colors.primary,
              default: colors.text,
            }),
          },
          disabled && styles.disabled,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuIconContainer: {
    padding: 15,
  },
  textButtonContainer: {
    paddingRight: 5,
  },
  textButtonLabel: {
    fontSize: 17,
    letterSpacing: 0.35,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default NavBarIconButton;
