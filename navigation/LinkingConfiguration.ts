import * as Linking from "expo-linking"
import { RouteNames } from "@navigation/RouteNames"

export default {
  prefixes: [
    Linking.makeUrl("/"),
    "https://vivinigri.github.io/13-game",
    "https://vivinigri.github.io",
  ],
  config: {
    // path: "13-game",
    initialRouteName: RouteNames.StartScreen,
    screens: {
      [RouteNames.StartScreen]: "start",
      [RouteNames.SelectTableScreen]: "mesas",
      [RouteNames.SelectPlayersScreen]: "jogadores/:mesa",
      [RouteNames.SelectGameScreen]: "game/type/:id",
      [RouteNames.OrderPlayersScreen]: "order",
      [RouteNames.Root]: {
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
