<template>
  <div class="box">
    <header class="header">
      <van-nav-bar :title="category" left-arrow @click-left="$router.back()" @click-right="showShare = true">
        <template #right>
          <van-icon name="ellipsis" size="22" />
        </template>
      </van-nav-bar>
      <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" />
    </header>
    <div class="content">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="(item,index) of detailbanner" :key="index" @click="prewiewImg">
          <van-image width="3.75rem" height="3.75rem" :src="item" />
        </van-swipe-item>

        <template #indicator>
          <div class="custom-indicator">{{ index + 1 }}/{{detailbanner.length}}</div>
        </template>
      </van-swipe>
      <div class="bobx">
        <div class="detail_price">
          <div class="detail_many">
            <span>¥</span>
            <strong class="detail_m_m">{{price}}</strong>.
            <span>{{num}}</span>
          </div>
          <div class="detail_left">
            销量
            <span>{{sales }}</span>
            库存
            <span>{{stock}}</span>
          </div>
        </div>
        <h2 class="proname">
          <van-tag type="danger" size="large">{{brand}}</van-tag>
          {{proname}}
        </h2>
      </div>
      <div class="dis_coupon">
        <!-- 优惠卷 -->
        <div >
          <strong>优惠</strong>
          <van-tag type="danger">满30减6</van-tag>
          <van-tag type="danger">满99减10</van-tag>
        </div>
      
        <div>
          <van-icon name="ellipsis" />
        </div>
      </div>
      <div class="dis">
        <div class="dis_select">
          <div class="dis_select_l">
            <strong>已选</strong>
            <div class="dis_select_r">
              <div class="dis_select_r_h">13.3英寸 6核R5 16G 512G 月光银，1个</div>
              <div class="dis_select_r_h_l">本商品支持保障服务、京东服务+，点击可选服务</div>
            </div>
          </div>
          <div class="dis_select_e">
            <van-icon name="ellipsis" />
          </div>
        </div>
        <div class="dis_select">
          <div class="dis_select_l">
            <strong>送至</strong>
            <div class="dis_select_r">
              <div class="dis_select_r_h">北京朝阳区三环到四环之间</div>
              <div class="dis_select_r_h_l">23:00前下单，预计明天(09月11日)送达</div>
            </div>
          </div>
          <div class="dis_select_e">
            <van-icon name="ellipsis" />
          </div>
        </div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="cart-o" @click="$router.replace('/cart')" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" @click="addCart" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import Vue from "vue";
import {
  NavBar,
  Icon,
  ShareSheet,
  Swipe,
  SwipeItem,
  Image as VanImage,
  ImagePreview,
  Tag,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Toast,


} from "vant";
import { getProDetail,postCartAddCart } from "./../../api";

Vue.use(NavBar);
Vue.use(Icon);
Vue.use(ShareSheet);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(VanImage);
Vue.use(ImagePreview);
Vue.use(Tag);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Toast);
export default {
  data() {
    return {
       show: false,
      index: 0,
      showShare: false,//分享显示
      options: [
        { name: "微信", icon: "wechat" },
        { name: "微博", icon: "weibo" },
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
      ],
      current: 0, //轮播指示器显示的当前页数
      detailbanner: [
        "http://m.360buyimg.com/mobilecms/s750x750_jfs/t1/109658/37/9072/103651/5e703dfeEd0cf219d/f84d1e93382f769a.jpg",
        "http://m.360buyimg.com/mobilecms/s843x843_jfs/t1/110771/9/613/117348/5e703d13Efad40f29/d206bbe0b6d5fb88.jpg",
        "http://m.360buyimg.com/mobilecms/s843x843_jfs/t1/86187/16/15481/43674/5e703d18E3a710b52/6b3e329d95c7fe93.jpg",
      ],
      proid:'',
      brand: '',
      category: '',
      // desc:'',
      price: 0, //价格
      proname: '',
      // rating:0,
      sales: 0, //销量
      stock: 0, //库存
      num: 0, //小数
    };
  },
  methods: {
    //加入购物成为
addCart(){
  //验证登录状态 localStorage 里存储的都是字符串
  if(localStorage.getItem('loginState')==='true'){
    // 获取账号,proid,num
    postCartAddCart({
      userid:localStorage.getItem('userid'),
      proid:this.proid,
      num:1
    }).then(()=>{//then加入购车成功执行的
  Toast('加入购物车成功');
    })

   

  }else{
    // 跳转登录页面
    this.$router.push('/login')
  }

},
    onChange(index) {
      this.index = index;
    },
    prewiewImg() {
      //图片预览
      ImagePreview({
        images: this.detailbanner,
        startPosition: this.current,
      });
    },
  },
  mounted() {
    const { proid } = this.$route.params;
    getProDetail({ proid }).then((res) => {
      console.log(res.data.data[0]);
      this.detailbanner.unshift(res.data.data[0].proimg);
      this.sales = res.data.data[0].sales;
      this.price = res.data.data[0].price;
      const many = (res.data.data[0].price * 100).toString();

      this.num = many.substring(many.length - 2);
      this.proid = res.data.data[0].proid;
      this.stock = res.data.data[0].stock;
      this.proname = res.data.data[0].proname;
      this.brand = res.data.data[0].brand;
      this.category = res.data.data[0].category;
    });
  },
};
</script>

<style lang="scss" scoped>
.van-nav-bar {
  height: 100%;
}
.content {
  overflow: auto;
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 16px;
    background: rgba(0, 0, 0, 0.1);
  }
  .bobx {
    background-color: white;
    padding: 4px 10px;
    .detail_price {
      font-size: 14px;

      display: flex;
      justify-content: space-between;

      .detail_many {
        color: #f2270c;
        .detail_m_m {
          font-size: 24px;
        }
      }
    }
  }
  .dis_coupon {
    border-radius: 8px;
    height: 0.25rem;
    line-height: 0.25rem;
    background-color: white;
    margin: 6px 0;
    padding: 2px 12px;
    display: flex;
    justify-content: space-between;
    .strong {
      margin-left: 0.3rem;
    }
    .van-tag {
      margin-left: 0.1rem;
    }
  }
  .dis {
    .dis_select {
      border-radius: 8px;
      background-color: white;
      margin: 6px 0;
      padding: 2px 12px;
      height: 0.6rem;

      display: flex;
      justify-content: space-between;
      .dis_select_l {
        display: flex;

        padding: 10px 0;
      }
      .dis_select_r {
        padding-left: 20px;
        .dis_select_r_h {
          font-size: 14px;
        }
        .dis_select_r_h_l {
          color: #8c8c8c;
          font-size: 12px;
        }
      }
      .dis_select_e {
        padding: 10px 0;
      }
    }
  }
}
</style>