// UI -----------------------

export type Toast = {
  id: string
  variant: "success" | "error" | "info" | "warning"
  content: string
  duration?: number
  tryAgain?: () => void
  label?: string
}

export type Tab = {
  id: string
  label: string
}

export type Legend = {
  label: string
  color: string
}

// Game -----------------------

export enum Naipes {
  COPAS = "copas",
  OUROS = "ouros",
  ESPADAS = "espadas",
  PAUS = "paus",
  UNDEFINED = "",
}
export enum GameType {
  NORMAL = "normal",
  NOVO = "novo",
  SHORT = "short",
  UNDEFINED = "",
}

export type Table = {
  id: string
  name: string
  players: string[]
  used?: number
}

export type Player = {
  id: string
  name: string
  games: string[] //Game id
}

export type Game = {
  id: string
  table: string //table id
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
