<template>
    <div>
        <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="goBack"
        />
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
            <van-button :loading="openLoading" @click="registerAction" type="primary" size="large">快速注册</van-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {Toast} from 'vant'
import url from '@/serviceAPI.config.js'
    export default {
        data() {
            return {
                username: '',
                password: '',
                openLoading:false,//标记注册的状态
                usernameErrorMsg:'',//当用户名出现错误的时候
                passwordErrorMsg:''//当密码出现错误的时候
            }
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            registerAction(){ //注册时前端验证
                this.checkForm() && this.axiosRegisterUser()
            },
            axiosRegisterUser(){
                this.openLoading=true
                axios({
                    url:url.registerUser,
                    method:'post',
                    data:{
                        userName:this.username,
                        password:this.password
                    }
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code==200){
                        Toast.success('注册成功')
                        this.$router.push('/')
                    }else{
                        Toast.fail('注册失败')
                        this.openLoading=false
                    }
                })
                .catch(error=>{
                    Toast.fail('注册失败')
                    this.openLoading=false
                })

            },
            checkForm(){    //防空提交
                let isOk=true
                if(this.username.length<5){
                    this.usernameErrorMsg='用户名不能小于4位'
                    isOk=false
                }else{
                    this.usernameErrorMsg=''
                }
                if(this.password.length<8){
                    this.passwordErrorMsg='用户名不能小于8位'
                    isOk=false
                }else{
                    this.passwordErrorMsg=''
                }
                return isOk
            }
        }
    }
</script>

<style scoped>
.register-field{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>