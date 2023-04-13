import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toastAlert } from "~/helper/toast"
import { getAccessToken, getUser } from "~/services/AuthService"
import { removeLocalData, setLocalData } from "~/services/api/StoreageServices"
import { authorization, loginAccount } from "~/services/api/accountService"

const access_token = getAccessToken()
console.log(access_token)
const user = getUser()
export const loginActions = createAsyncThunk(
  "auth/login",
  async (params, thunkAPI) => {
    try {
      const { data, success, message } = await loginAccount(params)
      if (!success) {
        return thunkAPI.rejectWithValue()
      }
      setLocalData("access_token", data.access_token)
      setLocalData("user", data.user)
      return { user: data.user, success, message }
    } catch (error) {
      const message = error.message || error.toString()
      toastAlert("error", message)
      return thunkAPI.rejectWithValue()
    }
  }
)

export const LogoutAccount = createAsyncThunk(
  "auth/logout",
  async (params, thunkAPI) => {
    try {
      // const { data, success, message } = await loginAccount(params)
      // if (!success) {
      //   return thunkAPI.rejectWithValue()
      // }
      removeLocalData("access_token")
      removeLocalData("user")
      return { user: {}, success: true }
    } catch (error) {
      const message = error.message || error.toString()
      toastAlert("error", message)
      return thunkAPI.rejectWithValue()
    }
  }
)

export const authorizationRequest = createAsyncThunk(
  "auth/authorization",
  async (params, thunkAPI) => {
    try {
      const { success, data } = await authorization()
      if (!success) {
        removeLocalData("user")
        removeLocalData("access_token")
        return thunkAPI.rejectWithValue()
      }
      return { success, user: data }
    } catch (error) {
      const message = error.message || error.toString()
      toastAlert("error", message)
      return thunkAPI.rejectWithValue()
    }
  }
)

const auth = createSlice({
  name: "auth",
  initialState: {
    user: user || {},
    isLoggedIn: access_token ? true : false,
    error: null,
  },
  extraReducers: {
    [loginActions.fulfilled]: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload.user
      state.error = false
    },
    [loginActions.rejected]: (state, action) => {
      state.isLoggedIn = false
      state.user = {}
      state.error = true
    },
    [authorizationRequest.fulfilled]: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload.user
      state.error = false
    },
    [authorizationRequest.rejected]: (state, action) => {
      state.isLoggedIn = false
      state.user = {}
      state.error = true
    },
    [authorizationRequest.pending]: (state, action) => {
      state.error = true
    },
    [LogoutAccount.fulfilled]: (state, action) => {
      state.isLoggedIn = false
      state.user = {}
      state.error = false
    },
    [LogoutAccount.rejected]: (state, action) => {
      state.isLoggedIn = false
      state.user = {}
      state.error = true
    },
  },
})

const { reducer, actions } = auth

export default reducer
