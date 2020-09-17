<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="选择地址" left-text="返回" @click-left="$router.back()" left-arrow></van-nav-bar>
    </header>
    <div>
      <van-address-list
      v-model="chosenAddressId"
  :list="list"
  :default-tag-text="flag ? '默认':' '"
  @add="onAdd"
  @edit="onEdit"
  @select="clall"
/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar,AddressList,Toast } from "vant";
import{findAllAdd,selectAddress} from './../../api/address'

Vue.use(NavBar,);
Vue.use(AddressList);
Vue.use(Toast);

export default {
data() {
    return {
       chosenAddressId: '1',
      list: [],
      flag:true
    };
  },
  created() {
    findAllAdd({
      userid:localStorage.getItem('userid')
    }).then(res=>{
      // 查询成功
      console.log(res.data.data)
  this.list=res.data.data
  const arr =[]
      res.data.data.forEach((item,key)=>{
        if(item.city===item.province){
          item.address=item.city+item.county+item.addressDetail
          item.id=key
          // this.flag = item.isDefault?true:false
          console.log(this.flag)
        }else{
           item.address=item.city+item.province+item.county+item.addressDetail
           item.id=key
          //  this.flag = item.isDefault ? true : false
            console.log(this.flag)
        }
       arr.push(item)
      })
      console.log(arr,'123')
  this.list= arr
    })
  },
  methods: {
    clall(item){
      item.userid=localStorage.getItem('userid')
       item.time=this.$route.params.time,
      // 执行数据库请求返回数据库数据
      selectAddress(item).then(res=>{
        console.log(res.data,'101')
        this.$router.back()
      })
    },
    onAdd() {
      Toast('新增地址');
      // 跳转添加地址页面,将时间传过去
      this.$router.push('/add/'+ this.$route.params.time)
    },
    onEdit(item, index) {
      Toast('编辑地址:' + index);
    },
  },
}
</script>
