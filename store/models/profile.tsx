// import { Profile } from '@types';
// import { removeSessionTokenFromStorage } from '@api/storage-api';
// import { updateUserProfile } from '@api/auth-api';
import { Dispatch } from ".."

type Profile = {
  session_token: string
  csrf_token: string | null
  expires_at: string
  renew_by: string
  user: {
    id: string
    channel_id: string
    group_id: string
    email: string
    phone: string | null
    username: string
    first_name: string
    last_name: string
    mfa_type: string | null
  }
}

export type ProfileModel = {
  state: Profile
  reducers: {
    updateUserProfile: (state: any, profile: Profile) => Profile
    logoutUser: () => any
  }
  effects: (
    dispatch: Dispatch
  ) => {
    changeUserProfile: (properties: any, rootState?: any) => any
  }
}

const defaultProfileState = {
  session_token: "",
  csrf_token: "",
  expires_at: "",
  renew_by: "",
  user: {
    id: "",
    channel_id: "",
    group_id: "",
    email: "",
    phone: "",
    username: "",
    first_name: "",
    last_name: "",
    mfa_type: "",
  },
}

export const profile: ProfileModel = {
  state: defaultProfileState,
  reducers: {
    updateUserProfile: (_state: any, updatedProfile: Profile) => updatedProfile,
    logoutUser: () => {
      // removeSessionTokenFromStorage()
      return defaultProfileState
    },
  },
  effects: (dispatch: Dispatch) => ({
    async changeUserProfile(properties: any, rootState?: any) {
      const { profile: rootStateProfile } = rootState
      const { session_token } = rootStateProfile

      try {
        // const user = await updateUserProfile(session_token, properties)
        // dispatch.profile.updateUserProfile({ ...rootStateProfile, user });
      } catch (error) {
        dispatch.toasts.show({
          content: error,
          variant: "error",
        })
      }
    },
  }),
}
