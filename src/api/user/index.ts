import {request} from "../../utils/service.ts";
import {UserInfo} from "./types";

/** 获取用户详情 */
export function getUserInfoApi(userId: number) {
    return request<UserInfo>({
        url: "admin/user/" + userId,
        method: "get"
    })
}

/** 获取用户详情 */
export function updateUserInfo(userInfo: { userId: number }) {
    return request<string>({
        url: "admin/user/" + userInfo.userId + "/update",
        method: "put",
        headers: {toUserId:userInfo.userId},
        data: userInfo
    })
}

/** 获取用户详情 */
export function denyUser(userId: number) {
    return request<string>({
        url: "admin/user/" + userId + "/update",
        method: "put",
        headers: {toUserId:userId},
    })
}

/** 获取用户详情 */
export function getUserTypes() {
    return request<string>({
        url: "common/eventCategory",
        method: "get"
    })
}

export function getUserStatus() {
    return request<string>({
        url: "common/eventCategory",
        method: "get"
    })
}