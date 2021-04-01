import { Models } from "@rematch/core"
import { profile, ProfileModel } from "./profile"
import { toasts, ToastsModel } from "./toasts"
import { wellness, WellnessModel } from "./wellness"

// type would cause "Dispatch type depends on itself" error
export interface RootModel extends Models<RootModel> {
  profile: ProfileModel
  toasts: ToastsModel
  wellness: WellnessModel
}

export const models: RootModel = {
  profile,
  toasts,
  wellness,
}
