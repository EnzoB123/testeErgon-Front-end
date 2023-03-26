<template>
  <div class="q-pa-md">
    <q-layout view="lhh LpR fFf">
      <q-layout-header class="row items-center justify-center" style="min-height: 30vh">
        <q-img src="statics/quasar-logo-full.svg" width="128px" />
      </q-layout-header>

      <q-layout-view>
        <q-form @submit.prevent="login" class="q-mt-xs">
          <q-field class="q-mb-sm" :max-width="getInputWidth()">
            <q-input v-model="email" label="email" dense outlined />
          </q-field>
          <q-field class="q-mb-sm" :max-width="getInputWidth()" >
            <q-input v-model="password" label="Password" dense outlined type="password" />
          </q-field>
          <q-btn type="submit" label="Log In" color="primary" class="q-mt-md" @click="login()" />
          <br >
        </q-form>

        <q-btn type="submit" label="asdas" color="primary" class="q-mt-md" @click="registrar()"/>
      </q-layout-view>
    </q-layout>
  </div>
</template>



<script>
import axios from 'axios' 

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {

    

     registrar() {
      console.log("registrou")
    },

     async login() {
      // Send a POST request to your API with the email and password
      try {
        const response = await axios.post('http://localhost:3000/users/login', {
          email: this.email,
          password: this.password
        });


        // If the login was successful, save the token to localStorage and redirect to the main page
        localStorage.setItem('token', response.data.token);
        this.$router.push('/main');
      } catch (error) {
        // If there was an error with the login request, display an error message
        console.error(error);
        alert('Error logging in. Please check your email and password and try again.');
      }
    },
   
     getInputWidth() {
      // Compute the maximum width of the input boxes based on the window size
      const screenWidth = window.innerWidth;
      const maxWidth = Math.min(screenWidth - 48, 400); // 48 = total horizontal padding
      return `${maxWidth}px`;
    },
  },
   
   
  }

</script>

<style>
  .q-img {
    display: block;
    margin: 0 auto;
  }
</style>
