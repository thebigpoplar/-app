<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="确认订单" left-text="返回" @click-left="$router.back()" left-arrow></van-nav-bar>
    </header>
    <div class="content">
      <van-cell
        v-if="flag"
        icon="location-o"
        center
        :title="name+' '+tel"
        size="large"
        :label="address"
        is-link
        @click="addRegion"
      />
      <van-cell v-else icon="location-o" center title="点击添加地址" is-link @click="addRegion" />
      <van-card
        v-for="item of list"
        :key="item.orderid"
        :num="item.num"
        :price="item.price"
        :title="item.proname"
        :thumb="item.proimg"
      />
    </div>
    <van-submit-bar :price="totalizer" button-text="去支付" @submit="onSubmit" />
    <div>
      <van-action-sheet v-model="pop" title="扫码支付">
        <div class="zhifu">
          <van-image width="100" height="100" :src="image" />
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Card, Cell, SubmitBar,ActionSheet,Image as VanImage  } from "vant";
import { postConfirmPaymentData,} from "./../../api/index";
import { querDefault,payment } from "./../../api/address";

Vue.use(NavBar);
Vue.use(Card);
Vue.use(Cell);
Vue.use(SubmitBar );
Vue.use(ActionSheet );
Vue.use(VanImage );
export default {
  data() {
    return {
      list: [],
      name:'杨帆',
      tel:'17331522014',
      address:'上海市宝山区同济支路199号千锋教育',
      flag:true,
      pop:false,
      image:''
    };
  },
  computed:{
    totalizer(){
      return this.list.reduce((sum,item)=>{
        return sum + item.num * item.price
      },0)*100
    }
  },
  created() {
    postConfirmPaymentData({
      userid: localStorage.getItem("userid"),
      time: this.$route.params.time,
    }).then((res) => {
       console.log(res.data.data,'yf')
      this.list = res.data.data; //将后端查询返回给前端接收渲染
      // 再进行地址的判断,如果第一个商品有地址就用第一个商品的地址,否者就开始查询 用户的地址,如果有就显示,没有就显示flag=false
      if(this.list[0].tel.length===0){
        console.log(this.list[0],'000')
      //判断查询的结果,没有就显示flag=false
        querDefault({
        userid:localStorage.getItem('userid')
      }).then(res1=>{
        console.log(res1.data.data[0],'22222222222')
        console.log(res1.data,'22222222222')
        if(res.data.code==='200'){
          // 有默认地址就直接写入页面
          this.falg = true
          console.log(res1.data.data,'yf')
          this.name = res1.data.data[0].name
          this.tel = res1.data.data[0].tel
           if( res1.data.data[0].city=== res1.data.data[0].province){
          this.address=res1.data.data[0].city+res1.data.data[0].county+res1.data.data[0].addressDetail
        }else{
           this.address=res1.data.data[0].city+res1.data.data[0].province+res1.data.data[0].county+res1.data.data[0].addressDetail
        }
        }else{
          // 没有就显示flag=false
          this.flag = false
        }
      })
      }else{
        // 有就直接添加地址
        this.flag=true
        this.name = this.list[0].name,
        this.tel = this.list[0].tel,
        this.address = this.list[0].address

      }
      
    });
  },
  methods: {
    onSubmit(){//去支付
      this.pop=true//弹出显示支付出来二维码
      // 先获取支付的商品信息和价格
     postConfirmPaymentData({
      userid: localStorage.getItem("userid"),
      time: this.$route.params.time,
    }).then((res) => {
    payment({
            body:res.data.data.length+'件商品',
            out_trade_no:this.$route.params.time,
            total_fee:this.totalizer
          }).then(res1=>{
            this.image=res1.data.data
          })
    })
     
    },
    addRegion(){
      this.$router.push('/list/'+this.$route.params.time)
    }
  },
};
</script>

<style lang="scss" scoped>
.zhifu {
  height: 2rem;
}
</style>