<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="选择地址" left-text="返回" @click-left="$router.back()" left-arrow></van-nav-bar>
    </header>
    <div class="dizhi" v-for="(item,index) of list" :key="index" >
      <div class="check">
<van-radio  @click="clradio"></van-radio>
      </div>
      <div class="add">
        <van-cell center  :title="item.name+' '+item.tel" size="large" :label="item.address"   />
      </div>
      <div class="ico">
<van-icon name="edit" size="20px" />
      </div>
      <!-- <van-address-list
  v-model="chosenAddressId"
  :list="list"
  default-tag-text="默认"
  @add="onAdd"
  @edit="onEdit"
  @select="pitch"
/> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar,Toast,Radio,Cell,Icon } from "vant";//AddressList
import{findAllAdd} from './../../api/address'

Vue.use(NavBar,);
// Vue.use(AddressList);
Vue.use(Toast);
Vue.use(Radio);
Vue.use(Cell);
Vue.use(Icon);

export default {
data() {
    return {
      // chosenAddressId: '1',
radio:true,
      list: [],
    };
  },
  created() {
    findAllAdd({
      userid:localStorage.getItem('userid')
    }).then(res=>{
      // 查询成功
      console.log(res.data.data)
 const arr =[]
      res.data.data.forEach((item,key)=>{
        if(item.city===item.province){
          item.address=item.city+item.county+item.addressDetail
        }else{
           item.address=item.city+item.province+item.county+item.addressDetail
        }
       arr.push(item)
      })
      console.log(arr,'123')
  this.list= arr
    })
  },
  methods: {
     clradio(){
this.radio=!(this.radio)
    },
    pitch(item,index){
      console.log(item,index)
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

<style lang="scss" scoped>
.dizhi{
  margin: 4px;
  padding-left: 14px;
  display: flex;
  justify-content: center;
  .check{
    width: 20px;
    text-align: center;
    padding-top:20px ;
  }
  .add{
    flex: 1;
  }
  .ico{
    width: 24px;
    padding-top: 20px;
    padding-right: 10px;
  }
}

</style>