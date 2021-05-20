import React, { useCallback } from "react"
import Text from "@components/Text"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { useTheme } from "react-native-paper"
import { Table } from "@types"
import { Ionicons } from "@expo/vector-icons"
import { dispatch } from "@store"
import { useNavigation } from "@react-navigation/native"
import { RouteNames } from "@navigation/RouteNames"

type TableCardProps = {
  table: Table
}

const TableEdit = ({ table }: TableCardProps) => {
  const theme = useTheme()
  const themedStyle = styles(theme)
  const navigation = useNavigation()

  const confirmDeleteTable = useCallback(() => {
    dispatch.toasts.show({
      variant: "error",
      content: `Deseja deletar a mesa ${table.name}?`,
      label: "Sim",
      tryAgain: dispatch.global.deleteTable({ id: table.id }),
    })
  }, [table])

  const editTable = useCallback(
    () => navigation.navigate(RouteNames.TableEditScreen, { id: table.id }),
    [table]
  )

  return (
    <View style={[themedStyle.tableCard, { width: "90%" }]}>
      <TouchableOpacity
        style={[themedStyle.checked, { borderColor: theme.colors.red }]}
        onPress={confirmDeleteTable}
      >
        <Ionicons size={30} name="ios-close" color={theme.colors.red} />
      </TouchableOpacity>
      <View style={{ width: "70%" }}>
        <Text
          type="header"
          variant={"white"}
          align="center"
          style={{
            marginBottom: theme.spacings.padding,
          }}
        >
          {table.name}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            type="caption"
            variant="white"
            align="center"
            style={{
              marginBottom: theme.spacings.padding,
            }}
          >
            ({table.players.length}){" "}
          </Text>
          <Text
            type="caption"
            variant="light"
            align="center"
            style={{
              marginBottom: theme.spacings.padding,
            }}
          >
            {table.players.toString()}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={[themedStyle.checked, { borderColor: theme.colors.green }]}
        onPress={editTable}
      >
        <Ionicons size={20} name="ios-create" color={theme.colors.green} />
      </TouchableOpacity>
    </View>
  )
}

export default TableEdit

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    tableCard: {
      backgroundColor: colors.primary,
      width: "85%",
      marginVertical: spacings.padding,
      padding: spacings.padding,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: colors.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    checked: {
      width: 40,
      height: 40,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: colors.textLight,
      justifyContent: "center",
      alignItems: "center",
    },
  })
