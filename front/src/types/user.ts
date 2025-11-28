export type User = {
  id: number
  email: string
  first_name: string
  last_name: string
  middle_name: string

  is_staff: boolean
  is_superuser: boolean
  is_active: boolean

  date_joined: string
  last_login: string | null
}
