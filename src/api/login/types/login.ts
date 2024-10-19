export interface LoginRequestData {
  /** admin 或 editor */
  phone: string
  /** 密码 */
  password: string
  /** 验证码 */
  verifyCode: string
}

export type LoginCodeResponseData = Resp<string>

export type LoginResponseData = Resp<{ token: string }>

export type UserInfoResponseData = Resp<{ username: string; roles: string[] }>
