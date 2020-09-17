<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="添加地址" left-text="返回" @click-left="$router.back()" left-arrow></van-nav-bar>
    </header>
    <div class="content">
      <van-address-edit
        :area-list="areaList"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, AddressEdit, Toast } from "vant";
import area from "./../../utils/area";
import {writeAdd,writeConfirmationOrder} from "./../../api/address";

Vue.use(NavBar);
Vue.use(AddressEdit);
Vue.use(Toast);

export default {
  data() {
    return {
      areaList:area //地址的选择
    }
  },
  methods: {
    combine(city,province,county,addressDetail){
      let add = city===province?city+county+addressDetail:city+province+county+addressDetail
      return add
    },
    onSave(content) {
      Toast("save");
      console.log(content)
      content.userid = localStorage.getItem('userid')
      // 将新的地址写入到数据库
      writeAdd(content).then((res)=>{
        console.log(res)
        if(res.data.code==='200'){
          // 将新的数据写入到提交订单
          // console.log(this.$route.params.time)
          // console.log(this.combine(content.city,content.province,content.addressDetail))
          // userid,time,name,tel,address
          writeConfirmationOrder({
            userid:localStorage.getItem('userid'),
            time:this.$route.params.time,
            name:content.name,
            tel:content.tel,
            address:this.combine(content.city,content.province,content.county,content.addressDetail)
          }).then((res1)=>{
            this.$router.go(-2)
            //跳转到确认订单页面
           
          })

        }

      })
    },
  },
}
</script>
