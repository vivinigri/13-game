import { Dispatch } from ".."
import { Player, Table, Game, Placar } from "@types"
import {
  getData,
  storeData,
  removeData,
  getMockedData,
} from "@core/services/asyncStorage"

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
    getPlayers: (payload?: any, rootState?: any) => void
    getTables: (payload?: any, rootState?: any) => void
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
    /* loadActions: (
      state: WellnessState,
      actions: Action[][],
      completedActions: Action[][]
    ) => {
      return {
        ...state,
        actions,
        completedActions,
      };
    },
    updateProfile: (state: WellnessState, profile: WellnessProfile) => {
      return {
        ...state,
        profile: profile,
      };
    },
    setGoal: (state: WellnessState, updatedGoal: GoalItem) => ({
      ...state,
      goals: state.goals.map((goal: GoalItem) => {
        if (goal.id === updatedGoal.id) {
          return { ...updatedGoal };
        }
        return goal;
      }),
    }),
    setGoals: (state: WellnessState, goals: GoalItem[]) => ({
      ...state,
      goals: goals,
    }),
    addGoal: (state: WellnessState, goal: GoalItem) => ({
      ...state,
      goals: [goal, ...state.goals],
    }),
    setBudgets: (state: WellnessState, budgets: WellnessBudget[]) => {
      return {
        ...state,
        budgets,
      };
    },
    setError: (state: WellnessState, error: string) => ({
      ...state,
      error,
    }), */
  },
  effects: (dispatch: Dispatch) => ({
    async getPlayers(payload?: any, rootState?: any) {
      // const { profile } = rootState;
      try {
        //getData
        const players = await getMockedData("globalPlayers")
        dispatch.global.setPlayers(players ? players : [])
      } catch (error) {
        dispatch.global.setError(error.message)
      }
    },
    async getTables(payload?: any, rootState?: any) {
      try {
        const tables = await getMockedData("globalTables")
        dispatch.global.setTables(tables ? tables : [])
      } catch (error) {
        dispatch.global.setError(error.message)
      }
    },
  }),
}
