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

export const fetchMe = createAsyncThunk("auth/me", async () => {
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
  },
})

export default slice.reducer
