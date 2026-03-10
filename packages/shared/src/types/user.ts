export interface User {
  id: string
  username: string
  nickname?: string
  avatar?: string
  email?: string
  createdAt: Date
  updatedAt: Date
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
  nickname?: string
  email?: string
}

export interface AuthResponse {
  access_token: string
  user: User
}
