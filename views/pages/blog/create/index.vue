<template>
  <v-container>
    <h1 class="text-center">Create Blog</h1>
    <form @submit.prevent="validate()">
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            v-model="title"
            :error-messages="err.title"
            filled
            label="title"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-file-input
            v-model="img"
            :error-messages="err.img"
            label="landing image"
            filled
          ></v-file-input>
        </v-flex>
        <v-flex xs12>
          <v-textarea
            v-model="body"
            :error-messages="err.body"
            :rows="20"
            auto-grow
            filled
            label="blog body (markdown content)"
          ></v-textarea>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-between>
        <div></div>
        <v-btn type="submit" color="success">save</v-btn>
      </v-layout>
    </form>
  </v-container>
</template>

<script>
import PostService from '@/api/services/post.service'
export default {
  data() {
    return {
      title: '',
      img: '',
      body: '',
      err: {
        img: '',
        title: '',
        body: ''
      }
    }
  },
  methods: {
    validate() {
      let error = false
      if (!this.title) {
        this.err.title = 'post title is required'
        error = true
      }
      console.log(this.img)
      if (!this.img) {
        this.err.img = 'landing image is required'
        error = true
      }
      if (!this.body) {
        this.err.body = 'post body is required'
        error = true
      }
      if (!error) {
        this.save()
      }
    },
    async save() {
      try {
        const form = new FormData()
        form.append('img', this.img, this.img.name)
        form.append('title', this.title)
        form.append('body', this.body)
        const { data } = await PostService.create(form)
        this.$router.push(`/blog/${data.data._id}`)
      } catch (err) {
        this.$store.dispatch(
          'error/update',
          err.response.data.error.message || err
        )
      }
    }
  }
}
</script>
