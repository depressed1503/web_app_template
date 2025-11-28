import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  withCredentials: true,
})

function getCookie(name: string): string | null {
  const value = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")
  return value ? value.pop() || "" : null
}

api.interceptors.request.use((config) => {
  const csrf = getCookie("csrftoken")
  if (csrf) {
    config.headers["X-CSRFToken"] = csrf
  }
  return config
})
