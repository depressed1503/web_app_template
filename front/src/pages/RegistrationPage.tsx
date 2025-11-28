import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "@tanstack/react-router"
import type { AppDispatch } from "@/store/store"
import { registerThunk } from "@/features/auth/authSlice"

export default function RegistrationPage() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [last_name, setLastName] = useState("")
  const [first_name, setFirstName] = useState("")
  const [middle_name, setMiddleName] = useState("") // отчество
  const [email, setEmail] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (password1 !== password2) {
      setError("Пароли не совпадают")
      return
    }

    setError(null)

    dispatch(
      registerThunk({
        last_name,
        first_name,
        middle_name,
        email,
        password: password1,
      }),
    )
      .unwrap()
      .then(() => {
        navigate({ to: "/" })
      })
      .catch(() => setError("Ошибка регистрации"))
  }

  return (
    <div style={{ maxWidth: 450, margin: "0 auto" }}>
      <h2>Регистрация</h2>

      <form
        onSubmit={handleSubmit}
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

        <input
          type="password"
          placeholder="Пароль"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />

        <input
          type="password"
          placeholder="Повторите пароль"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />

        {error && <div style={{ color: "red", fontSize: 14 }}>{error}</div>}

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  )
}
