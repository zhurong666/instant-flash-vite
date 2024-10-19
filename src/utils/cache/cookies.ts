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
