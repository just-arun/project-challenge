<template>
  <v-layout column justify-center align-center class="login">
    <v-flex xs12 sm8 md6>
      <form @submit.prevent="validate()">
        <v-card class="pa-4 cus-cart">
          <h1 class="pb-4">login</h1>
          <v-text-field
            v-model="email"
            :rules="[rules.email]"
            filled
            label="email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            filled
            label="password"
            type="password"
          ></v-text-field>
          <v-layout row justify-center>
            <v-btn type="submit" color="success">login</v-btn>
          </v-layout>
          <p class="text-center mt-4">
            ain't got a account?
            <nuxt-link class="green--text lighten-3" to="/register"
              >register</nuxt-link
            >
          </p>
        </v-card>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import sha512 from 'js-sha512'
import UserService from '@/api/services/user.service.js'
export default {
  layout: 'login',
  components: {},
  data() {
    return {
      email: '',
      password: '',
      err: {
        email: '',
        password: ''
      },
      rules: {
        required: (value) => !!value || 'Required.',
        counter: (value) => value.length <= 20 || 'Max 20 characters',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  methods: {
    validate() {
      let error = false
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!pattern.test(this.email)) {
        this.err.email = 'email is not valied'
        error = true
      }
      if (!this.email) {
        this.err.email = 'email is required'
        error = true
      }
      if (!this.password) {
        this.err.password = 'password is required'
        error = true
      }
      if (!error) {
        const hash = sha512.update(this.password)
        this.login({ email: this.email, password: hash.hex() })
      }
    },
    async login(para) {
      try {
        const res = await UserService.login(para)
        console.log(res.data)
        this.$store.dispatch('auth/getUserData', res.data.data._id)
        return this.$router.push('/profile')
      } catch (err) {
        this.$store.dispatch('error/update', err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
}
.cus-cart {
  min-width: 350px;
  box-size: border-box;
}
</style>
