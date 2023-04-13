import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import authReducer from "../slices/authSlice"
import accountReducer from "../slices/accountSlice"

const rootReducer = {
  auth: authReducer,
  account: accountReducer,
}
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

export default store
