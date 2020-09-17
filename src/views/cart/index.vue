<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="购物车" left-text="返回" @click-left="$router.back()" left-arrow></van-nav-bar>
    </header>
    <div class="content">
      <van-empty
        v-if="nodata"
        description="购物车空空如也"
        image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      >
        <van-button round type="danger" class="bottom-button">Go Shopping...</van-button>
      </van-empty>
      <van-swipe-cell v-else v-for="(item,index) of cartlist" :key="item.cartid">
        <van-card :price="item.price" :desc=" item.desc" :title="item.proname" class="goods-card">
          <template #num>
            <van-stepper
              v-model="item.num"
              theme="round"
              button-size="22"
              integer
              disabled-input
              @minus="updata_m(item)"
              @plus="updata_p(item)"
              @change="updata_c(item)"
            />
          </template>
          <template #thumb>
            <div>
              <van-checkbox v-model="item.flag" @click="radioChecked(item.cartid,item.flag)"></van-checkbox>
              <van-image :src="item.proimg" />
            </div>
          </template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="careDelete(item.cartid,index)"
          />
        </template>
      </van-swipe-cell>
      <van-submit-bar
        :price="totalPrice"
        :disabled="totalnum===0"
        :button-text="'提交订单('+ totalnum +')'"
        @submit="onSubmit"
      >
        <van-checkbox v-model="checked" @click="checkedAll(checked)">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  NavBar,
  Empty,
  Button,
  Card,
  SwipeCell,
  SubmitBar,
  Checkbox,
  Stepper,
  Dialog,
  Toast,
  Image as VanImage,
} from "vant";
import {
  postCartList,
  postCartDelete,
  postCartUpdata,
  postCartUpdataCheckedAll,
  postCartUpdataRadioChecked,
  postCartConfirmOrder
} from "./../../api/index";
Vue.use(Empty);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Card);
Vue.use(SwipeCell);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(Stepper);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(VanImage);
export default {
 beforeRouteEnter (to, from, next) {
  // 判断本地的登录状态
  if(localStorage.getItem('loginState')==='true'){
    console.log('false')
 next()
  }else{
    next('/login')
  }
},
  data() {
    return {
      checked: false,
      cartlist: [],
      nodata: false,
    };
  },
  computed: {
    totalnum() {
      return this.cartlist.reduce((sum, item) => {
        return item.flag ? sum + item.num : sum + 0;
      }, 0);
    },
    totalPrice() {
      return (
        this.cartlist.reduce((sum, item) => {
          return item.flag ? sum + item.num * item.price : sum + 0; //item.flag表示选中的判断
        }, 0) * 100
      ); //框架里精确到分所需要乘以一百在页面显示就是原来的价格
    },
  },
  methods: {
    radioChecked(cartid, flag) {
      //单选
      console.log(flag, "00");
      postCartUpdataRadioChecked({
        cartid,
        flag,
      }).then((res) => {
        if (res.data.code === "200") {
          Toast("更新成功");
          console.log(flag, "////");
          //  设定全选中的状态,如果点击的状态是truename就执行循环判断其他商品的状态,如果是false那么全选状态为false
          flag
            ? (this.checked = this.cartlist.every((item) => {
                return item.flag;
              }))
            : (this.checked = false);
          console.log(this.checked);
        }
      });
    },
    checkedAll(checked, item) {
      //全选
      // console.log(checked)
      postCartUpdataCheckedAll({
        userid: localStorage.getItem("userid"),
        checked,
      }).then((res) => {
        if (res.data.code === "200") {
          //更新成功
          Toast("更新成功");
          // 重新渲染前端页面
          this.cartlist.map((item) => {
            item.flag = checked;
            console.log(123);
          });
        }
      });
    },
    onSubmit() {//点击提交按钮获取选中商品的信息
      postCartConfirmOrder({//提交数据库通过userid获取用户选中的状态的商品信息
        userid:localStorage.getItem('userid'),
      
      }).then((res)=>{//执行成功跳转到确认订单页面
      console.log(res.data)
        this.$router.push('/order/'+res.data.data.time)
      })
    },
    careDelete(cartid, index) {
      Dialog.confirm({
        message: "您确定要删除此商品吗?",
      })
        .then(() => {
          // on confirm
          postCartDelete({ cartid }).then((res) => {
            Toast("删除成功");
            // 再将前端页面的也删除了
            this.cartlist.splice(index, 1);
            // 删除成功需要重新判断全选的状态
            this.checked = this.cartlist.every((item) => {
              return item.flag;
            });
            // 判断如果购物车空就显示空空如也
            if (this.cartlist.length === 0) {
              this.nodata = true;
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    updata_p(item) {
      //加更新数据数量
      postCartUpdata({
        cartid: item.cartid,
        num: item.num + 1,
      }).then((res) => {
        if (res.data.code === "200") {
          Toast("更新成功");
        }
      });
    },
    updata_m(item) {
      //减更新数据数量
      console.log(item.num);
      postCartUpdata({
        cartid: item.cartid,
        num: item.num - 1,
      }).then((res) => {
        if (res.data.code === "200") {
          Toast("更新成功");
        }
      });
    },
    updata_c(item) {
      //输入更新数据数量
      console.log(item.num);
      postCartUpdata({
        cartid: item.cartid,
        num: item.num,
      }).then((res) => {
        if (res.data.code === "200") {
          Toast("更新成功");
        }
      });
    },
  },
  created() {
    postCartList({
      userid: localStorage.getItem("userid"), //通过loaclStorage获取登录的userid
    }).then((res) => {
      if (res.data.code === "10008") {
        this.nodata = true; //显示空空如也
      } else {
        this.cartlist = res.data.data;
        console.log(res.data.data);
        this.checked = this.cartlist.every((item) => {  //点击购物车就计算全选的状态
          return item.flag;
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.custom-image .van-empty__image {
  padding-top: 1rem;

  width: 1rem;
  height: 1rem;
}
.van-card {
  padding-left: 12px;
}
.van-card__thumb {
  width: 128px;
  div {
    display: flex;
    .van-checkbox {
      width: 32px;
    }
    .van-image {
      flex: 1;
    }
  }
}
.bottom-button {
  width: 1.6rem;
  height: 0.4rem;
}
.goods-card {
  margin: 0;
}

.delete-button {
  height: 100%;
}
</style>