import { RouteNames } from "@navigation/RouteNames"

export type RootStackParamList = {
  [RouteNames.Root]: undefined
  [RouteNames.NotFoundScreen]: undefined
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
