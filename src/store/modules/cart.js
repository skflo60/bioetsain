import { getProductById } from '@/utils/utils';

export default {
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  },

  getters: {
    getCart: state => state.cart,
    getCartTotal: state => {
      let total = 0;
      state.cart.map(item => {
        total += item.subtotal;
      });
      return total;
    },
  },

  mutations: {
    ADD_CART: (state, payload) => {
      state.cart.push(payload);
    },
    REFRESH_CART: (state, payload) => {
      state.cart = Array.from(state.cart)
    },
    INCREMENT_CART: (state, payload) => {
      payload.qty++;
      payload.subtotal = payload.price * payload.qty;
    },
    DECREMENT_CART: (state, payload) => {
      payload.qty--;
      payload.subtotal = payload.price * payload.qty;
    },
    CHANGE_CART: (state, payload) => {
      payload.subtotal = payload.price * payload.qty;
    },
  },

  actions: {
    addCart({ commit }, product) {
      commit('ADD_CART', product);
    },
    refreshCart({ commit }) {
      commit('REFRESH_CART');
    },
    incrementCart({ state, commit }, product) {
      const item = getProductById(state.cart, product.id);
      commit('INCREMENT_CART', item);
    },
    decrementCart({ state, commit }, product) {
      const item = getProductById(state.cart, product.id);
      commit('DECREMENT_CART', item);
    },
    changeCart({ state, commit }, product) {
      const item = getProductById(state.cart, product.id);
      commit('CHANGE_CART', item);
    },
  },
};
