<template>
 
  <div class="prolist">
     <van-image src="https://img11.360buyimg.com/jdphoto/jfs/t1/31601/22/15554/14040/5cc2a86fEbdb1098b/88174b36f85283b6.png" />
    <ul>
      <!-- 字符串拼接 -->
      <!-- <router-link  v-for="item of prolist" :key="item.proid" :to="'/detail/'+ item.proid" tag="li" > -->
      <!-- <router-link  v-for="(item,index) of prolist" :key="index" :to="{name:'Detail',params:{proid:item.proid}}" tag="li" > -->
      <li  v-for="(item,index) of prolist" :key="index"  tag="li" @click="objaa(item.proid)" >
        <div class="itemimg">
          <van-image width="1.76rem"
  height="1.76rem"
            :src="item.proimg"
          />
        </div>
        <p class="van-multi-ellipsis--l2">{{item.proname}}</p>
        <div class="pro_ico">
          <strong class="pro_m">￥{{item.price}}</strong>
          <span class="pro_ck">看相似</span>
        </div>
      </li>
  
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { Image as VanImage } from "vant";
Vue.use(VanImage);
export default {
  props:{
    prolist:{
      type:Array,
      required:true
    }
  },
  methods: {
    objaa(aaa){
      console.log(aaa)
      this.$router.push({name:'Detail',params:{proid:aaa}})
    }
  },
};
</script>
<style lang="scss" scoped>
.prolist {
  ul {
    overflow: hidden;
    li {
      width: 48%;
      height: 2.67rem;
    padding: .5%;
      float: left;
      margin: 0.5%;
      background: white;
      .pro_ico {
        padding: 0 2px;
        margin-top: 4px;
        display: flex;
        justify-content: space-between;
        .pro_m {
          color: red;
          font-size: 18px;
        }
        .pro_ck {
          display: inline-block;
          border: 1px solid black;
          padding: 2px;
          margin-top: 2px;
        }
      }
    }
  }
}
</style>