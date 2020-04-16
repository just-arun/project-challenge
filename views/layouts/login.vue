<template>
  <v-app>
    <v-snackbar type="error" top v-model="error">
      {{ $store.state.error.message }}
    </v-snackbar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>
<script>
export default {
  computed: {
    error() {
      const value = !!this.$store.state.error.message
      if (value) {
        this.disable()
      }
      return value
    }
  },
  methods: {
    disable() {
      setTimeout(() => {
        this.$store.dispatch('error/update', null)
      }, 3000)
    }
  }
}
</script>
