import { Dispatch } from ".."
import { Player, Table, Game, Placar, Naipes } from "@types"
import { getData, storeData, removeData } from "@core/services/asyncStorage"

// TODO ao terminar o jogo, transformar esses dados em new Game e salvar no localStorage GLOBAL,
// ao longo do jogo ir salvando no LocalStorage CURRENT
export type CurrentState = {
  players: Player[]
  table: Table
  // game: Game
  type: string
  rounds: number
  placar: Placar[]
  naipes: Naipes[]
  error: string
  hands: number[]
  currentRound: number
}

export type CurrentModel = {
  state: CurrentState
  reducers: {
    setTable: (state: CurrentState, table: Table) => CurrentState
    setPlayers: (state: CurrentState, players: Player[]) => CurrentState
    setType: (state: CurrentState, type: string) => CurrentState
    setHands: (state: CurrentState, hands: number[]) => CurrentState
    setRounds: (state: CurrentState, rounds: number) => CurrentState
  }
  effects: (dispatch: Dispatch) => {}
}

const defaultTable: Table = { id: "", name: "", players: [], used: 0 }

export const current: CurrentModel = {
  state: {
    players: [],
    table: defaultTable,
    placar: [],
    naipes: [],
    rounds: 0,
    type: "normal",
    hands: [],
    currentRound: 0,
    error: "",
  },
  reducers: {
    setTable: (state: CurrentState, table: Table) => {
      return {
        ...state,
        table,
      }
    },
    setPlayers: (state: CurrentState, players: Player[]) => {
      return {
        ...state,
        players,
      }
    },
    setType: (state: CurrentState, type: string) => {
      return {
        ...state,
        type,
      }
    },
    setHands: (state: CurrentState, hands: number[]) => {
      return {
        ...state,
        hands,
      }
    },
    setRounds: (state: CurrentState, rounds: number) => {
      return {
        ...state,
        rounds,
      }
    },
  },
  effects: (dispatch: Dispatch) => ({}),
}
