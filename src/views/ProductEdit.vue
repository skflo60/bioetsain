<template>
  <div class="container max-w-xl mx-auto mb-4 px-4">
    <div class="flex flex-wrap">
      <div class="w-full">
        <div class="admin" v-if="loggedIn && user==='fwattier'">
          <div class="title">Modifier le produit</div>
          <form id="formProduct" @submit="edit">
            <input class="p-2 w-full" type="text" :value="product.name" />
            <input class="p-2 w-full" type="text" :value="product.price" />
            <input class="p-2 w-full" type="text" :value="product.description" />
            <input class="p-2 w-full" type="text" :value="product.image" />
            <div v-for="month in months">
              <input type="checkbox" :id="month._id" :value="month._id" v-model="product.months" />
              <label :for="month._id">{{month.value}}</label>
            </div>
            <span>Saison des {{ product.name }}</span>
            <button class="block w-full border shadow p-2 rounded mt-2 hover:bg-blue-dark hover:text-white">
              Modifier
            </button>
          </form>
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
      product: {},
      months: [{_id: 0, value: 'Janvier'},{_id: 1, value: 'Février'},{_id: 2, value: 'Mars'},
      {_id: 3, value: 'Avril'},{_id: 4, value: 'Mai'},{_id: 5, value: 'Juin'},
      {_id: 6, value: 'Juillet'},{_id: 7, value: 'Août'},{_id: 8, value: 'Septembre'},
      {_id: 9, value: 'Octobre'},{_id: 10, value: 'Novembre'},{_id: 11, value: 'Décembre'}]
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'isAuthenticated'
    })
  },
  created() {
    ProductService.getProductsById(this.$route.params.id).then(res => {
      this.product = res.data.product;
    });
  },
  mounted() {
  },
  methods: {
    edit (e) {
      e.preventDefault()
      ProductService.updateProduct(this.product).then(res=>{
        console.log(res)
        this.product = res.data
        this.$router.go(-1)
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
};
</script>

<style scoped>
</style>
