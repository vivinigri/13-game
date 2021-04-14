import React, { useCallback, useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { Formik } from "formik"
import { useTheme } from "react-native-paper"
import { StackScreenProps } from "@react-navigation/stack"
import { Player, Table } from "@types"
import { GradientView, Text, TopView } from "@components"
import BottomMenu from "@components/Footers/BottomMenu"
import { RoundedScrollView } from "@components/Themed"
import PlayerCard from "@components/Cards/PlayerCard"
import PlayerBubble from "@components/Cards/PlayerBubble"
import BallButton from "@components/Buttons/BallButton"
import Loading from "@components/Loading"
import { RootState, dispatch } from "@store"
import { GlobalState } from "@store/models/global"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { RootStackParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"

type Props = StackScreenProps<
  RootStackParamList,
  RouteNames.SelectPlayersScreen
>

const SelectPlayersScreen = ({ navigation, route }: Props) => {
  const global: GlobalState = useSelector(({ global }: RootState) => global)
  const { players } = global

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [loading, setLoading] = useState<boolean>(false)
  const [jogadores, setJogadores] = useState<string[]>([])
  const [search, setSearch] = useState<string>("")

  /* useFocusEffect(
    useCallback(() => {
      dispatch.global.getTables()
      dispatch.global.getPlayers()
    }, [])
  ) */

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

  const createTable = async () => {
    const payload: any = {
      name: route.params.mesa,
      players: jogadores,
    }
    const newTable: string = await dispatch.global.createNewTable(payload)
    const table: Table = global.tables.filter((t) => t.id === newTable)[0]
    dispatch.current.setTable(table)
    const players = global.players.filter((p) =>
      table.players.some((t) => t === p.id)
    )
    dispatch.current.setPlayers(players)
    navigation.navigate(RouteNames.SelectGameScreen, { id: newTable })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <GradientView>
      <TopView
        title={`Quem tá na mesa ${route.params.mesa}?`}
        subtitle="Busque jogadores ou crie novos"
      >
        <Formik
          initialValues={{ name: "" }}
          onSubmit={(values) => {
            createNewJogador(values.name)
          }}
        >
          {({ handleBlur, handleSubmit, values, setFieldValue }) => (
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
                label="+"
                onPress={(values: any) => handleSubmit(values)}
              />
            </View>
          )}
        </Formik>
        <View style={themedStyle.bubblesContainer}>
          {jogadores.length
            ? jogadores.map((j) => (
                <PlayerBubble
                  key={j}
                  id={j}
                  label="✗"
                  name={
                    players.filter((p) => p.id === j)[0]?.name || "Undefined"
                  }
                  removePlayer={removePlayer}
                />
              ))
            : null}
        </View>
      </TopView>

      <RoundedScrollView>
        <View style={[themedStyle.mainContainer, { alignItems: "center" }]}>
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
          onConfirm={createTable}
          confirmLabel="Continuar ➝"
          disabled={jogadores.length < 3}
        />
      </RoundedScrollView>
    </GradientView>
  )
}

export default SelectPlayersScreen

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
    bubblesContainer: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: spacings.padding * 0.5,
    },
  })
