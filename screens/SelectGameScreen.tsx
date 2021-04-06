import React, { useCallback, useState } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { useTheme } from "react-native-paper"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParamList, Table } from "@types"
import Text from "@components/Text"
import GradientView from "@components/GradientView"
import BottomMenu from "@components/Footers/BottomMenu"
import TitleHeader from "@components/Headers/TitleHeader"
import RoundedHeaderDecoration from "@components/Headers/RoundedHeaderDecoration"
import GameCard from "@components/Cards/GameCard"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"

type Props = StackScreenProps<RootStackParamList, "SelectGameScreen">

const SelectGameScreen = ({ navigation, route }: Props) => {
  const tables: Table[] = useSelector(({ global }: RootState) => global.tables)
  const { id } = route.params

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [checked, setChecked] = useState<string>("")

  const maxCards = useCallback(() => {
    const table = tables.filter((t) => t.id === id)[0]
    const numPlayers = table.players.length
    return Math.floor(52 / numPlayers)
  }, [id, tables])

  const numPlayers = useCallback(() => {
    const table = tables.filter((t) => t.id === id)[0]
    return table.players.length
  }, [id, tables])

  const handsNormal = useCallback((max: number) => {
    const ida = Array.from({ length: max }, (_, i) => i + 1)
    const volta = Array.from({ length: max - 1 }, (_, i) => i + 1).reverse()
    return ida.concat(volta)
  }, [])

  const handsNovo = useCallback((max: number, players: number) => {
    const ida = Array.from({ length: max }, (_, i) => i + 1)
    const repete = Array.from({ length: players - 1 }, (_, i) => max)
    return ida.concat(repete)
  }, [])

  const goToNext = () => {
    const table = tables.filter((t) => t.id === id)[0]
    const max = maxCards()
    const nPlayers = numPlayers()
    dispatch.current.setTable(table)
    dispatch.current.setType(checked)
    dispatch.current.setRounds(
      checked === "normal" ? 2 * max - 1 : max - 1 + nPlayers
    )
    dispatch.current.setHands(
      checked === "normal" ? handsNormal(max) : handsNovo(max, nPlayers)
    )
    navigation.navigate("OrderPlayersScreen")
  }

  return (
    <GradientView>
      <TitleHeader title="Jogo" />
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
          Selecione o tipo de jogo
        </Text>
        <Text
          type="title"
          align="center"
          variant="white"
          style={{
            marginBottom: theme.spacings.padding * 2,
          }}
        >
          {`Máximo de ${maxCards()} cartas por jogadores`}
        </Text>
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
            <GameCard
              type="normal"
              title="Sobe e Desce"
              description="Vai ao máximo e volta ao mínimo"
              setChecked={setChecked}
              checked={checked === "normal"}
            />
            <GameCard
              type="novo"
              title="Sobe e Fica"
              description={`Vai ao máximo e repete ${numPlayers()}X`}
              setChecked={setChecked}
              checked={checked === "novo"}
            />
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

export default SelectGameScreen

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
  })
