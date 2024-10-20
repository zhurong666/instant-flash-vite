import {request} from "../../utils/service.ts";
import {SearchResponseData} from "../login/types/search.ts";

export function searchApi(url: string) {
    return request<SearchResponseData>({
        url,
        method: "get",
    })
}


export interface EditEvent {
    eventId:number,
    userId:number,
    name:string,
    category:number,
    targetGroupId:number,
    regStartTime:Date,
    regEndTime:Date,
    startTime:Date,
    endTime:Date,
    currentParticipant:number,
    minParticipant:number,
    audit:number,
    maxParticipant:number,
    inviteCode:number,
    radius:number,
    latitude:number,
    contact:number,
    status:number,
    imageUrls:string,
    description:string,
    createTime:Date,
}
