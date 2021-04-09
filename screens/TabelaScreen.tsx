import React, { useState, useCallback } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { useTheme } from "react-native-paper"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { TabelaParamList } from "@types"
import { Text, GradientView } from "@components"
import { CurrentState } from "@store/models/current"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"

type Props = BottomTabScreenProps<TabelaParamList, "TabelaScreen">

enum CellType {
  EMPTY = "empty",
  NAME = "name",
  ROUND = "round",
  SCORE = "score",
}

type Cell = {
  type: CellType
  label?: string | number
  won?: boolean | null
}

const TabelaScreen = ({ navigation }: Props) => {
  const current: CurrentState = useSelector(({ current }: RootState) => current)
  const { players, placar, currentRound, hands } = current

  const theme = useTheme()
  const themedStyle = styles(theme)

  const [table, setTable] = useState<Cell[][]>([])

  useFocusEffect(
    useCallback(() => {
      const tabela: Cell[][] = []
      for (let i = 0; i <= hands.length; i++) {
        tabela[i] = []
        for (let j = 0; j <= players.length; j++) {
          if (i == 0 && j === 0) {
            tabela[i][j] = { type: CellType.EMPTY }
          } else if (i === 0) {
            tabela[i][j] = {
              type: CellType.NAME,
              label: players.find((p) => p.id === Object.keys(placar)[j - 1])
                ?.name,
            }
          } else if (j === 0) {
            tabela[i][j] = { type: CellType.ROUND, label: hands[i - 1] }
          } else {
            const cur = Object.values(placar)[j - 1].placar
            tabela[i][j] = {
              type: CellType.SCORE,
              won: cur[i - 1] ? cur[i - 1] > 0 : null,
              label: cur[i - 1]
                ? cur.reduce((a, b, c) => a + (c < i ? b : 0))
                : "",
            }
          }
        }
      }
      console.log("tabela", tabela)
      setTable(tabela)
    }, [currentRound])
  )

  return (
    <GradientView style={{ justifyContent: "flex-start" }}>
      <View style={themedStyle.mainContainer}>
        <ScrollView
          contentContainerStyle={{ marginBottom: 10 }}
          style={{ height: "100vh" }}
        >
          {table &&
            table.map((row: Cell[], i: number) => (
              <View key={`${i}`} style={themedStyle.row}>
                {row.map((cell: Cell, j: number) => {
                  if (cell.type === CellType.EMPTY) {
                    return (
                      <View
                        key={`${i}${j}`}
                        style={[themedStyle.cell, { flex: 1 }]}
                      />
                    )
                  } else if (cell.type === CellType.NAME) {
                    return (
                      <View key={`${i}${j}`} style={themedStyle.cell}>
                        <Text type="label" variant="warning" align="center">
                          {cell.label}
                        </Text>
                      </View>
                    )
                  } else if (cell.type === CellType.ROUND) {
                    return (
                      <View
                        key={`${i}${j}`}
                        style={[themedStyle.cell, { flex: 1 }]}
                      >
                        <Text type="label" variant="warning" align="center">
                          {cell.label}
                        </Text>
                      </View>
                    )
                  } else if (cell.type === CellType.SCORE) {
                    return (
                      <View key={`${i}${j}`} style={themedStyle.cell}>
                        <Text
                          type="title"
                          variant="light"
                          align="center"
                          family="bold"
                        >
                          {cell.label}
                        </Text>
                        {cell.won ? (
                          <Text
                            type="paragraph"
                            variant="green"
                            align="center"
                            family="bold"
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 2,
                            }}
                          >
                            🗸
                          </Text>
                        ) : (
                          cell.won !== null && (
                            <Text
                              type="caption"
                              variant="default"
                              align="center"
                              family="bold"
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 2,
                              }}
                            >
                              ✗
                            </Text>
                          )
                        )}
                      </View>
                    )
                  }
                })}
              </View>
            ))}
        </ScrollView>
      </View>
    </GradientView>
  )
}

export default TabelaScreen

const styles = ({ colors, spacings }: ReactNativePaper.Theme) =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: "flex-start",
      width: "100%",
      flex: 1,
    },
    row: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "nowrap",
    },
    cell: {
      flex: 2,
      borderColor: colors.hover,
      borderWidth: 1,
      height: spacings.padding * 4,
      justifyContent: "center",
    },
  })
