<template>
  <div class="container">
    <el-carousel trigger="click" height="512px">
      <el-carousel-item v-for="item in carousels" :key="item">
        <a href="#">
          <img :src="item.url" style="width: 100%; height: 512px" :alt="item.title"/>
        </a>
        <div class="carousel-caption">
          <h3>{{item.title}}</h3>
          <p>{{item.subtitle}}</p>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "RecommendationPage",
  data: function () {
    return {
      carousels: [
        {
          url: 'https://uploadstatic.mihoyo.com/ys-obc/2021/12/27/4521515/7af61fffdee1556c90d8c8891ee0a9df_4141871638126431128.png',
          title: '百货奇货',
          subtitle: '...'
        },
        {
          url: 'https://gtms01.alicdn.com/tps/i1/TB1r4h8JXXXXXXoXXXXvKyzTVXX-520-280.jpg',
          title: '第一章',
          subtitle: '...'
        },
        {
          url: 'https://gtms01.alicdn.com/tps/i2/TB10vPXKpXXXXacXXXXvKyzTVXX-520-280.jpg',
          title: '第二章',
          subtitle: '...'
        },
        {
          url: 'https://gtms01.alicdn.com/tps/i3/TB1gXd1JXXXXXapXpXXvKyzTVXX-520-280.jpg',
          title: '第三章',
          subtitle: '...'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>