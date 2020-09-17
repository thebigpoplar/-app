<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="注册" left-text="返回" @click-left="$router.back()" left-arrow></van-nav-bar>
    </header>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="tel"
          name="tel"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field v-model="code" center clearable name="code" label="短信验证码" placeholder="请输入短信验证码">
          <template #button>
            <van-button size="small" type="primary" native-type="button" :disabled="codeflig"  @click="sendCode">{{msg}}</van-button>
          </template>
        </van-field>
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Form, Field, Button,Toast  } from "vant";
import{postUserSendCode,postUserRes} from './../../api/index'


Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);
export default {
  data() {
    return {
      username: "",
      password: "",
      tel: '',
      code: "",
      msg: '发送验证码',
      timer: null,
      time: 30,
      adminCode:''
    };
  },
  methods: {
    onSubmit(values) {
      // 点击注册时先判断前端的验证码是否一致
      if(this.adminCode!=values.code){
         Toast('验证码输入错误');
console.log(12)

      }else{
console.log(32)
        postUserRes(values).then(res=>{

          console.log(res)
           switch (res.data.code){
          case '200':
          Toast('注册成功');
          this.$router.replace('/login')
          //注册成功跳转到登录页面
          break
          case '10005':
          Toast('该手机号已被注册,请直接登录');
          break
          case '10004':
          Toast('用户名已存在');
          break
        }
        })
      }
     
    },
    sendCode() {
     
      this.timer = setInterval(()=> {
      
        this.time--;
        if (this.time === 0){
          clearInterval(this.timer);
          this.msg = "发送验证码";
          this.time=30
        } else {
          this.msg = this.time + "s后发送验证码";
        }
      }, 1000)
      postUserSendCode({
        tel:this.tel
      }).then(res=>{
        switch (res.data.code){
          case '10002':
          Toast('短信已发送');
          // 获取后端发送的验证码与前端的校验
          this.adminCode = res.data.telCode
          break
          case '10003':
          Toast('验证码发送失败,请重新发送');
          break
          case '10001':
          Toast('该手机号已被注册');
          break
        }
      })
    },
    //请求
  },
  computed: {
    codeflig(){
      if(this.tel.length != 11 || this.msg !== '发送验证码' ){
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

</style>
