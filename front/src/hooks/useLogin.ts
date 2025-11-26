import { useDispatch } from "react-redux"
import { loginThunk } from "@/features/auth/authSlice"
import type { AppDispatch } from "@/store/store"

export function useLogin() {
  const dispatch = useDispatch<AppDispatch>()
  return (username: string, password: string) =>
    dispatch(loginThunk({ username, password }))
}
