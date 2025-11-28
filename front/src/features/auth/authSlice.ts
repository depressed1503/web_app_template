import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { authApi } from "@/api/authApi"
import type { User } from "@/types/user"

type AuthState = {
  user: User | null
  status: "idle" | "loading" | "failed"
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  isAuthenticated: false,
}

export const fetchMe = createAsyncThunk("auth/profile", async () => {
  return await authApi.me()
})

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data: { username: string; password: string }) => {
    await authApi.getCSRF()
    return await authApi.login(data)
  },
)

export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  return await authApi.logout()
})

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (data: {
    last_name: string
    first_name: string
    middle_name: string
    email: string
    password: string
  }) => {
    await authApi.getCSRF()
    return await authApi.register(data)
  },
)

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isAuthenticated = true
      })

      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
      })

      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isAuthenticated = true
      })
  },
})

export default slice.reducer
