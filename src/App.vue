<template>
  <div id="app">
    <Navbar/>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Navbar from './components/NavBar.vue';
import { mapActions } from 'vuex';

export default {
  name: 'app',
  components: {
    Navbar
  },
  created() {
    this.getAllCategories({ page: 0, pagesize: 8 });
  },
  methods: {
    ...mapActions(['getAllCategories'])
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
}

@font-face {
	font-family: "chalk";
	src: url('/chalk.ttf');
}

@media (min-width: 768px) {
  .cards {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (min-width: 978px) {
  .cards {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
