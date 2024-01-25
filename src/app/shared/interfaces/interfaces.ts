export interface AuthResponse {
  total?: number,
  hasError?: true,
  errors?: string[],
  data?: {
    tokens: {
      refreshToken: string
      token: string
    },
    userInfo: {
      userAvatar: string
      userId: number
      userName: string
      userRole: number
    }
  }
}

export interface Cookies {
  refreshToken: string;
  token: string;
  userAvatar: string;
  userId: number;
  userName: string;
  userRole: number;
}
