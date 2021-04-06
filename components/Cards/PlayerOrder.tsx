import React from "react"
import Text from "@components/Text"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { useTheme } from "react-native-paper"

type PlayerOrderProps = {
  name: string
  len: number
  index: number
  playerUp: (index: number) => void
  playerDown: (index: number) => void
}

const PlayerOrder = ({
  name,
  len,
  index,
  playerUp,
  playerDown,
}: PlayerOrderProps) => {
  const theme = useTheme()
  const themedStyle = styles(theme)

  return (
    <View style={themedStyle.tableCard}>
      <TouchableOpacity onPress={() => playerUp(index)} disabled={index === 0}>
        <View style={[themedStyle.checked, { opacity: index >= 1 ? 1 : 0.3 }]}>
          <Text
            type="mainheading"
            variant="secondary"
            align="center"
            style={{
              marginBottom: theme.spacings.padding,
            }}
          >
            🡡
          </Text>
        </View>
      </TouchableOpacity>
      <Text
        type="header"
        variant="white"
        align="center"
        style={{
          marginBottom: theme.spacings.padding,
        }}
      >
        {name}
      </Text>

      <TouchableOpacity
        onPress={() => playerDown(index)}
        disabled={index >= len - 1}
      >
        <View
          style={[themedStyle.checked, { opacity: index <= len - 1 ? 1 : 0.3 }]}
        >
          <Text
            type="mainheading"
            variant="secondary"
            align="center"
            style={{
              marginBottom: theme.spacings.padding,
            }}
          >
            🡣
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default PlayerOrder

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    tableCard: {
      backgroundColor: colors.primary,
      width: "90%",
      marginBottom: spacings.padding,
      padding: spacings.padding,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors.primary,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    checked: {
      width: 40,
      height: 40,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: colors.yellow,
    },
  })
