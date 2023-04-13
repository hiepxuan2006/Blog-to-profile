import { getLocalData } from "./api/StoreageServices"

const _store = {
  state: {
    accessToken: getLocalData("accessToken", ""),
    refreshToken: getLocalData("refreshToken", ""),
    user: getLocalData("user", {}),
  },
  subscribers: [],
}

export const getAccessToken = () =>
  getLocalData("access_token") || _store.state.accessToken || ""

export const getUser = () => getLocalData("user") || _store.state.user || ""

export const getRoles = () => getLocalData("roles") || _store.state.roles || ""
