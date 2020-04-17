<template>
  <v-layout row align-center justify-center>
    <v-flex v-for="(item, i) in posts" :key="i" xs12 sm8 md6 lg4>
      <nuxt-link :to="`/blog/${item._id}`"
        ><PostTile :title="item.title" :comment="item.comments" :img="item.img"
      /></nuxt-link>
    </v-flex>
  </v-layout>
</template>

<script>
import PostService from '../api/services/post.service'
import PostTile from '@/components/post-tile/post-tile'
export default {
  components: {
    PostTile
  },
  data() {
    return {
      posts: []
    }
  },
  created() {
    this.initFun()
  },
  methods: {
    async initFun() {
      try {
        const { data } = await PostService.getAll()
        this.posts = data.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
