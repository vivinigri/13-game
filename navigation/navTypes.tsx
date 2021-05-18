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
  [RouteNames.SobreScreen]: undefined
  [RouteNames.SettingsScreen]: undefined
}

export type MainStackParamList = {
  [RouteNames.Root]: undefined
  [RouteNames.Tabs]: undefined
  [RouteNames.Drawer]: undefined
  [RouteNames.NotFoundScreen]: undefined
}

export type DrawerParamList = {
  [RouteNames.Drawer]: undefined
}

export type BottomTabParamList = {
  [RouteNames.Apostas]: undefined
  [RouteNames.Tabela]: undefined
  [RouteNames.Stats]: undefined
}

export type ApostasParamList = {
  [RouteNames.ApostasScreen]: {
    type: ApostasScreenParam
  }
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
  [NavigationNames.Drawer]: NavigatorScreenParams<DrawerParamList>
}

export enum ApostasScreenParam {
  NEW = "new",
  RESET = "reset",
  RESTART = "restart",
  NORMAL = "normal",
}
