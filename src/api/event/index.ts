import {request} from "../../utils/service.ts";
import {SearchResponseData} from "../login/types/search.ts";

export function searchApi(url: string) {
    return request<SearchResponseData>({
        url,
        method: "get",
    })
}
