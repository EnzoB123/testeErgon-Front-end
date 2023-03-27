<template>
  <div class="q-pa-md">
    <q-layout view="lhh LpR fFf">
      <q-layout-header class="row items-center justify-center" style="min-height: 30vh">
        <q-img src="statics/quasar-logo-full.svg" width="128px" />
      </q-layout-header>

      <q-layout-view>
        <div v-if="!showRegistrationForm">
          <q-form @submit.prevent="login" class="q-mt-xs">
            <q-field class="q-mb-sm" :max-width="getInputWidth()">
              <q-input v-model="email" label="email" dense outlined />
            </q-field>
            <q-field class="q-mb-sm" :max-width="getInputWidth()" >
              <q-input v-model="password" label="Password" dense outlined type="password" />
            </q-field>
            <q-btn type="submit" label="Log In" color="primary" class="q-mt-md" />
            <br />
          </q-form>

          <q-btn label="Registrar" color="secondary" class="q-mt-md" @click="showRegistrationForm = true" />
        </div>

        <div v-if="showRegistrationForm">
          <q-form @submit.prevent="register" class="q-mt-md">
            <q-field class="q-mb-sm" :max-width="getInputWidth()">
              <q-input v-model="nome" label="Nome" dense outlined />
            </q-field>
            <q-field class="q-mb-sm" :max-width="getInputWidth()">
              <q-input v-model="email" label="E-mail" dense outlined />
            </q-field>
            <q-field class="q-mb-sm" :max-width="getInputWidth()">
              <q-input v-model="password" label="Senha" dense outlined type="password" />
            </q-field>
            <q-btn type="submit" label="Registrar" color="positive" class="q-mt-md" />
            <q-btn label="Cancelar" class="q-ml-md q-mt-md" @click="showRegistrationForm = false" color="negative"/>
            <br />
          </q-form>
        </div>
      </q-layout-view>
    </q-layout>
  </div>
</template>

<script>


export default {
  data() {
    return {
      nome: "",
      email: "",
      password: "",
      showRegistrationForm: false,
    };
  },
  methods: {



    async register() {
      // Send a POST request to your API with the user's name, email, and password
      try {
        // Send a POST request to your API with the new user's information
        const response = await this.$api.post('/users', {
          nome: this.nome,
          email: this.email,
          password: this.password,
        });
        console.log(response);
        if (response) {

          this.showRegistrationForm = false;

          alert("USUARIO CRIADO COM SUCESSO")

          //await this.$router.push('/main');
        } else {
          alert('Error creating account. Please check your information and try again.');
        }
      }
      catch(error){
        console.log(error)
      }
    },

     async login() {
      // Send a POST request to your API with the email and password
      try {
        const response = await this.$api.post('/users/login', {
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
