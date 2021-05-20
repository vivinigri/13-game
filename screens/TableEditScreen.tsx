import React, { useState, useEffect, useCallback } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { Formik } from "formik"
import { useTheme } from "react-native-paper"
import { StackScreenProps } from "@react-navigation/stack"
import { Text, TopView, GradientView } from "@components"
import PlayerCard from "@components/Cards/PlayerCard"
import PlayerBubble from "@components/Cards/PlayerBubble"
import Loading from "@components/Loading"
import BottomMenu from "@components/Footers/BottomMenu"
import { RoundedScrollView } from "@components/Themed"
import TableCard from "@components/Cards/TableCard"
import BallButton from "@components/Buttons/BallButton"
import { GlobalState } from "@store/models/global"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { RootStackParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"
import { Player, Table } from "@types"
import { useFocusEffect } from "@react-navigation/native"

type Props = StackScreenProps<RootStackParamList, RouteNames.TableEditScreen>

export default function TableEditScreen({ navigation, route }: Props) {
  const global: GlobalState = useSelector(({ global }: RootState) => global)
  const { players, tables } = global
  const { id } = route.params

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [loading, setLoading] = useState<boolean>(false)
  const [jogadores, setJogadores] = useState<string[]>([])
  const [search, setSearch] = useState<string>("")
  const [tableName, setTableName] = useState<string>("")

  useFocusEffect(
    useCallback(() => {
      const table = tables.filter((t: Table) => t.id === id)[0]
      setTableName(table.name)
      setJogadores(table.players)
    }, [id])
  )

  const updateTable = (values) => {
    console.log("jogadores", jogadores)
    dispatch.global.updateTable({
      id,
      name: values.mesa,
      players: jogadores,
    })
    // navigation.goBack()
  }

  const createNewJogador = async (name: string) => {
    if (players.some((t) => t.name === name)) {
      dispatch.toasts.show({
        variant: "error",
        content: `Já existe um jogador com o nome ${name}`,
      })
    } else if (name.length === 0) {
      dispatch.toasts.show({
        variant: "error",
        content: `Nome do jogador é obrigatório`,
      })
    } else {
      setLoading(true)
      const newJogador: string = await dispatch.global.createNewPlayer(name)
      if (newJogador !== "error") {
        addPlayer(newJogador)
        setSearch("")
      }
      setLoading(false)
    }
  }

  const addPlayer = (id: string) => setJogadores([...jogadores, id])
  const removePlayer = (id: string) =>
    setJogadores(jogadores.filter((j) => j !== id))

  if (loading) {
    return <Loading />
  }

  return (
    <GradientView>
      <Formik
        initialValues={{ mesa: "", name: "" }}
        onSubmit={(values) => updateTable(values)}
      >
        {({ handleBlur, handleSubmit, values, setFieldValue }) => (
          <>
            <TopView
              title="Editar mesa"
              subtitle="Modifique nome e seus jogadores"
            >
              <View style={{ marginTop: theme.spacings.padding * 2 }}>
                <TextInput
                  style={themedStyle.input}
                  onBlur={handleBlur("mesa")}
                  onChangeText={(value) => {
                    setFieldValue("mesa", value)
                  }}
                  value={
                    tableName !== values.mesa && values.mesa === ""
                      ? tableName
                      : values.mesa
                  }
                  placeholder="Nome da mesa"
                  textAlign="center"
                />
              </View>
              <View style={{ marginTop: theme.spacings.padding * 2 }}>
                <TextInput
                  style={themedStyle.input}
                  onBlur={handleBlur("name")}
                  onChangeText={(value) => {
                    setFieldValue("name", value)
                    setSearch(value)
                  }}
                  value={values.name}
                  placeholder="Nome do(a) Jogador(a)"
                  textAlign="center"
                />
                <BallButton
                  icon="ios-add"
                  onPress={() => createNewJogador(values.name)}
                />
              </View>
              <View style={themedStyle.bubblesContainer}>
                {jogadores.length
                  ? jogadores.map((j) => (
                      <PlayerBubble
                        key={j}
                        id={j}
                        icon="ios-close"
                        name={
                          players.filter((p) => p.id === j)[0]?.name ||
                          "Undefined"
                        }
                        removePlayer={removePlayer}
                      />
                    ))
                  : null}
              </View>
            </TopView>

            <RoundedScrollView>
              <View
                style={[themedStyle.mainContainer, { alignItems: "center" }]}
              >
                {!!players.length ? (
                  players
                    .filter((a: Player) =>
                      a.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .filter((a: Player) => !jogadores.some((j) => j === a.id))
                    .map((a: Player, i: number) => (
                      <PlayerCard
                        key={i}
                        name={a.name}
                        id={a.id}
                        addPlayer={addPlayer}
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
                    Nenhum jogador...
                  </Text>
                )}
              </View>
              <BottomMenu
                onConfirm={handleSubmit}
                confirmLabel="Save"
                disabled={false}
              />
            </RoundedScrollView>
          </>
        )}
      </Formik>
    </GradientView>
  )
}

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
    bubblesContainer: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: spacings.padding * 0.5,
    },
  })
