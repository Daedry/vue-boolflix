<template>
  <div id="app">
    <header>
      <div class="nav-bar d-flex">
        <div class="nav-left d-flex">
          <div class="logo">
            <img height="40" src="@/assets/img/boolflix.png" alt="" />
          </div>
          <div>
            <ul class="d-flex">
              <li>
                <a href="#"> Home </a>
              </li>
              <li>
                <a href="#"> Serie Tv </a>
              </li>
              <li>
                <a href="#"> Film </a>
              </li>
              <li>
                <a href="#"> Originali </a>
              </li>
              <li>
                <a href="#"> Aggiunti di recente </a>
              </li>
              <li>
                <a href="#"> La mia lista </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- /.nav-left -->

        <div class="nav-right">
          <form action="" @submit.prevent="searching">
            <input type="text" placeholder=" search" v-model="inputValue" />
            <button @click="callApi()">Search</button>
          </form>
        </div>
        <!-- /.nav-right -->
      </div>
    </header>
    <!-- /.header -->

    <main>
      <div class="movies">
        <h2>Movies</h2>
        <div class="movies-list d-flex">
          <div
            class="poster-movie d-flex"
            v-for="(movie, index) in movies"
            :key="index"
          >
            <img
              :src="
                NotFoundImg(
                  movie.poster_path,
                  'http://image.tmdb.org/t/p/w200/' + movie.poster_path
                )
              "
            />
          </div>
        </div>
      </div>

      <div class="series">
        <h2>Series</h2>
        <div class="series-list d-flex">
          <div
            class="poster-serie d-flex"
            v-for="(serie, i) in series"
            :key="i"
          >
            <img
              :src="
                NotFoundImg(
                  serie.poster_path,
                  'http://image.tmdb.org/t/p/w200/' + serie.poster_path
                )
              "
            />
          </div>
        </div>
      </div>
    </main>
    <!-- /.main -->
  </div>
</template>

<script>
import axios from "axios";
// import { Flag } from "vue-flag-icon/components";
// import state from "@/state";

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
  width: 100%;
  // height: 10vh;
  background-color: rgba(19, 1, 1, 0.918);
  text-align: center;
  padding: 0.75rem 0 0.4rem;
  border-bottom: 1px solid firebrick;
  // position: fixed;
  &:hover {
    cursor: pointer;
  }
  .nav-bar {
    justify-content: space-between;

    .nav-left {
      .logo {
        margin: 0 2rem;
      }

      ul {
        li {
          padding: 0.65rem;
          border-bottom: 4px solid transparent;
          // border: 1px solid black;
          &:hover {
            background-color: #9e2a2a;
            border-radius: 0.2rem;
            border-bottom: 4px solid rgb(201, 140, 140);
            &:hover a {
              color: #47090f;
              font-weight: 500;
            }
          }
        }
      }
    }
    .nav-right {
      form {
        margin: 0.25rem 2rem 0;
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
  }
}

main {
  width: 100%;
  height: 100%;
  // height: 75vh;
  .movies,
  .series {
    width: 100%;
    text-align: center;
    h2 {
      // margin-top:;
    }
    .movies-list,
    .series-list {
      width: 210px;
      flex-wrap: wrap;

      // border: 2px solid black;

      .poster-movie,
      .poster-serie {
        margin: 15px;
      }
    }
  }
}
</style>