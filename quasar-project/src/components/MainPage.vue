<template>
  <div class="q-pa-lg">
    <div class="q-gutter-md q-mt-lg">
      <q-btn @click="showAddForm = true">
        <q-icon name="add" /> Add Movie/Show
      </q-btn>

      <q-btn size="lg" class="bg-red text-white" @click="refresh()"> FAVORITOS</q-btn>

<br >
<br >
      <span> <strong>FEED PRINCIPAL </strong></span>
      <div
        v-if="showAddForm"
        class="q-mt-md"
        style="
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: auto;
        "
      >
        <div class="q-pa-xs" style="max-width: 650px;">
            <div class="q-pa-xs" style="max-width: 650px;">
            <q-form @submit.prevent="addMovie">
              <q-input v-model="newMovie.title" label="Title" />
              <q-btn type="submit" label="Add Movie" class="q-mt-md" />
            </q-form>
          </div>
        </div>
      </div>
      <div class="q-mt-md">
        <div v-for="movie in movies" :key="movie.id">
          <q-card class="q-mb-lg">
            <q-card-section style="height: 50px;">
              <span>Nome do Filme/Série:</span>
              <div class="text-h6">{{ movie.title }}</div>
            </q-card-section>

            <q-card-section>
              <q-rating v-model="movie.rating" :max="5" icon="star" class="q-mr-sm" />
              <span class="text-grey-8">{{ movie.releaseYear }}</span>
            </q-card-section>

            <q-card-section>{{ movie.description }}</q-card-section>

            <q-card-actions>
              <q-btn icon="thumb_up" label="Like" color="primary" flat dense @click="likeMovie(movie.id)"/>
              <q-btn icon="thumb_down" label="Dislike" color="primary" flat dense @click="dislikeMovie(movie.id)"/>
              <q-btn icon="star" label="Follow" color="primary" flat dense />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showAddForm: false,
      movies: [],
      newMovie: {
        title: "",
        rating: 0,
      }
    };

    
    
  },
  methods: {
    likeMovie(movieId) {
    axios.patch(`http://localhost:3000/movies/${movieId}`, {
      rating: this.getLikedRating(),
    })
      .then(response => {
        console.log(`Movie ${movieId} rating updated successfully.`);
        // Refresh the movies feed to reflect the updated rating:
        this.refresh();
      })
      .catch(error => {
        console.log(`Error updating rating for movie ${movieId}:`, error);
      });
  },

  getLikedRating() {
   // Find the movie in the list of movies:
    const movie = this.movies.find(m => m.id === movieId);

    // Calculate the new rating value:
    let newRating = movie.rating;
    if (movie.rating < 5) {
      newRating += 1;
    }

    return newRating;
  },

    addMovie() {
    axios
      .post("http://localhost:3000/movies", this.newMovie)
      .then(response => {
        this.movies.push(response.data);
        this.showAddForm = false;
        this.newMovie = {
          title: "",
        };
      })
      .catch(error => {
        console.log(error);
      });
    },
    refresh() {
      this.$forceUpdate();
      axios
      .get("http://localhost:3000/movies")
      .then(response => {
        console.log(response.data[0].rating);
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/movies")
      .then(response => {
        this.movies = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
