import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getAllAccount } from "~/services/api/accountService"

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

const account = createSlice({
  name: "account",
  initialState: {
    accounts: [],
    accountChat: [],
  },
  extraReducers: {
    [getAccounts.fulfilled]: (state, action) => {
      state.accounts = action.payload.accounts
    },
    [getAccounts.rejected]: (state, action) => {
      state.accounts = []
    },
  },
})
const { reducer, actions } = account

export default reducer
