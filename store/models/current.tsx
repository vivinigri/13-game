import { Dispatch } from ".."
import { Player, Table, GameType, Placar, Naipes, PlacarObject } from "@types"
import { insertItem } from "@core/helpers/arrayUtils"

// TODO ao terminar o jogo, transformar esses dados em new Game e salvar no localStorage GLOBAL,
// ao longo do jogo ir salvando no LocalStorage CURRENT
export type CurrentState = {
  players: Player[]
  table: Table
  type: GameType
  rounds: number
  placar: Placar
  naipes: Naipes[]
  error: string
  hands: number[]
  currentRound: number
}

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
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
    setNaipes: (state: CurrentState, naipes: Naipes[]) => CurrentState
  }
  effects: (
    dispatch: Dispatch
  ) => {
    initPlacar: (len?: number, rootState?: any) => void
    setApostas: (apostas: number[], rootState?: any) => boolean
    setResultados: (results: number[], rootState?: any) => void
    nextRound: (payload?: any, rootState?: any) => void
    addNaipe: (naipe: Naipes, rootState?: any) => void
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
    setNaipes: (state: CurrentState, naipes: Naipes[]) => {
      return {
        ...state,
        naipes,
      }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async initPlacar(len?: number, rootState?: any) {
      const { players } = rootState.current
      try {
        const placar: Placar = {}
        await players.reduce(async (memo: any, player: Player, i: number) => {
          await memo
          await sleep(100)
          placar[player.id] = { ...defaultPlacar }
        }, undefined)
        dispatch.current.setCurrentRound(0)
        dispatch.current.setPlacar(placar)
      } catch (error) {
        dispatch.global.setError(error.message)
      }
    },
    async setApostas(apostas: number[], rootState?: any) {
      const { placar, players, currentRound } = rootState.current
      const newPlacar = { ...placar }
      const ids = players.map((p: Player) => p.id)
      try {
        await ids.reduce(async (memo: any, id: string, i: number) => {
          await memo
          await sleep(100)
          newPlacar[id].apostas = insertItem(newPlacar[id].apostas, {
            index: currentRound,
            item: apostas[i],
          })
        }, undefined)
        dispatch.current.setPlacar(newPlacar)
        return true
      } catch (error) {
        dispatch.global.setError(error.message)
        return false
      }
    },
    async setResultados(results: number[], rootState?: any) {
      const { placar, players, currentRound } = rootState.current
      const newPlacar = { ...placar }
      const ids = players.map((p: Player) => p.id)
      try {
        let score = 0
        await ids.reduce(async (memo: any, id: string, i: number) => {
          await memo
          await sleep(100)
          newPlacar[id].acertos[currentRound] = results[i]
          if (newPlacar[id].apostas[currentRound] === results[i]) {
            score = 10 + results[i] * 3
            newPlacar[id].acertou++
            newPlacar[id].placar = insertItem(newPlacar[id].placar, {
              index: currentRound,
              item: score,
            })
            newPlacar[id].final += score
          } else {
            score =
              -Math.abs(newPlacar[id].apostas[currentRound] - results[i]) * 3
            newPlacar[id].errou++
            newPlacar[id].placar = insertItem(newPlacar[id].placar, {
              index: currentRound,
              item: score,
            })
            newPlacar[id].final += score
          }
        }, undefined)
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
    async addNaipe(naipe: Naipes, rootState?: any) {
      const { currentRound, naipes } = rootState.current
      const newNaipes = [...naipes]
      newNaipes[currentRound] = naipe
      dispatch.current.setNaipes(newNaipes)
    },
  }),
}
