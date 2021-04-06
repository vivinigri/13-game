import React from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { useTheme } from "react-native-paper"
import Text from "@components/Text"

type PlayerBubbleProps = {
  name: string
  id: string
  removePlayer: (id: string) => void
}
const PlayerBubble = ({ name, id, removePlayer }: PlayerBubbleProps) => {
  const theme = useTheme()
  const themedStyle = styles(theme)

  return (
    <View style={themedStyle.playerBubble}>
      <Text type="title" variant="light">
        {name}
      </Text>
      <TouchableOpacity onPress={() => removePlayer(id)}>
        <View style={themedStyle.checked}>
          <Text
            type="header"
            variant="light"
            align="center"
            style={{
              marginBottom: theme.spacings.padding,
            }}
          >
            ✗
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default PlayerBubble

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    playerBubble: {
      height: 50,
      borderRadius: 40,
      padding: 5,
      paddingLeft: 15,
      minWidth: 120,
      backgroundColor: colors.backdrop,
      marginHorizontal: spacings.padding * 0.5,
      marginVertical: spacings.padding * 0.5,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      maxWidth: "100%",
    },
    checked: {
      width: 40,
      height: 40,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: colors.textLight,
    },
  })
