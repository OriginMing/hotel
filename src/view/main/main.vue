<template>
  <el-container class="main-box">
<!--   <loading></loading>-->
    <el-header class="header">
      <div class="logo">
        <img :src="img" alt="">
      </div>
      <div class="nav">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">指南</el-menu-item>
          <el-submenu index="2">
            <template slot="title">用户</template>
            <el-menu-item index="2-1"> <router-link to="changepass">修改密码</router-link></el-menu-item>
            <el-menu-item index="2-2" @click="loginOut()">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu>
          <el-submenu index="1-1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">分类管理</span>
            </template>
            <el-menu-item>
              <router-link to="categoryAdd">分类添加</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link :to="{path:'categoryShow'}">分类查看</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2-1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">民宿管理</span>
            </template>
            <el-menu-item>
              <router-link to="/stayhomeadd">民宿添加</router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link :to="{path:'categoryShow'}">分类查看</router-link>
            </el-menu-item>
               <el-menu-item>
              <router-link to="/stayhomeindex">民宿查看</router-link>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: "main",

  data(){
    return{
      //img:require('../../../imgs/wunsun-logo.png')
    }
  },
  methods:{
    loginOut(){
          sessionStorage.clear();
         this.$router.push('/login');
    }
    
  }
}
</script>

<style scoped>
.el-container{
  overflow-y: auto;
}
.main-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

}

.header{
  height: 100px !important;
  position: relative;
}
.logo img{
  height: 60px;
  width: 200px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  display: flex;
  justify-content: space-between;
align-items: center;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;

}


body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>