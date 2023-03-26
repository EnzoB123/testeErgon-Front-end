<template>
  <div>
    <form @submit.prevent="submitMovie">
      <div class="q-field">
        <label class="q-label"><strong>Título</strong></label>
        <q-input v-model="title" />
      </div>
      <div class="q-field">
        <label class="q-label"><strong>Rating</strong></label>
        <q-rating v-model.number="rating" :max="5" />
      </div>
      <q-btn type="submit" label="Add Movie" color="primary" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      rating: null,
    };
  },
  methods: {
    submitMovie() {
      const movie = {
        title: this.title,
        rating: this.rating,
      };

      axios
        .post("http://localhost:3000/movies", movie)
        .then(() => {
          // The movie was saved successfully, so we can clear the form
          this.title = "";
          this.rating = null;
          
          // Fetch the updated movie list to refresh the feed
          this.fetchMovies();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchMovies() {
      axios.get("http://localhost:3000/movies").then((response) => {
        this.movies = response.data;
      });
    },
  },
};
</script>
