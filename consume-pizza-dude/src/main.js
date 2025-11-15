import 'unfonts.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from './plugins/axios'
import vuetify from './plugins/vuetify'
import veeValidate from './plugins/vee-validate'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(axios)
app.use(vuetify)
app.use(veeValidate)

app.mount('#app')
