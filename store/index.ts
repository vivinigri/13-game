import createPersistPlugin from "@rematch/persist"
import { init, RematchRootState, RematchDispatch, Plugin } from "@rematch/core"
import { models, RootModel } from "./models"
import AsyncStorage from "@react-native-community/async-storage"

const persist: Plugin = createPersistPlugin({
  key: "store",
  storage: AsyncStorage,
  blacklist: ["toasts"],
})

const store = init({
  models,
  plugins: [persist],
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>

export const { getState } = store
export const dispatch = store.dispatch as Dispatch

export default store
