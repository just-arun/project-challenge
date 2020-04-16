<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <v-card class="pa-4">
          <div class="avathar">
            <img
              :src="`${baseUrl}/${$store.state.auth.user.img}`"
              alt="avatar"
            />
          </div>
          <h1 class="text-center py-2">{{ $store.state.auth.user.email }}</h1>
          <div>phone number: {{ $store.state.auth.user.phoneNumber }}</div>
          <div>address: {{ $store.state.auth.user.address }}</div>
          <v-btn
            to="/blog/create/"
            color="primary"
            rounded
            absolute
            bottom
            right
          >
            <span>post</span><v-icon right>mdi-plus</v-icon>
          </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Config from '@/config/config.js'
export default {
  middleware: 'auth',
  data() {
    return {
      data: '',
      baseUrl: new Config().BaseURL
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.avathar {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0px auto;
  img {
    position: relative;
    height: 100%;
    width: 100%;
  }
}
</style>
