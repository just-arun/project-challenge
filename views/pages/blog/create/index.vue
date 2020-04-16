<template>
  <v-container>
    <h1 class="text-center">Create Blog</h1>
    <form>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field v-model="title" filled label="title"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-textarea
            :rows="20"
            auto-grow
            v-model="body"
            filled
            label="blog body"
          ></v-textarea>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-space-between>
        <div></div>
        <v-btn color="success">save</v-btn>
      </v-layout>
    </form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      body: ''
    }
  }
}
</script>
