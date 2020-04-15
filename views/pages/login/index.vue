<template>
  <v-layout column justify-center align-center class="login">
    <v-flex xs12 sm8 md6>
      <v-card class="pa-4 cus-cart">
        <h1>login</h1>
        <v-text-field label="email"></v-text-field>
        <v-text-field label="password" type="password"></v-text-field>
        <v-layout row justify-center>
          <v-btn color="success">login</v-btn>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'login',
  components: {}
}
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
}
.cus-cart {
  min-width: 300px;
  box-size: border-box;
}
</style>
