//封装axios
import axios from 'axios'
import router from './../router'

const isDev = process.env.NODE_ENV==='development'

//自定义axios

const request = axios.create({
    // baseURL: isDev? 'http://localhost:3000/api' : 'http://2003.wudaxun.top/api',
    baseURL: isDev? '/api' : 'http://2003.wudaxun.top/api',
    timeout:6000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么 --loading效果的展示,发送用户的身份信息 toKen
    config.headers.common.token = localStorage.getItem('token')
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么  --loging的效果消失,根据用户的身份信息判断下一步的执行
    if(response.data.code==='10119'){//全局判断登录的状态
      router.push('/login')
    }

    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

//暴露
export default request