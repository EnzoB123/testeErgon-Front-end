<template>

  <q-btn
  icon="arrow_back"
  label="Go Back"
  @click="this.$router.go(-1)"
/>

<div class="q-pa-md">
    <q-btn class="logout-button"
      icon="logout"
      @click="logout"
      position="top-right"
      label="Log Out"
    />
  </div>
  <div class="q-pa-md">
    <q-list>
      <q-item v-for="(movie, index) in filteredMovies" :key="index">
        <q-item-section>
          <q-item-label>
            <h4 class="q-mb-sm">{{ movie.title }}</h4>
            <div class="q-mt-md">
              <span class="likes-count">{{ movie.liked && movie.liked.length }}</span>
              <q-icon name="thumb_up" class="likes-icon q-mr-lg" color="positive" />
              <span class="dislikes-count">{{ movie.disliked && movie.disliked.length }}</span>
              <q-icon name="thumb_down" class="dislikes-icon q-mr-lg" color="negative"/>
              <span class="followers-count">{{ movie.followers && movie.followers.length }}</span>
              <q-icon name="people" class="followers-icon" />
            </div>
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn-group>
            <q-btn
              v-if="movie.liked && movie.liked.includes(this.userId)"
              color="positive"
              label="Liked"
              icon="thumb_up"
              disable
            />
            <q-btn
              v-if="movie.disliked && movie.disliked.includes(this.userId)"
              color="negative"
              label="Disliked"
              icon="thumb_down"
              disable
            />
            <q-btn
              v-if="movie.followers && movie.followers.includes(this.userId)"
              color="primary"
              label="Following"
              icon="people"
              disable
            />
          </q-btn-group>
        </q-item-section>
      </q-item>
    </q-list>

  </div>
</template>

<script>
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default {
  data() {
    return {
      movies: [],
      userId: '',
    };
  },
  methods: {
    async logout() {
      const token = localStorage.getItem('token');
      if (token) {
      localStorage.removeItem("token");
      await this.$router.push("/");
      }

      else {
        this.$router.push("/");
      }
    },
  },

  computed: {
    filteredMovies() {
      return this.movies.filter(movie =>

        movie.liked && movie.liked.includes(this.userId) ||
        movie.disliked && movie.disliked.includes(this.userId) ||
        movie.followers && movie.followers.includes(this.userId)
        ).map(movie => {
          const numLikes = movie.liked && movie.liked.length;
          const numDislikes = movie.disliked && movie.disliked.length;
          const numFollowers = movie.followers && movie.followers.length;

          return {
            ...movie,
            numLikes,
            numDislikes,
            numFollowers,
          }
        });
        }
      },


  created() {

  },

  mounted() {
    axios
      .get('http://localhost:3000/movies')
      .then((response) => {
        const movieData = Object.values(response.data);
        this.movies = movieData;
      })
      .catch((error) => {
        console.error(error);
      });

      const token = localStorage.getItem('token');
      // Decode the token
      const decoded = jwt_decode(token);
      const userId = decoded.userId
      this.token = token
      this.userId = userId;


  },
};
</script>


<style scoped>
.logout-button {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgb(255, 0, 0);
}
</style>

