<template>
  <div class="commnet my-2">
    <v-layout row wrap class="pa-2">
      <div class="px-3">createdBy:</div>
      <v-spacer></v-spacer>
    </v-layout>
    <div v-if="data.img">
      <img style="max-width: 100%" :src="data.img" alt="" />
    </div>
    <div class="content pa-2" v-html="$md.render(data.comment)"></div>
  </div>
</template>
<script>
import CommentService from '../../api/services/comments.service'
import Config from '../../config/config'
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: {
        img: '',
        comment: ''
      }
    }
  },
  created() {
    this.initFun()
  },
  methods: {
    async initFun() {
      try {
        const { data } = await CommentService.getOne(this.id)
        this.data = data.data
        this.data.img = `${new Config().BaseURL}/${data.data.img}`
      } catch (err) {
        this.$router.push('/login')
        console.log(err)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.commnet {
  border: 1px solid white;
  border-radius: 5px;
  img {
    position: relative;
    max-width: 100%;
  }
}
</style>
