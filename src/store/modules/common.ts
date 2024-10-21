import {defineStore} from "pinia";
import {getUserStatus, getUserTypes} from "../../api/user";
import * as CommonCache from "../../utils/cache/common.ts";
import {getEventStatus, getEventTargetGroupTypes, getEventTypes} from "../../api/event";

export const commonModules = defineStore("common", {
    state: () => ({
        userType: [],
        userStatus: [],
        eventType: [],
        eventStatus: [],
        eventTargetGroup: [],
    }),
    getters: {},
    mutations: {},
    actions: {
        async initUserType() {
            if (this.userType.length === 0) {
                let data = CommonCache.getUserStatusCache()
                if (Object.keys(data).length === 0) {
                    data = await getUserStatus()
                    CommonCache.setUserStatusCache(data.data)
                    this.userStatus = data.data
                }else {
                    this.userStatus = data
                }
            }
        },
        async initEventType() {
            if (this.eventType.length === 0) {
                let data = CommonCache.getEventTypesCache()
                let data2 = CommonCache.getEventStatusCache()
                if (Object.keys(data).length === 0) {
                    data = await getEventTypes();
                    data2 = await getEventStatus();
                    CommonCache.setEventTypesCache(data.data)
                    CommonCache.setEventStatusCache(data2.data)
                    this.eventType = data.data
                    this.eventStatus = data2.data
                }else {
                    this.eventType = data
                    this.eventStatus = data2
                }
            }
        },
        async initEventTargetGroupType() {
            if (this.eventTargetGroup.length === 0) {
                let data = CommonCache.getEventTargetGroupTypesCache()
                if (Object.keys(data).length === 0) {
                    data = await getEventTargetGroupTypes();
                    CommonCache.setEventTargetGroupTypesCache(data.data)
                    this.eventTargetGroup = data.data
                } else
                    this.eventTargetGroup = data
            }
        }
    },
})