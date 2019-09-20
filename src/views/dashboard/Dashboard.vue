<template>
  <div class="container max-w-xl mx-auto mb-4 px-4">
    <div class="bg-white p-6"><h1>Mes commandes</h1></div>
    <router-link
    tag="a"
    :to="{ name: 'products' }"
    class="inline-block no-underline px-3 py-2 capitalize">
    Administrer les produits
    </router-link>
    <a @click="logout">Deconnexion</a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {},
  data() {
    return {
      user: localStorage.getItem('user'),
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
    ...mapActions(['logOut']),
    logout() {
      this.logOut();
      localStorage.removeItem('loggedIn');
      this.$router.push('home');
    },
  }
};
</script>
