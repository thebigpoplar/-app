<template>
  <div class="box">
    <header class="header">home content</header>
    <div class="content" ref="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <Banner :bannerlist="bannerlist" />
        <Nav />
        <Ad />
      </van-pull-refresh>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="500"
      >
        <Prolist :prolist="prolist" />
      </van-list>
      <div class="backtop" @click="backtop" v-if="backTop">
        <van-icon name="back-top" size="28px" color="#cccccc" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Image as VanImage,
  List,
  PullRefresh,
  Icon,
} from "vant";
import Prolist from "./components/Prolist";
import { getBannerlist, getProlist } from "./../../api/index";
import Banner from "./components/Banner";
import Nav from "./components/Nav";
import Ad from "./components/Ad";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(List);
Vue.use(PullRefresh);
Vue.use(Icon);
export default {
  data() {
    return {
      bannerlist: [],
      prolist: [],
      loading: false,
      finished: false,
      count: 2, //一进页面为第一页,从2开始
      isLoading: false, //下拉刷新是否在刷新
      backTop: false, //返回顶部按钮
    };
  },
  methods: {

    backtop() {
      let aa = this;
      let a = setInterval(function () {
        // let b = document.getElementById("content").scrollTop;
        let b = aa.$refs.content.scrollTop;
        let c = parseInt(b - b / 10);
        // document.getElementById("content").scrollTop = c;
        aa.$refs.content.scrollTop = c;
        if (c === 0) {
          clearInterval(a);
        }
      }, 30);
    },
    onLoad() {
      this.loading = true; //加载数据中
      getProlist({
        limitnum: 10,
        count: this.count,
      }).then((res) => {
        //判断返回的数据有没有
        if (res.data.data.length === 0) {
          this.finished = true;
        } else {
          // 将新的数据和之前加载的数据进行拼接、
          this.prolist = [...this.prolist, ...res.data.data];
          this.loading = false;
          this.count++; //页码++
        }
      });
    },
    onRefresh() {
      getProlist().then((res) => {
        this.isLoading = true; //正在刷新
        this.prolist = res.data.data; //刷新到的新数据

        this.count = 2; //下拉时从第二页开始
        this.isLoading = false; //下拉刷新结束
        console.log(this.count);
      });
    },
    //触发滚动条事件,执行的返回顶部按钮显示隐藏监听事件
    scrollfun() {
      // if (document.getElementById("content").scrollTop > 450) {
      if (this.$refs.content.scrollTop > 450) {
        this.backTop = true;//显示
      } else {
        this.backTop = false;//隐藏
      }
    },
  },
  created() {
    getBannerlist().then((res) => {
      console.log(res);
      this.bannerlist = res.data.data;
    }),
      getProlist().then((res) => {
        console.log(res);
        this.prolist = res.data.data;

        //请求到列表数据开始监听滚动条的高度事件
        // document.getElementById("content").addEventListener("scroll", this.scrollfun);
        this.$refs.content.addEventListener("scroll", this.scrollfun);
      });
  },

  components: {
    Prolist,
    Banner,
    Nav,
    Ad,
  },
};
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
}
.new_people {
  display: flex;
  justify-content: center;
  padding: 8px 0;
}
.d_j_x_pzsh {
  background: -webkit-linear-gradient(left, #45caff, #1471fb);
  background: linear-gradient(90deg, #45caff, #1471fb);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 700;
  font-size: 18px;
  // line-height: 1.125rem;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.d_j_x_last {
  font-weight: 700;
  font-size: 18px;
  // line-height: 1.125rem;
  display: inline-block;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.m_r_b_m {
  background: -webkit-linear-gradient(left, #ff2a2a, #f139d2);
  background: linear-gradient(90deg, #ff2a2a, #f139d2);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 700;
  font-size: 18px;

  display: inline-block;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.backtop {
  position: fixed;
  bottom: 0.5rem;
  right: 0.05rem;
  width: 28px;
  height: 28px;
  border: 1px solid #cccccc;
  border-radius: 50%;
  background-color: white;
}
</style>