<template>
  <v-app>
    <v-snackbar type="error" top v-model="error">
      Error: {{ $store.state.error.message }}
    </v-snackbar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>
<script>
export default {
  mounted() {
    this.initFun()
  },
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
    },
    initFun() {
      try {
        this.$store.dispatch('auth/getUserData')
      } catch (err) {
        this.$router.push('/login')
      }
    }
  }
}
</script>
