<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack" />
    <div class="regiser-field">
      <van-field
        label="用户名"
        type="text"
        clearable
        required
        v-model="username"
        placeholder="请输入用户名"
        :error-message="usernameErrorMsg"
      ></van-field>
      <van-field
        label="密码"
        type="password"
        required
        v-model="password"
        placeholder="请输入密码"
        :error-message="passwordErrorMsg"
      ></van-field>
    </div>
    <div class="register-button">
      <van-button :loading="openLoading" @click="loginAction" type="primary" size="large">快速登录</van-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
import url from "@/serviceAPI.config.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false, //标记注册的状态
      usernameErrorMsg: "", //当用户名出现错误的时候
      passwordErrorMsg: "" //当密码出现错误的时候
    };
  },
  created(){
      if(localStorage.userInfo){
          Toast.success('您已登录了')
          this.$router.push('/')
      }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loginAction() {
      //注册时前端验证
      this.checkForm() && this.axiosLoginUser();
    },
    axiosLoginUser() {
      this.openLoading = true;
      axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(response => {
          new Promise((resolve, reject) => {
            localStorage.userInfo = { userName: this.username };
            setTimeout(() => {
              resolve();
            }, 500);
          }).then(() => {});
          console.log(response);
          if (response.data.code == 200 && response.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.username };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch(error => {
                Toast.fail("登录状态保存失败");
                console.log(error);
              });
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch(error => {
          Toast.fail("登录失败");
          console.log(error);
        });
    },
    checkForm() {
      //防空提交
      let isOk = true;
      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不能小于4位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password.length < 8) {
        this.passwordErrorMsg = "用户名不能小于8位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    }
  }
};
</script>

<style scoped>
.register-field {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>