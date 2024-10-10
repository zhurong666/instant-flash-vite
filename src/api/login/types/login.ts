export interface LoginRequestData {
  /** admin 或 editor */
  phone: string
  /** 密码 */
  password: string
  /** 验证码 */
  verifyCode: string
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ token: string }>

export type UserInfoResponseData = ApiResponseData<{ username: string; roles: string[] }>
