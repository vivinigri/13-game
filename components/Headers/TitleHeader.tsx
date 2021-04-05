import React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import Text from "@components/Text"
import { useTheme } from "react-native-paper"
import { useNavigation } from "@react-navigation/native"

// TODO no children, na verdade ser so uma prop de tipos de icones diferentes com um switch

const TitleHeader = ({ title = "", hasBackBtn = true, children }: any) => {
  const theme = useTheme()
  const themedStyle = styles(theme)
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  return (
    <View style={themedStyle.header}>
      <View style={themedStyle.viewW}>
        {hasBackBtn && (
          <TouchableOpacity onPress={goBack}>
            <View style={themedStyle.backBtn}>
              <Text type="mainheading" family="bold" variant="white">
                {"<"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View>
        {title && (
          <Text type="header" family="bold" variant="white" align="center">
            {title}
          </Text>
        )}
      </View>
      <View style={themedStyle.viewW}>{children}</View>
    </View>
  )
}

export default TitleHeader

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    header: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
      height: spacings.headerSize,
      padding: 10,
      backgroundColor: colors.dark,
      marginBottom: spacings.padding,
    },
    backBtn: {
      width: 40,
      height: 40,
      backgroundColor: colors.dark,
    },
    viewW: {
      width: 40,
    },
  })
