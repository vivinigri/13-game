import React from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { useTheme } from "react-native-paper"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"

import { Text, GradientView } from "@components"
import { CurrentState } from "@store/models/current"
import { RootState, dispatch } from "@store"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
import { ActionButton } from "@components/Buttons"
import { ApostasParamList } from "@navigation/navTypes"
import { RouteNames } from "@navigation/RouteNames"

type Props = BottomTabScreenProps<ApostasParamList, RouteNames.GameOverScreen>

export default function GameOverScreen() {
  return <View></View>
}
