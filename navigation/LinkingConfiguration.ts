import * as Linking from "expo-linking"

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      StartScreen: "start",
      SelectTableScreen: "mesas",
      SelectPlayersScreen: "jogadores",
      SelectGameScreen: "game",
      OrderPlayersScreen: "order",
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: "one",
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: "two",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
}
