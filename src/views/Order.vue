<template>
  <div class="container max-w-xl mx-auto mb-4 px-4">
    <div class="flex flex-wrap">
      <div class="w-full">
        <div id="map">
          <!-- Ici s'affichera la carte -->
        </div>
        <div class="summary-wrapper">
          <div class="sum">
            <p>Vos ingrédients sont en route.</p>
            <p>Arrivée estimée : {{ deliveryTime }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OpenRouteService from '@/services/openroute';
const myIcon = L.icon({
  iconUrl: "https://cdn1.iconfinder.com/data/icons/bicycle-bike-sport/154/geo-point-bike-bicycle-cycle-sport-512.png",
  iconSize: [100, 100],
  iconAnchor: [25, 50],
  popupAnchor: [-3, -76],
});

export default {
  components: {},
  data () {
    return {
      deliveryTime: null,
      duration: 0,
      travel: null,
      mapMarkers: [],
      macarte: null
    }
  },
  sockets: {
    newCoords: function (data) {
      console.log(data)
      this.updatePosition(data)
    }
  },
  created() {
  },
  mounted() {
    // Fonction d'initialisation de la carte
    this.updatePosition();
  },
  methods: {
    updatePosition(latLng = '2.271573,49.853934') {
      const [lng, lat] = latLng.split(',')
      this.initMap(lat, lng);
      this.updateMarker(lat, lng)
      OpenRouteService.getDirection(localStorage.getItem('destination'), latLng).then(res => {
        if (res.data.features && res.data.features.length > 0) {
          const result = res.data.features[0]
          if (result.properties.summary && result.properties.summary.duration) {
            this.travel = result.properties.summary
            this.duration = Math.round(this.travel.duration / 100)
            var dt = new Date();
            dt.setMinutes( dt.getMinutes() + this.duration );
            this.deliveryTime = dt.toLocaleTimeString().split(' ')[0]
          }
        }
      })
    },
    initMap(lat = 49.853934, lon = 2.271573) {
      // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
      this.macarte = L.map('map').setView([lat, lon], 15);
      // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
      L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: '',
        minZoom: 1,
        maxZoom: 20
      }).addTo(this.macarte);
    },
    updateMarker(lat = 49.853934, lon = 2.271573) {
      // Nous ajoutons un marqueur
      for(var i = 0; i < this.mapMarkers.length; i++){
          this.macarte.removeLayer(this.mapMarkers[i]);
      }
      this.mapMarkers = []
      var marker = L.marker([lat, lon], { icon: myIcon });
      this.mapMarkers.push(marker)
      marker.addTo(this.macarte)
    }
  }
};
</script>

<style scoped>
.summary-wrapper {
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 100%;
}

.sum {
  margin: 0 auto;
  align-self: center;
  height:  100px;
  width: 50%;
  background-color: white;
  padding: 10px;
}

#map {
  position:fixed;
  z-index: -1;
  padding:0;
  margin:0;

  top:0;
  left:0;

  width: 100%;
  height: 100%;
  background:rgba(255,255,255,0.5);
}
</style>
