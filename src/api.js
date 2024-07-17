import axios from "axios";

// const API_KEY = 'd35ecc1afb327209c21f64572fe1c819';
axios.defaults.baseURL = 'https://api.themoviedb.org'
const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzVlY2MxYWZiMzI3MjA5YzIxZjY0NTcyZmUxYzgxOSIsIm5iZiI6MTcyMTAzMTk0OC43NjU2NTIsInN1YiI6IjY2OTNhNWYzYjY1ZDg5MGE0ODk1YWFlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9Roobeahuvvvkw_p5w6dcbYdGGfjwp6DtE2wPfctwSI",
  },
};

export  async function getTrending() {
    const res = await axios('/3/trending/movie/day?language=uk-UA', options);
    return res.data.results;
}

export  async function getDetails(id) {
  const res = await axios(`/3/movie/${id}?language=uk-UA`, options)
  return res.data;
}

export async function getCast(id) {
  const res = await axios(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
  return res.data;
}

export async function getReviews (id) {
  const res = await axios(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`, options);
  return res.data;
}

export async function getMovie (name) {
  const res = await axios(`https://api.themoviedb.org/3/search/movie?query=${name}`, options);
  return res.data;
}