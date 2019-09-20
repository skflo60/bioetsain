<template>
  <div class="product">
    <router-link tag="a" :to="{ name: 'product', params: { id: product._id } }" class="block min-height">
      <img :src="product.image || '/legumes.jpg'" :alt="product.name">
    </router-link>
    <div class="p-3">
      <h3 class="text-lg mb-1 leading-tight font-medium">{{ product.name }}</h3>
      <p class="font-semibold text-md mb-2">{{ product.price | currency }}</p>
      <p class="text-sm text-grey-darker mb-2">{{ product.description.substring(0, 50) }}</p>
      <button
        class="block w-full border shadow p-2 rounded mt-2 hover:bg-blue-dark hover:text-white"
        @click="addToCart(product)">
        Ajouter au panier
      </button>
    </div>
  </div>
</template>

<script>
import addToCart from '@/mixins/addToCart';

export default {
  props: ['product'],
  mixins: [addToCart]
};
</script>

<style scoped>
  .product .min-height {
    min-height: 166px;
    line-height: 179px;
    border-bottom: 1px solid #DDD;
  }

    .product .min-height > img {
      vertical-align: middle;
    }
</style>
