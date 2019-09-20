import Api from './api';
const HOME_LAT_LNG = '2.271573,49.853934'
const API_KEY = '5b3ce3597851110001cf6248a5762bf18fb046289dc6fb9fe63e86a2'

export default {
  geocode(text = '') {
    const params = {
      text,
      api_key: '5b3ce3597851110001cf6248a5762bf18fb046289dc6fb9fe63e86a2',
      'boundary.country': 'FR'
    }
    return Api().get('https://api.openrouteservice.org/geocode/search', { params: params });
  },
  reverseGeocode(lat = '', lng = '') {
    const params = {
      api_key: '5b3ce3597851110001cf6248a5762bf18fb046289dc6fb9fe63e86a2',
      'point.lon': lng,
      'point.lat': lat,
    }
    return Api().get('https://api.openrouteservice.org/geocode/reverse', { params: params });
  },
  getDirection(destination = '', start = HOME_LAT_LNG) {
    const BASE = 'https://api.openrouteservice.org/v2/directions/cycling-regular'
    const params = {
      api_key: API_KEY,
      start,
      end: destination
    }
    return Api().get(BASE, { params: params });

  }
};
