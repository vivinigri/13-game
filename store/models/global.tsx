import { Dispatch, RootState } from ".."
import { Player, Table, Game, Placar } from "@types"
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
    addGame: (state: GlobalState, game: Game) => GlobalState
  }
  effects: (dispatch: Dispatch) => {
    createNewPlayer: (payload: string, rootState?: any) => string
    createNewTable: (
      payload: { mesa: string; players: string[] },
      rootState?: any
    ) => string
    saveCurrentGame: (payload?: any, rootState?: any) => void
    deleteTable: (payload: { id: string }, rootState?: any) => void
    updateTable: (
      payload: { id: string; name: string; players: string[] },
      rootState?: any
    ) => void
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
    addGame: (state: GlobalState, game: Game) => {
      return {
        ...state,
        games: [...state.games, game],
      }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async saveCurrentGame(payload?: any, rootState?: any) {
      const { players } = rootState.global
      const { table, type, naipes, placar } = rootState.current
      try {
        const newId: string = generateQuickGuid("game")
        const newGame: Game = {
          id: newId,
          table: table.id,
          type,
          naipes,
          placar,
        }
        dispatch.global.addGame(newGame)

        const allPlayers = [...players]
        const curPlayers = Object.keys(placar)
        allPlayers.map((a) => {
          if (curPlayers.some((c) => c === a.id)) {
            a.games.push(newId)
          }
        })
        dispatch.global.setPlayers(allPlayers)
      } catch (error) {
        dispatch.global.setError(error.message)
        return "error"
      }
    },
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
    async deleteTable(payload: any, rootState?: any) {
      const { tables } = rootState.global
      const { id } = payload
      try {
        dispatch.global.setTables(tables.filter((t: Table) => t.id !== id))
      } catch (error) {
        dispatch.global.setError(error.message)
        return "error"
      }
    },
    async updateTable(payload: any, rootState?: any) {
      const { tables } = rootState.global
      const { id, name, players } = payload

      try {
        const newTables = tables.map((t: Table) => {
          if (t.id === id) {
            return { ...t, name, players }
          }
          return t
        })
        console.log("newTables", newTables)
        dispatch.global.setTables(newTables)
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
