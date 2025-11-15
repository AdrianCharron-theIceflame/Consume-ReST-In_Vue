/*
    Vee-Validate plugin.
    This plugin is entirely global so you need to import it either in components using the Composition API, or
    You need to set up Vee-Validate in the `setup()` method of the Options API components

    Because it's global, I wanted to make it a plugin to make sure that all the rules are added only once the plugin is installed in the Vue app
*/

// imports for creating default rules
import { defineRule } from "vee-validate";
import { all } from "@vee-validate/rules";

export default { // export the plugin
    install() { // method used by Vue apps to install plugins (there are optional parameters that can be used)
        Object.entries(all).forEach(([name, rule]) => {
            defineRule(name, rule)
        })
    }
}