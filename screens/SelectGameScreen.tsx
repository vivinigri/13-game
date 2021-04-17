import React, { useCallback, useState } from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "react-native-paper"
import { StackScreenProps } from "@react-navigation/stack"
import { Table, GameType } from "@types"
import { GradientView, Text, TopView } from "@components"
import BottomMenu from "@components/Footers/BottomMenu"
import GameCard from "@components/Cards/GameCard"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { RootStackParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"
import { RoundedScrollView } from "@components/Themed"

type Props = StackScreenProps<RootStackParamList, RouteNames.SelectGameScreen>

const SelectGameScreen = ({ navigation, route }: Props) => {
  const tables: Table[] = useSelector(({ global }: RootState) => global.tables)
  const { id } = route.params

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [checked, setChecked] = useState<GameType>(GameType.UNDEFINED)

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
    const max = maxCards()
    const nPlayers = numPlayers()
    dispatch.current.initPlacar()
    dispatch.current.setType(checked)
    /* dispatch.current.setRounds(2)
    dispatch.current.setHands([1, 2]) */
    dispatch.current.setRounds(
      checked === GameType.NORMAL ? 2 * max - 1 : max - 1 + nPlayers
    )
    dispatch.current.setHands(
      checked === GameType.NOVO ? handsNovo(max, nPlayers) : handsNormal(max)
    )
    navigation.navigate(RouteNames.OrderPlayersScreen)
  }

  return (
    <GradientView>
      <TopView
        title="Selecione o tipo de jogo"
        subtitle={`Máximo de ${maxCards()} cartas por jogadores`}
      />
      <RoundedScrollView>
        <View style={[themedStyle.mainContainer, { alignItems: "center" }]}>
          <GameCard
            type={GameType.NORMAL}
            title="Sobe e Desce"
            description="Vai ao máximo e volta ao mínimo"
            setChecked={setChecked}
            checked={checked === GameType.NORMAL}
          />
          <GameCard
            type={GameType.NOVO}
            title="Sobe e Fica"
            description={`Vai ao máximo e repete ${numPlayers()}X`}
            setChecked={setChecked}
            checked={checked === GameType.NOVO}
          />
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
