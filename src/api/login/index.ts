import { request } from "../../utils/service"
import type * as Login from "./types/login"

/** 获取登录验证码 */
export function getLoginCodeApi(account:string) {
  return import.meta.env.VITE_BASE_API + "/common/captcha" + "?account=" + account + "&type=login"
  // return request<Login.LoginCodeResponseData>({
  //   url: "common/captcha",
  //   params:{
  //     account,
  //     type:"login",
  //   },
  //   method: "get"
  // })
}

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "user/login",
    method: "post",
    data
  })
}
