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
        />
      </div>
      <div class="he_r">
        <van-icon name="chat-o" badge="9" size="25" />
      </div>
    </header>
    <div class="content">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
      </van-sidebar>
      <div class="con_r">
        <van-grid>
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Search, Icon, Sidebar, SidebarItem, Grid, GridItem } from "vant";

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
    };
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
  display: flex;
  .con_r {
   flex: 1;
  }
}
</style>