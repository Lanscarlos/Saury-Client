<template>
  <div class="container">
    <el-card>
      <div class="shell">
        <img :src="profile.avatar" :alt="profile.username" class="cover">
        <div class="head">
          <div class="data">
            <div class="title1">{{profile.username}}<span>{{ profile.gender > -1 ? profile.gender === 1 ? '♂' : '♀' : '♂?♀' }}</span></div>
            <div class="title2">{{profile.signature}}</div>
          </div>
        </div>

        <el-divider />

        <div style="margin-top: 128px; padding-right: 128px">
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
                  style="width: 100%"
              />
            </el-form-item>
            <el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存资料</el-button>
                <el-button>取消修改</el-button>
              </el-form-item>
            </el-form-item>
          </el-form>
        </div>

      </div>
    </el-card>
  </div>
</template>

<script>
import vuex from '../vuex'

export default {
  name: "ProfilePage",
  data: function () {
    return {
      user: vuex.state.user,
      profile: vuex.state.profile,
      form: {
        username: vuex.state.profile.username,
        signature: vuex.state.profile.signature,
        gender: vuex.state.profile.gender,
        birthday: vuex.state.profile.birthday
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
  background: url("../assets/profile-background.png");
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