import { RouteNames, NavigationNames } from "@navigation/RouteNames"
import { NavigatorScreenParams } from "@react-navigation/native"

export type RootStackParamList = {
  [RouteNames.StartScreen]: undefined
  [RouteNames.SelectTableScreen]: undefined
  [RouteNames.SelectPlayersScreen]: {
    mesa: string
  }
  [RouteNames.SelectGameScreen]: {
    id: string
  }
  [RouteNames.OrderPlayersScreen]: undefined
}

export type MainStackParamList = {
  [RouteNames.Root]: undefined
  [RouteNames.Tabs]: undefined
  [RouteNames.NotFoundScreen]: undefined
}

export type BottomTabParamList = {
  [RouteNames.Apostas]: undefined
  [RouteNames.Tabela]: undefined
  [RouteNames.Stats]: undefined
}

export type ApostasParamList = {
  [RouteNames.ApostasScreen]: undefined
  [RouteNames.ResultadosScreen]: undefined
  [RouteNames.GameOverScreen]: undefined
}

export type TabelaParamList = {
  [RouteNames.TabelaScreen]: undefined
}

export type StatsParamList = {
  [RouteNames.StatsScreen]: undefined
}

export type NaviagtorParamList = {
  [NavigationNames.Tabs]: NavigatorScreenParams<BottomTabParamList>
  [NavigationNames.Root]: NavigatorScreenParams<RootStackParamList>
}
