import React, { useCallback, useState } from "react"
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
import { Player, RootStackParamList } from "@types"
import Text from "@components/Text"
import GradientView from "@components/GradientView"
import BottomMenu from "@components/Footers/BottomMenu"
import TitleHeader from "@components/Headers/TitleHeader"
import RoundedHeaderDecoration from "@components/Headers/RoundedHeaderDecoration"
import PlayerCard from "@components/Cards/PlayerCard"
import PlayerBubble from "@components/Cards/PlayerBubble"
import BallButton from "@components/Buttons/BallButton"
import Loading from "@components/Loading"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"

type Props = StackScreenProps<RootStackParamList, "SelectPlayersScreen">

const SelectPlayersScreen = ({ navigation, route }: Props) => {
  const players: Player[] = useSelector(
    ({ global }: RootState) => global.players
  )

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
    navigation.navigate("SelectGameScreen", { id: newTable })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <GradientView>
      <TitleHeader title="Jogadores" />
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
          {`Quem tá na mesa ${route.params.mesa}?`}
        </Text>
        <Text
          type="title"
          align="center"
          variant="white"
          style={{
            marginBottom: theme.spacings.padding * 2,
          }}
        >
          Busque jogadores ou crie novos
        </Text>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={(values) => {
            createNewJogador(values.name)
          }}
        >
          {({ handleBlur, handleSubmit, values, setFieldValue }) => (
            <View>
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
        </ScrollView>
      </View>

      <BottomMenu
        onConfirm={createTable}
        confirmLabel="Continuar ➝"
        disabled={jogadores.length < 3}
      />
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
