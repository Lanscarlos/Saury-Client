<template>
  <div class="container">
    <el-card class="outer" :body-style="{ padding: '0px' }">
      <el-container>
        <el-aside width="30%" class="inner">
          <div class="inner-header">
            <el-avatar :size="64" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
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
              <el-input v-model="form.password" placeholder="密码">
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
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="btn-login" type="primary" @click="onSubmit">登录账号</el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="btn-register">注册账号</el-button>
            </el-form-item>
          </el-form>
        </el-aside>
      </el-container>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data:function(){
    return{
      form: {
        email: '',
        password: '',
        code: ''
      },
    }
  },
  methods:{
    tryLogin(){
      // let user = this.$store.state.user
      console.log('tryLogin() ...')
      console.log(this.form.email)
      console.log(this.form.password)

      if (!/^[0-9]*$/.test(this.login.email) || !/^\w+$/.test(this.form.password)) {
        alert("格式错误，请重新输入");
        this.$router.go(0)
      } else {
        if(this.form.email !== '' && this.form.password !== ''){
          console.log('我进行了判断')
          this.$axios.post(
              '/login',
              this.$qs.stringify({
                email: this.form.email,
                password: this.form.password,
              })
          ).then((res) => {
            console.log('/login' + ' 获取成功...1')
            console.log(res.data)
            if (res.data.result){
              this.$store.commit('successLogin', res.data.user)
              this.$router.push({name:'profile'})
            }else{
              alert("账号或密码错误！请重新输入")
              this.$router.go(0)
              console.log('我重新输入了')
            }

          }).catch(function (error) {
            console.log('/login' + '获取失败...')
            console.log(error)
          })
        }else{
          alert("输入不能为空!")
          this.$router.go(0)
        }
      }
    },
  }
}
</script>

<style scoped>
.container {
  /*padding-left: 256px;*/
  /*padding-right: 256px;*/
}
.outer {
  background-image: url("../assets/background.png");
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