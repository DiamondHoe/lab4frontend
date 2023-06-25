<template>
  <v-form @submit.prevent="register">
    <v-card
        class="mx-auto my-8"
        min-width="400"
        max-width="628"
        title="Register"
    >
      <v-container       @submit.prevent="register">
        <v-text-field
            v-model="username"
            :rules="[rulesUsername.required, rulesUsername.min]"
            name="username"
            label="Username"
            hint="At least 5 characters and start with letter"
        ></v-text-field>

        <v-text-field
            v-model="name"
            :rules="[rulesPassword.required, rulesPassword.min]"
            name="name"
            label="Name"
            hint="At least 3 characters"
            class="input-group--focused"
        ></v-text-field>

        <v-text-field
            v-model="lastname"
            :rules="[rulesPassword.required, rulesPassword.min]"
            name="lastname"
            label="Last name"
            hint="At least 3 characters"
            class="input-group--focused"
        ></v-text-field>

        <v-text-field
            v-model="email"
            :rules="[rulesPassword.required, rulesPassword.min]"
            name="email"
            label="E-mail"
            hint="Valid e-mail"
            class="input-group--focused"
        ></v-text-field>
        <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rulesPassword.required, rulesPassword.min]"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 5 characters"
            class="input-group--focused"
            counter
            @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-text-field
            v-model="repeatPassword"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rulesPassword.required, rulesPassword.min]"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Repeat password"
            hint="At least 5 characters"
            class="input-group--focused"
            counter
            @click:append="showPassword = !showPassword"
        ></v-text-field>
        <div v-if="passwordsDoNotMatch"> Passwords do not match</div>

      </v-container>

      <v-divider></v-divider>
      <div v-if="error">{{error}}</div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="light-blue-darken-4" :disabled="passwordsValid" >Register</v-btn>
      </v-card-actions>
      <v-row class="d-flex justify-end">
        <v-col cols="auto" class="ml-auto">
          <v-sheet class="pa-2 d-flex align-center">
            <v-btn color="light-blue-darken-4"
                   to="/login"
                   class="ml-2 register-btn"
                   v-bind:class="{ 'hovered': isHovered }"
                   v-on:mouseover="isHovered = true"
                   v-on:mouseout="isHovered = false">
              {{ isHovered ? 'Login' : 'Already registered?' }}
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>

  <script>
  import axios from "axios";

  export default {
    data() {
      return {
        username: '',
        password: '',
        repeatPassword: '',
        name: '',
        lastname: '',
        email: '',
        showPassword: false,
        error: null,
        isHovered: false,
        rulesUsername: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 5 && /^[a-zA-Z]/.test(v) || 'At least 5 characters and start with letter'
        },
        rulesName: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 3  && /^[a-zA-Z]+$/.test(v)|| 'At least 3 characters'
        },
        rulesLastname: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 3 && /^[a-zA-Z]+$/.test(v)|| 'At least 3 characters'
        },
        rulesEmail: {
          required: value => !!value || 'Required.',
          min: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)|| 'Valid e-mail'
        },
        rulesPassword: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 5 || 'At least 5 characters',
        },
      };
    },
    computed:{
      passwordsDoNotMatch(){
        return this.password !== this.repeatPassword;
      },
      passwordsValid(){
        return !(this.password.length >= 5 && this.password === this.repeatPassword);
      },
    },
    methods: {
      register() {
        axios.post('http://localhost:8081/api/register', {
          username: this.username,
          password: this.password,
          name: this.name,
          lastname: this.lastname,
          email: this.email,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(() => {
          // handle successful login
          this.$router.push('/login');
        }).catch(() => {
          // handle login error
          this.error = 'Invalid data provided';
          this.username = '';
          this.password = '';
          this.repeatPassword = '';
          this.name = '';
          this.lastname = '';
          this.email = '';
        });
      }
    }
  }
  </script>

<style scoped>
.register-btn {
  width: 200px; /* set the desired width */
  height: 36px; /* set the desired height */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>