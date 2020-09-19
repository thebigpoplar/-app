<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="确认订单" left-text="返回" @click-left="click_l_h" left-arrow></van-nav-bar>
    </header>
    <div class="content">
      <div>
        <img :src="image" alt />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar,Dialog } from "vant";
import { postConfirmPaymentData } from "./../../api/index";
import { payment } from "./../../api/address";

Vue.use(NavBar);
Vue.use(Dialog);
export default {
  data() {
    return {
      list: [],
      image: "",
    };
  },
  computed: {
    totalizer() {
      return (
        this.list.reduce((sum, item) => {
          return sum + item.num * item.price;
        }, 0) * 100
      );
    },
  },
  created() {
    //去支付
    //弹出显示支付出来二维码
    // 先获取支付的商品信息和价格
    postConfirmPaymentData({
      userid: localStorage.getItem("userid"),
      time: this.$route.params.time,
    }).then((res1) => {
      console.log(res1);
      payment({
        body: res1.data.data.length + "件商品",
        out_trade_no: this.$route.params.time,
        total_fee: this.totalizer,
      }).then((res1) => {
        this.image = res1.data.data;
      });
      // payment({
      //         body:res.data.data.length+'件商品',
      //         out_trade_no:this.$route.params.time,
      //         total_fee:this.totalizer
      //       }).then(res1=>{
      //         this.image=res1.data.data
      //       })
    });
  },
  methods: {
    click_l_h() {
      Dialog.confirm({
        message: "可以去订单中心继续完成本次交易",
      })
        .then(() => {
          // on confirm
          this.$router.go(-2);
        })
        .catch(() => {
          // on cancel
        });
    },

  }

};
</script>