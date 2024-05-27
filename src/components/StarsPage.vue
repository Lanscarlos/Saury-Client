<template>
  <div class="container">
    <div v-if="notes.length === 0">
      <el-card class="note-item">
        <el-empty description="暂未收藏文章" />
      </el-card>
    </div>
    <div v-else>
      <el-card class="note-item" v-for="item in notes" :key="item.id">
        <div v-if="item.type === 'text'">
          <el-icon>
            <Paperclip/>
          </el-icon>
          <el-divider direction="vertical"/>
          <el-text>文字笔记</el-text>
        </div>
        <div v-else-if="item.type === 'image'">
          <el-icon><Picture/></el-icon>
          <el-divider direction="vertical"/>
          <el-text>图片笔记</el-text>
        </div>
        <div v-else>
          <el-icon><VideoPlay/></el-icon>
          <el-divider direction="vertical"/>
          <el-text>视频笔记</el-text>
        </div>

        <p class="lead" @click="openNotePage(item.id)">{{ item.title }}</p>

        <el-divider/>

        <div v-if="item.type === 'text'">
          <span class="d-inline-block text-truncate" style="max-width: 880px;" v-html="item.content"></span>
        </div>
        <div v-else-if="item.type === 'image'">
          <el-image :src="item.content" alt="..." style="height: 128px; border-radius: 10px"/>
        </div>

        <div style="margin-top: 16px">
          <el-text>{{ item.description }}</el-text>
        </div>
        <el-text>{{ formatTimestamp(item.updateTime) }}</el-text>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "StarsPage",
  data: function () {
    return {
      notes: []
    }
  },
  methods: {
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 月份从0开始，需要加1
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    },
    openNotePage(id) {
      this.$router.push({ name:'note', params: { id: id } })
    }
  },
  beforeMount() {
    this.$axios.post(
        '/profile/stars',
        {},
        {
          headers: {
            'Authorization': sessionStorage.getItem('tokenValue')
          }
        }
    ).then((res) => {
      console.log('notes', res)
      this.notes = res.data.data.filter(item => item.state === 1)
    })
  }
}
</script>

<style scoped>
.note-item {
  margin-bottom: 28px;
  border-radius: 10px;
}
.lead:hover {
  color: #409EFF;
  cursor: pointer;
}
</style>