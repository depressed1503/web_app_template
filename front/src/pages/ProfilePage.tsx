import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import { fetchMe } from "@/features/auth/authSlice"
import { authApi } from "@/api/authApi"

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.auth.user)

  // локальные состояния
  const [last_name, setLastName] = useState("")
  const [first_name, setFirstName] = useState("")
  const [middle_name, setMiddleName] = useState("")
  const [email, setEmail] = useState("")

  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // подгрузка данных при входе на страницу
  useEffect(() => {
    if (!user) {
      dispatch(fetchMe())
    } else {
      setLastName(user.last_name ?? "")
      setFirstName(user.first_name ?? "")
      setMiddleName(user.middle_name ?? "")
      setEmail(user.email ?? "")
    }
  }, [user, dispatch])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setMessage(null)

    try {
      await authApi.updateProfile({
        last_name,
        first_name,
        middle_name,
        email,
      })

      setMessage("Изменения сохранены")
      dispatch(fetchMe())
    } catch (e) {
      setError(`Ошибка при сохранении: ${e}`)
    } finally {
      setSaving(false)
    }
  }

  if (!user) return <div>Загрузка...</div>

  return (
    <div style={{ maxWidth: 450, margin: "0 auto" }}>
      <h2>Профиль</h2>

      <form
        onSubmit={handleSave}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Фамилия"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Имя"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Отчество"
          value={middle_name}
          onChange={(e) => setMiddleName(e.target.value)}
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <div style={{ color: "red" }}>{error}</div>}
        {message && <div style={{ color: "green" }}>{message}</div>}

        <button type="submit" disabled={saving}>
          {saving ? "Сохраняем..." : "Сохранить"}
        </button>
      </form>
    </div>
  )
}
