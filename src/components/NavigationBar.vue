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

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-three-dots"></i>
              <span> 更多</span>
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">联系我们</a></li>
              <li><a class="dropdown-item" href="#">未知</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">关于我们</a></li>
            </ul>
          </li>

          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
// import { useRouter } from 'vue-router'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
  name: "NavigationBar",
  data: function () {
    return {
      search: {
        keyword: ''
      }
    }
  }
}
</script>

<style scoped>
/* 引入Bootstrap的CSS文件 */
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>