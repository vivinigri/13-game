// Naviagtion

export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
  StartScreen: undefined
  SelectTableScreen: undefined
  SelectPlayersScreen: {
    mesa: string
  }
  SelectGameScreen: {
    id: string
  }
  OrderPlayersScreen: undefined
}

export type BottomTabParamList = {
  Apostas: undefined
  Tabela: undefined
  Stats: undefined
}

export type ApostasParamList = {
  ApostasScreen: undefined
  ResultadosScreen: undefined
}

export type TabelaParamList = {
  TabelaScreen: undefined
}

export type StatsParamList = {
  StatsScreen: undefined
}

// Toast

export type Toast = {
  id: string
  variant: "success" | "error" | "info" | "warning"
  content: string
  duration?: number
  tryAgain?: () => void
  label?: string
}

// Game -----------------------

export type Naipes = "copas" | "ouros" | "espadas" | "paus" | ""
export type GameType = "normal" | "novo"

export type Table = {
  id: string
  name: string
  players: string[]
  used?: number
}

export type Player = {
  id: string
  name: string
  games: Game[]
}

export type Game = {
  table: Table
  rounds: number[]
  type: GameType
  naipes: Naipes[]
  placar: Placar
}

export type PlacarObject = {
  acertou: number
  errou: number
  placar: number[]
  final: number
  apostas: number[]
  acertos: number[]
}

export type Placar = {
  [player_id: string]: PlacarObject
}
