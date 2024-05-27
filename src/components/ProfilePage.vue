<template>
  <div class="container">
    <el-card>
      <div class="shell">
        <img :src="user.profile.avatar" :alt="user.profile.username" class="avatar" style="background-color: white">
        <div class="head">
          <div class="data">
            <div class="title1">
              {{user.profile.username}}
              <span @click="editProfile"><i class="bi bi-pencil"></i></span>
            </div>
            <div class="title2">{{user.profile.signature}}</div>
            <el-tag v-show="user.isAdmin" style="margin-top: 8px" type="danger">管理员</el-tag>
          </div>
        </div>

        <el-divider />

        <div style="">
          <div v-if="editable" style="margin-top: 128px; margin-bottom: 128px; padding-right: 128px">
            <el-form :model="form" label-width="120px">
              <el-form-item label="邮箱">
                <el-input v-model="user.email" disabled/>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="form.username" />
              </el-form-item>
              <el-form-item label="签名">
                <el-input v-model="form.signature" />
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="form.gender">
                  <el-radio :label="-1">保密</el-radio>
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="生日">
                <el-date-picker
                    v-model="form.birthday"
                    type="date"
                    placeholder="选择你的出生日期"
                    value-format="x"
                    style="width: 100%"
                />
              </el-form-item>
              <el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="updateProfile">保存资料</el-button>
                  <el-button>取消修改</el-button>
                </el-form-item>
              </el-form-item>
            </el-form>
          </div>
          <div v-else>
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
                  <div style="position: absolute; right: 16px">
                    <el-text v-if="item.state === 0" type="warning">审核中</el-text>
                    <el-text v-else-if="item.state === 1" type="success">审核通过</el-text>
                    <el-text v-else type="danger">审核未通过</el-text>
                    <el-button style="margin-left: 16px" type="danger" @click="deleteNote(item.id)">删除</el-button>
                  </div>
                </div>
                <div v-else-if="item.type === 'image'">
                  <el-icon><Picture/></el-icon>
                  <el-divider direction="vertical"/>
                  <el-text>图片笔记</el-text>
                  <div style="position: absolute; right: 16px">
                    <el-text v-if="item.state === 0" type="warning">审核中</el-text>
                    <el-text v-else-if="item.state === 1" type="success">审核通过</el-text>
                    <el-text v-else type="danger">审核未通过</el-text>
                    <el-button style="margin-left: 16px" type="danger" @click="deleteNote(item.id)">删除</el-button>
                  </div>
                </div>
                <div v-else>
                  <el-icon><VideoPlay/></el-icon>
                  <el-divider direction="vertical"/>
                  <el-text>视频笔记</el-text>
                  <div style="position: absolute; right: 16px">
                    <el-text v-if="item.state === 0" type="warning">审核中</el-text>
                    <el-text v-else-if="item.state === 1" type="success">审核通过</el-text>
                    <el-text v-else type="danger">审核未通过</el-text>
                    <el-button style="margin-left: 16px" type="danger" @click="deleteNote(item.id)">删除</el-button>
                  </div>
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

      </div>
    </el-card>
  </div>
</template>

<script>
// import vuex from '../vuex'
// import {getCookie} from "@/utils/cookie";
import {ElMessage, ElMessageBox} from "element-plus";
import axios from "axios";

export default {
  name: "ProfilePage",
  data: function () {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log('sessionStorage.getItem(\'user\')=>', user)
    const baseURL = axios.defaults.baseURL
    return {
      baseURL: baseURL,
      editable: false,
      user: user,
      form: {
        username: user.profile.username,
        signature: user.profile.signature,
        gender: user.profile.gender,
        birthday: user.profile.birthday
      },
      notes: []
    }
  },
  methods: {
    editProfile() {
      this.editable = !this.editable
    },
    logout() {
      this.$axios.post(
          '/auth/logout',
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
            message: '登出失败！请联系工作人员',
            type: 'error',
          })
          return
        }

        // vuex.commit('updateProfile', null)
        sessionStorage.removeItem('user')

        ElMessage({
          showClose: true,
          message: '登出成功',
          type: 'success',
        })

        this.$router.push({ name:'login' })
      })
    },
    updateProfile() {
      console.log("username", this.form.username)
      console.log("signature", this.form.signature)
      console.log("gender", this.form.gender)
      console.log("birthday", this.form.birthday)

      this.$axios.post(
          '/profile/update',
          this.$qs.stringify({
            username: this.form.username,
            signature: this.form.signature,
            avatar: this.user.profile.avatar,
            gender: this.form.gender,
            birthday: this.form.birthday
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
            message: '更新失败！请联系工作人员',
            type: 'error',
          })
          return
        }

        // vuex.commit('updateProfile', {
        //   username: this.form.username,
        //   signature: this.form.signature,
        //   avatar: this.user.profile.avatar,
        //   gender: this.form.gender,
        //   birthday: this.form.birthday
        // })

        const profile = {
          username: this.form.username,
          signature: this.form.signature,
          avatar: this.user.profile.avatar,
          gender: this.form.gender,
          birthday: this.form.birthday
        }

        const user = JSON.parse(sessionStorage.getItem('user'))
        user.profile = profile
        this.user.profile = profile
        sessionStorage.setItem('user', JSON.stringify(user))

        ElMessage({
          showClose: true,
          message: '资料修改成功',
          type: 'success',
        })
      })
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
    },
    deleteNote(id) {
      ElMessageBox.confirm('该操作不可撤销！是否确认删除？', '删除笔记', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        callback: (action) => {
          console.log(action)
          if (action !== 'confirm') {
            return
          }

          this.$axios.post(
              '/note/delete/' + id,
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
                message: '删除失败！请联系工作人员',
                type: 'error',
              })
              return
            }

            this.notes = this.notes.filter(item => item.id !== id)

            ElMessage({
              showClose: true,
              message: '删除成功',
              type: 'success',
            })
          })
        }
      })
    }
  },
  beforeMount() {
    this.$axios.post(
        '/note/user/' + this.user.id,
    ).then((res) => {
      console.log(res)
      this.notes = res.data.data
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
  top: 347px;
  left: 182px;
  width: 64px;
  height: 64px;
  border-radius: 64px;
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