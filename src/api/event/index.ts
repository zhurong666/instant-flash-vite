import {request} from "../../utils/service.ts";
import {SearchResponseData} from "../login/types/search.ts";

export function searchApi(url: string) {
    return request<SearchResponseData>({
        url,
        method: "get",
    })
}

export function getEventById(eventId: number) {
    return request<SearchResponseData>({
        url: "/admin/event/searchByEventId/" + eventId,
        method: "get",
    })
}

/** 获取用户详情 */
export function denyEvent(eventId: number) {
    return request<string>({
        url: "admin/event/" + eventId + "/review",
        method: "post",
        params: {isApproved: false},
        headers: {toEventId: eventId},
    })
}


export function getEventTypes() {
    return request<string>({
        url: "common/eventCategory",
        method: "get"
    })
}

export function getEventStatus() {
    return request<string>({
        url: "common/eventCategory",
        method: "get"
    })
}

export function getEventTargetGroupTypes() {
    return request<string>({
        url: "common/eventTargetGroups",
        method: "get"
    })
}
export interface EditEvent {
    eventId: number,
    userId: number,
    name: string,
    category: number,
    targetGroupId: number,
    regStartTime: Date,
    regEndTime: Date,
    startTime: Date,
    endTime: Date,
    currentParticipant: number,
    minParticipant: number,
    audit: number,
    maxParticipant: number,
    inviteCode: number,
    radius: number,
    latitude: number,
    contact: number,
    status: number,
    imageUrls: string,
    description: string,
    createTime: Date,
}
