import * as Linking from "expo-linking"

export default {
  prefixes: [
    Linking.makeUrl("/"),
    "13-game/",
    "13-game",
    "13-game",
    "https://vivinigri.github.io/13-game",
  ],
  config: {
    screens: {
      StartScreen: "start",
      SelectTableScreen: "mesas",
      SelectPlayersScreen: "jogadores/:mesa",
      SelectGameScreen: "game/type/:id",
      OrderPlayersScreen: "order",
      Root: {
        screens: {
          Apostas: {
            screens: {
              ApostasScreen: "apostas",
              ResultadosScreen: "resultados",
            },
          },
          Tabela: {
            screens: {
              TabelaScreen: "tabela",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
}
