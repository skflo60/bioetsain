<template>
  <div class="container max-w-xl mx-auto mb-4 px-4">
    <div class="bg-white p-6" v-if="cart.length == 0">
      <h2>Votre panier</h2>
    </div>
    <div class="ardoise bg-white rounded box-shadow" v-else>
      <div v-for="item in cart" :key="item.id" class="nowrap row">
        <span class="p-2">
          <button class="inline-block px-2" @click="action('min', item)">-</button>
          <span class="inline-block">{{ item.qty }}</span>
          <button class="inline-block px-2" @click="action('max', item)">+</button>
        </span>
        <span class="p-2 text-left more">{{ item.name }}</span>
        <span class="p-2" v-if="item.qty > 1">{{ item.price | currency }}</span>
        <span class="p-2">{{ item.subtotal | currency }}</span>
      </div>
      <div class="right p-2">+ frais de Livraison 5.5€</div>
      <div class="total text-right text-xl mt-4">Total: {{ cartTotal + 5.5 | currency }}</div>
    </div>
    <button class="super-btn" @click="order">Commander</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      cart: 'getCart',
      cartTotal: 'getCartTotal'
    })
  },
  methods: {
    ...mapActions(['incrementCart', 'decrementCart']),
    action(event, item) {
      switch (event) {
        case 'max':
        this.incrementCart(item);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        break;
        case 'min':
        this.decrementCart(item);
        localStorage.setItem('cart', JSON.stringify(this.cart));

        if (item.qty === 0) {
          this.clearFromCart(item);
        }

        break;
        case 'clear':
        this.clearFromCart(item);
        break;
        default:
        break;
      }
    },
    clearFromCart(product) {
      let item = this.cart.find(item => {
        return item.id === product.id;
      });
      let index = this.cart.indexOf(item);
      this.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    order () {
      this.$router.push("order")
    }
  }
};
</script>

<style scoped>
.total, .ardoise, .ardoise button {
  font-size: 27px;
}
.ardoise {
  padding: 0.2em;
  color: rgba(255, 255, 255, 0.8);
  background-color: #28272C;
  background: url('/chalkboard-black.jpg');
  background-size: cover;
  float: none;
  display: inline-block;
  box-shadow: 0px 0px 1px 1px rgba(170, 170, 170, 0.64);
  margin: 0.5px;
  border: 10px solid #9a673c;
  font-family: 'chalk', sans-serif;
  border-image: url('/woodframe.jpg') 30;
}
.ardoise button {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1em;
  cursor: pointer;
}
.ardoise button:hover {
  color: #FFF;
}
.row {
  display: inline-block;
  width: 100%;
}
button.super-btn {
  float: right;
  margin-top: 10px;
  background: #72cb6c;
  padding: 12px 24px;
  font-size: 16px !important;
  color: #FFFFFF;
}

.fa-eraser {
  font-size: 19px;
}

.table-fixed {
  border: none !important;
  box-shadow: 0;
}

.nowrap {
  white-space: nowrap;
}
</style>
