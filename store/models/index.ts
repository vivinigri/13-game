import { Models } from "@rematch/core"
import { current, CurrentModel } from "./current"
import { toasts, ToastsModel } from "./toasts"
import { global, GlobalModel } from "./global"
export interface RootModel extends Models<RootModel> {
  current: CurrentModel
  toasts: ToastsModel
  global: GlobalModel
}

export const models: RootModel = {
  current,
  toasts,
  global,
}
