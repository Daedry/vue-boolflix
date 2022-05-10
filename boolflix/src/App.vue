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
            <li>
              <img
                :src="
                  NotFoundImg(
                    movie.poster_path,
                    'http://image.tmdb.org/t/p/w200/' + movie.poster_path
                  )
                "
              />
            </li>
            <li>Titolo:{{ movie.title }}</li>
            <li>Titolo Originale: {{ movie.original_title }}</li>
            <li>
              Lingua: {{ movie.original_language }}
              <Flag :iso="changeFlags(movie.original_language)" />
            </li>
            <li>Voto: {{ votation(movie.vote_average) }}</li>
            <li>
              <div class="star">
                <font-awesome-icon
                  :class="
                    votation(movie.vote_average) > 1
                      ? 'yellow-star'
                      : 'white-star'
                  "
                  icon="fa-solid fa-star"
                />
                <font-awesome-icon
                  :class="
                    votation(movie.vote_average) > 2
                      ? 'yellow-star'
                      : 'white-star'
                  "
                  icon="fa-solid fa-star"
                />
                <font-awesome-icon
                  :class="
                    votation(movie.vote_average) > 3
                      ? 'yellow-star'
                      : 'white-star'
                  "
                  icon="fa-solid fa-star"
                />
                <font-awesome-icon
                  :class="
                    votation(movie.vote_average) > 4
                      ? 'yellow-star'
                      : 'white-star'
                  "
                  icon="fa-solid fa-star"
                />
                <font-awesome-icon
                  :class="
                    votation(movie.vote_average) > 5
                      ? 'yellow-star'
                      : 'white-star'
                  "
                  icon="fa-solid fa-star"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="series">
        <h2>Series</h2>
        <div class="series list" v-for="(serie, i) in series" :key="i">
          <ul>
            <li>
              <img
                :src="
                  NotFoundImg(
                    serie.poster_path,
                    'http://image.tmdb.org/t/p/w200/' + serie.poster_path
                  )
                "
              />
            </li>
            <li>Titolo: {{ serie.name }}</li>
            <li>Titolo Originale: {{ serie.original_name }}</li>
            <li>
              Lingua: {{ serie.original_language }}
              <Flag :iso="changeFlags(serie.original_language)" />
            </li>
            <li>Voto: {{ votation(serie.vote_average) }}</li>
            <li>
              <div class="star">
                <font-awesome-icon
                  :class="
                    votation(serie.vote_average) > 1
                      ? 'yellow-star'
                      : 'white-star'
                  "
                  icon="fa-solid fa-star"
                />
                <font-awesome-icon
                  :class="
                    votation(serie.vote_average) > 2
                      ? 'yellow-star'
                      : 'white-star'
                  "
                  icon="fa-solid fa-star"
                />
                <font-awesome-icon
                  :class="
                    votation(serie.vote_average) > 3
                      ? 'yellow-star'
                      : 'white-star'
                  "
                  icon="fa-solid fa-star"
                />
                <font-awesome-icon
                  :class="
                    votation(serie.vote_average) > 4
                      ? 'yellow-star'
                      : 'white-star'
                  "
                  icon="fa-solid fa-star"
                />
                <font-awesome-icon
                  :class="
                    votation(serie.vote_average) > 5
                      ? 'yellow-star'
                      : 'white-star'
                  "
                  icon="fa-solid fa-star"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { Flag } from "vue-flag-icon/components";
// import state from "@/state";
// import Flag from "@/node_modules/vue-flag-icon/components/icon/Flag.vue";
export default {
  name: "App",
  components: {
    Flag,
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

    changeFlags(flag_nation) {
      if (flag_nation === "en") {
        return (flag_nation = "us");
      } else if (flag_nation === "ja") {
        return (flag_nation = "jp");
      } else if (flag_nation === "da") {
        return (flag_nation = "dk");
      } else {
        return flag_nation;
      }
    },

    NotFoundImg(img, full_img) {
      if (img === null) {
        img =
          "https://printworks-manchester.com/cinema-poster/images/film-poster-placeholder.png";
        return img;
      } else {
        return full_img;
      }
    },

    votation(vote) {
      // console.log('numero:', vote / 2)
      const newVote = Math.round(vote / 2);
      // console.log('nuovo numero:', newVote);
      return newVote;
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
          list-style: none;
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