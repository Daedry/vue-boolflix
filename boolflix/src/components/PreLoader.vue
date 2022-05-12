<template>
  <transition name="fade">
    <div v-if="show" class="preloader">
      <div class="logo">
        <!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->
      </div>
      <!-- <p>CIao sono un loader, almeno credo</p> -->
      <h1 class="animate__animated animate__jackInTheBox logo_name">
        BoolFlix
      </h1>
      <div class="wrapper">
        <div class="bar">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import "animate.css";
export default {
  name: "PreLoader",
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    this.showToggle();
  },
  methods: {
    showToggle() {
      setTimeout(() => {
        this.show = false;
      }, 4000);
    },
  },
};
</script>

<style lang="scss" scoped>
.preloader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 9;
  animation: bgScale 5s;

  .logo_name {
    font-size: 100px;
    color: #dd1323;
    margin-top: -10rem;
    z-index: 10;
    text-shadow: 5px 12px black;
  }

  .logo {
    width: 1.5rem;
    height: 1.5rem;
    // background-color: #c2c;
    background-repeat: no-repeat;
    --animate-delay: 0.5s;
  }
  .wrapper {
    width: 100%;
    height: 50px;
    overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -3rem;
    .bar {
      position: absolute;
      bottom: 0;
      height: 2px;
      width: 700px;
      margin: 0 auto;
      background: #fff;
      margin-top: 150px;
      border-radius: 2rem;

      .circle {
        position: absolute;
        top: -30px;
        margin-left: -30px;
        height: 60px;
        width: 60px;
        left: 0;
        background: #fff;
        border-radius: 30%;
        animation: move 5s infinite;
      }
    }
  }
}

@keyframes bgScale {
  0% {
    background-color: #000000;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpolygon fill='%23000000' points='1600 160 0 460 0 350 1600 50'/%3E%3Cpolygon fill='%23000000' points='1600 260 0 560 0 450 1600 150'/%3E%3Cpolygon fill='%23000000' points='1600 360 0 660 0 550 1600 250'/%3E%3Cpolygon fill='%23000000' points='1600 460 0 760 0 650 1600 350'/%3E%3Cpolygon fill='%23000000' points='1600 800 0 800 0 750 1600 450'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
  }

  100% {
    background-color: #000000;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpolygon fill='%23330307' points='1600 160 0 460 0 350 1600 50'/%3E%3Cpolygon fill='%2366060e' points='1600 260 0 560 0 450 1600 150'/%3E%3Cpolygon fill='%23990914' points='1600 360 0 660 0 550 1600 250'/%3E%3Cpolygon fill='%23cc0c1b' points='1600 460 0 760 0 650 1600 350'/%3E%3Cpolygon fill='%23FF0F22' points='1600 800 0 800 0 750 1600 450'/%3E%3C/g%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
  }
}

@keyframes move {
  0% {
    left: 0;
  }
  50% {
    left: 100%;
    transform: rotate(450deg);
    width: 150px;
    height: 150px;
  }
  75% {
    left: 100%;
    transform: rotate(450deg);
    width: 150px;
    height: 150px;
  }
  100% {
    right: 100%;
  }
}
</style>