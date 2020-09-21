<template>
  <div class="box">
    <header class="header">
      <div class="he_l">
        <van-icon name="arrow-left" @click="$router.back()" size="25" />
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
      <van-panel title="最近搜索" status="删除" @click="adc">
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
      <van-panel title="热门搜素" :status="yingcang" @click.stop="conceal">
        <div v-if="flag">
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="red">iphone</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="red">魅族</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="red">vivo</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">联想</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">HUAWEI</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">阿玛尼</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">sk-ll</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">DELL</van-tag>
          <van-tag type="primary" size="large" color="#f7f7f7" text-color="#666">花花公子</van-tag>
        </div>
        <div v-else>已隐藏搜索发现</div>
      </van-panel>
      <div></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Search, Icon, Panel, Tag, Dialog } from "vant";

Vue.use(Search);
Vue.use(Icon);
Vue.use(Panel);
Vue.use(Tag);
Vue.use(Dialog);
export default {
  data() {
    return {
      value: "华为P40",
      history: [],
      flag: true,
      yingcang: "隐藏",
    };
  },
  created() {
    if (localStorage.getItem("history") === null) {
      //获取localStorage的历史记录写入页面
      this.history = [];
    } else {
      this.history = JSON.parse(localStorage.getItem("history"));
    }
  },
  methods: {
    adc() {
      //点击删除历史记录
      Dialog.confirm({
        message: "确定要清空吗?",
      })
        .then(() => {
          // on confirm
          // console.log( document.getElementsByClassName('van-panel__header-value'),'222')
          let def = document.querySelector(".van-panel__header-value");
          def.addEventListener("click", (e) => {
            if (e.target.tagName === "SPAN") {
              this.history = [];
              localStorage.removeItem("history");
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    conceal() {
      //点击隐藏显示的热门
      let yc = document.querySelectorAll(".van-panel__header-value")[1];
      yc.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log("隐藏");
        if (e.target.tagName === "SPAN") {
          this.flag = !this.flag;
          if (this.yingcang === "隐藏") {
            this.yingcang = "显示";
          } else {
            this.yingcang = "隐藏";
          }
        }
      });
    },
    onSearch(value) {
      console.log(value);
      // 跳转到list的页面
      this.$router.push(`/sameBrand/?content=${value}`);
      //  console.log( localStorage.getItem('history'))  null
      if (localStorage.getItem("history") == null) {
        this.history.push(value);
        let objArr = JSON.stringify(this.history);
        localStorage.setItem("history", objArr);
      } else {
        if (this.history.length >= 10) {
          this.history.splice(this.history.length - 1, 1);
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
      margin: 0px 18px;
      padding: 10px 0;
      .van-tag {
        margin: 4px 3px;
      }
    }
  }
}
</style>