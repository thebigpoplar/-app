<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="我的京东">
        <template #left>
          <van-icon name="arrow-left" color="#000" size="23" />
        </template>
        <template #right>
          <van-icon name="ellipsis" color="#000" size="28" @click="r_icon" />
        </template>
      </van-nav-bar>
      <div class="r_icon" v-show="flag">
        <div class="up"></div>
        <div class="msicon">
          <ul>
            <li>
              <van-icon name="home-o" />
              <span>首页</span>
            </li>
            <li>
              <van-icon name="apps-o" />
              <span>分类搜素</span>
            </li>
            <li>
              <van-icon name="cart-o" />
              <span>购物车</span>
            </li>
            <li>
              <van-icon name="manager-o" />
              <span>我的京东</span>
            </li>
            <li>
              <van-icon name="browsing-history-o" />
              <span class="span_last">浏览足迹</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="content">
      <div class="con_he">
        <div class="profile">
          <div class="pro_l">
            <van-image
              round
              width=".45rem"
              height=".45rem"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
          <div class="pro_c">
            <div>用户昵称</div>
            <div>
              <van-tag round type="primary">
                京享值
                <span>1000</span>
              </van-tag>
              <van-tag round type="primary">
                小白信用
                <span>100 ></span>
              </van-tag>
            </div>
          </div>
          <div class="pro_r">
            <van-icon name="setting-o" size="22" />
          </div>
        </div>
        <div class="con_bod">
          <div class="bod_l">
            <div>59</div>
            <div>商品搜藏</div>
          </div>
          <div class="bod_c">
            <div>140</div>
            <div>店铺搜藏</div>
          </div>
          <div class="bod_r">
            <div>59</div>
            <div>浏览足迹</div>
          </div>
        </div>
      </div>
      <div class="body_h">
        <van-grid :column-num="4">
          <van-grid-item icon="peer-pay" text="待付款" />
          <van-grid-item icon="debit-pay" text="待收货" />
          <van-grid-item icon="cash-on-deliver" text="退换 / 售后" />
          <van-grid-item icon="orders-o" text="全部订单" color="red" />
        </van-grid>
      </div>
      <div class="body_bod">
        <p>工具与服务</p>
      </div>
      <div class="body_gj">
        <van-grid :column-num="4" :border="false">
          <van-grid-item
            icon="https://img12.360buyimg.com/img/s70x70_jfs/t1/135809/4/7014/5528/5f35369dE8aff3fab/f4b952a87ea33ae4.png"
            text="客服服务"
          />
          <van-grid-item
            icon="https://img12.360buyimg.com/img/s70x70_jfs/t1/143427/38/5400/4413/5f350384Edba4458b/bfcb210d2110a7d8.png"
            text="我的预约"
          />
          <van-grid-item
            icon="https://img12.360buyimg.com/img/s70x70_jfs/t1/126073/34/9502/6741/5f350800Ee00c0d35/43485badf62439e9.png"
            text="高价回收"
          />
          <van-grid-item
            icon="https://img12.360buyimg.com/img/s70x70_jfs/t1/133114/37/6851/4896/5f350a40Ee99a608e/b273c57d0960f507.png"
            text="京东火车票"
          />
          <van-grid-item
            icon="https://img12.360buyimg.com/img/s70x70_jfs/t1/132818/33/6802/4632/5f350a87E52a6f93d/82551e3481c8648b.png"
            text="应用推荐"
          />
          <van-grid-item
            icon="https://img12.360buyimg.com/img/s140x140_jfs/t1/117037/39/16019/18915/5f45fff5Ef548450b/5a850b15881714e8.png"
            text="京东机票"
          />
          <van-grid-item
            icon="https://img12.360buyimg.com/img/s70x70_jfs/t1/133985/31/6910/4334/5f350addE170daf0e/5a47542d98d229d0.png"
            text="京东酒店"
          />
          <van-grid-item
            icon="https://img12.360buyimg.com/img/s70x70_jfs/t1/112188/32/14787/4956/5f3509edE376c2ddb/d716c6822cafa2b6.png"
            text="闲置换钱"
          />
        </van-grid>
      </div>
      <van-divider :style="{ color: '#999', borderColor: ' #999', padding: '0 16px' }">为您推荐</van-divider>
      <div>
        <Prolist :prolist="prolist"></Prolist>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import {getProlist} from './../../api/index'
import Prolist from './components/Prolist'
import {
  NavBar,
  Icon,
  Image as VanImage,
  Tag,
  Grid,
  GridItem,
  Divider,
} from "vant";

Vue.use(NavBar);
Vue.use(Icon);
Vue.use(VanImage);
Vue.use(Tag);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Divider);
export default {
  data() {
    return {
      flag: false,
      prolist:[]
    };
  },
  methods: {
    r_icon() {
      this.flag = !this.flag;
    },
  },
  created() {
    getProlist().then((res) => {
      console.log(res,'123');
      this.prolist = res.data.data;
    })
  },
  components:{
    Prolist
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  top: 0;
  left: 0;
  .r_icon {
    position: relative;
    top: 0;
    left: 0;
    z-index: 100;
    .up {
      position: absolute;
      right: 0.15rem;
      top: 5px;
      width: 0;
      height: 0;
      border-width: 0 6px 6px;
      border-style: solid;
      border-color: transparent transparent black;
    }
    .msicon {
      position: absolute;
      right: 0.1rem;
      top: 11px;
      border: 1px solid black;
      width: 1.25rem;
      background-color: black;
      color: white;
      border-radius: 4px;
      ul {
        li {
          font-size: 16px;
          font-weight: 500;
          height: 0.4rem;
          display: flex;
          align-items: center;
          .van-icon {
            padding-left: 4px;
            margin: 0 8px;
          }
          span {
            flex: 1;
            display: inline-block;
            height: 100%;
            display: flex;
            align-items: center;
            border-bottom: 1px solid gainsboro;
          }
            .span_last{
              border:none;
            }
         
        }

      }
    }
  }
}
.content {
  .con_he {
    background-color: goldenrod;
    .profile {
      padding: 0.1rem 0;
      padding-left: 0.2rem;
      padding-right: 0.1rem;
      display: flex;

      .pro_l {
        width: 45px;
        margin-right: 6px;
      }
      .pro_c {
        flex: 1;
        font-size: 16px;
        div {
          margin-bottom: 6px;
          .van-tag--primary {
            margin-right: 6px;
            font-size: 12px;
          }
        }
      }
      .pro_r {
        width: 30px;
      }
    }
    .con_bod {
      font-size: 14px;
      display: flex;
      justify-content: space-around;
      text-align: center;
      padding-top: 10px;
      padding-bottom: 24px;
      .bod_l {
        div {
          margin-bottom: 4px;
        }
      }
      .bod_c {
        div {
          margin-bottom: 4px;
        }
      }
      .bod_r {
        div {
          margin-bottom: 4px;
        }
      }
    }
  }
  .body_h {
    margin-top: -12px;
    .van-grid {
      border-radius: 11px;
      overflow: hidden;
    }
  }
  .body_bod {
    margin-top: 10px;
    padding: 10px 0 10px 18px;
    font-size: 14px;
    font-weight: 700;
    background-color: white;
    border-radius: 11px 11px 0 0;
    border: 1px solid #ebedf0;
  }
}
</style>