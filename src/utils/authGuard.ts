import router from '../router'
import {useUserStore} from '../store/modules/user'
import {getToken} from "./cache/cookies"

export const authGuard = () => {
    router.beforeEach((to) => {
        const userStore = useUserStore()
        if (!getToken() && to.path !== '/login') return '/login'
        // 登录了不能跳转到登录页
        if (getToken() && to.path === '/login') return false
    })
}
