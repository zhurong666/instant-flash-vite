import {defineStore} from "pinia";
import {getUserStatus, getUserTypes} from "../../api/user";
import * as CommonCache from "../../utils/cache/common.ts";
import {getEventStatus, getEventTargetGroupTypes, getEventTypes} from "../../api/event";

export const commonModules = defineStore("common", {
    state: () => ({
        userType:[],
        eventType:[],
        eventTargetGroup:[],
    }),
    getters: {},
    mutations: {},
    actions: {
        async initUserType(){
            if (this.userType.length === 0){
                let data = CommonCache.getUserTypesCache()
                let data2 = CommonCache.getUserStatusCache()
                if (data==null || data === "") {
                    data = await getUserTypes();
                    data2 = getUserStatus()
                    CommonCache.setUserTypesCache(data.data)
                    CommonCache.setUserStatusCache(data2.data)
                }
                this.userType = data.data
            }
        },
        async initEventType(){
            if (this.userType.length === 0){
                let data = CommonCache.getEventTypesCache()
                let data2 = CommonCache.getEventStatusCache()
                if (data==null || data === "") {
                    data = await getEventTypes();
                    data2 = await getEventStatus();
                    CommonCache.setEventTypesCache(data.data)
                    CommonCache.setEventStatusCache(data2.data)
                }
                this.userType = data.data
            }
        },
        async initEventTargetGroupType(){
            if (this.userType.length === 0){
                let data = CommonCache.getEventTargetGroupTypesCache()
                if (data==null || data === "") {
                    data = await getEventTargetGroupTypes();
                    CommonCache.setEventTargetGroupTypesCache(data.data)
                }
                this.userType = data.data
            }
        }
    },
})