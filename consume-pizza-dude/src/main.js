// import fonts
import 'unfonts.css'

// import Vue's app creation method
import { createApp } from 'vue'

// import plugins
import { createPinia } from 'pinia' // allows using stores (none in use in this project)
import App from './App.vue' // main app view
import router from './router' // router plugin
import axios from './plugins/axios' // http request plugin
import vuetify from './plugins/vuetify' // components library/styles/colours/icons
import veeValidate from './plugins/vee-validate' // form validation library

// create the app
const app = createApp(App)

// install the plugins
app.use(createPinia())
app.use(router)
app.use(axios)
app.use(vuetify)
app.use(veeValidate)

// mount the app
app.mount('#app')
