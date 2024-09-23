import {createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw} from 'vue-router'
import layout from '../view/layout/LayoutComponent.vue'

// 登录之后根据各自权限跳转到各自的第一个页面
// localStorage.setItem("defaultActiveMenu", JSON.stringify({
//     path: "/about"
// }))
const defaultActiveMenu = JSON.parse(localStorage.getItem('defaultActiveMenu') || '{}')

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        redirect: "/user/search",
        component: () => import("../components/HomeView.vue")
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../pages/LoginView.vue")
    },
    {
        path: '/about',
        name: 'About',
        component: () => import("../pages/AboutView.vue")
    },
    {
        path: '/user',
        name: 'User',
        component: layout,
        children: [
            {
                path: 'create',
                name: 'UserCreate',
                component: () => import("../components/user/CreateUserView.vue")
            },
            {
                path: 'search',
                name: 'UserSearch',
                component: () => import("../components/user/SearchUserView.vue")
            },
            {
                path: 'detail/:id',
                name: 'UserDetail',
                component: () => import("../components/user/UserDetailsView.vue")
            },
            {
                path: 'edit/:id',
                name: 'UserEdit',
                component: () => import("../components/user/EditUserView.vue")
            },
        ],
    },
    {
        path: '/active',
        name: 'Active',
        component: layout,
        children: [
            {
                path: 'check',
                name: 'ActiveCheck',
                component: () => import("../components/active/CheckActiveView.vue")
            },
            {
                path: 'edit/:id',
                name: 'ActiveEdit',
                component: () => import("../components/active/EditActiveView.vue")
            },
            {
                path: 'search',
                name: 'ActiveSearch',
                component: () => import("../components/active/SearchActiveView.vue")
            },
            {
                path: 'detail/:id',
                name: 'ActiveDetail',
                component: () => import("../components/active/ActiveDetailsView.vue")
            },
        ],
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

/** 重置路由 */
export function resetRouter() {
    // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
    try {
        router.getRoutes().forEach((route) => {
            const {name, meta} = route
            if (name && meta.roles?.length) {
                router.hasRoute(name) && router.removeRoute(name)
            }
        })
    } catch {
        // 强制刷新浏览器也行，只是交互体验不是很好
        window.location.reload()
    }
}

export default router