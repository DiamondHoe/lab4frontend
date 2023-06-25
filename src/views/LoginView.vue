<template>
  <v-form @submit.prevent="login">
    <v-card class="mx-auto my-8" min-width="400" max-width="628" title="Login">
      <v-container @submit.prevent="login">
        <v-text-field
            v-model="username"
            :rules="[rulesUsername.required, rulesUsername.min]"
            name="username"
            label="Username"
            hint="At least 5 characters and start with a letter"
            counter
            @click:append="showPassword = !showPassword"
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
      </v-container>

      <v-divider></v-divider>
      <div v-if="error">{{ error }}</div>
      <div v-if="blocked">Login blocked. Please try again later.</div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="light-blue-darken-4" :disabled="blocked">Login</v-btn>
      </v-card-actions>
      <v-row class="d-flex justify-end">
        <v-col cols="auto" class="ml-auto">
          <v-sheet class="pa-2 d-flex align-center">
            <v-btn
                color="light-blue-darken-4"
                to="/register"
                class="ml-2 register-btn"
                v-bind:class="{ 'hovered': isHovered }"
                v-on:mouseover="isHovered = true"
                v-on:mouseout="isHovered = false"
            >
              {{ isHovered ? 'Register' : 'No account?' }}
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      error: null,
      isHovered: false,
      rulesUsername: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 5 && /^[a-zA-Z]/.test(v) || 'At least 5 characters and start with a letter'
      },
      rulesPassword: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 5 || 'At least 5 characters'
      },
      loginAttempts: 0,
      blocked: false
    };
  },
  methods: {
    login() {
      axios
          .post('http://localhost:8081/api/login', {
            username: this.username,
            password: this.password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            const permission = response.data.permission;
            // Check if user has permission to login
            if (permission === 'admin') {
              this.$router.push('/adminpanel');
            } else {
              this.$router.push(`/events/${response.data.userId}`);
            }
          })
          .catch(error => {
            if (error.response && error.response.status === 400) {
              // Increment login attempts and check if user should be blocked
              this.checkLoginAttempts(true);
              this.error = 'Invalid username or password';
              this.username = '';
              this.password = '';
            } else {
              // Handle other errors
              this.error = 'An unexpected error occurred. Please try again later.';
              console.error(error);
            }
          });
    },

    checkLoginAttempts(isBadRequest) {
      if (isBadRequest) {
        // Failed login attempt
        this.loginAttempts++;

        if (this.loginAttempts >= 3) {
          // Block the user for a period of time (e.g., 5 minutes)
          this.blocked = true;
          this.error = 'Too many failed login attempts. Please try again later.';
          this.username = '';
          this.password = '';

          // Set a timer to unblock the user after the lockout period
          setTimeout(() => {
            this.blocked = false;
            this.loginAttempts = 0;
            this.error = null;
          }, 300000); // 5 minutes in milliseconds
        }
      }
    }
  }
}
</script>

<style scoped>
.register-btn {
  width: 140px; /* set the desired width */
  height: 36px; /* set the desired height */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
