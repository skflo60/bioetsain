<template>
  <div class="container max-w-xl mx-auto mb-4 px-4">
    <div class="flex flex-wrap">
      <div class="w-full">
        <div class="admin" v-if="loggedIn && user==='fwattier'">
          Hello Livreur ;)
          <router-link
          tag="a"
          :to="{ name: 'products' }"
          class="inline-block no-underline px-3 py-2 capitalize">
          Administrer les produits
        </router-link>
          <div>{{ currentCoords }}</div>
          <button @click="updateLocation">Rafraichir</button>
          <div id="map">
            <!-- Ici s'affichera la carte -->
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

const myIcon = L.icon({
  iconUrl: "https://cdn1.iconfinder.com/data/icons/bicycle-bike-sport/154/geo-point-bike-bicycle-cycle-sport-512.png",
  iconSize: [25, 50],
  iconAnchor: [25, 50],
  popupAnchor: [-3, -76],
});

export default {
  components: { Product, Pagination, Categories },
  data() {
    return {
      user: localStorage.getItem('user'),
      currentCoords: null,
      mapMarkers: []
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'isAuthenticated'
    })
  },
  created() {
  },
  mounted() {
    this.macarte = this.initMap()
    setInterval(() => this.updateLocation(), 5000)
  },
  methods: {
    updateLocation () {
      var macarte = this.macarte
      this.$getLocation({ enableHighAccuracy: true }).then(coordinates => {
        this.currentCoords = coordinates; //{ lat: 49.892330, lng: 2.305131 }
        this.$socket.emit('updateCoords', this.currentCoords.lng + ',' + this.currentCoords.lat)
        this.updateMarker(this.currentCoords.lat, this.currentCoords.lng, macarte);
      })
    },
    initMap(lat = 49.853934, lon = 2.271573) {
      // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
      var macarte = L.map('map').setView([lat, lon], 15);
      // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
      L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: '',
        minZoom: 1,
        maxZoom: 20
      }).addTo(macarte);
      return macarte
    },
    updateMarker(lat = 49.853934, lon = 2.271573, macarte) {
      // Nous ajoutons un marqueur
      for(var i = 0; i < this.mapMarkers.length; i++){
          macarte.removeLayer(this.mapMarkers[i]);
      }
      this.mapMarkers = []
      var marker = L.marker([lat, lon], { icon: myIcon });
      this.mapMarkers.push(marker)
      marker.addTo(macarte)
    }
  }
};
</script>

<style scoped>
#map {
  width: 600px;
  height: 500px;
}
</style>
