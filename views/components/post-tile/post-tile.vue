<template>
  <v-card class="ma-3">
    <v-img class="white--text align-end" height="200px" :src="url(img)"></v-img>
    <v-card-title primary-title>
      {{ title }}
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-badge
        v-if="comment.length > 0"
        class="mr-3"
        color="pink"
        :content="comment.length"
      >
        <v-icon small>mdi-message</v-icon>
      </v-badge>
    </v-card-actions>
  </v-card>
</template>
<script>
import Config from '@/config/config'
export default {
  props: {
    title: String,
    comment: Number,
    img: String
  },
  methods: {
    url(para) {
      return `${new Config().BaseURL}/${para}`
    }
  }
}
</script>
