<template>
  <div class="mb-4">
    <div class="container mw-100">
      <nav class="bg-light navbar flex center">
        <div class="flex center">
          <router-link
          tag="a"
          :to="{ name: 'home' }"
          class="title block no-underline text-white flex center">
          <i class="fas fa-carrot hidden-mobile"></i>
          <span>Local & Frais</span>
        </router-link>
      </div>
      <div class="flex-grow center">
        <div class="flex-grow text-right">
          <div class="relative inline-block" v-if="!loggedIn">
            <router-link
            tag="a"
            :to="{ name: 'login' }"
            class="nav-item inline-block no-underline p-3 text-white capitalize">
            Connexion
          </router-link>
        </div>
      <div class="relative inline-block" v-if="loggedIn">
        <router-link
        tag="a"
        :to="{ name: 'dashboard' }"
        class="nav-item inline-block no-underline p-3 text-white capitalize"
        >
        Mes commandes
      </router-link>
    </div>
  <div class="relative inline-block">
    <router-link
    tag="a"
    :to="{ name: 'checkout' }"
    class="inline-block no-underline px-3 py-2 text-white capitalize"
    :class="{'active': cart.length>0, 'animated': addAnimation===true}">
    <span class="align-middle inline-block">
      <i class="fas fa-shopping-cart hidden-mobile" v-if="!addAnimation"></i>
      <i class="fas fa-cart-plus hidden-mobile" v-if="addAnimation"></i>
    </span>
    (<span class="badge badge-light">{{ getSum(cart, "qty") }}</span>)
  </router-link>
</div>
</div>
</div>
</nav>
</div>
<div class="max-w-xl mb-4 mx-auto">
  <div class="flex-grow px-4" v-if="address !== ''">
    <div class="current-address" v-if="selectedAddress" @click="selectedAddress = null"><i class="fas fa-carrot"></i>{{ selectedAddress.label }}</div>
    <autocomplete
    v-else
    input-class="Input-text w-full border p-3 box-shadow"
    :show-no-results="false"
    placeholder="Saisissez votre adresse"
    :initial-display="address"
    source="https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf6248a5762bf18fb046289dc6fb9fe63e86a2&boundary.country=FR&text="
    :results-formatter="resultsFormatter"
    @selected="selectAddress">
  </autocomplete>
  <div class="flex-grow delivery px-4">
    <div class="warning" v-if="duration > 30">Cette zone n'est pas encore desservie</div>
    <div v-if="duration <= 30 && deliveryTime"><i class="fas fa-clock"></i> Arrivée à {{ deliveryTime }}</div>
  </div>
</div>
</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Categories from '@/components/Categories.vue';
import OpenRouteService from '@/services/openroute';
import Autocomplete from 'vuejs-auto-complete'
const d = new Date()

export default {
  components: { Categories, Autocomplete },
  data() {
    return {
      isShowDropdown: false,
      address: '',
      selectedAddress: {},
      duration: 0,
      travel: {},
      deliveryTime: null,
      addAnimation: false
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'isAuthenticated',
      cart: 'getCart'
    })
  },
  watch: {
    cart: function (oldVal, newVal) {
      console.log("cart add event")
      this.addAnimation = true
      setTimeout(() => {
        this.addAnimation = false
      }, 800)
    }
  },
  mounted () {
    const options = {
      enableHighAccuracy: true
    }
    this.$getLocation(options)
    .then(coordinates => {
      const lat = coordinates.lat
      const lng = coordinates.lng
      localStorage.setItem('destination', lng+','+lat)
      OpenRouteService.reverseGeocode(lat, lng).then(res => {
        if ( res.data.features &&  res.data.features.length > 0) {
          this.selectedAddress = res.data.features[0].properties
          this.address = this.selectedAddress.label
          this.selectAddress({ display: this.address, value: lng + "," + lat })
        }
      });
    });
    this.address = this.$route.query.address || ''
  },
  methods: {
    ...mapActions(['logOut']),
    logout() {
      this.logOut();
      localStorage.removeItem('loggedIn');
      this.$router.push('home');
    },
    geocode() {
      OpenRouteService.geocode(this.address).then(res => {
        console.log(res.data)
        // OpenRouteService.getDirection
      });
    },
    resultsFormatter (result) {
      return result.features.map(f => {
        return { id: f.geometry.coordinates.join(','), name: f.properties.label }
      })
    },
    getSum (items, prop) {
        return items.reduce( function(a, b){
            return a + b[prop];
        }, 0);
    },
    selectAddress (result) {
      this.address = result.display
      this.selectedAddress = { label: result.display }
      const latLng = result.value
      OpenRouteService.getDirection(latLng).then(res => {
        if (res.data.features && res.data.features.length > 0) {
          localStorage.setItem("destination", latLng)
          const result =  res.data.features[0]
          this.travel = result.properties.summary
          this.duration = Math.round(this.travel.duration / 100)
          var dt = new Date();
          dt.setMinutes( dt.getMinutes() + this.duration );
          this.deliveryTime = dt.toTimeString().split(' ')[0]
        }
      })
    }
  }
};
</script>

<style>
.mw-100 {
  max-width: 100% !important;
}

.delivery {
  align-content: center;
  align-self: center;
}

.current-address {
  margin: 16px;
  cursor: pointer;
}
.current-address > i {
  font-size: 19px;
  padding: 0 10px;
}

.autocomplete .autocomplete__box {
  background: transparent;
  color: white !important;
}

.autocomplete__icon {
  display: none
}

.margin-l {
  margin-left: 10px;
}

.bg-light {
  background: #50723d; /* #72cb6c; */
  background: linear-gradient(to left, #44b686, #50723d);
  color: #FFF;
}

.flex {
  display: flex;
}

.center {
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
}

.fa-carrot {
  color: #ff864d;
  padding-left: 3px;
  transform: scale(1, 0.7) rotate(-44deg);
}

 .fa-map-marker {
   color: #666;
 }

.fa-carrot, .fa-cart-plus, .fa-shopping-cart, .fa-map-marker {
  font-size: 1.9em;
}

.warning {
  color: #c25312;
}

.navbar {
  padding: 10px;
}

.nav-item.router-link-exact-active {
  background-color: #478e43;
  color: #fff;
}

.dropdown-enter,
.dropdown-leave-to {
  transform: scaleY(0.7);
  opacity: 0;
}

.dropdown-enter-to,
.dropdown-leave {
  opacity: 1;
  transform: scaleY(1);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease-out;
  transform-origin: top center;
}

.pin-dropdown {
  top: 43px;
  min-width: 150px;
}

.center {
  align-items: center;
  align-self: center;
  align-content: center;
  justify-content: center;
}

.title {
  font-size: 1.1em;
  font-weight: 700;
}

.active {
  font-weight: bold;
}
</style>
