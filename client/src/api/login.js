import { baseApi } from "./base"

export async function loginUser(options) {
  const { username, password } = options
  try {
    const res = await baseApi.post("/users/login", {
      Username: username,
      PasswordHash: password,
    })
    console.log("Login response:", res)
    if (res) {
      //alert("login success")
    }
    return res
  } catch (error) {
    console.error("Login user error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    })
    throw error
  }
}

export async function createUser(options) {
  const { username, password } = options
  try {
    const res = await baseApi.post("/users/signup", {
      Username: username,
      PasswordHash: password,
    })
    console.log("Create account response:", res)

    if (res) {
      //alert("account created")
    }
    return res
  } catch (error) {
    console.error("Create user error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    })
    throw error
  }
}
