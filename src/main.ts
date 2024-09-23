import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router";
import pinia from "./store";
import {authGuard} from "./utils/authGuard.ts";
import "./styles/variables.css"

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus)

// 登录路由拦截
authGuard()


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')
