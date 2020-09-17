<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="登录" left-text="返回" @click-left="$router.back()" left-arrow></van-nav-bar>
    </header>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          v-model="loginname"
          name="loginname"
          label="账号"
          placeholder="用户名/手机号"
          :rules="[{ required: true, message: '请填写用户名/手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" :disabled="!codeflig" native-type="submit">登录</van-button>
        </div>
        <van-row type="flex" justify="space-between">
  <van-col span="9">忘记密码</van-col>

  <router-link to="/register" span="9">快速注册</router-link>
</van-row>
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Form, Field, Button,Toast,Col, Row  } from "vant";
import{postUserLogin} from './../../api/index'


Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Col);
Vue.use(Row);
export default {
  data() {
    return {
      loginname: '',
      password: '',
    };
  },
  methods: {
    onSubmit(values) {
      console.log(values)
      // 点击注册时先判断前端的验证码是否一致
        postUserLogin(values).then(res=>{
          if(res.data.code==='10006'){
            Toast('用户名/手机号不存在');
          }else if(res.data.code==='10006'){
             Toast('密码错误');
          }else {
            //登录成功,将登陆成功的登录信息保存  tocken  userid  loginState---true
            localStorage.setItem('token',res.data.data.token)//保存token的值,用于判断是否登录
            localStorage.setItem('userid',res.data.data.userid) //保存userid
            localStorage.setItem('loginState',true) //
            // 登录成功返回上一级
            this.$router.back();

          } 
        })
      }
     
    
    
  },
  computed: {
    codeflig(){
      // 密码和账号的基本验证
      if(this.loginname.length >=2 && this.password.length !==0){
        return true;
      }else{
       return false;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.content{
  padding-top: 1rem;
  background-color: #fff;
}
.van-row{
  padding: 0 20px;
}

</style>
