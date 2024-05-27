<template>
  <div class="container">
    <div v-if="results.length === 0">
      <el-card class="note-item">
        <el-empty description="暂无搜索结果，请换一个关键词试试" />
      </el-card>
    </div>
    <div v-else>
      <el-card class="note-item" v-for="item in results" :key="item.id">
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
  name: "SearchPage",
  data: function () {
    const keyword = this.$route.params.keyword;
    return {
      keyword: keyword,
      results: []
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
    const keyword = this.$route.params.keyword;
    this.$axios.post(
        '/note/search/' + keyword,
    ).then((res) => {
      console.log(res)
      this.results = res.data.data.filter(item => item.state === 1)
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