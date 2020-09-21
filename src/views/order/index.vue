<template>
  <div class="box">
    <header class="header">
      <van-nav-bar title="确认订单" left-text="返回" @click-left="click_l_h" left-arrow></van-nav-bar>
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
      <van-action-sheet v-model="pop" title="支付方式">
        <div class="zhifu">
          <div class="logo">
            <div>
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1997717252,2254669403&fm=26&gp=0.jpg" alt="">
              支付宝
              </div>
              <div @click="weixing">
                <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3865127624,3827730189&fm=26&gp=0.jpg" alt="">
                微信

            </div>
          </div>
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Card, Cell, SubmitBar,ActionSheet,Image as VanImage,Dialog  } from "vant";
import { postConfirmPaymentData,deleteCheck} from "./../../api/index";
import { querDefault, } from "./../../api/address";

Vue.use(NavBar);
Vue.use(Card);
Vue.use(Cell);
Vue.use(SubmitBar );
Vue.use(ActionSheet );
Vue.use(VanImage );
Vue.use(Dialog );
export default {
  data() {
    return {
      list: [],
      name:'',
      tel:'',
      address:'',
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
      // console.log(res,'pp')
      this.list = res.data.data; //将后端查询返回给前端接收渲染
      // 再进行地址的判断,如果第一个商品有地址就用第一个商品的地址,否者就开始查询 用户的地址,如果有就显示,没有就显示flag=false
      if(this.list[0].tel.length===0){
        console.log(this.list[0],'000')
      //判断查询的结果,没有就显示flag=false
        querDefault({
        userid:localStorage.getItem('userid')
      }).then(res1=>{
        console.log(res1.data.data.length)
        if(res1.data.data.length!==0){
          // console.log(res1,'2131')
          // 有默认地址就直接写入页面
          this.falg = true
          // console.log(res1.data.data[0].name)
          this.name = res1.data.data[0].name
          console.log(this.name)
          this.tel = res1.data.data[0].tel
           if( res1.data.data[0].city=== res1.data.data[0].province){
          this.address=res1.data.data[0].city+res1.data.data[0].county+res1.data.data[0].addressDetail
        }else{

           this.address=res1.data.data[0].city+res1.data.data[0].province+res1.data.data[0].county+res1.data.data[0].addressDetail
        }
        }else{
          console.log(1232)
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
    click_l_h(){
      Dialog.confirm({
  message: '便宜不等人,请三思而后行'
})
  .then(() => {
    // on confirm
      this.$router.back()
  })
  .catch(() => {
    // on cancel
  });
    },
    onSubmit(){//去支付
      this.pop=true//弹出显示支付出来二维码
      // 先获取支付的商品信息和价格
    //  postConfirmPaymentData({
    //   userid: localStorage.getItem("userid"),
    //   time: this.$route.params.time,
    // }).then((res) => {
    // payment({
    //         body:res.data.data.length+'件商品',
    //         out_trade_no:this.$route.params.time,
    //         total_fee:this.totalizer
    //       }).then(res1=>{
    //         this.image=res1.data.data
    //       })
    // })
     
    },
    addRegion(){
      this.$router.push('/list/'+this.$route.params.time)
      
    },
    weixing(){

       this.$router.push('/pay/'+ this.$route.params.time)
       const arr = []
       this.list.forEach(item=>{
         arr.push(item.proid)
       })
       console.log(arr)
       deleteCheck({
         userid:localStorage.getItem('userid'),
         list:arr
       }).then(res=>{
         console.log(res)
       }) //点击支付将购买的商品删除
    }
  },
};
</script>

<style lang="scss" scoped>
.zhifu {
  height: 2rem;
 .logo{
   display: flex;
   align-items: center;
   justify-content: center;
   div{
     padding-top: 40px;
     width: 50%;
     display: flex;
     flex-direction: column;
      align-items: center;
   justify-content: center;
     img{width: 50px;}
   }
 }
}
</style>