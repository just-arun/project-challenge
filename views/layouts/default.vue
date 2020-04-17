<template>
  <v-app dark>
    <v-snackbar v-model="$store.state.error.message">
      {{ $store.state.error.message }}
    </v-snackbar>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <nuxt-link to="/"
        ><v-toolbar-title class="white--text" v-text="title"
      /></nuxt-link>
      <v-spacer />
      <v-menu offset-y v-if="$store.state.auth.user">
        <template v-slot:activator="{ on }">
          <v-btn fab dark v-on="on">
            <v-avatar color="indigo" size="36">
              <span class="white--text headline">
                {{ $store.state.auth.user.email.slice(0, 1) }}
              </span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout()">
            <v-list-item-title>logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- <span v-if="$store.state.auth.user">{{
        $store.state.auth.user.email.slice(0, 1)
      }}</span> -->
      <v-btn v-if="!this.$store.state.auth.user" to="/login" text>login</v-btn>
      <!-- <v-btn text>logout</v-btn> -->
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Blogger'
    }
  },
  mounted() {
    this.initFun()
  },
  methods: {
    initFun() {
      try {
        this.$store.dispatch('auth/getUserData')
      } catch (err) {
        this.$router.push('/login')
      }
    },
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>
