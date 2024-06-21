import axios from 'axios';

const imagesServiceInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export default imagesServiceInstance;