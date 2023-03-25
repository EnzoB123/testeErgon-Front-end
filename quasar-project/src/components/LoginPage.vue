<template>
  <div class="q-pa-md">
    <div class="q-gutter-md q-mt-lg">
      <q-img src="statics/quasar-logo-full.svg" width="128px" />

      <q-form @submit.prevent="login" class="q-mt-lg">
        <q-field class="q-mb-sm" :max-width="getInputWidth()">
          <q-input v-model="username" label="Username" dense outlined />
        </q-field>
        <q-field class="q-mb-sm" :max-width="getInputWidth()">
          <q-input v-model="password" label="Password" dense outlined type="password" />
        </q-field>
        <q-btn type="submit" label="Log In" color="primary" class="q-mt-md" @click="login()" />
      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      // TODO: implement login functionality
      this.$router.push('/main')
    },
    getInputWidth() {
      // Compute the maximum width of the input boxes based on the window size
      const screenWidth = window.innerWidth;
      const maxWidth = Math.min(screenWidth - 48, 400); // 48 = total horizontal padding
      return `${maxWidth}px`;
    },
  },
};
</script>

<style>
  .q-img {
    display: block;
    margin: 0 auto;
  }
</style>
