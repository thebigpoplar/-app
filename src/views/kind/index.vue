<template>
  <div class="box">
    <header class="header">
      <div class="he_l">
        <van-icon name="scan" size="25" />
      </div>
      <div class="he_c">
        <van-search
          v-model="value"
          shape="round"
          background="#fff"
          placeholder="请输入搜索关键词"
          right-icon="aim"
          @focus="classify"
        />
      </div>
      <div class="he_r">
        <van-icon name="chat-o" badge="9" size="25" />
      </div>
    </header>
    <div class="content">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item v-for="(item,index) of sortlist" :key="index" :title="item" />
      </van-sidebar>
      <div class="con_r">
        <van-grid>
          <van-grid-item
            v-for="(item,index) of brandlist"
            :key="index"
            :icon="item.logo"
            :text="item.brand"
            @click="listitem(item.brand)"
          />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Search, Icon, Sidebar, SidebarItem, Grid, GridItem } from "vant";
import { allCategories, commodityBrand } from "./../../api/search";

Vue.use(Search);
Vue.use(Icon);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Grid);
Vue.use(GridItem);
export default {
  data() {
    return {
      value: "",
      activeKey: 0,
      sortlist: [],
      brandlist: []
    };
  },
  created() {
    allCategories().then((res) => {
      this.sortlist = res.data.data; //商品分类
      commodityBrand({
        category: this.sortlist[0]
      }).then(res=>{
         this.brandlist = res.data.data;`ed`
      })
    });
  },
  methods: {
    classify() {
      //点击搜索跳转到搜素的页面
      this.$router.push("/search");
    },
    onChange(index) {
      //切换导航项时触发 index为切换导航的索引
      //  console.log(this.sortlist[index])
      commodityBrand({
        category: this.sortlist[index],
      }).then((res) => {
        this.brandlist = res.data.data;
        console.log(this.brandlist);
      });
    },
    listitem(brand) {
      this.$router.push(//跳转到详品牌的详情页面
        `/samebrand?brand=${brand}&category=${this.sortlist[this.activeKey]}`
      );
    },
  },
};
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
    margin-top: 4px;
    padding-top: 2px;
    width: 33px;
  }
}
.content {
  background-color: white;
  display: flex;
  .con_r {
    flex: 1;
  }
}
</style>