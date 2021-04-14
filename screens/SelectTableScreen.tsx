import React, { useCallback, useState, useEffect } from "react"
import { StyleSheet, TextInput, View, ScrollView, Image } from "react-native"
import { Formik } from "formik"
import { useTheme } from "react-native-paper"
import { StackScreenProps } from "@react-navigation/stack"
import { Table } from "@types"
import { Text, TopView, GradientView } from "@components"
import BottomMenu from "@components/Footers/BottomMenu"
import { RoundedScrollView } from "@components/Themed"
import TableCard from "@components/Cards/TableCard"
import BallButton from "@components/Buttons/BallButton"
import { GlobalState } from "@store/models/global"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { RootStackParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"

type Props = StackScreenProps<RootStackParamList, RouteNames.SelectTableScreen>

const SelectTableScreen = ({ navigation }: Props) => {
  const global: GlobalState = useSelector(({ global }: RootState) => global)
  const { tables, players } = global

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [checked, setChecked] = useState<string>("")
  const [search, setSearch] = useState<string>("")
  const [allTables, setAllTables] = useState<Table[]>([])

  /* useFocusEffect(
    useCallback(() => {
      dispatch.global.fetchTables()
      dispatch.global.fetchPlayers()
    }, [])
  ) */

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
      navigation.navigate(RouteNames.SelectPlayersScreen, { mesa })
    }
  }

  const goToNext = () => {
    const table: Table = allTables.filter((t) => t.id === checked)[0]
    dispatch.current.setTable(table)
    const players = global.players.filter((p) =>
      table.players.some((t) => t === p.name)
    )
    dispatch.current.setPlayers(players)
    navigation.navigate(RouteNames.SelectGameScreen, { id: checked })
  }

  return (
    <GradientView>
      <TopView
        title="Quem vai jogar?"
        subtitle="Busque uma mesa ou crie uma nova"
      >
        <Formik
          initialValues={{ mesa: "" }}
          onSubmit={(values) => createNewTable(values.mesa)}
        >
          {({ handleBlur, handleSubmit, values, setFieldValue }) => (
            <View style={{ marginTop: theme.spacings.padding * 2 }}>
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
              <BallButton
                label="+"
                onPress={(values: any) => handleSubmit(values)}
              />
            </View>
          )}
        </Formik>
      </TopView>

      <RoundedScrollView>
        <View style={themedStyle.cardsContainer}>
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
        <BottomMenu
          onConfirm={goToNext}
          confirmLabel="Continuar ➝"
          disabled={checked !== "" ? false : true}
        />
      </RoundedScrollView>
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
    cardsContainer: {
      justifyContent: "flex-start",
      width: "100%",
      maxWidth: 600,
      alignItems: "center",
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
  })
