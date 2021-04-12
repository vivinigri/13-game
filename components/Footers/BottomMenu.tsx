import React from "react"
import { View } from "react-native"
import { StyleSheet } from "react-native"
import { useTheme } from "react-native-paper"
import { ActionButton } from "@components/Buttons"

type BottomMenuProps = {
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
  disabled?: boolean
  relative?: boolean
}

const BottomMenu = ({
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
  relative = true,
  disabled = false,
}: BottomMenuProps) => {
  const theme = useTheme()
  const themedStyle = styles(theme)
  return (
    <View
      style={[
        themedStyle.bottomMenu,
        {
          justifyContent: !onConfirm || !onCancel ? "center" : "space-between",
          position: relative ? "relative" : "absolute",
        },
      ]}
    >
      {onConfirm ? (
        <ActionButton
          label={`${confirmLabel ? confirmLabel : "Confirmar"}`}
          disabled={disabled}
          onPress={() => {
            if (disabled) {
              return
            }
            onConfirm()
          }}
        />
      ) : null}
      {onCancel ? (
        <ActionButton
          secondary={true}
          label={`${cancelLabel ? cancelLabel : "Voltar"}`}
          disabled={disabled}
          onPress={onCancel}
        />
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
      padding: spacings.padding,
      marginTop: spacings.padding * 2,
      backgroundColor: colors.textLight,
      bottom: 0,
      zIndex: 10,
    },
    confirmBtn: {
      backgroundColor: colors.dark,
    },
  })

export default BottomMenu
