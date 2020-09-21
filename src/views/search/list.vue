<template>
  <div class="box">
    <header class="header">
      <div class="he_l">
        <van-icon name="arrow-left" @click="$router.go(-2)" size="25" />
      </div>
      <div class="he_c">
        <van-search v-model="value" shape="round" background="#fff" placeholder="请输入搜索关键词" @focus="searchall" />
      </div>
      <div class="he_r"></div>
    </header>
    <div class="content">
      <van-sticky>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" @change="overall" />
          <van-dropdown-item v-model="value2" :options="option2" @change="allsales" />
          <van-dropdown-item title="筛选" ref="item">
            <van-panel title="价格">
              <div class="jiage">
                <input type="text" placeholder="最低价格" ref="input1" id="input1" />___
                <input type="text" placeholder="最高价格" ref="input2" />
              </div>
            </van-panel>
            <van-panel title="品牌">
              <div>
                <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">华为</van-tag>
                <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">iphone</van-tag>
                <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">魅族</van-tag>
                <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">vivo</van-tag>
                <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">联想</van-tag>
                <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">小米</van-tag>
                <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">oppo</van-tag>
                <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">荣耀</van-tag>
                <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">红米</van-tag>
              </div>
            </van-panel>
            <div style="padding: 5px 16px;">
              <van-button type="danger" block round @click="onConfirm">确认</van-button>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>
      </van-sticky>
      <Prolist :prolist="prolist"></Prolist>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Prolist from "./components/Prolist";
import {
  Search,
  Icon,
  Sticky,
  DropdownMenu,
  DropdownItem,
  Panel,
  Tag,
  Button,
} from "vant";
import { sameBrand,priceRange ,fuzzySearch} from "./../../api/search";

Vue.use(Search);
Vue.use(Icon);
Vue.use(Sticky);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Panel);
Vue.use(Tag);
Vue.use(Button);
export default {
  data() {
    return {
      value: this.$route.query.content,
      prolist: [], //商品详情渲染页面\
      oldlist: [],
      value1: 0,
      value2: "a",
      option1: [
        { text: "综合", value: 0 },
        { text: "价格升序", value: 1 },
        { text: "价格降序", value: 2 },
        { text: "最新上架", value: 3 },
        { text: "评价最多", value: 4 },
      ],
      option2: [
        { text: "销量", value: "a" },
        { text: "销量升序", value: "b" },
        { text: "销量降序", value: "c" },
      ],
    };
  },
  components: {
    Prolist,
  },
  created() {
    sameBrand({
      brand: this.$route.query.brand,
    }).then((res) => {
      this.prolist = res.data.data;
      this.oldlist = JSON.parse(JSON.stringify(this.prolist));
      console.log(this.oldlist, "ga");
      console.log(this.prolist, "yf");
    })
    fuzzySearch({
      content:this.$route.query.content
    }).then(res=>{
      console.log(res.data.data)
      this.prolist = res.data.data
    })
  },
  methods: {
    onSearch() {},
    searchall(){//点击搜素跳转
      this.$router.replace('/search')
    },
    onConfirm() { //筛选
      console.log(this.$refs.input1.value)
      console.log(this.$refs.input2.value)
      console.log(this.$route.query.brand)
      console.log(this.$route.query.category)
      
      priceRange({
        brand:this.$route.query.brand,
        sm:this.$refs.input1.value,
        big:this.$refs.input2.value
      }).then(res=>{
        console.log(res.data.data)
        this.prolist = res.data.data//价格区间的查询
      })
    },
    overall(value) {
      //综合的排序
      console.log(value);
      if (value === 0) {
        this.prolist = this.oldlist;
      } else if (value === 1) {
        this.prolist.sort((a, b) => {
          return b.price - a.price;
        });
      } else if (value === 2) {
        this.prolist.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (value === 3) {
        this.prolist.sort((a, b) => {
          return b.stock - a.stock;
        });
      } else if (value === 4) {
        this.prolist.sort((a, b) => {
          return b.rating - a.rating;
        });
      }
    },
    allsales(value) {
      //销量的排序
      console.log(value);
      if (value === "a") {
        this.prolist = this.oldlist;
      } else if (value === "b") {
        this.prolist.sort((a, b) => {
          return b.sales - a.sales;
        });
      } else if (value === "c") {
        this.prolist.sort((a, b) => {
          return a.sales - b.sales;
        });
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: white;
  display: flex;
  align-items: center;
  .he_l {
    margin-top: 6px;
    padding-left: 8px;
    width: 20px;
  }
  .he_c {
    flex: 1;
  }
  .he_r {
    width: 20px;
  }
}
.content {
  display: flex;
  flex-direction: column;

  .van-panel__content {
    margin-left: 45px;
    padding: 10px 0;
    .jiage {
      margin: 4px 0;
    }

    input {
      margin: 4px 6px;
      width: 1rem;
      padding: 8px;
      text-align: center;
      line-height: 14px;
    }
    .van-tag {
      margin-left: 10px;
      margin-top: 10px;
      margin-bottom: 5px;
    }
  }
}
</style>