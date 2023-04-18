import { URL } from "~/helper/url"
import { createAPIServices } from "./createApiServices"

const baseUrl = URL
const api = createAPIServices({ baseUrl })

export const getMessage = (data) => {
  return api.makeRequest({
    url: "/message/get-message",
    method: "post",
    data,
  })
}

export const sendMessage = (data) => {
  return api.makeRequest({
    url: "/message/send-message",
    method: "post",
    data,
  })
}

export const getMessChat = (data) => {
  return api.makeRequest({
    url: "/message/get-message-room",
    method: "post",
    data,
  })
}

export const createNewChat = (data) => {
  return api.makeRequest({
    url: "/message/new-chat",
    method: "post",
    data,
  })
}
