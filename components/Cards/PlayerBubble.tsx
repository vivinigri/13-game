import React from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { useTheme } from "react-native-paper"
import Text from "@components/Text"

type PlayerBubbleProps = {
  name: string
  id: string
  removePlayer?: (id: string) => void
  color?: string
  label: string
}
const PlayerBubble = ({
  name,
  id,
  removePlayer,
  label,
  color,
}: PlayerBubbleProps) => {
  const theme = useTheme()
  const themedStyle = styles(theme)
  const onPressEvent = () => removePlayer && removePlayer(id)

  return (
    <View style={themedStyle.playerBubble}>
      <Text type="title" variant="light">
        {name}
      </Text>
      <TouchableOpacity onPress={onPressEvent}>
        <View
          style={[
            themedStyle.checked,
            { borderColor: color ? color : theme.colors.textLight },
          ]}
        >
          <Text
            type="subheading"
            variant="light"
            align="center"
            style={{
              marginBottom: theme.spacings.padding,
              color: color ? color : theme.colors.textLight,
            }}
          >
            {label}
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
      height: spacings.padding * 4,
      borderRadius: spacings.padding * 3,
      padding: spacings.padding * 0.5,
      paddingLeft: spacings.padding,
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
      width: spacings.padding * 2.5,
      height: spacings.padding * 2.5,
      borderRadius: spacings.padding * 2.5,
      borderWidth: 2,
      borderColor: colors.textLight,
    },
  })
