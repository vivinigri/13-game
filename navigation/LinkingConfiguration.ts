import * as Linking from "expo-linking"
import { RouteNames, NavigationNames } from "@navigation/RouteNames"

export default {
  prefixes: [
    Linking.makeUrl("/"),
    "https://vivinigri.github.io/13-game",
    "https://vivinigri.github.io",
  ],
  config: {
    initialRouteName: NavigationNames.Root,
    screens: {
      [NavigationNames.Root]: {
        path: "13-game",
        initialRouteName: RouteNames.StartScreen,
        screens: {
          [RouteNames.StartScreen]: "start",
          [RouteNames.SelectTableScreen]: "mesas",
          [RouteNames.SelectPlayersScreen]: "jogadores/:mesa",
          [RouteNames.SelectGameScreen]: "match/type/:id",
          [RouteNames.OrderPlayersScreen]: "order",
        },
      },
      [NavigationNames.Tabs]: {
        path: "13-game/game",
        screens: {
          [RouteNames.Apostas]: {
            screens: {
              [RouteNames.ApostasScreen]: "apostas",
              [RouteNames.ResultadosScreen]: "resultados",
              [RouteNames.GameOverScreen]: "gameOver",
            },
          },
          [RouteNames.Tabela]: {
            screens: {
              [RouteNames.TabelaScreen]: "tabela",
            },
          },
          [RouteNames.Stats]: {
            screens: {
              [RouteNames.StatsScreen]: "stats",
            },
          },
        },
      },
      [RouteNames.NotFoundScreen]: "*",
    },
  },
}
