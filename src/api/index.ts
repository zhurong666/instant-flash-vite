import {request} from "../utils/service.ts";

export function getCity(){
    return request({
        url:"/common/getCityList"
    })
}