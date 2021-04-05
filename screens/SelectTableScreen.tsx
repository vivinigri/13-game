import React, { useCallback, useState, useEffect } from "react"
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { Formik } from "formik"
import { useTheme } from "react-native-paper"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList, Table } from "@types"
import Text from "@components/Text"
import GradientView from "@components/GradientView"
import BottomMenu from "@components/Footers/BottomMenu"
import TitleHeader from "@components/Headers/TitleHeader"
import RoundedHeaderDecoration from "@components/Headers/RoundedHeaderDecoration"
import TableCard from "@components/Cards/TableCard"
import { GlobalState } from "@store/models/global"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"

type Props = StackScreenProps<RootStackParamList, "SelectTableScreen">

const SelectTableScreen = ({ navigation }: Props) => {
  const global: GlobalState = useSelector(({ global }: RootState) => global)
  const { tables, players } = global

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [checked, setChecked] = useState<string>("")
  const [search, setSearch] = useState<string>("")
  const [allTables, setAllTables] = useState<Table[]>([])

  useFocusEffect(
    useCallback(() => {
      dispatch.global.getTables()
      dispatch.global.getPlayers()
    }, [])
  )

  useEffect(() => {
    const myTables: Table[] = []
    tables.map((t) => {
      const names = players
        .filter((p) => t.players.includes(p.id))
        .map((m) => m.name)
      myTables.push({
        id: t.id,
        name: t.name,
        players: names,
      })
    })
    setAllTables(myTables)
  }, [tables, players])

  const createNewTable = (mesa: string) => {
    if (tables.some((t) => t.name === mesa)) {
      dispatch.toasts.show({
        variant: "error",
        content: `Já existe uma mesa com o nome ${mesa}`,
      })
    } else if (mesa.length === 0) {
      dispatch.toasts.show({
        variant: "error",
        content: `Nome da mesa é obrigatório`,
      })
    } else {
      // TODO navigate NewTableScreen
    }
  }

  const goToNext = () => navigation.navigate("StartScreen")

  return (
    <GradientView>
      <TitleHeader title="Mesa" />
      <View style={themedStyle.mainContainer}>
        <Text
          type="header"
          align="center"
          variant="white"
          family="bold"
          style={{
            marginBottom: theme.spacings.padding,
          }}
        >
          Quem vai jogar?
        </Text>
        <Text
          type="title"
          align="center"
          variant="white"
          style={{
            marginBottom: theme.spacings.padding * 2,
          }}
        >
          Busque uma mesa ou crie uma nova
        </Text>
        <Formik
          initialValues={{ mesa: "" }}
          onSubmit={(values) => createNewTable(values.mesa)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <View>
              <TextInput
                style={themedStyle.input}
                onBlur={handleBlur("mesa")}
                onChangeText={(value) => {
                  setFieldValue("mesa", value)
                  setSearch(value)
                }}
                value={values.mesa}
                placeholder="Nome da mesa"
                textAlign="center"
              />
              <TouchableOpacity onPress={(values: any) => handleSubmit(values)}>
                <View style={themedStyle.addButton}>
                  <Text
                    type="mainheading"
                    align="center"
                    variant="white"
                    family="bold"
                  >
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      <View style={{ width: "100%", flex: 1 }}>
        <RoundedHeaderDecoration backgroundColor={theme.colors.textLight} />
        <ScrollView
          contentContainerStyle={{ alignItems: "center" }}
          style={[
            {
              backgroundColor: theme.colors.textLight,
              marginBottom: 70,
              height: 300,
            },
          ]}
        >
          <View style={[themedStyle.mainContainer, { alignItems: "center" }]}>
            {!!allTables.length ? (
              allTables
                .filter((a) =>
                  search === ""
                    ? true
                    : a.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((table: Table) => (
                  <TableCard
                    key={table.id}
                    table={table}
                    setChecked={setChecked}
                    checked={checked === table.id}
                  />
                ))
            ) : (
              <Text
                type="title"
                align="center"
                variant="dark"
                style={{
                  marginBottom: theme.spacings.padding * 2,
                }}
              >
                Nenhuma mesa...
              </Text>
            )}
          </View>
        </ScrollView>
      </View>

      <BottomMenu
        onConfirm={goToNext}
        confirmLabel="Continuar ➝"
        disabled={checked !== "" ? false : true}
      />
    </GradientView>
  )
}

export default SelectTableScreen

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: "flex-start",
      width: "100%",
      maxWidth: 600,
    },
    input: {
      height: 50,
      color: colors.white,
      borderColor: colors.yellow,
      backgroundColor: colors.backdrop,
      padding: spacings.padding,
      borderRadius: 50,
      marginHorizontal: spacings.padding,
    },
    addButton: {
      backgroundColor: colors.yellow,
      width: 40,
      height: 40,
      borderRadius: 40,
      position: "absolute",
      right: spacings.padding,
      top: -46,
    },
  })
