import { useEffect, useState } from "react"
import { RouterProvider } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { router } from "@/router/routes"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store/store"
import { fetchMe } from "@/features/auth/authSlice"
import { authApi } from "@/api/authApi"

export default function App() {
  const dispatch = useDispatch<AppDispatch>()
  const [bootstrapped, setBootstrapped] = useState(false)

  useEffect(() => {
    async function init() {
      try {
        await authApi.getCSRF()
        await dispatch(fetchMe())
      } catch {
        // пользователь не авторизован — норм
      } finally {
        setBootstrapped(true)
      }
    }
    init()
  }, [dispatch])

  if (!bootstrapped) {
    return (
      <div style={{ padding: 40 }}>
        <h3>Loading...</h3>
      </div>
    )
  }

  return (
    <>
      <RouterProvider router={router} />
      {import.meta.env.DEV && <TanStackRouterDevtools router={router} />}
    </>
  )
}
