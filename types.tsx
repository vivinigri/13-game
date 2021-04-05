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

export type Toast = {
  id: string
  variant: "success" | "error" | "info" | "warning"
  content: string
  duration?: number
  tryAgain?: () => void
  label?: string
}

export enum Naipes {
  COPAS = 0,
  OUROS = 1,
  ESPADAS = 2,
  PAUS = 3,
}

export type Table = {
  id: string
  name: string
  players: string[]
  used: number
}

export type Player = {
  id: string
  name: string
  games: Game[]
}

export type Game = {
  players: string[]
  points: number[]
  naipes: number[]
}
