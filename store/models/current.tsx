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
    setCurrentRound: (state: CurrentState, round: number) => CurrentState
  }
  effects: (
    dispatch: Dispatch
  ) => {
    initPlacar: (payload?: any, rootState?: any) => void
    setApostas: (apostas: number[], rootState?: any) => void
    setResultados: (results: number[], rootState?: any) => void
    nextRound: (payload?: any, rootState?: any) => void
  }
}

const defaultTable: Table = { id: "", name: "", players: [], used: 0 }
const defaultPlacar: PlacarObject = {
  final: 0,
  errou: 0,
  acertou: 0,
  placar: [],
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
    type: GameType.UNDEFINED,
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
    setCurrentRound: (state: CurrentState, round: number) => {
      return {
        ...state,
        currentRound: round,
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
        dispatch.current.setCurrentRound(0)
      } catch (error) {
        dispatch.global.setError(error.message)
      }
    },
    async setApostas(apostas: number[], rootState?: any) {
      const { placar, players, currentRound } = rootState.current
      const newPlacar = { ...placar }
      const ids = players.map((p: Player) => p.id)
      try {
        ids.forEach((id: string, i: number) => {
          newPlacar[id].apostas[currentRound] = apostas[i]
        })
        dispatch.current.setPlacar(newPlacar)
      } catch (error) {
        dispatch.global.setError(error.message)
      }
    },
    async setResultados(results: number[], rootState?: any) {
      const { placar, players, currentRound } = rootState.current
      const newPlacar = { ...placar }
      const ids = players.map((p: Player) => p.id)
      try {
        ids.forEach((id: string, i: number) => {
          newPlacar[id].acertos[currentRound] = results[i]
          if (newPlacar[id].apostas[currentRound] === results[i]) {
            newPlacar[id].acertou++
            newPlacar[id].placar[currentRound] = 10 + results[i] * 3
            newPlacar[id].final += 10 + results[i] * 3
          } else {
            newPlacar[id].errou++
            newPlacar[id].placar[currentRound] =
              -Math.abs(newPlacar[id].apostas[currentRound] - results[i]) * 3
            newPlacar[id].final -=
              Math.abs(newPlacar[id].apostas[currentRound] - results[i]) * 3
          }
        })
        dispatch.current.setPlacar(newPlacar)
      } catch (error) {
        dispatch.global.setError(error.message)
      }
    },
    async nextRound(payload?: any, rootState?: any) {
      const { currentRound, players } = rootState.current
      const newPlayers = [...players]
      newPlayers.push(newPlayers.shift())
      dispatch.current.setCurrentRound(currentRound + 1)
      dispatch.current.setPlayers(newPlayers)
    },
  }),
}
