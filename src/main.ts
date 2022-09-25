import { createApp, createVNode } from 'vue'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'

import App from './App.vue';
import router from "./routes/index"

import 'element-plus/dist/index.css'
import './style/index.css'
const app = createApp(App);
app.use(ElementPlus);
app.use(router)
app.mount('#app');

// 图标
app.component('Icon', ({ icon }: { icon: string }) => {
	return createVNode(Icons[icon as keyof typeof Icons])
})