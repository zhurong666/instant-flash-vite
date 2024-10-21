import CacheKey from "../../constants/cache-key.ts";
import Cookies from "js-cookie"

export const getUserTypesCache = () => {
    return Cookies.get(CacheKey.USER_TYPE)
}
export const setUserTypesCache = (content: string) => {
    const expirationTime = new Date();
    expirationTime.setMonth(expirationTime.getMonth() + 1);
    Cookies.set(CacheKey.USER_TYPE, content, {expires: expirationTime})
}

export const getUserStatusCache = () => {
    return Cookies.get(CacheKey.USER_STATUS)
}
export const setUserStatusCache = (content: string) => {
    const expirationTime = new Date();
    expirationTime.setMonth(expirationTime.getMonth() + 1);
    Cookies.set(CacheKey.USER_STATUS, content, {expires: expirationTime})
}

export const getEventTypesCache = () => {
    return Cookies.get(CacheKey.EVENT_TYPE)
}
export const setEventTypesCache = (content: string) => {
    const expirationTime = new Date();
    expirationTime.setMonth(expirationTime.getMonth() + 1);
    Cookies.set(CacheKey.EVENT_TYPE, content, {expires: expirationTime})
}

export const getEventStatusCache = () => {
    return Cookies.get(CacheKey.EVENT_STATUS)
}
export const setEventStatusCache = (content: string) => {
    const expirationTime = new Date();
    expirationTime.setMonth(expirationTime.getMonth() + 1);
    Cookies.set(CacheKey.EVENT_STATUS, content, {expires: expirationTime})
}

export const getEventTargetGroupTypesCache = () => {
    return Cookies.get(CacheKey.EVENT_TARGET_GROUP_TYPE)
}
export const setEventTargetGroupTypesCache = (content: string) => {
    const expirationTime = new Date();
    expirationTime.setMonth(expirationTime.getMonth() + 1);
    Cookies.set(CacheKey.EVENT_TARGET_GROUP_TYPE, content, {expires: expirationTime})
}