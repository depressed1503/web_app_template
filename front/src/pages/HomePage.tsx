import { useAuth } from "@/hooks/useAuth"
import { useLogout } from "@/hooks/useLogout"

export default function HomePage() {
  const { user } = useAuth()
  const logout = useLogout()

  return (
    <div style={{ padding: 40 }}>
      <h1>
        Привет, {user?.last_name} {user?.first_name}
      </h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
