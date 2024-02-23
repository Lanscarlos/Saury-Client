<template>
  <div id="app-1">
    <navigation-bar/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";

export default {
  name: 'App',
  components: {
    NavigationBar
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
