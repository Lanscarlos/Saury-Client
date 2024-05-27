
import { createApp } from 'vue';
import App from './App';
import router from './router';
import vuex from "./vuex";
import axios from 'axios';
import qs from 'qs';
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import {autoLogin} from "@/utils/auth";

const app = createApp(App);

/* 设置默认的请求路径 */
axios.defaults.baseURL = "http://localhost:8080";
app.config.globalProperties.$axios = axios;

/* 引入数据编码库 */
app.config.globalProperties.$qs = qs;

/* 引入vuex */
app.use(vuex)

/* 引入 Router */
app.use(router)

app.use(ElementPlus)

// 注册 Element-UI 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('user') == null) {
        autoLogin()
    }
    console.log('beforeEach: ' + from.name + ' -> ' + to.name)
    switch (to.name) {
        case 'login':
        case 'register': {
            next()
            break;
        }
        case 'follow':
        case 'profile':
        case 'publish':
        case 'stars':
        case 'orders':
        case 'note':
        case 'admin': {
            if (sessionStorage.getItem('user') == null) {
                // 用户未登录
                next({ name: 'login' })
            } else {
                next()
            }
            break;
        }
        default: {
            next()
        }
    }
})
