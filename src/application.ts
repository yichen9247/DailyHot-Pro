import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { loadVueLazyLoad } from '@/scripts/appScript'

import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import devtool from './scripts/devtool'
import Application from './Application.vue'
import disableDevtool from 'disable-devtool'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const application = createApp(Application);
if (import.meta.env.MODE === 'production') disableDevtool(devtool);

Promise.all([
    application.use(router),
    loadVueLazyLoad(application),
    application.use(ElementPlus, {
        locale: zhCn,
    }),
    application.use(createPinia())
]).then(() => {
    application.mount('#application');
});