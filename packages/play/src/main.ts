import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import LarkElement from '@arcade-mead/lark-ui'
import '@arcade-mead/lark-ui/dist/index.css'

createApp(App).use(LarkElement).mount('#app')
