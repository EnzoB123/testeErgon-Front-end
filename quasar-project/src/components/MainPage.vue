<template>
  <div class="q-pa-lg">
    <div class="q-gutter-md q-mt-lg">
      <q-btn-sticky>
      <q-btn icon="add" type="submit" label="Add Movie/Show" color="primary" class="q-mt-md" />
    </q-btn-sticky>
      <div class="q-mt-md" style="height: 100vh; display: flex; justify-content: center; align-items: center; overflow: auto;">
        <div class="q-pa-xs" style="max-width: 650px;">
          <q-card v-for="movie in movies" :key="movie.id" class="q-mb-lg">
            <q-card-section style="height: 150px;">
              <div class="text-h6">{{ movie.title }}</div>
              <q-avatar :src="movie.posterUrl" class="q-ml-sm" style="height: 100%;" />
            </q-card-section>

            <q-card-section>
              <q-rating v-model="movie.rating" :max="5" icon="star" class="q-mr-sm" />
              <span class="text-grey-8">{{ movie.releaseYear }}</span>
            </q-card-section>

            <q-card-section>
              {{ movie.description }}
            </q-card-section>

            <q-card-actions>
              <q-btn  icon="thumb_up" label="Like" color="primary" flat dense />
              <q-btn  icon="thumb_down" label="Dislike" color="primary" flat dense />
              <q-btn  icon="mail" label="Follow" color="primary" flat dense />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movies: [
        {
          id: 1,
          title: "The Godfather",
          posterUrl: "https://via.placeholder.com/150x225.png?text=The+Godfather",
          rating: 4,
          releaseYear: 1972,
          description:
            "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        },
        {
          id: 2,
          title: "The Shawshank Redemption",
          posterUrl: "https://via.placeholder.com/150x225.png?text=The+Shawshank+Redemption",
          rating: 5,
          releaseYear: 1994,
          description:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        },
        {
          id: 3,
          title: "The Dark Knight",
          posterUrl: "https://via.placeholder.com/150x225.png?text=The+Dark+Knight",
          rating: 4.5,
          releaseYear: 2008,
          description:
            "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        },
      ],
    };
  },
};
</script>
