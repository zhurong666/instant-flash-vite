/** 统一处理 Cookie */

import CacheKey from "@/constants/cache-key"
import Cookies from "js-cookie"

export const getToken = () => {
    return Cookies.get(CacheKey.TOKEN)
}
export const setToken = (token: string) => {
    const expirationTime = new Date();
    expirationTime.setMonth(expirationTime.getMonth() + 1);
    Cookies.set(CacheKey.TOKEN, token, {expires: expirationTime})
}
export const removeToken = () => {
    Cookies.remove(CacheKey.TOKEN)
}

export const setUserInfo = (userInfo: object) => {
    const expirationTime = new Date();
    expirationTime.setMonth(expirationTime.getMonth() + 1);
    Cookies.set(CacheKey.USER_INFO, JSON.stringify(userInfo), {expires: expirationTime})
}
export const getUserInfo = () => {
    const userinfo = Cookies.get(CacheKey.USER_INFO)
    return JSON.parse(userinfo || {})
}
export const removeUserInfo = () => {
    Cookies.remove(CacheKey.USER_INFO)
}
