import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '@components/Text';
import { useTheme, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const TitleHeader = ({
  title,
  text = null,
  isMain = true,
  backgroundColor = 'white',
  counter = null,
  children,
}: any) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const themedStyle = styles(theme);

  return (
    <View style={{ width: '100%' }}>
      {isMain && <Divider />}
      <View style={[themedStyle.header, { backgroundColor }]}>
        {children && <View style={themedStyle.leftItem} />}
        <View style={themedStyle.centerItem}>
          <Text
            type={isMain ? 'mainheading' : 'header'}
            family="bold"
            align="center"
          >
            {text ? text : t(`titles.${title}`)}
          </Text>
          {counter ? (
            <Text
              type="subheading"
              family="bold"
              variant="highlight"
              style={{ paddingTop: 2, paddingLeft: 5 }}
            >
              {' '}
              {counter}
            </Text>
          ) : null}
        </View>
        {children && <View style={themedStyle.rightItem}>{children}</View>}
      </View>
      {isMain && <Divider />}
    </View>
  );
};

export default TitleHeader;

const styles = ({ colors }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      padding: 10,
    },
    leftItem: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flex: 1,
    },
    centerItem: {
      flexDirection: 'row',
      justifyContent: 'center',
      flex: 3,
    },
    rightItem: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      flex: 1,
    },
  });
