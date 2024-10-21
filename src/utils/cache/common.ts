import CacheKey from "../../constants/cache-key.ts";
import Cookies from "js-cookie"

export const getUserStatusCache = () => {
    return JSON.parse(Cookies.get(CacheKey.USER_STATUS) ?? "{}")
}
export const setUserStatusCache = (content: string) => {
    content = JSON.stringify(content)
    const expirationTime = new Date();
    expirationTime.setMonth(expirationTime.getMonth() + 1);
    Cookies.set(CacheKey.USER_STATUS, content, {expires: expirationTime})
}


export const getEventTypesCache = () => {
    return JSON.parse(Cookies.get(CacheKey.EVENT_TYPE) ?? "{}")
}
export const setEventTypesCache = (content: string) => {
    const expirationTime = new Date();
    expirationTime.setMonth(expirationTime.getMonth() + 1);
    Cookies.set(CacheKey.EVENT_TYPE, JSON.stringify(content), {expires: expirationTime})
}


export const getEventStatusCache = () => {
    return JSON.parse(Cookies.get(CacheKey.EVENT_STATUS) ?? "{}")
}
export const setEventStatusCache = (content: string) => {
    content = JSON.stringify(content)
    const expirationTime = new Date();
    expirationTime.setMonth(expirationTime.getMonth() + 1);
    Cookies.set(CacheKey.EVENT_STATUS, content, {expires: expirationTime})
}


export const getEventTargetGroupTypesCache = () => {
    return JSON.parse(Cookies.get(CacheKey.EVENT_TARGET_GROUP_TYPE) ?? "{}")
}
export const setEventTargetGroupTypesCache = (content: string) => {
    const expirationTime = new Date();
    expirationTime.setMonth(expirationTime.getMonth() + 1);
    Cookies.set(CacheKey.EVENT_TARGET_GROUP_TYPE, JSON.stringify(content), {expires: expirationTime})
}