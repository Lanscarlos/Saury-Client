<template>
  <nav id="index-navbar" class="navbar navbar-expand-lg bg-body-tertiary navbar-default navbar-fixed-top">
    <div class="container-fluid">

<!--      logo-->
      <a class="navbar-brand" href="" onclick="return false"><i class="bi bi-book-half"></i></a>
      <span class="navbar-text"><strong>Saury 学习平台</strong></span>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <li class="nav-item">
            <a class="nav-link disabled">
              <el-divider direction="vertical"/>
            </a>
          </li>

          <li class="nav-item">
            <router-link class="nav-link active" to="/">
              <i class="bi bi-house"></i>
              <span> 首页</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link active" to="/recommendation">
              <i class="bi bi-stars"></i>
              <span> 推荐</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link active" to="/follow">
              <i class="bi bi-bookmark-star-fill"></i>
              <span> 关注</span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/profile">
              <i class="bi bi-person-circle"></i>
              <span> 我的</span>
            </router-link>
          </li>

          <li class="nav-item">
            <a class="nav-link disabled">
              <el-divider direction="vertical"/>
            </a>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/publish">
              <i class="bi bi-plus-circle-fill"></i>
              <span> 发布笔记</span>
            </router-link>
          </li>

          <li class="nav-item dropdown" @click="onDropdownOpen">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-three-dots"></i>
              <span> 更多</span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="nav-link" to="/stars">
                  <span class="dropdown-item">我的收藏</span>
                </router-link>
              </li>
              <li>
                <router-link class="nav-link" to="/orders">
                  <span class="dropdown-item">我的订单</span>
                </router-link>
              </li>
              <li v-show="isAdmin">
                <router-link class="nav-link" to="/admin">
                  <span class="dropdown-item">后台管理</span>
                </router-link>
              </li>
              <li>
                <router-link class="nav-link" to="/">
                  <span class="dropdown-item">联系我们</span>
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li @click="logout">
                <router-link class="nav-link" to="/">
                  <span class="dropdown-item">退出登录</span>
                </router-link>
              </li>
            </ul>
          </li>

<!--          <li class="nav-item">-->
<!--            <a class="nav-link disabled">Disabled</a>-->
<!--          </li>-->
        </ul>
        <div class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="搜索文章" aria-label="Search" v-model="keyword">
          <button class="btn btn-outline-success" @click="onSearch">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// import { useRouter } from 'vue-router'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {ElMessage} from "element-plus";

export default {
  name: "NavigationBar",
  data: function () {
    return {
      isAdmin: false,
      keyword: ''
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem('tokenValue')
      sessionStorage.removeItem('user')
      this.$router.push({ name:'login' })
    },
    onDropdownOpen() {
      const stringify = sessionStorage.getItem('user')
      if (stringify == null) {
        return
      }
      const user = JSON.parse(stringify)
      this.isAdmin = user.isAdmin
    },
    onSearch() {
      if (!this.keyword) {
        ElMessage({
          showClose: true,
          message: '请输入关键字',
          type: 'error',
        })
        return
      }

      ElMessage({
        showClose: true,
        message: '正在搜索',
        type: 'message',
      })

      this.$router.push({ name:'search', params: { keyword: this.keyword } })
    }
  }
}
</script>

<style scoped>
/* 引入Bootstrap的CSS文件 */
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>