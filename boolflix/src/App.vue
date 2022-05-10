<template>
  <div id="app">
    <header>
      <form action="" @submit.prevent="searching">
        <input type="text" placeholder=" search" v-model="inputValue" />
        <button @click="callApi()">Search</button>
      </form>
    </header>

    <main>
      <div class="movies">
        <h2>Movies</h2>
        <div class="list" v-for="(movie, index) in movies" :key="index">
          <ul>
            
            <li>Titolo:{{ movie.title }}</li>
            <li>Titolo Originale: {{ movie.original_title }}</li>
            <li>
              Lingua: {{ movie.original_language }}
            </li>
            <li>Voto: {{ movie.vote_average }}</li>
            
          </ul>
        </div>
      </div>

      
    </main>
  </div>
</template>

<script>
import axios from "axios";
// import state from "@/state";
// import Flag from "../node_modules/vue-flag-icon/components/icon/Flag.vue";
export default {
  name: "App",
  components: {
    // Flag,
  },
  data() {
    return {
      inputValue: null,
      movies: [],
      series: [],
      loading: true,
      error: null,
      API_movies:
        "https://api.themoviedb.org/3/search/movie?api_key=703dcef70eae227971386893d0cf25d8&language=it-IT&page=1&include_adult=false&query=",
      API_series:
        "https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=",
    };
  },
  methods: {
    callApi() {
      axios
        .all([
          axios.get(`${this.API_movies}${this.inputValue}`),
          axios.get(`${this.API_series}${this.inputValue}`),
        ])
        .then((response) => {
          // console.log("response", response);
          this.movies = response[0].data.results;
          this.series = response[1].data.results;
          // console.log("movies", this.movies);
          // console.log("series", this.series);
          this.loading = false;
        })
        .catch((error) => {
          error;
          console.error(error);
          this.error = `Sorry there is a problem! ${error}`;
        });
    },
    searching() {
      console.log("Searching...");
      console.log(this.inputValue);
    },
    
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";

header {
  text-align: center;
  padding: 1.25rem 0;
  border-bottom: 1px solid firebrick;
  form {
    // margin-bottom: 2rem;
    // padding-top: 1rem;
    input {
      height: 35px;
      border: none;
      border-radius: 0.35rem;
      margin-right: 1rem;
    }
    button {
      padding: 0.5rem 0.75rem;
      border: none;
      border-radius: 0.35rem;
    }
  }
}
main {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  .movies,
  .series {
    text-align: center;
    .list {
      padding: 2rem;
      display: flex;
      flex-wrap: wrap;
      margin: 0 6rem;
      ul {
        width: 250px;
        margin: 1rem 2rem;
        padding: 1rem 0;
        li {
          text-align: left;
          padding: 0.75rem;
          // list-style: none;
          .flag {
            width: 20px;
            height: 16px;
          }
        }
      }
    }
  }
}
</style>