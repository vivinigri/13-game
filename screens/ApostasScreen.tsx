import React, { useCallback, useState } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { useTheme } from "react-native-paper"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { Player, BottomTabParamList, Naipes } from "@types"
import Text from "@components/Text"
import GradientView from "@components/GradientView"
import BottomMenu from "@components/Footers/BottomMenu"
import TitleHeader from "@components/Headers/TitleHeader"
import RoundedHeaderDecoration from "@components/Headers/RoundedHeaderDecoration"
import { CurrentState } from "@store/models/current"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import TrunfoCard from "@components/Cards/TrunfoCard"
import ApostaCard from "@components/Cards/ApostaCard"
import { DataTable } from "react-native-paper"
import { CardView } from "@components/Themed"
import CircleButton from "@components/Buttons/CircleButton"

type Props = BottomTabScreenProps<BottomTabParamList, "Apostas">

// TODO ao apostar adicionar bubble com nome e aposta abaixa
// TODO btn central de confirmar apostas disabled se nao for ultima pessoa
const ApostasScreen = () => {
  const current: CurrentState = useSelector(({ current }: RootState) => current)
  const { currentRound } = current

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [trunfo, setTrunfo] = useState<Naipes>("")
  const [aposta, setAposta] = useState<number[]>([])
  const [index, setIndex] = useState<number>(0)

  useFocusEffect(
    useCallback(() => {
      setTrunfo("")
    }, [currentRound])
  )

  const goToNext = () => {
    // navigation.navigate("GameScreen")
  }

  return (
    <GradientView>
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
          {`Round ${current.currentRound}/${current.rounds}`}
        </Text>
        <Text type="title" align="center" variant="white">
          Façam suas apostas
        </Text>
      </View>
      <View style={{ width: "100%", flex: 1 }}>
        <RoundedHeaderDecoration backgroundColor={theme.colors.textLight} />
        <ScrollView
          contentContainerStyle={{ alignItems: "center" }}
          style={[
            {
              backgroundColor: theme.colors.textLight,
              // marginBottom: 70,
              height: 300,
            },
          ]}
        >
          <View style={[themedStyle.mainContainer, { alignItems: "center" }]}>
            <TrunfoCard trunfo={trunfo} setTrunfo={setTrunfo} />
            <ApostaCard
              name="Vivian"
              numCards={13}
              selected={null}
              index={index}
            />
          </View>
        </ScrollView>
      </View>
      {/* <BottomMenu
        onConfirm={goToNext}
        confirmLabel="Confirma ➝"
        disabled={false}
      /> */}
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
  })
