import * as Linking from "expo-linking"

export default {
  prefixes: [Linking.makeUrl("/")],
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
