<template>
  <div class="container">
  <!-- <div class="box">
    <header class="header">Header</header>
    <div class="content">content</div>
  </div> -->

  <!-- 组件渲染视图 -->
  <router-view></router-view>
    <!-- <footer class="footer">
      <ul>
        <router-link to="/home" tag="li">
          <span class="iconfont icon-shouye"></span>
          <p>首页</p>
        </router-link>
        <router-link to="/kind" tag="li">
          <span class="iconfont icon-fenlei"></span>
          <p>分类</p>
        </router-link>
        <router-link to="/cart" tag="li">
          <span class="iconfont icon-gouwuche"></span>
          <p>购物车</p>
        </router-link>
        <router-link to="/user" tag="li">
          <span class="iconfont icon-wode"></span>
          <p>我的</p>
        </router-link>
      </ul>
    </footer> -->
    <router-view name="footer"></router-view>
  </div>

</template>

<style lang="scss">

*{padding: 0;margin: 0;list-style: none;};
html,body,.container{width: 100%;height: 100%;};
html{font-size: 26.666666666vw;} //假设设计稿是750*1334(iphone6)也就是设计师以iphone6为基准100/(750/2)*100=26.666666667vw 多写6更精准
body{font-size: 12px;}
//媒介查询,判断是否横屏显示
@media screen and (orientation: landscape) {
   html{font-size: 100px;}
}
.container{
  max-width: 640px;//最大宽度
  margin: 0 auto;//适配
  display: flex;
  flex-direction: column;

  .box{
      overflow: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    .header{
      height: 0.44rem;
      
    }
    .content{
      flex: 1;
      background-color: #efefef;
      overflow: auto;//溢出部分产生滚动条

    }
  }
  .footer{
    height: 0.5rem;
    background-color: #efefef;
   
    ul{
      display: flex;
      flex-direction: row;
      widows: 100%;
      li{
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &.router-link-exact-active.router-link-active{
          color: rgb(233, 10, 28);
        }
        span{
          margin-top: 4px;
          font-size: 26px;
          text-align: center;
        }
      }
    }

  }
}
</style>
