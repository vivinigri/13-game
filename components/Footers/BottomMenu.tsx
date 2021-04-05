import React from "react"
import { View, TouchableOpacity, Platform } from "react-native"
import Text from "@components/Text"
import { StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"

type BottomMenuProps = {
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
  disabled?: boolean
}

const BottomMenu = ({
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
  disabled = false,
}: BottomMenuProps) => {
  const theme = useTheme()
  const themedStyle = styles(theme)
  return (
    <View
      style={[
        themedStyle.bottomMenu,
        {
          justifyContent:
            !onConfirm || !onCancel ? "flex-end" : "space-between",
        },
      ]}
    >
      {onConfirm ? (
        <TouchableOpacity
          onPress={() => {
            if (disabled) {
              return
            }
            onConfirm()
          }}
        >
          {/* , { opacity: disabled ? 0.3 : 1 } */}
          <View style={[themedStyle.confirmBtn]}>
            <Text
              type="header"
              variant={disabled ? "light" : "white"}
              family="bold"
              // textTransform="uppercase"
            >
              {`${confirmLabel ? confirmLabel : "Confirmar"}`}
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
            {`${cancelLabel ? cancelLabel : "Voltar"}`}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    bottomMenu: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      height: spacings.footerSize,
      padding: 15,
      backgroundColor: colors.dark,
      position: "absolute",
      bottom: 0,
    },
    confirmBtn: {
      backgroundColor: colors.dark,
      borderRadius: 30,
      paddingTop: Platform.OS === "ios" ? 7 : 10,
      paddingBottom: 10,
      paddingHorizontal: 20,
    },
  })

export default BottomMenu
