<template>
  <div class="container">
    <el-card>
      <div class="shell">
        <div class="head">
          <div class="data">
            <div class="title1">
              {{note.title}}
<!--              <span>aaa</span>-->
            </div>
            <div class="title2">{{note.description}}</div>
          </div>
        </div>

        <el-divider />

        <div class="content">

          <div v-if="note.type === 'text'">
            <el-text v-html="note.content"></el-text>
          </div>
          <div v-if="note.type === 'image'">
            <img :src="note.content" alt="..."/>
          </div>
          <div v-if="note.type === 'video'">
            <video :src="note.content"/>
          </div>

        </div>

      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "NotePage",
  data: function () {
    const id = this.$route.params.id;
    return {
      note: {
        id: id,
        title: '无标题笔记',
        description: '',
        createTime: 0,
        updateTime: 0,
        type: 'text',
        content: "这是一篇牛逼的博客 <br> 卧槽"
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  /*align-items: center;*/
  /*background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);*/
}

.shell {
  width: 780px;
  background: #ffffff;
  position: relative;
}

.head {
  height: 340px;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.head::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: url("../assets/note-background.png");
  background-size: cover;
  z-index: -1;
  transform: skewY(-4deg);
  transform-origin: 0 0;
}

.cover {
  position: absolute;
  top: 190px;
  left: 25px;
  width: 220px;
  z-index: 2;
  border-radius: 500px;
  border: 10px #fff solid;
  box-shadow: 0 5px 10px #00000065;
}

.data {
  padding: 190px 0 0 280px;
  text-shadow: 0 0 20px #000;
}

.data .title1 {
  color: white;
  font-size: 50px;
  font: 900 50px '';
  margin-bottom: 5px;
  position: relative;
}

.data .title1 span {
  position: absolute;
  top: 17px;
  margin-left: 12px;
  background: #ffe44c;
  border-radius: 5px;
  color: #000000;
  font-size: 14px;
  padding: 0px 4px;
}

.data .title2 {
  color: #fff;
  font: 500 24px '';
}
</style>