import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import {ICS} from 'vue-ics'

createApp(App)
    .use(router)
    .use(ICS)
    .mount('#app')
