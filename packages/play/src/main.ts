import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import LarkElement from 'lark-ui'
import 'lark-ui/dist/index.css'

createApp(App).use(LarkElement).mount('#app')
