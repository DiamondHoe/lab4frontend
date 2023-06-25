<template>
  <nav class="pa-5">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1A237E
}

nav {
  margin: 0;
  background: linear-gradient(to bottom right, #B3E5FC, #03A9F4);
  font-family: Arial, sans-serif;
}

nav a {
  font-weight: bold;
  color: rgba(0, 0, 90, 1);
}

nav a.router-link-exact-active {
  color: #01579B
}

</style>
