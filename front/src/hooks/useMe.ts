import { useDispatch } from "react-redux"
import { fetchMe } from "@/features/auth/authSlice"
import type { AppDispatch } from "@/store/store"

export function useMe() {
  const dispatch = useDispatch<AppDispatch>()
  return () => dispatch(fetchMe())
}
