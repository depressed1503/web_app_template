import { useDispatch } from "react-redux"
import { logoutThunk } from "@/features/auth/authSlice"
import type { AppDispatch } from "@/store/store"

export function useLogout() {
  const dispatch = useDispatch<AppDispatch>()
  return () => dispatch(logoutThunk())
}
