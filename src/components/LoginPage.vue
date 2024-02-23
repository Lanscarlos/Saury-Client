<template>
  <div class="container">
    <el-card shadow="hover">




      <template #header>
        <el-container>
          <el-aside width="128px">
            <el-avatar :size="64" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
          </el-aside>
          <el-main>
            <h1>账号登录</h1>
          </el-main>
        </el-container>
      </template>

      <el-container>
        <el-main>

          <el-form :model="form" label-width="120px">
            <el-form-item label="邮箱">
              <el-input v-model="form.email">
                <template #prefix>
                  <i class="bi bi-envelope"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password">
                <template #prefix>
                  <i class="bi bi-eye-slash"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input v-model="form.code">
                <template #prefix>
                  <i class="bi bi-question-circle"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登录</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>

      <template #footer>
        <el-button type="info">
          <i class="bi bi-github"></i>&nbsp; 使用 Github 登录
        </el-button>
        <el-button type="success">
          <i class="bi bi-box-arrow-in-right"></i>&nbsp; 立即注册
        </el-button>
      </template>
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
  padding-left: 256px;
  padding-right: 256px;
}
el-main {
  padding-right: 300px;
}
</style>