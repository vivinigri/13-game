import React from "react"
import Text from "@components/Text"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { useTheme } from "react-native-paper"
import { GameType } from "@types"
import { Ionicons } from "@expo/vector-icons"

type GameCardProps = {
  checked: boolean
  setChecked: (type: GameType) => void
  type: GameType
  title: string
  description: string
}

const GameCard = ({
  type,
  title,
  description,
  setChecked,
  checked,
}: GameCardProps) => {
  const theme = useTheme()
  const themedStyle = styles(theme)

  return (
    <TouchableOpacity
      onPress={() => setChecked(type)}
      style={{ width: "100%", alignItems: "center" }}
    >
      <View
        style={[
          themedStyle.tableCard,
          checked && { borderColor: theme.colors.green, width: "90%" },
        ]}
      >
        <Text
          type="header"
          variant={checked ? "green" : "white"}
          align="center"
          style={{
            marginBottom: theme.spacings.padding,
          }}
        >
          {title}
        </Text>

        <Text
          type="caption"
          variant="light"
          align="center"
          style={{
            marginBottom: theme.spacings.padding,
          }}
        >
          {description}
        </Text>
        <View
          style={[
            themedStyle.checked,
            checked && { borderColor: theme.colors.green },
          ]}
        >
          <Ionicons
            size={30}
            name="ios-checkmark"
            color={checked ? theme.colors.green : theme.colors.textLight}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default GameCard

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    tableCard: {
      backgroundColor: colors.primary,
      width: "85%",
      marginBottom: spacings.padding,
      padding: spacings.padding,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors.primary,
    },
    checked: {
      width: 40,
      height: 40,
      borderRadius: 40,
      position: "absolute",
      right: 10,
      top: 25,
      borderWidth: 2,
      borderColor: colors.textLight,
    },
  })
