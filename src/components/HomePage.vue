<template>
  <div class="container">
    <div class="background">
      <div class="overlay"></div>
      <img src="../assets/svg/logo.svg" class="foreground" alt="...">
      <h1 class="title">计算机领域学习资源共享平台</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -2;
  background-image: url("../assets/background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.2);
}
.foreground {
  display: block;
  margin: 0 auto;
  padding-top: 16%;
}
h1, p {
  display: flex;
  justify-content: center;
}
.title {
  margin-top: 48px;
  color: white;
}
.subtitle {
  color: #409EFF;
}
</style>