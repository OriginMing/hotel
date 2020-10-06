<template>
  <div class="login" ref="login">
    <div class="login-content">
      <el-form :model="loginForm" ref="loginform" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click.prevent="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<!--表单的验证-->
<!--fetch,axios-->

<script>
import axios from 'axios'

import {URL} from '../lib/base'
export default {
  name: "loginIn",
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur'}]
      }
    };
  },
  methods:
      {
        handleLogin() {
          this.$refs.loginform.validate(validate => {
            if (validate) {
              
              axios.post(URL + '/admin/login/check', this.loginForm).then((res) => {
                if (res.status === 200 && res.data.code === 200) {
                  sessionStorage.setItem('token', res.data.token)
                  sessionStorage.setItem('user', JSON.stringify(res.data.user))

                  let redirect=this.$route.query.redirect || 'index';
                  this.$router.push({name: redirect})
                } else {
                  this.$message.error(res.data.msg)
                }
              }).catch(function (error) {
                console.log(error);
              })
              // console.log(this.$route);
              // this.$router.push({path: '/'})
            }
          })
        }
      }
}
</script>

<style scoped>
.login {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("../../imgs/视觉 - 21.jpg");
  background-size: 100%, 100%;

}

.login-content {
  width: 400px;
  height: auto;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 24px;
  border-radius: 10px;
}
</style>