import { Dispatch, RootState } from ".."
import { Player, Table, Game, Placar } from "@types"
import {
  getData,
  storeData,
  removeData,
  getMockedData,
} from "@core/services/asyncStorage"
import { generateQuickGuid } from "@core/helpers/generateRandomString"

export type GlobalState = {
  players: Player[]
  tables: Table[]
  games: Game[]
  error: string
}

export type GlobalModel = {
  state: GlobalState
  reducers: {
    setPlayers: (state: GlobalState, players: Player[]) => GlobalState
    setTables: (state: GlobalState, tables: Table[]) => GlobalState
    setError: (state: GlobalState, error: string) => GlobalState
  }
  effects: (
    dispatch: Dispatch
  ) => {
    /* getPlayers: (rootState: RootState) => Player[]
    getTables: (rootState: RootState) => Table[] */
    createNewPlayer: (payload: string, rootState?: any) => string
    createNewTable: (payload: any, rootState?: any) => string
    // fetchPlayers: (payload?: any, rootState?: any) => void
  }
}

export const global: GlobalModel = {
  state: {
    players: [],
    tables: [],
    games: [],
    error: "",
  },
  reducers: {
    setPlayers: (state: GlobalState, players: Player[]) => {
      return {
        ...state,
        players,
      }
    },
    setTables: (state: GlobalState, tables: Table[]) => {
      return {
        ...state,
        tables,
      }
    },
    setError: (state: GlobalState, error: string) => {
      return {
        ...state,
        error,
      }
    },
  },
  effects: (dispatch: Dispatch) => ({
    /* getPlayers(rootState: RootState) {
      return rootState.global.players
    },
    getTables(rootState: RootState) {
      return rootState.global.tables
    }, */
    async createNewPlayer(payload: string, rootState?: any) {
      const { players } = rootState.global
      try {
        const newId = generateQuickGuid("player")
        const newPlayer: Player = {
          id: newId,
          name: payload ? payload : "",
          games: [],
        }
        const newPlayers = [...players, newPlayer]
        dispatch.global.setPlayers(newPlayers)
        return newId
      } catch (error) {
        dispatch.global.setError(error.message)
        return "error"
      }
    },
    async createNewTable(payload: any, rootState?: any) {
      const { tables } = rootState.global
      try {
        const newId = generateQuickGuid("table")
        const newTable: Table = {
          id: newId,
          name: payload.name,
          players: payload.players,
          used: 0,
        }
        const newTables = [...tables, newTable]
        dispatch.global.setTables(newTables)
        return newId
      } catch (error) {
        dispatch.global.setError(error.message)
        return "error"
      }
    },
    /* async fetchPlayers(payload?: any, rootState?: any) {
      try {
        //getData
        const players = await getMockedData("globalPlayers")
        dispatch.global.setPlayers(players ? players : [])
      } catch (error) {
        dispatch.global.setError(error.message)
      }
    },
    async fetchTables(payload?: any, rootState?: any) {
      try {
        const tables = await getMockedData("globalTables")
        dispatch.global.setTables(tables ? tables : [])
      } catch (error) {
        dispatch.global.setError(error.message)
      }
    }, */
  }),
}
