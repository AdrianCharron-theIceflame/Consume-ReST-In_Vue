import axios from "axios";

export default {
    install(app) {
        const instance = axios.create({
            baseURL: `/api`
        })
        app.config.globalProperties.$warning = { title: `Could not contact the server`, text: `Please try again later` }
        app.config.globalProperties.$axios = instance
    }
}
