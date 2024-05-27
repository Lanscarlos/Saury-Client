<template>
  <div class="container">
    <el-card class="outer" :body-style="{ padding: '0px' }">
      <el-container>
        <el-aside width="30%" class="inner">
          <div class="inner-header">
            <el-avatar :size="64" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
          </div>
          <el-form :model="form" label-width="0px">
            <el-form-item>
              <el-input v-model="form.email" placeholder="邮箱">
                <template #prefix>
                  <i class="bi bi-envelope"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.password" type="password" placeholder="密码">
                <template #prefix>
                  <i class="bi bi-eye-slash"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.code" placeholder="验证码">
                <template #prefix>
                  <i class="bi bi-question-circle"></i>
                </template>
                <template #append>
                  <el-button color="#626aef" @click="requestCode">{{ cooldown <= 0 ? '获取' : cooldown }}</el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="btn-login" color="#626aef" type="primary" @click="tryLogin">开始使用</el-button>
            </el-form-item>
          </el-form>
        </el-aside>
      </el-container>
    </el-card>
  </div>
</template>

<script>
import { enc } from 'crypto-js';
import sha256 from 'crypto-js/sha256';
import { ElMessage } from "element-plus";
// import vuex from '../vuex'
// import {getCookie, setCookie} from "@/utils/cookie";

export default {
  name: "LoginPage",
  data:function(){
    return{
      cooldown: 0,
      codeDisplay: '获取',
      form: {
        email: '',
        password: '',
        code: ''
      },
    }
  },
  methods:{
    requestCode() {
      if (this.cooldown > 0) {
        return
      }

      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.form.email)) {
        ElMessage({
          showClose: true,
          message: '邮箱格式错误',
          type: 'warning',
        })
        return;
      }

      this.$axios.post(
          '/auth/requestVerificationCode',
          this.$qs.stringify({
            email: this.form.email
          })
      ).then((res) => {
        console.log(res)
        if (res.data.code === 200) {
          ElMessage({
            showClose: true,
            message: '验证码发送成功！有效时间 10 分钟',
            type: 'success',
          })
        } else {
          ElMessage({
            showClose: true,
            message: '验证码发送失败！请联系工作人员',
            type: 'error',
          })
        }
      });

      this.cooldown = 60;

      const that = this;
      const timer = setInterval(() => {
        that.cooldown--;
        if (that.cooldown <= 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
    tryLogin() {

      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.form.email) || !/^\w+$/.test(this.form.password)) {
        ElMessage({
          showClose: true,
          message: '邮箱或密码格式错误',
          type: 'warning',
        })
        return
      }

      this.$axios.post(
          '/auth/login',
          this.$qs.stringify({
            email: this.form.email,
            password: sha256(this.form.password).toString(enc.Hex),
            code: this.form.code
          })
      ).then((res) => {
        console.log(res)

        if (res.data.code !== 200) {
          ElMessage({
            showClose: true,
            message: res.data.msg,
            type: 'error',
          })
          return
        }

        // setCookie('tokenValue', res.data.data.tokenValue, 7)
        sessionStorage.setItem('tokenValue', res.data.data.tokenValue)

        ElMessage({
          showClose: true,
          message: '登录成功',
          type: 'success',
        })

        this.forwardProfile()
      })
    },
    forwardProfile() {
      console.log(sessionStorage.getItem('tokenValue'))
      this.$axios.post(
          '/profile/get',
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
            message: '资料获取失败！请联系工作人员',
            type: 'error',
          })
          return
        }

        // vuex.commit('updateUser', res.data.data)
        sessionStorage.setItem('user', JSON.stringify(res.data.data))

        this.$router.push({ name:'profile' })
      })
    }
  }
}
</script>

<style scoped>
.container {
  /*padding-left: 256px;*/
  /*padding-right: 256px;*/
}
.outer {
  background-image: url("../assets/background/9.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 20px;
}
.outer:hover {
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
}
.inner {
  padding: 200px 64px;
  background: rgba(200, 200, 200, 0.3);
  backdrop-filter: blur(5px);
}
.inner-header {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}
.btn-login, .btn-register {
  width: 100%;
}
</style>