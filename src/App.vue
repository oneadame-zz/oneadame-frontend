<template>
  <div id="app">
    <drippy></drippy>
    <div id="nav">
      <a target="_blank" href="https://www.github.com/oneadame">
        <img src="./assets/git.png" />
      </a>
      <router-link to="/contact">
        <img src="./assets/mail.png" />
      </router-link>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/adam-engelmeyer-109ab713b/"
      >
        <img src="./assets/in.png" />
      </a>
    </div>
    <router-view />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Drippy from '@/components/Drippy.vue';

export default Vue.extend({
  components: {
    Drippy,
  },
});
</script>

<style>
@media all and (max-width: 520px) {
  #nav {
    padding-top: 2rem;
  }
}

@media all and (min-width: 521px) {
  #nav {
    padding-top: 5rem;
  }
}

#app {
  font-size: 12px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.center-me > div {
  margin: auto;
}

#nav img {
  max-width: 5rem;
  margin: 0 1rem;
  width: 20%;
}

body {
  margin: 0;
}
</style>
