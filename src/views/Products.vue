<template>
  <div class="container max-w-xl mx-auto mb-4 px-4">
    <div class="flex flex-wrap">
      <div class="w-full">
        <div class="admin" v-if="loggedIn && user==='fwattier'">
          <div class="title">Liste des produits</div>
          <div v-for="product in products">
            <div class="product">
              <div class="p-3">
                <h3 class="text-lg mb-1 leading-tight font-medium">{{ product.name }}</h3>
                <p class="font-semibold text-md mb-2">{{ product.price | currency }}</p>
                <p class="text-sm text-grey-darker mb-2">{{ product.description.substring(0, 50) }}</p>
                <button
                  class="block w-full border shadow p-2 rounded mt-2 hover:bg-blue-dark hover:text-white"
                  @click="edit(product)">
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ProductService from '@/services/product';
import Product from '@/components/Product.vue';
import Pagination from '@/components/Pagination.vue';
import Categories from '@/components/Categories.vue';

export default {
  components: { Product, Pagination, Categories },
  data() {
    return {
      user: localStorage.getItem('user'),
      products: []
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'isAuthenticated'
    })
  },
  created() {
    ProductService.getProducts().then(res => {
      this.products = res.data.products;
    });
  },
  mounted() {
  },
  methods: {
    edit (product) {
      console.log(product)
      this.$router.push("/product/edit/" + product._id)
    }
  }
};
</script>

<style scoped>
</style>
