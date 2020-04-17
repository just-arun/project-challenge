<template>
  <div class="blog-wrapper">
    <img :src="img" alt="landing img" />
    <h1 class="title">{{ title }}</h1>
    <div class="flex">
      <img class="avatar" :src="profile" alt="avatar" />
      <div class="ml-2">{{ email }}</div>
      <div style="flex: 1"></div>
      <div>posted: {{ created }}</div>
    </div>
    <div class="body" v-html="$md.render(body)"></div>
    <div style="position: relative">
      <v-btn
        v-if="!commentTrigger"
        rounded
        @click="commentTrigger = !commentTrigger"
        >comment <v-icon right>mdi-plus</v-icon>
      </v-btn>
    </div>
    <div v-if="commentTrigger">
      <v-card>
        <v-card-title primary-title>
          write your comment
        </v-card-title>
        <v-card-subtitle>
          <span class="captino">(markdown suported)</span>
          <v-spacer></v-spacer>
          <v-file-input
            v-model="comment.img"
            style="max-width: 30px;margin-right: 30px"
            prepend-icon="mdi-image"
          ></v-file-input>
        </v-card-subtitle>
        <v-textarea v-model="comment.text" auto-grow filled></v-textarea>
        <v-card-actions>
          <v-btn @click="commentTrigger = !commentTrigger">cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="saveComment()">comment</v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-for="(item, i) in comments" :key="i" class="comments">
      <comments :id="item" />
    </div>
  </div>
</template>
<script>
import PostService from '../../api/services/post.service'
import Config from '@/config/config'
import Comments from '@/components/comments/comments'
import CommentService from '@/api/services/comments.service'
export default {
  // layout: 'login',
  components: {
    Comments
  },
  data() {
    return {
      commentTrigger: false,
      title: '',
      body: '',
      img: '',
      author: '',
      email: '',
      profile: '',
      created: '',
      comments: [],
      comment: {
        text: '',
        img: ''
      }
    }
  },
  created() {
    this.initFun()
  },
  methods: {
    async initFun() {
      try {
        const { data } = await PostService.getOne(this.$route.params.slug)
        const blogData = data.data
        this.title = blogData.title
        this.img = `${new Config().BaseURL}/${blogData.img}`
        this.profile = `${new Config().BaseURL}/${blogData.pImg}`
        this.body = blogData.body
        this.author = blogData.author
        this.email = blogData.email
        this.comments = blogData.comments.sort((a, b) => (b > a ? 1 : -1))
        this.created = blogData.createdAt.slice(0, 10)
      } catch (err) {
        console.log(err)
      }
    },
    // eslint-disable-next-line require-await
    async saveComment() {
      try {
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!this.comment.text) {
          // eslint-disable-next-line prefer-const
          let form = new FormData()
          form.append('comment', this.comment.text)
          form.append('post', this.$route.params.slug)
          if (this.comment.img) {
            form.append('img', this.comment.img, this.comment.img.name)
          }
          await CommentService.create(form)
          setTimeout(() => {
            this.initFun()
          }, 1000)
          this.commentTrigger = false
        } else {
          this.commentTrigger = false
        }
      } catch (err) {
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './slug.scss';
</style>
