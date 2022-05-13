<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          class="mx-auto my-12 card"
        >
          <v-img
            height="500"
            :src="post.imageUrl"
          ></v-img>

          <v-card-title class="text-caption">{{ date || '' }}</v-card-title>

          <v-card-title>{{ post.title }}</v-card-title>

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
        </v-card>
      </v-col>
    </v-row>
    <v-overlay :value="isOverlaid">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import PostsAPI from '../../API/postsAPI';

export default {
  data() {
    return {
      post: {},
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      isOverlaid: false,
    }
  },
  computed: {
    date() {
      if (this.post.publishedAt) {
        const fullDate = new Date(this.post.publishedAt);
        const hours = fullDate.getHours();
        const minutes = fullDate.getMinutes();
        const date = fullDate.getDate();
        const year = fullDate.getFullYear()
        return `${this.getNumberForDate(hours)}:${this.getNumberForDate(minutes)}, 
            ${this.getNumberForDate(date)} ${this.months[+fullDate.getMonth()]} ${year}`;
      }
    }
  },
  methods: {
    getNumberForDate(number) {
      return number < 10 ? `0${number}`: number;
    },
  },
  async mounted() {
    this.isOverlaid = true;
    const response = await PostsAPI.getPost(this.$route.params.id);
    this.post = response[0];
    this.isOverlaid = false;
  },
}
</script>

<style scoped>
.card {
  border: 1px solid #3f51b5;
}
</style>