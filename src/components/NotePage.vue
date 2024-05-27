<template>
  <div class="container">
    <el-card v-if="!isAdmin && viewer.id !== note.user.id && note.state !== 1">
      <div class="shell">
        <el-empty description="文章不存在或正在审核中" />
      </div>
    </el-card>
    <el-card v-else>
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
          <div v-if="note.price === 0.0 || isAdmin || isPurchased || viewer.id === note.user.id">
            <div v-if="note.type === 'text'">
              <el-text v-html="note.content"></el-text>
            </div>
            <div v-if="note.type === 'image'" style="display: flex; justify-content: center">
              <el-image :src="note.content" alt="..." style="object-fit: scale-down"/>
            </div>
            <div v-if="note.type === 'video'" style="display: flex; justify-content: center">
              <video :src="note.content" style="width: 100%; height: auto" controls/>
            </div>
          </div>
          <div v-else>
            <el-result icon="warning" title="付费笔记" sub-title="请先购买后才能浏览笔记哦">
              <template #extra>
                <el-button type="primary" @click="drawer = true">前往购买</el-button>
              </template>
            </el-result>

            <el-drawer v-model="drawer" direction="rtl">
              <template #header>
                <h4>购买笔记</h4>
              </template>
              <template #default>
                <h5>《{{ note.title }}》</h5>
                <el-divider/>
                <div style="padding-left: 20px">
                  <el-space direction="vertical" alignment="normal" :size="4">
                    <el-text>笔记简介：{{ note.description }}</el-text><br>
                    <el-text>笔记类型：{{ note.type === 'text' ? '文本' : note.type === 'image' ? '图片' : '视频' }}笔记</el-text><br>
                    <el-text>笔记作者：{{ note.user.profile.username }}</el-text><br>
                    <el-text>创建时间：{{ formatTimestamp(note.createTime) }}</el-text><br>
                    <el-text>更新时间：{{ formatTimestamp(note.updateTime) }}</el-text><br>
                    <el-text>笔记售价：{{ note.price }} 金币</el-text>
                  </el-space>
                </div>
                <el-divider/>
                <div style="padding-left: 20px">
                  <el-button type="primary" @click="purchase">购买</el-button>
                  <el-button @click="drawer = false">取消</el-button>
                </div>
              </template>
              <template #footer>
<!--                <el-text type="primary">-->
<!--                  当前持有 {{ coin }} 金币-->
<!--                  <el-icon><Money /></el-icon>-->
<!--                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
<!--                </el-text>-->
              </template>
            </el-drawer>
          </div>

          <div class="information">
            <el-avatar :size="64" :src="note.user.profile.avatar"/><br>
          </div>
          <div v-if="follow >= 0" class="information author">
            <el-button v-if="follow !== -1" @click="followAuthor">
              <i v-if="follow === 1" class="bi bi-emoji-heart-eyes-fill"></i>
              <i v-else class="bi bi-emoji-heart-eyes"></i>
              &nbsp; {{ follow === 1 ? '已关注' : '关注' }}
            </el-button>
          </div>

          <div class="information">
            <el-text>
              <i class="bi bi-people"></i>
              作者:
              {{note.user.profile.username}}
            </el-text>

            <el-divider direction="vertical"/>

            <el-text>
              <i class="bi bi-clock"></i>
              创建时间: {{formattedCreateTime}}
            </el-text>

            <el-divider direction="vertical"/>

            <el-text>
              <i class="bi bi-pencil"></i>
              更新时间: {{formattedUpdateTime}}
            </el-text>
          </div>

        </div>

        <el-divider />

        <div class="footer">
          <el-button type="danger" @click="likeNote">
            <i v-if="like" class="bi bi-heart-fill"></i>
            <i v-else class="bi bi-heart"></i>
            &nbsp; {{ count.likes }} 点赞
          </el-button>

          <el-button type="warning" @click="starNote">
            <i v-if="star" class="bi bi-star-fill"></i>
            <i v-else class="bi bi-star"></i>
            &nbsp; {{ count.stars }} 收藏
          </el-button>

          <el-button type="success">
            <i class="bi bi-share"></i>
            &nbsp;分享
          </el-button>
        </div>

        <div class="comments">

          <el-input type="textarea" placeholder="回复作者：" v-model="comment"/>
          <el-button class="btn-comment" type="success" @click="replyComment">回复</el-button>

          <div class="comments-container">
            <el-card class="comment-item" v-for="item in comments" :key="item.id">
              <el-container>
                <el-aside width="64px" style="display: flex; justify-content: center;">
                  <el-avatar :size="48" :src="item.user.profile.avatar"/>
                </el-aside>
                <el-container style="display: flex; justify-content: center; ">
                  <el-header height="12px">
                    <el-text>{{ item.user.profile.username }}</el-text>
                    <el-divider direction="vertical"/>
                    <el-text>{{ formatTimestamp(item.time) }}</el-text>
                  </el-header>
                  <el-main>
                    <el-text>{{ item.content }}</el-text>
                  </el-main>
                  <el-footer height="16px">
                    <el-text>
                      <i class="bi bi-heart"></i>
                      点赞
                    </el-text>
                    <el-divider direction="vertical"/>
                    <el-text>
                      <i class="bi bi-star"></i>
                      收藏
                    </el-text>
                    <el-divider direction="vertical"/>
                    <el-text>
                      <i class="bi bi-reply"></i>
                      回复
                    </el-text>
                  </el-footer>
                </el-container>
              </el-container>
            </el-card>
          </div>

        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import axios from 'axios';
// import {getCookie} from "@/utils/cookie";
// import vuex from "@/vuex";

export default {
  name: "NotePage",
  data: function () {
    const id = this.$route.params.id;
    return {
      drawer: false,
      isPurchased: false,
      follow: -1,
      viewer: {
        id: -1,
        email: '',
        profile: {
          username: '',
          avatar: '962e54e30a146dd3139ffac1f8e5610c41cd8dcb6bc183a6cfd0faca48c7308b.png'
        }
      },
      note: {
        id: id,
        user: {
          id: -1,
          email: '',
          profile: {
            username: '',
            avatar: '962e54e30a146dd3139ffac1f8e5610c41cd8dcb6bc183a6cfd0faca48c7308b.png'
          }
        },
        state: 0,
        price: 0.0,
        title: '无标题笔记',
        description: '',
        createTime: 0,
        updateTime: 0,
        type: 'text',
        content: "这是一篇牛逼的博客 <br> 卧槽"
      },
      count: {
        likes: 0,
        stars: 0,
        comments: 0
      },
      like: false,
      star: false,
      comment: '',
      comments: [
        {
          id: 1,
          user: {
            email: 'aiurlanta@hotmail.com',
            profile: {
              username: '小兰asd',
              avatar: '962e54e30a146dd3139ffac1f8e5610c41cd8dcb6bc183a6cfd0faca48c7308b.png'
            }
          },
          time: 1708845962907,
          content: '大佬牛逼sss! ',
          parent: null
        },
        {
          id: 2,
          user: {
            email: 'aiurlanta@hotmail.com',
            profile: {
              username: '小兰',
              avatar: '962e54e30a146dd3139ffac1f8e5610c41cd8dcb6bc183a6cfd0faca48c7308b.png'
            }
          },
          time: 1708845962907,
          content: '大佬牛逼! ',
          parent: null
        }
      ]
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
    purchase() {
      this.$axios.post(
          '/note/purchase/' + this.note.id,
          {},
          {
            headers: {
              'Authorization': sessionStorage.getItem('tokenValue')
            }
          }
      ).then((res) => {
        console.log(res)
        if (res.data.code !== 200) {
          ElMessage({
            showClose: true,
            message: '购买失败！请重试',
            type: 'error',
          })
          return
        }

        ElMessage({
          showClose: true,
          message: '正在跳转至支付页面',
          type: 'success',
        })

        // 刷新页面
        // window.location.reload()

        // 重定向至支付宝页面
        window.location.href = axios.defaults.baseURL + '/alipay/pay/' + res.data.data.id
      })
    },
    followAuthor() {
      if (this.follow < 0) {
        return
      }
      if (this.follow === 0) {
        this.$axios.post(
            '/profile/follow/' + this.note.user.id,
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

          this.follow = 1
        })
      } else {
        this.$axios.post(
            '/profile/unfollow/' + this.note.user.id,
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

          this.follow = 0
        })
      }
    },
    likeNote() {
      if (this.like) {
        // 已点赞
        this.$axios.post(
            '/note/unlike/' + this.note.id,
            {},
            {
              headers: {
                'Authorization': sessionStorage.getItem('tokenValue')
              }
            }
        ).then((res) => {
          console.log(res)
          if (res.data.code !== 200) {
            ElMessage({
              showClose: true,
              message: '取消失败！请重试',
              type: 'error',
            })
            return
          }

          this.like = false
          this.count.likes--;

          ElMessage({
            showClose: true,
            message: '取消成功！',
            type: 'success',
          })
        })
      } else {
        this.$axios.post(
            '/note/like/' + this.note.id,
            {},
            {
              headers: {
                'Authorization': sessionStorage.getItem('tokenValue')
              }
            }
        ).then((res) => {
          console.log(res)
          if (res.data.code !== 200) {
            ElMessage({
              showClose: true,
              message: '点赞失败！请重试',
              type: 'error',
            })
            return
          }

          this.like = true
          this.count.likes++

          ElMessage({
            showClose: true,
            message: '点赞成功！',
            type: 'success',
          })
        })
      }
    },
    starNote() {
      if (this.star) {
        // 已点赞
        this.$axios.post(
            '/note/unstar/' + this.note.id,
            {},
            {
              headers: {
                'Authorization': sessionStorage.getItem('tokenValue')
              }
            }
        ).then((res) => {
          console.log(res)
          if (res.data.code !== 200) {
            ElMessage({
              showClose: true,
              message: '取消失败！请重试',
              type: 'error',
            })
            return
          }

          this.star = false
          this.count.stars--;

          ElMessage({
            showClose: true,
            message: '取消成功！',
            type: 'success',
          })
        })
      } else {
        this.$axios.post(
            '/note/star/' + this.note.id,
            {},
            {
              headers: {
                'Authorization': sessionStorage.getItem('tokenValue')
              }
            }
        ).then((res) => {
          console.log(res)
          if (res.data.code !== 200) {
            ElMessage({
              showClose: true,
              message: '收藏失败！请重试',
              type: 'error',
            })
            return
          }

          this.star = true
          this.count.stars++

          ElMessage({
            showClose: true,
            message: '收藏成功！',
            type: 'success',
          })
        })
      }
    },
    replyComment() {
      if (this.comment === '') {
        ElMessage({
          showClose: true,
          message: '请输入评论',
          type: 'error',
        })
        return
      }

      this.$axios.post(
          '/note/comment/' + this.note.id,
          this.$qs.stringify({
            content: this.comment
          }),
          {
            headers: {
              'Authorization': sessionStorage.getItem('tokenValue')
            }
          }
      ).then((res) => {
        console.log(res)
        if (res.data.code !== 200) {
          ElMessage({
            showClose: true,
            message: '评论失败！请重试',
            type: 'error',
          })
          return
        }

        this.comments.push(res.data.data)

        ElMessage({
          showClose: true,
          message: '评论成功！',
          type: 'success',
        })
      })
    }
  },
  computed: {
    isAdmin() {
      const stringify = sessionStorage.getItem('user')
      if (stringify == null) {
        return false
      }
      return JSON.parse(stringify).isAdmin;
    },
    formattedCreateTime() {
      return this.formatTimestamp(this.note.createTime)
    },
    formattedUpdateTime() {
      return this.formatTimestamp(this.note.updateTime)
    }
  },
  beforeMount() {
    const id = this.$route.params.id;
    this.viewer = JSON.parse(sessionStorage.getItem('user'))
    this.$axios.post(
        '/note/detail/' + id,
    ).then((res) => {
      console.log('detail', res)
      this.note = res.data.data

      // 判断是否已关注作者
      if (this.viewer.id !== this.note.user.id) {
        this.$axios.post(
            '/profile/isFollowed/' + this.note.user.id,
            {},
            {
              headers: {
                'Authorization': sessionStorage.getItem('tokenValue')
              }
            }
        ).then((res) => {
          console.log('isFollowed', res)
          this.follow = res.data.data ? 1 : 0
        })
      }
    })
    this.$axios.post(
        '/note/comments/' + id,
    ).then((res) => {
      console.log('comments', res)
      this.comments = res.data.data
    })
    this.$axios.post(
        '/note/count/likes/' + id,
    ).then((res) => {
      console.log('count/likes', res)
      this.count.likes = res.data.data
    })
    this.$axios.post(
        '/note/count/stars/' + id,
    ).then((res) => {
      console.log('count/stars', res)
      this.count.stars = res.data.data
    })
    this.$axios.post(
        '/note/count/comments/' + id,
    ).then((res) => {
      console.log('count/comments', res)
      this.count.comments = res.data.data
    })

    this.$axios.post(
        '/note/isLike/' + id,
        {},
        {
          headers: {
            'Authorization': sessionStorage.getItem('tokenValue')
          }
        }
    ).then((res) => {
      console.log('isLike', res)
      this.like = res.data.data
    })
    this.$axios.post(
        '/note/isStar/' + id,
        {},
        {
          headers: {
            'Authorization': sessionStorage.getItem('tokenValue')
          }
        }
    ).then((res) => {
      console.log('isStar', res)
      this.star = res.data.data
    })

    this.$axios.post(
        '/note/isPurchased/' + id,
        {},
        {
          headers: {
            'Authorization': sessionStorage.getItem('tokenValue')
          }
        }
    ).then((res) => {
      console.log('isPurchased', res)
      this.isPurchased = res.data.data
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
  background: url("../assets/background/3.png");
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
  padding: 120px 0 0 0;
  text-shadow: 0 0 20px #000;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.information {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}

.author {
  flex-direction: column;
  align-items: center;
}

.footer {
  display: flex;
  justify-content: center;
}

.comments {
  padding: 64px;
}

.btn-comment {
  margin-top: 16px;
}

.comment-item {
  margin-top: 16px;
  border-radius: 10px;
}
</style>