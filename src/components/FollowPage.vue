<template>
  <div class="container">
    <el-card>
      <div v-if="followings.length === 0" class="shell">
        <el-empty description="暂无关注的用户"/>
      </div>
      <div v-else class="shell">
        <el-tabs v-model="current" tab-position="top" class="demo-tabs" @tab-click="onClickTab">
          <el-tab-pane v-for="item in followings" :key="item.id" :label="item.id.toString()" style="margin: 36px 36px 0 36px">
            <template #label>
              <el-avatar :size="32" :src="item.profile.avatar"/>
              &nbsp;&nbsp;
              <el-text>{{ item.profile.username }}</el-text>
            </template>

            <div v-if="notes.length === 0">
              <el-empty style="margin-bottom: 36px" description="该用户暂未发表任何文章" />
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

                <p class="lead" @click="openNotePage(item.id)">
                  {{ item.title }}
                  <el-tag v-if="item.price !== 0" type="warning" style="margin-left: 5px">付费</el-tag>
                </p>

                <el-divider/>

                <div v-if="item.type === 'text'">
                  <span class="d-inline-block text-truncate" style="max-width: 660px;" v-html="item.content"></span>
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

          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "FollowPage",
  data: function () {
    return {
      current: '0',
      followings: [],
      notes: []
    }
  },
  methods: {
    onClickTab(target) {
      console.log('target', target)
      const index = target.index
      const userId = target.props.label
      if (this.current === index) {
        this.$router.push({ name:'user', params: { id: userId } })
        return
      }
      this.$axios.post(
          '/note/user/' + userId,
      ).then((res) => {
        console.log(res)
        this.notes = res.data.data.filter(item => item.state === 1)
      })
    },
    openNotePage(id) {
      this.$router.push({ name:'note', params: { id: id } })
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 月份从0开始，需要加1
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();

      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }
  },
  beforeMount() {
    this.$axios.post(
        '/profile/followings',
        {},
        {
          headers: {
            'Authorization': sessionStorage.getItem('tokenValue')
          }
        }
    ).then((res) => {
      console.log('followings', res)
      this.followings = res.data.data

      if (res.data.data.length === 0) {
        return
      }

      // 获取第一个关注者的笔记列表
      this.$axios.post(
          '/note/user/' + this.followings[0].id,
      ).then((res) => {
        console.log(res)
        this.notes = res.data.data.filter(item => item.state === 1)
      })
    })
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  /*height: 100vh;*/
  display: flex;
  justify-content: center;
  /*align-items: center;*/
  /*background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);*/
  margin-bottom: 128px;
}

.shell {
  width: 780px;
  background: #ffffff;
  position: relative;
}

.note-item {
  margin-bottom: 28px;
  border-radius: 10px;
}

.lead:hover {
  color: #409EFF;
  cursor: pointer;
}
</style>