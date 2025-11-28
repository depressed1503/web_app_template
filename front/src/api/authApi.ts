import { api } from "./axios"
import type { User } from "@/types/user"

export const authApi = {
  getCSRF: () => api.get("/api/v1/auth/csrf/"),

  login: (data: { username: string; password: string }) =>
    api.post("/api/v1/auth/login/", data).then((res) => res.data),

  logout: () => api.post("/api/v1/auth/logout/").then((res) => res.data),
  register: (data: {
    last_name: string
    first_name: string
    middle_name: string
    email: string
    password: string
  }) => api.post("/api/v1/auth/register/", data).then((res) => res.data),
  me: () => api.get<User>("/api/v1/auth/me/").then((res) => res.data),
}
