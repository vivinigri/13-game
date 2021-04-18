import React, { useCallback, useState, useLayoutEffect, useMemo } from "react"
import { StyleSheet, View } from "react-native"
import { useTheme } from "react-native-paper"
import { DrawerScreenProps } from "@react-navigation/drawer"
import { Naipes } from "@types"
import { GradientView, TopView, Text } from "@components"
import { CurrentState } from "@store/models/current"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { TrunfoCard, ApostaCard, PlayerBubble } from "@components/Cards"
import BottomMenu from "@components/Footers/BottomMenu"
import { ApostasParamList, ApostasScreenParam } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"
import { RoundedScrollView } from "@components/Themed"
import { HeaderMenuButton } from "@components/Buttons"

type Props = DrawerScreenProps<ApostasParamList, RouteNames.ApostasScreen>

const ApostasScreen = ({ navigation, route }: Props) => {
  const current: CurrentState = useSelector(({ current }: RootState) => current)
  const { currentRound, players, hands } = current
  const type: ApostasScreenParam = route.params
    ? route.params.type
    : ApostasScreenParam.NORMAL

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [trunfo, setTrunfo] = useState<Naipes>(Naipes.UNDEFINED)
  const [aposta, setAposta] = useState<number[]>([])
  const [index, setIndex] = useState<number>(0)

  useFocusEffect(
    useCallback(() => {
      setTrunfo(Naipes.UNDEFINED)
      setAposta([])
      setIndex(0)

      if (type === ApostasScreenParam.RESET) {
        dispatch.current.setApostas(aposta)
      } else if (type === ApostasScreenParam.RESTART) {
        dispatch.current.initPlacar()
        dispatch.current.setCurrentRound(0)
      }
    }, [currentRound, type])
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderMenuButton onPress={() => navigation.toggleDrawer()} />
      ),
    })
  }, [navigation])

  const confirmAposta = (id: string, value: number) => {
    const newApostas = [...aposta]
    newApostas[index] = value
    setAposta(newApostas)
    if (index < players.length - 1) {
      setIndex(index + 1)
    }
  }

  const cancelAposta = () => {
    const newApostas = [...aposta]
    newApostas.pop()
    setAposta(newApostas)
    setIndex(index - 1)
  }

  const closeApostas = async () => {
    await dispatch.current.setApostas(aposta)
    await dispatch.current.addNaipe(trunfo)
    navigation.navigate(RouteNames.ResultadosScreen)
  }

  const showErrorMessage = useMemo(
    () => aposta.length === players.length && trunfo === Naipes.UNDEFINED,
    [trunfo, players.length, aposta.length]
  )

  return (
    <GradientView>
      <TopView
        title={`${hands[current.currentRound]} carta${
          hands[current.currentRound] > 1 ? "s" : ""
        }`}
        subtitle={`${
          players[players.length - 1].name
        } distribui - Façam suas apostas!`}
      />

      <RoundedScrollView>
        <View
          style={[
            themedStyle.mainContainer,
            { alignItems: "center", zIndex: 10 },
          ]}
        >
          <TrunfoCard trunfo={trunfo} setTrunfo={setTrunfo} />
          <ApostaCard
            name={players[index].name}
            id={players[index].id}
            numCards={hands[currentRound]}
            selected={aposta[index] || null}
            index={index}
            confirm={confirmAposta}
            cancel={cancelAposta}
            totalPlayers={players.length}
            totalApostas={aposta.length ? aposta.reduce((a, b) => a + b) : 0}
          />
          <View style={themedStyle.bubblesContainer}>
            {aposta.map((a: number, i: number) => (
              <PlayerBubble
                key={i}
                color={theme.colors.hover}
                label={a.toString()}
                name={players[i].name}
                id={players[i].id}
              />
            ))}
          </View>
        </View>
        {showErrorMessage ? (
          <Text
            type="title"
            align="center"
            variant="error"
            family="bold"
            style={{ marginTop: theme.spacings.padding * 2 }}
          >
            Selecione o trunfo da rodada.
          </Text>
        ) : null}
        <BottomMenu
          onConfirm={closeApostas}
          confirmLabel="Confirmar"
          disabled={
            trunfo === Naipes.UNDEFINED ||
            index < players.length - 1 ||
            aposta.length < players.length
          }
        />
      </RoundedScrollView>
    </GradientView>
  )
}

export default ApostasScreen

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: "flex-start",
      width: "100%",
      maxWidth: 600,
    },
    bubblesContainer: {
      flexDirection: "row",
      maxWidth: "100%",
      flexWrap: "wrap",
      justifyContent: "center",
    },
  })
