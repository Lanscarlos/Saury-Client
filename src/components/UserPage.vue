<template>
  <div class="container">
    <el-card>
      <div class="shell">
        <img :src="user.profile.avatar" :alt="user.profile.username" class="avatar" style="background-color: white">
        <el-button v-show="state >= 0" class="cover" :type="state === 0 ? 'danger' : 'info'" @click="followAuthor">
          <span v-if="state === 0">
            <i class="bi bi-plus-lg"></i>&nbsp;关注
          </span>
          <span v-else>
            <i class="bi bi-check-lg"></i>&nbsp;已关注
          </span>
        </el-button>
        <div class="head">
          <div class="data">
            <div class="title1">{{user.profile.username}}</div>
            <div class="title2">{{user.profile.signature}}</div>
          </div>
        </div>

        <el-divider />

        <div style="">
          <div v-if="notes.length === 0">
            <el-empty description="暂未发布任何笔记" />
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
                <span class="d-inline-block text-truncate" style="max-width: 680px;" v-html="item.content"></span>
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

      </div>
    </el-card>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "UserPage",
  data: function () {
    return {
      state: -1,
      user: {
        id: -1,
        profile: {
          username: '',
          signature: '',
          avatar: ''
        }
      },
      notes: []
    }
  },
  methods: {
    followAuthor() {
      if (this.state < 0) {
        return
      }
      if (this.state === 0) {
        this.$axios.post(
            '/profile/follow/' + this.user.id,
            {},
            {
              headers: {
                'Authorization': sessionStorage.getItem('tokenValue')
              }
            }
        ).then((res) => {
          console.log('follow', res)
          if (res.data.code !== 200) {
            ElMessage({
              showClose: true,
              message: '关注失败！请重试',
              type: 'error',
            })
            return
          }

          ElMessage({
            showClose: true,
            message: '关注成功！',
            type: 'success',
          })

          this.state = 1
        })
      } else {
        this.$axios.post(
            '/profile/unfollow/' + this.user.id,
            {},
            {
              headers: {
                'Authorization': sessionStorage.getItem('tokenValue')
              }
            }
        ).then((res) => {
          console.log('unfollow', res)
          if (res.data.code !== 200) {
            ElMessage({
              showClose: true,
              message: '取关失败！请重试',
              type: 'error',
            })
            return
          }

          ElMessage({
            showClose: true,
            message: '取关成功！',
            type: 'success',
          })

          this.state = 0
        })
      }
    },
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
    const userId = this.$route.params.id
    this.$axios.post(
        '/user/' + userId,
    ).then((res) => {
      console.log('user', res)
      this.user = res.data.data

      const viewer = JSON.parse(sessionStorage.getItem('user'))
      const viewerId = viewer ? viewer.id : 0

      // 判断是否已关注作者
      if (viewerId !== res.data.data.id) {
        this.$axios.post(
            '/profile/isFollowed/' + res.data.data.id,
            {},
            {
              headers: {
                'Authorization': sessionStorage.getItem('tokenValue')
              }
            }
        ).then((res) => {
          console.log('isFollowed', res)
          this.state = res.data.data ? 1 : 0
        })
      }
    })

    // 载入文章
    this.$axios.post(
        '/note/user/' + userId,
    ).then((res) => {
      console.log('notes', res)
      this.notes = res.data.data.filter(item => item.state === 1)
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
  background: url("../assets/background/4.png");
  background-size: cover;
  z-index: -1;
  transform: skewY(-4deg);
  transform-origin: 0 0;
}

.avatar {
  position: absolute;
  top: 190px;
  left: 25px;
  width: 220px;
  z-index: 2;
  border-radius: 500px;
  border: 10px #fff solid;
  box-shadow: 0 5px 10px #00000065;
}

.cover {
  position: absolute;
  top: 310px;
  left: 280px;
  width: 128px;
  height: 36px;
  border-radius: 10px;
  box-shadow: 0 5px 10px #00000065;
  z-index: 3;
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

.note-item {
  margin-bottom: 28px;
  border-radius: 10px;
}
.lead:hover {
  color: #409EFF;
  cursor: pointer;
}

.btn-delete {
  position: relative;
  right: -560px;
  margin-left: 12px;
  background: #F56C6C;
  border-radius: 5px;
  color: #ffffff;
  font-size: 14px;
  padding: 4px 6px 4px 8px;
  cursor: pointer;
}
</style>