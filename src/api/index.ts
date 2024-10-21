import {request} from "../utils/service.ts";
import axios from "axios";

export function getCity(){
    return request({
        url:"/common/getCityList"
    })
}

export function getCityByLatLng(lat:number, lng:number) {
    return axios.get("https://api.kertennet.com/geography/locationInfo",{
        params:{
            lat,
            lng,
            appCode:"1sdUke79UYA13555773Pb3Dcr3ie33dx"
        }
    })
}