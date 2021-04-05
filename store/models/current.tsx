import { Dispatch } from ".."
import { Player, Table, Game, Placar } from "@types"
import { getData, storeData, removeData } from "@core/services/asyncStorage"

export type CurrentState = {
  players: Player[]
  table: Table
  game: Game
  placar: Placar[]
  error: string
}

export type CurrentModel = {
  state: CurrentState
  reducers: {}
  effects: (dispatch: Dispatch) => {}
}

const defaultTable: Table = { id: "", name: "", players: [], used: 0 }

export const current: CurrentModel = {
  state: {
    players: [],
    table: defaultTable,
    game: { table: defaultTable, rounds: [], placar: [], naipes: [] },
    placar: [],
    error: "",
  },
  reducers: {},
  effects: (dispatch: Dispatch) => ({}),
}
