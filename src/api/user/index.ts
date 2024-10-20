import {request} from "../../utils/service.ts";
import {UserInfo} from "./types";

/** 获取用户详情 */
export function getUserInfoApi(userId: number) {
    return request<UserInfo>({
        url: "admin/user/" + userId,
        method: "get"
    })
}