// Naviagtion

export type RootStackParamList = {
  Root: undefined
  NotFound: undefined
  StartScreen: undefined
  SelectTableScreen: undefined
}

export type BottomTabParamList = {
  TabOne: undefined
  TabTwo: undefined
}

export type TabOneParamList = {
  TabOneScreen: undefined
}

export type TabTwoParamList = {
  TabTwoScreen: undefined
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

export type Naipes = "copas" | "ouros" | "espadas" | "paus"

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
  placar: Placar[]
  naipes: Naipes[]
}

export type Placar = {
  player_id: string
  acertou: number
  errou: number
  placar: number[]
  final: number
}
