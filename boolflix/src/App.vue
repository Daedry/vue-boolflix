<template>
  <div id="app">
    <!-- <loader
      object="#ff9633"
      color1="#ffffff"
      color2="#17fd3d"
      size="5"
      speed="2"
      bg="#343a40"
      objectbg="#999793"
      opacity="80"
      name="circular"
    >
    </loader> -->
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
          <form action="" @submit.prevent="searching" class="d-flex">
            <input type="search" placeholder="search" v-model="inputValue" />
            <button :disabled="inputValue.length < 1">
              <svg viewBox="80 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#fff"
                  d="M 90 210 C 90 180 90 150 90 150 C 150 150 180 150 180 150 C 180 150 300 150 300 150 C 300 150 330 150 390 150 C 390 150 390 180 390 210 C 390 240 390 270 390 270 C 330 270 300 270 300 270 C 300 270 180 270 180 270 C 180 270 150 270 90 270 C 90 270 90 240 90 210"
                  mask="url(#knockout-text)"
                ></path>
                <mask id="knockout-text">
                  <rect width="100%" height="100%" fill="#fff" x="0" y="0" />
                  <text x="147" y="227" fill="#000">Search</text>
                </mask>
              </svg>
            </button>
          </form>
        </div>
        <!-- /.nav-right -->
      </div>
    </header>
    <!-- /.header -->

    <main>
      <div class="container" v-if="movies && series">
        <h2>Movie</h2>
        <div class="cards-movie d-flex wrap">
          <div class="flip-card" v-for="(movie, index) in movies" :key="index">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img
                  :src="
                    NotFoundImg(
                      movie.poster_path,
                      'http://image.tmdb.org/t/p/w300/' + movie.poster_path
                    )
                  "
                />
              </div>

              <div class="flip-card-back">
                <div class="backdrop-img">
                  <img
                    class="img-back"
                    :src="
                      NotFoundBackdropImg(
                        movie.backdrop_path,
                        'http://image.tmdb.org/t/p/w300/' + movie.backdrop_path
                      )
                    "
                    alt=""
                  />
                  <font-awesome-icon icon="fa-solid fa-play" />
                </div>
                <!-- /.backdrop-img -->

                <div class="info">
                  <div>
                    <span>Titolo: </span>
                    {{ movie.title }}
                  </div>
                  <div>
                    <span>Lingua: </span>
                    <Flag :iso="changeFlags(movie.original_language)" />
                  </div>
                  <div class="star">
                    voto:
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
                  <!-- /.star -->
                  <div class="plot">
                    <div class="overview">{{ movie.overview }}</div>
                  </div>
                </div>
                <!-- /.info -->
              </div>
              <!-- /.flip-card-back -->
            </div>
            <!-- /.flip-card-inner -->
          </div>
          <!-- /.flip-card -->
        </div>
        <!-- /cards-movie -->

        <h2>Series</h2>
        <div class="cards-series d-flex wrap">
          <div class="flip-card" v-for="(serie, index) in series" :key="index">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <img
                  :src="
                    NotFoundImg(
                      serie.poster_path,
                      'http://image.tmdb.org/t/p/w342/' + serie.poster_path
                    )
                  "
                />
              </div>

              <div class="flip-card-back">
                <div class="backdrop-img">
                  <img
                    class="img-back"
                    :src="
                      NotFoundBackdropImg(
                        serie.backdrop_path,
                        'http://image.tmdb.org/t/p/w300/' + serie.backdrop_path
                      )
                    "
                    alt=""
                  />
                  <font-awesome-icon icon="fa-solid fa-play" />
                </div>
                <!-- /.backdrop-img -->

                <div class="info">
                  <div><span>Titolo: </span> {{ serie.title }}</div>
                  <div>
                    <span>Titolo Originale: </span> {{ serie.original_title }}
                  </div>
                  <div>
                    <span>Lingua: </span>
                    <Flag :iso="changeFlags(serie.original_language)" />
                  </div>
                  <div class="star">
                    Voto:
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
                  <!-- /.star -->
                  <div class="plot">
                    <div class="overview">{{ serie.overview }}</div>
                  </div>
                </div>
                <!-- /.info -->
              </div>
              <!-- /.flip-card-back -->
            </div>
            <!-- /.flip-card-inner -->
          </div>
          <!-- /.flip-card -->
        </div>
        <!-- /.cards-series -->
      </div>
      <!-- /.container -->
      <div class="start d-flex" v-else>
        <p>Start looking for a movie or TV show that interests you</p>
      </div>
    </main>
    <!-- /.main -->
  </div>
</template>

<script>
import axios from "axios";
import { Flag } from "vue-flag-icon/components";
// import state from "@/state";

export default {
  name: "App",
  components: {
    Flag,
  },
  data() {
    return {
      inputValue: "",
      movies: null,
      series: null,
      loading: true,
      error: null,
      API_movies:
        "https://api.themoviedb.org/3/search/movie?api_key=703dcef70eae227971386893d0cf25d8&language=it-IT&page=1&include_adult=false&query=",
      API_series:
        "https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=",
    };
  },
  methods: {
    callApi(query) {
      axios
        .all([
          axios.get(`${this.API_movies}${query}`),
          axios.get(`${this.API_series}${query}`),
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
      this.callApi(this.inputValue);
      this.inputValue = "";
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

    NotFoundBackdropImg(img, full_img) {
      if (img === null) {
        img =
          "https://www.trschools.com/templates/imgs/default_placeholder.png";
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
  position: relative;
  background-color: transparent;
  text-align: center;
  padding: 0.75rem 0 0.4rem;

  .nav-bar {
    justify-content: space-between;

    .nav-left {
      .logo {
        margin: 0.25rem 2.5rem 0 2rem;
        &:hover {
          cursor: pointer;
        }
      }

      ul {
        li {
          padding: 0.75rem 1rem 1rem;
          border-bottom: 4px solid transparent;
          font-weight: 500;
          font-size: 18px;
          &:hover {
            border-bottom: 4px solid #dd1323;
            transform: scale(1.15);
          }
        }
      }
    }
    .nav-right {
      form {
        margin: 0.55rem 2rem 0;

        input {
          text-indent: 0.55rem;
          outline: 0;
          height: 35px;
          border: none;
          border-radius: 0.35rem;
          margin-right: 7rem;
        }

        button {
          background-color: transparent;
          border: none;
          position: absolute;
          top: -1rem;
          right: 1rem;

          svg {
            width: 100px;

            path {
              cursor: pointer;
              animation: blob 8s infinite forwards;
              transform-origin: 50% 50%;

              &:hover {
                fill: #fafafa;
              }
            }

            text {
              font-size: 60px;
            }
          }
        }
      }
    }
  }
}

main {
  
  .container {
    // background-color: blueviolet;
    width: 1620px;
    margin: 1rem auto;

    h2{
      padding-top: 1rem ;
      text-align: center;
      font-size: 40px;
    }

    .cards-movie,
    .cards-series {
      .flip-card {
        width: 300px;
        height: 400px;
        perspective: 1000px;
        margin: 2rem 0.75rem;
        transition: 0.8s;
        // background-color: #2c3e50;
        z-index: 3;

        &:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        &:hover {
          transform: scale(1.3);
          z-index: 4;
        }
        .flip-card-inner {
          position: relative;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;

          .flip-card-front,
          .flip-card-back {
            width: 300px;
            height: 400px;
            position: absolute;
            backface-visibility: hidden;
          }

          .flip-card-front {
            color: black;
            img {
              width: 100%;
              height: 100%;
              border-radius: 0.2rem;
            }
          }

          .flip-card-back {
            color: white;
            transform: rotateY(180deg);
            box-shadow: -3px 4px 15px 3px black;
            border-radius: 0.25rem;
            background-image: linear-gradient(180deg, #660f08, #182531);

            .backdrop-img {
              position: relative;
              height: auto;
              width: 100%;
              height: 169px;
              .img-back {
                border-top-left-radius: 0.2rem;
                border-top-right-radius: 0.2rem;
                width: 100%;
                height: 100%;
              }
              .fa-play {
                font-size: 25px;
                position: absolute;
                top: 48%;
                left: 48%;
                &:hover {
                  cursor: pointer;
                  // color: radial-gradient(circle, #df4756 80%, black 20%);
                  color: #dd1323;
                  transform: scale(1.25);
                }
              }
            }

            .info {
              text-align: left;
              margin: 0.1rem 0.3rem 0;
              div {
                text-align: center;
                font-size: 12.5px;
                padding: 0.1rem 0 0;
              }

              .plot {
                height: 163px;
                text-overflow: ellipsis;
                white-space: wrap;
                overflow: hidden;
                .overview {
                  font-size: 11px;
                }
              }
            }
          }
        }
      }
    }
  }

  .start{
    p{
      justify-content: center;
      align-content: center;
      margin: 6rem auto;
      font-size: 30px;
      font-weight: 500;
    }
  }
}

</style>