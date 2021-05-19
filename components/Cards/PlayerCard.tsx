import React from "react"
import Text from "@components/Text"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { useTheme } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"

type PlayerCardProps = {
  name: string
  id: string
  addPlayer: (id: string) => void
}
// TODO ao inves de presente em... colocar posicao no ranking
const PlayerCard = ({ name, id, addPlayer }: PlayerCardProps) => {
  const theme = useTheme()
  const themedStyle = styles(theme)

  return (
    <TouchableOpacity
      onPress={() => addPlayer(id)}
      style={{ width: "100%", alignItems: "center" }}
    >
      <View style={themedStyle.tableCard}>
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

        <Text
          type="caption"
          variant="light"
          align="center"
          style={{
            marginBottom: theme.spacings.padding,
          }}
        >
          Presente em outras 5 mesas
        </Text>
        <View style={themedStyle.checked}>
          <Ionicons size={30} name="ios-add" color={theme.colors.textLight} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default PlayerCard

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
      justifyContent: "center",
      alignItems: "center",
    },
  })
