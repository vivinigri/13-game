import { Dispatch } from ".."
import { Player, Table, GameType, Placar, Naipes, PlacarObject } from "@types"
import { getData, storeData, removeData } from "@core/services/asyncStorage"

// TODO ao terminar o jogo, transformar esses dados em new Game e salvar no localStorage GLOBAL,
// ao longo do jogo ir salvando no LocalStorage CURRENT
export type CurrentState = {
  players: Player[]
  table: Table
  // game: Game
  type: GameType
  rounds: number
  placar: Placar
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
    setType: (state: CurrentState, type: GameType) => CurrentState
    setHands: (state: CurrentState, hands: number[]) => CurrentState
    setRounds: (state: CurrentState, rounds: number) => CurrentState
    setPlacar: (state: CurrentState, placar: Placar) => CurrentState
  }
  effects: (
    dispatch: Dispatch
  ) => {
    initPlacar: (payload?: any, rootState?: any) => void
  }
}

const defaultTable: Table = { id: "", name: "", players: [], used: 0 }
const defaultPlacar: PlacarObject = {
  acertou: 0,
  errou: 0,
  placar: [],
  final: 0,
  apostas: [],
  acertos: [],
}

export const current: CurrentModel = {
  state: {
    players: [],
    table: defaultTable,
    placar: {},
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
    setType: (state: CurrentState, type: GameType) => {
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
    setPlacar: (state: CurrentState, placar: Placar) => {
      return {
        ...state,
        placar,
      }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async initPlacar(payload?: any, rootState?: any) {
      const { players } = rootState.current
      try {
        const placar: Placar = {}
        players.forEach((p: Player) => {
          placar[p.id] = defaultPlacar
        })
        dispatch.current.setPlacar(placar)
      } catch (error) {
        dispatch.global.setError(error.message)
      }
    },
  }),
}
