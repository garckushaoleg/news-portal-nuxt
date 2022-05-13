<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="isOpenedSidebar"
      fixed
      app
      temporary
    >
      <v-btn
        color="deep-purple lighten-2"
        class="mt-8 mb-2 button"
        text
        outlined
        @click="createPost"
        :disabled="isButtonDisabled"
      >
        Create Post
      </v-btn>
      <v-list>
        <v-list-item
          v-for="(menu, i) in menus"
          :key="i"
          :to="menu.to"
          router
          exact
          class="pl-6"
        >
          <v-list-item-content>
            <v-list-item-title v-text="menu.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense>
        <v-list-item-group
          color="primary"
        >
        <template v-for="(post, i) in posts">
          <v-list-item
            :key="i"
            @click="openPost(post.id)"
            v-if="!!post.title"
          >
            <v-list-item-content>
              <v-list-item-title v-text="post.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="isOpenedSidebar = !isOpenedSidebar" />

      <NuxtLink to="/" class="ml-1">Space</NuxtLink>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        color="indigo"
        class="mr-1 mr-sm-2 mr-md-2 mr-lg-2 mr-xl-2"
        to="/login"
      >
        Log in
      </v-btn>
      <v-btn
        color="primary"
        to="/registration"
      >
        Get started
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-overlay :value="isOverlaid">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import PostsAPI from '../API/postsAPI';
import ImagesAPI from '../API/imagesAPI'

export default {
  name: 'DefaultLayout',
  data () {
    return {
      isOpenedSidebar: false,
      menus: [
        {
          title: 'Dashboard',
          to: '/dashboard'
        }
      ],
      isOverlaid: false,
      allImages: [],
      newShowedImages: [],
      amountOfSkippedPosts: 0,
      amountOfNewPosts: 3,
      amountOfShowedImages: 3,
    }
  },
  methods: {
    async createPost() {
      this.amountOfSkippedPosts++;
      this.isOverlaid = true;
      await this.getPosts(this.amountOfSkippedPosts, this.amountOfNewPosts);
      this.isOverlaid = false;
    },

    async getPosts(start, limit) {
      const data = await PostsAPI.search(start, limit);
      this.$store.commit('addPost', data);
    },

    async getInitImages() {
      const page = 2;
      const limit = 100;
      this.allImages = await ImagesAPI.search(page, limit);
      this.newShowedImages = this.allImages.filter((_, index) => index < this.amountOfShowedImages);
      this.$store.commit('addImages', this.newShowedImages);
    },

    openPost(id) {
      this.$router.push(`/post/${id}`)
    },

    getNextPost() {
      window.onscroll = () => {
        const step = 3;
        const bottomOfWindow = (window.innerHeight + window.scrollY) >= document.body.scrollHeight
        if (bottomOfWindow) {
          this.amountOfShowedImages += step;
          this.newShowedImages = this.allImages.filter(
            (_, index) => index >= this.amountOfShowedImages - step && index < this.amountOfShowedImages
          );
          this.$store.commit('addImages', this.newShowedImages);
        }
      }
    }
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },

    isButtonDisabled() {
      return !this.$store.state.isAuthenticated;
    }
  },
  
  async fetch() {
    this.isOverlaid = true;

    await this.getPosts(this.amountOfSkippedPosts, this.amountOfNewPosts);
    this.amountOfSkippedPosts = 2;
    this.amountOfNewPosts = 1;

    await this.getInitImages();

    this.isOverlaid = false;
  },

  mounted() {
    this.getNextPost();
  }
}
</script>

<style scoped>
.button {
  width: 100%;
}

a.nuxt-link-active {
  font-size: 20px;
}

a.nuxt-link-exact-active {
  color: purple;
}

a, a:visited {
  text-decoration: none;
  color: inherit;
}
</style>
