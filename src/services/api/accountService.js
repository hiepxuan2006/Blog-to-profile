import { URL } from "~/helper/url"
import { createAPIServices } from "./createApiServices"

const baseUrl = URL
const api = createAPIServices({ baseUrl })

export const loginAccount = (data) => {
  return api.makeRequest({
    url: "/auth/login",
    method: "post",
    data,
  })
}

export const register = (data) => {
  return api.makeRequest({
    url: "/auth/register",
    method: "post",
    data,
  })
}

export const authorization = (data) => {
  return api.makeAuthRequest({
    url: "/auth/authorization",
    method: "get",
  })
}

export const getAllAccount = (data) => {
  return api.makeAuthRequest({
    url: "/auth/get-all-account",
    method: "get",
  })
}

export const getAccount = (data) => {
  return api.makeAuthRequest({
    url: "/auth/get-account",
    method: "post",
    data,
  })
}

export const searchAccount = (data) => {
  return api.makeAuthRequest({
    url: "/search-account",
    method: "post",
    data,
  })
}
// /////

const apiUpload = createAPIServices({ baseUrl, timeout: 10000 })
export const uploadImage = (data) => {
  return apiUpload.makeAuthRequest({
    url: "/upload",
    method: "post",
    data,
  })
}
