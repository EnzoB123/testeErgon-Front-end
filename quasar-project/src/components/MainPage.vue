<template>
 <div class="q-pa-md">
    <q-btn class="logout-button"
      icon="logout"
      @click="logout"
      position="top-right"
      label="Log Out"
    />
  </div>

  <div class="q-pa-lg">
    <div class="q-gutter-md q-mt-lg">
      <q-item-section top>
          <q-btn @click="showAddForm = true" icon="add" size="lg" class="bg-blue text-white">

            Adicionar Filme ou Série
          </q-btn>
        </q-item-section>


      <q-item to="/favorites" exact>
        <q-item-section top>
          <q-btn icon="star" size="lg" class="bg-green text-white" @click="refresh()">
            FAVORITOS
          </q-btn>
        </q-item-section>
      </q-item>

      <br />
      <br />
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
      <q-layout justify-center align-center>
        <div class="q-pa-xs" style="max-width: 650px">
          <div class="q-pa-xs" style="max-width: 650px">
            <q-form @submit.prevent="addMovie">
              <q-input v-model="newMovie.title" label="Título do Filme" />
              <q-btn type="submit" label="Adicionar Filme" class="q-mt-md" />
              <q-btn label="Cancelar" class="q-ml-md q-mt-md" @click="showAddForm = false" />
            </q-form>
          </div>
        </div>
      </q-layout>
      </div>
      <div class="q-mt-md">
        <div v-for="movie in movies" :key="movie.id">
          <q-card class="q-mb-lg">
            <q-card-section style="height: 50px">
              <span>Nome do Filme/Série:</span>

              <div class="text-h6">{{ movie.title }}</div>
            </q-card-section>
            <br >
            <br >

            <q-card-actions>
              <q-btn
                icon="thumb_up"
                label="Like"
                color="positive"
                flat
                dense
                @click="likeMovie(movie.movieId, this.userId)"
              />
              <q-btn
                icon="thumb_down"
                label="Dislike"
                color="negative"
                flat
                dense
                @click="dislikeMovie(movie.movieId, this.userId)"
              />

              <q-btn
                icon="star"
                label="Acompanhar"
                color="secondary"
                flat
                dense
                @click="followMovie(movie.movieId, this.userId)"
              />

              <q-item-section side>
                <q-btn v-if="canDeleteMovie(movie)" @click="deleteMovie(movie.movieId)">
                  Excluir
                </q-btn>
              </q-item-section>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jwt_decode from 'jwt-decode';

export default {
  data() {
    return {
      userId: null,
      showAddForm: false,
      movies: [],
      newMovie: {
        title: "",
        liked: [],
        disliked: [],
        followers: [],
      },
    };
  },
  methods: {
    canDeleteMovie(movie) {
    // Check if the movie has any likes, dislikes, or followers
      if (movie.liked && movie.liked.length || movie.disliked && movie.disliked.length || movie.followers && movie.followers.length) {
        return false;
      }

      // Check if the current user is the owner of the movie post
      if (movie.userId !== this.userId) {
        return false;
      }

      // If none of the above conditions apply, the movie can be deleted
      return true;
    },

    deleteMovie(movieId) {
      // Send a DELETE request to the API to delete the movie
      this.$api.delete(`/movies/${movieId}`)
        .then(response => {
          console.log(`Movie ${movieId} deleted successfully.`);
          // Refresh the movies feed to reflect the deleted movie:
          this.refresh();
        })
        .catch(error => {
          console.error(`Failed to delete movie ${movieId}:`, error);
        });
    },
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

    likeMovie(movieId, userId) {
      if (!this.token) {
        console.log("User is not logged in.");
        return;
      }

      this.$api.get(`/movies/${movieId}`)
      .then(response => {
        const movie = response.data;
        const liked = movie.liked || [];
        if (liked.includes(this.userId)) {
          console.log(`User ${this.userId} already liked movie ${movieId}.`);
          return;
        }
        liked.push(userId);
        return this.$api.patch(`/movies/${movieId}`, { liked });
      })
      .then(response => {
        console.log(`Movie ${movieId} rating updated successfully.`);
        // Refresh the movies feed to reflect the updated rating:
        this.refresh();
      })
      .catch(error => {
        console.error(`Failed to update movie ${movieId} rating:`, error);
      });

      this.refresh();

    },

    dislikeMovie(movieId, userId) {
      if (!this.token) {
        console.log("User is not logged in.");
        return;
      }

      this.$api.get(`/movies/${movieId}`)
      .then(response => {
        const movie = response.data;
        const disliked = movie.disliked || [];
        if (disliked.includes(this.userId)) {
          console.log(`User ${this.userId} already disliked movie ${movieId}.`);
          return;
        }
        disliked.push(userId);
        return this.$api.patch(`/movies/${movieId}`, { disliked });
      })
      .then(response => {
        console.log(`Movie ${movieId} rating updated successfully.`);
        // Refresh the movies feed to reflect the updated rating:
        this.refresh();
      })
      .catch(error => {
        console.error(`Failed to update movie ${movieId} rating:`, error);
      });

      this.refresh();
    },


    followMovie(movieId, userId) {
      if (!this.token) {
        console.log("User is not logged in.");
        return;
      }

      this.$api.get(`/movies/${movieId}`)
      .then(response => {
        const movie = response.data;
        const followers = movie.followers || [];
        if (followers.includes(this.userId)) {
          console.log(`User ${this.userId} already followed movie ${movieId}.`);
          return;
        }
        followers.push(userId);
        return this.$api.patch(`/movies/${movieId}`, { followers });
      })
      .then(response => {
        console.log(`Movie ${movieId} rating updated successfully.`);
        // Refresh the movies feed to reflect the updated rating:
        this.refresh();
      })
      .catch(error => {
        console.error(`Failed to update movie ${movieId} rating:`, error);
      });

      this.refresh();
    },


    addMovie() {
      axios
        .post("http://localhost:3000/movies", this.newMovie)
        .then((response) => {
          this.movies.push(response.data);
          this.showAddForm = false;
          this.newMovie = {
            title: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
    refresh() {
      this.$forceUpdate();
    },
  },
  mounted() {
      const token = localStorage.getItem('token');
      // Decode the token
      const decoded = jwt_decode(token);
      const userId = decoded.userId
      this.token = token
      this.userId = userId;
    axios
      .get("http://localhost:3000/movies")
      .then((response) => {
        this.movies = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
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
