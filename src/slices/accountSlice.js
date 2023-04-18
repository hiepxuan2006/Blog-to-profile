import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllAccount, getChatRooms } from "~/services/api/accountService"

export const getAccounts = createAsyncThunk(
  "account/getAccount",
  async (params, thunkAPI) => {
    const { data, success, message } = await getAllAccount(params)
    if (!success) {
      return thunkAPI.rejectWithValue()
    }

    return { accounts: data, success, message }
  }
)

export const getChats = createAsyncThunk(
  "account/getChats",
  async (params, thunkAPI) => {
    const { data, success, message } = await getChatRooms(params)
    if (!success) {
      return thunkAPI.rejectWithValue()
    }
    return { chatRooms: data, success, message }
  }
)

const account = createSlice({
  name: "account",
  initialState: {
    accounts: [],
    accountChat: [],
    chatRooms: [],
    newMessages: [],
  },
  reducers: {
    addNotifications: (state, { payload }) => {
      console.log(payload)
      if (state.newMessages[payload]) {
        state.newMessages[payload] = state.newMessages[payload] + 1
      } else {
        state.newMessages[payload] = 1
      }
    },
    resetNotifications: (state, { payload }) => {
      delete state.newMessages[payload]
    },
  },
  extraReducers: {
    [getAccounts.fulfilled]: (state, action) => {
      state.accounts = action.payload.accounts
    },
    [getAccounts.rejected]: (state, action) => {
      state.accounts = []
    },
    [getChats.fulfilled]: (state, action) => {
      state.chatRooms = action.payload.chatRooms
    },
    [getChats.rejected]: (state, action) => {
      state.chatRooms = []
    },
  },
})
const { reducer, actions } = account

export const { addNotifications, resetNotifications } = actions
export default reducer
