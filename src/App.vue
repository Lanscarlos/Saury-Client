<template>
  <div id="app-1">
    <navigation-bar/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <div class="background"></div>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";
// import {autoLogin} from "@/utils/auth";

export default {
  name: 'App',
  components: {
    NavigationBar
  },
  beforeMount() {
    // autoLogin()
  }
}
</script>

<style>
#app-1 {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*!*text-align: center;*!*/
  color: #2c3e50;
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120vh;
  z-index: -10;
  background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);
}
.container {
  margin-top: 100px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
