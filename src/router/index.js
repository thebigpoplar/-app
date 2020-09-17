import Vue from 'vue'
import VueRouter from 'vue-router'
import Footer from '../components/Footer.vue'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)
// 定义路由的规则,将组件映射到路由,然后通过<router-view>的组件渲染视图
const routes = [
  {
    //路由的匹配是从上到下,匹配到立马停止---路由的重定向
    path:'/',
    redirect:'/home'
  },
  {
    // path:'/home',name:'Home',component: () => import (/* webpackChunkName: "base" */ '../views/home/index.vue')
    path:'/home',
    name:'Home',
    components:{
      default:() =>import (/* webpackChunkName: "base" */ '../views/home/index.vue'),
      footer:Footer
    }
  },
  {
    path:'/cart',
    name:'Cart',
    components:{ 
     default: () => import (/* webpackChunkName: "base" */ '../views/cart/index.vue'),
     footer:Footer
    }
  },
  {
    path:'/kind',
    name:'Kind',
    components:{ 
      default: () => import (/* webpackChunkName: "base" */ '../views/kind/index.vue'),
      footer:Footer
    }
  },
  {
    path:'/user',
    name:'User',
    components: {
      default: () => import (/* webpackChunkName: "base" */ '../views/user/index.vue'),
      footer:Footer
  }
  },
  {
    path:'/register',
    name:'Register',
    components:{ 
      default:() => import(/* webpackChunkName: "user" */ '../views/register/index.vue'),
     
    }
  },
  {
    path:'/detail/:proid',
    name:'Detail',
    components:{ 
      default:() => import(/* webpackChunkName: "user" */ '../views/detail/index.vue'),
     
    }
  },
  {
    path:'/login',
    name:'Login',
    components:{ 
      default:() => import(/* webpackChunkName: "user" */ '../views/login/index.vue'),
     
    }
  },
  {
    path:'/order/:time',
    name:'Order',
    components:{ 
      default:() => import(/* webpackChunkName: "order" */ '../views/order/index.vue'),
     
    }
  },
  {//选择地址路由
    path:'/list/:time',
    name:'List',
    components:{ 
      default:() => import(/* webpackChunkName: "order" */ '../views/order/list.vue'),
     
    }
  },
  {//添加地址路由
    path:'/pay/:time',
    name:'Pay',
    components:{ 
      default:() => import(/* webpackChunkName: "order" */ '../views/pay/index.vue'),
    }
  },
  {//添加去支付订单路由
    path:'/add/:time',
    name:'Add',
    components:{ 
      default:() => import(/* webpackChunkName: "order" */ '../views/order/add.vue'),
    }
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
