// import styles
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// import create plugin method
import { createVuetify } from "vuetify";

// import requirements for vuetify to function
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import colors from 'vuetify/util/colors'

// create the plugin
export default createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: `dark`,
        themes: {
            dark: {
                colors: {
                    background: colors.blueGrey.darken4
                }
            }
        }
    }
})
