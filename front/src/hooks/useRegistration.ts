import { registerThunk } from "@/features/auth/authSlice"
import { AppDispatch } from "@/store/store"
import { useDispatch } from "react-redux"

export function useRegistration() {
  const dispatch = useDispatch<AppDispatch>()

  return (
    last_name: string,
    first_name: string,
    middle_name: string,
    email: string,
    password: string,
  ) =>
    dispatch(
      registerThunk({
        first_name,
        last_name,
        middle_name,
        email,
        password,
      }),
    )
}
