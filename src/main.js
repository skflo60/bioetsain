import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import store from './store';
import { currency } from './utils/currency';
import './styles/app.css';
import VueGeolocation from 'vue-browser-geolocation';
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.filter('currency', currency);
Vue.use(VueGeolocation);

Vue.use(new VueSocketIO({
    connection: process.env.VUE_APP_SOCKET || 'https://biosain-api.herokuapp.com'
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
