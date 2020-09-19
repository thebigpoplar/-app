<template>
  <div class="box">
    <header class="header">
      <div class="he_l">
        <van-icon name="arrow-left" size="25" />
      </div>
      <div class="he_c">
        <van-search
          v-model="value"
          shape="round"
          background="#fff"
          placeholder="请输入搜索关键词"
          show-action
        >
          <template #action>
            <div @click="onSearch(value)">搜索</div>
          </template>
        </van-search>
      </div>
    </header>
    <div class="content">
      <van-panel title="最近搜素" status="删除" @click="adc">
        <div>
          <van-tag
            type="primary"
            size="large"
            color="#f7f7f7"
            text-color="#666"
            v-for="(item,index) of history"
            :key="index"
          >{{item}}</van-tag>
          <!-- <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">iphone</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">魅族</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">vivo</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">联想</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">小米</van-tag>-->
        </div>
      </van-panel>
      <van-panel title="热门搜素" status="隐藏">
        <div>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">iphone</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">魅族</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">vivo</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">联想</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">小米</van-tag>
        </div>
      </van-panel>
      <div></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Search, Icon, Panel, Tag } from "vant";

Vue.use(Search);
Vue.use(Icon);
Vue.use(Panel);
Vue.use(Tag);
export default {
  data() {
    return {
      value: "华为P40",
      history: [],
    };
  },
  created() {
    if (localStorage.getItem("history") === null) {
      //获取localStorage的历史记录写入页面
      this.history = "";
    } else {
      this.history = JSON.parse(localStorage.getItem("history"));
    }
  },

  methods: {
    adc() {
      // console.log( document.getElementsByClassName('van-panel__header-value'),'222')
      let def = document.querySelector(".van-panel__header-value");
      def.addEventListener("click", (e) => {
        console.log(e);
        if (e.target.tagName === "SPAN") {
          localStorage.removeItem("history");
        }
      });
    },
    onSearch(value) {
      console.log(value);
      // 跳转到list的页面
      // this.$router.push(`/sameBrand/?content=${value}`)
      //  console.log( localStorage.getItem('history'))  null
      if (localStorage.getItem("history") == null) {
        this.history.unshift(value);
        let objArr = JSON.stringify(this.history);
        localStorage.setItem("history", objArr);
      } else {
        if(this.history.length>=10){
            this.history.splice(this.history.length-1,)
        }
        this.history = JSON.parse(window.localStorage.getItem("history"));
        this.history.forEach((item, index) => {
          if (item === value) {
            //判断是否有重复的搜索记录,如果有就删除以前的,将新的添加到前面
            this.history.splice(index, 1);
          }
        });
        // arr1.unshift(value)
        this.history.unshift(value);
        let objArr = JSON.stringify(this.history);
        localStorage.setItem("history", objArr);
        // localStorage.setItem('history',arr1)
      }
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
    .van-search__action {
      background-color: red;
      margin-right: 10px;
      margin-left: 3px;
      padding: 0 5px;
      line-height: 26px;
      border-radius: 3px;
    }
  }
}
.content {
  background-color: white;
  .van-panel__content {
    div {
      margin: 4px 18px;
      padding: 10px 0;
      .van-tag {
        margin: 4px 3px;
      }
    }
  }
}
</style>