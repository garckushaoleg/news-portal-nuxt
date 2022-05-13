<template>
  <v-container>
    <v-row>
      <v-col v-for="(post, index) in $store.state.posts" :key="index">
        <v-card
          class="mx-auto my-12"
          width="350"
          v-if="isNewsPost(post)"
        >
          <v-img
            height="250"
            width="350"
            :src="post.imageUrl"
          ></v-img>

          <v-card-title class="card__text card__title">{{ post.title }}</v-card-title>

          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <a :href="post.url" target="_blank" class="my-4">
                {{ post.newsSite }}
              </a>
            </v-row>

            <div class="my-4 card__text">
              {{ post.summary }}
            </div>
          </v-card-text>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="openPost(post.id)"
            >
              Open
            </v-btn>
            <v-btn
              color="deep-purple lighten-2"
              text
              @click="deletePost(post.id)"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card
          class="mx-auto my-12"
          width="350"
          v-else
        >
          <v-img
            height="250"
            width="350"
            :src="post.download_url"
          ></v-img>
          <v-text-field 
            outlined class="mt-7" 
            label="Free text input field"
          ></v-text-field>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'News',
  methods: {
    deletePost(id) {
        this.$store.commit('deletePost', id);
    },

    openPost(id) {
      this.$router.push(`/post/${id}`)
    },

    isNewsPost(item) {
      return 'title' in item;
    }
  },

  computed: {
    posts() {
      return this.$store.state.posts
    }
  }
}
</script>

<style scoped>
  .card__text {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    word-break: normal;
  }

  .card__title {
    height: 80px;
  }

</style>