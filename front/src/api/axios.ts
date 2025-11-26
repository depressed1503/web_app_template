import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  withCredentials: true, // ВАЖНО: чтобы отправлять sessionid + csrftoken
})

// Достаём csrftoken из cookies
function getCookie(name: string): string | null {
  const value = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")
  return value ? value.pop() || "" : null
}

// Интерцептор: вставляем CSRF токен в каждый POST/PUT/PATCH/DELETE
api.interceptors.request.use((config) => {
  const csrf = getCookie("csrftoken")
  if (csrf) {
    config.headers["X-CSRFToken"] = csrf
  }
  return config
})
