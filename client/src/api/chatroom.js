import { baseApi } from "./base"

export async function getUsers(token) {
  try {
    const res = await baseApi.get("users", {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export async function getMessages(token) {
  try {
    const res = await baseApi.get("messages", {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (error) {
    console.log(error)
  }
}
