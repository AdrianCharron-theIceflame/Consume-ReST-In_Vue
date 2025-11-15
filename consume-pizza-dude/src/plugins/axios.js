/*
    The axios object is global.
    If you want to create a custom instance of it, though, you can.
*/
// import axios
import axios from "axios";

// create a constant instance with a base url (exported for the composition API)
export const $axios = axios.create({
    baseURL: `/api`
})

// create a global warning message for if the server is not responding (response status > 500)
export const $warningMessage = { title: `Could not contact the server`, text: `Please try again later` }

// export the plugin as default
export default {
    install(app) { // takes in the app argument
        app.config.globalProperties.$warningMessage = $warningMessage // assigns warning message to global Options API variable
        app.config.globalProperties.$axios = $axios // assigns axios instance to global Options API variable
    }
}

/*
    Explanation: Only the Options API has access to variables assigned to app.config.globalProperties
    So, export the objects if they need to be used from the Composition API
*/
