<script>
export default { // export default == Options API
  components: {
  },
  data() {
    return {
      currentTab: null,
      tabs: [
        { name: `Pizzas`, value: `home` },
        { name: `Add Pizza`, value: `addPizza` }
      ],
      successMessage: ``,
      errorMessage: ``,
      warning: {
        title: ``,
        text: ``
      }
    }
  },
  computed: {
    isHome() { return this.currentTab == this.tabs[0].value },
    isSuccess() {
      return this.successMessage.length > 0
    },
    hasError() {
      return this.errorMessage.length > 0
    },
    hasWarning() {
      return this.warning.text.length > 0 && this.warning.title.length > 0
    }
  },
  methods: {
    handleSuccess(message) {
      this.$router.push({ name: `home` })
      this.successMessage = message
    },
    handleError(error) {
      this.errorMessage = error
    },
    closeAlerts() {
      this.errorMessage = ``
      this.successMessage = ``
      this.warning.text = ``
      this.warning.title = ``
    },
    handleWarning(warningObject) {
      this.warning.title = warningObject.title
      this.warning.text = warningObject.text
    }
  },
  mounted() {
    this.currentTab = this.tabs[0].value
  },
}
</script>

<template>
  <v-responsive class="border rounded" max-height="900">
    <v-app class="pa-16">
      <v-app-bar title="Spells's Pizzas"></v-app-bar>
      <v-main>
        <div id="mainView" class="ma-auto">
          <v-alert class="mt-3" variant="tonal" v-if="isSuccess" color="success" icon="$success" :title="successMessage"
            closable></v-alert>
          <v-alert class="mt-3" variant="tonal" v-if="hasWarning" color="warning" icon="$warning" :title="warning.title"
            :text="warning.text" closable></v-alert>
          <v-alert class="mt-3" variant="tonal" v-if="hasError" color="error" icon="$error" :title="errorMessage"
            closable></v-alert>
          <v-tabs fixedTabs>
            <v-tab @click="closeAlerts" class="pt-4" v-for="tab in tabs" :key="tab.value" :to="{ name: tab.value }"
              :text="tab.name"></v-tab>
          </v-tabs>
          <router-view @warning="handleWarning" @error="handleError" @success="handleSuccess">
          </router-view>
        </div>
      </v-main>
      <v-footer app class="d-flex align-center justify-center ga-2 flex-wrap flex-grow-1 py-3">
        <v-btn v-for="tab in tabs" :key="tab.value" :to="{ name: tab.value }" variant="text">{{ tab.name }}</v-btn>
        <div class="flex-1-0-100 text-center mt-2">
          {{ new Date().getFullYear() }} — <strong>Spells's Pizzas</strong>
        </div>
      </v-footer>
    </v-app>
  </v-responsive>
</template>

<style scoped>
#mainView {
  inline-size: 60vi;
}
</style>
