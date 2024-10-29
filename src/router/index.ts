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
        meta: { menuId: '1-1' },
        component: () => import("../components/HomeView.vue")
    },
    {
        path: '/login',
        name: 'Login',
        meta: { menuId: '10-1' },
        component: () => import("../pages/LoginView.vue")
    },
    {
        path: '/about',
        name: 'About',
        meta: { menuId: '1-1' },
        component: () => import("../pages/AboutView.vue")
    },
    {
        path: '/index',
        name: 'Index',
        component: layout,
        children:[
            {
                path: 'set',
                name: 'Set',
                meta: { menuId: '1-2' },
                component: () => import("../components/index/Set.vue")
            },
        ]
    },
    {
        path: '/user',
        name: 'User',
        component: layout,
        children: [
            {
                path: 'create',
                name: 'UserCreate',
                meta: { menuId: '2-1' },
                component: () => import("../components/user/CreateUserView.vue")
            },
            {
                path: 'search',
                name: 'UserSearch',
                meta: { menuId: '2-2' },
                component: () => import("../components/user/SearchUserView.vue")
            },
            {
                path: 'detail/:id',
                name: 'UserDetail',
                meta: { menuId: '2-3' },
                component: () => import("../components/user/UserDetailsView.vue")
            },
            {
                path: 'edit/:id',
                name: 'UserEdit',
                meta: { menuId: '2-4' },
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
                meta: { menuId: '3-1' },
                component: () => import("../components/active/CheckActiveView.vue")
            },
            {
                path: 'edit/:id',
                name: 'ActiveEdit',
                meta: { menuId: '3-2' },
                component: () => import("../components/active/EditActiveView.vue")
            },
            {
                path: 'search',
                name: 'ActiveSearch',
                meta: { menuId: '3-3' },
                component: () => import("../components/active/SearchActiveView.vue")
            },
            {
                path: 'detail/:id',
                name: 'ActiveDetail',
                meta: { menuId: '3-4' },
                component: () => import("../components/active/ActiveDetailsView.vue")
            },
            {
                path: 'checkMemberActive/:id',
                name: 'CheckMemberActive',
                meta: { menuId: '3-5' },
                component: () => import("../components/active/CheckMemberActiveView.vue")
            },
        ],
    }
]

const router = createRouter({
    history: import.meta.env.MODE === 'production'
        ? createWebHashHistory(import.meta.env.BASE_URL)
        : createWebHistory(import.meta.env.BASE_URL),
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