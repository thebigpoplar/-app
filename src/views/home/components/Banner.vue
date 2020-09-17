<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <!-- <van-swipe-item v-for="item of bannerlist" :key="item.bannerid">
          <var-image :src="item.bannerimg"></var-image>
        </van-swipe-item> -->
        <van-swipe-item v-for="item1 of bannerlist" :key="item1.bannerid">
          <van-image :src="item1.bannerimg" />

        </van-swipe-item>
        <!-- <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item> -->
      </van-swipe>
</template>

<script>
export default {
    props:{
        bannerlist:{
            type:Array,
            required:true
        }
    }
}
</script>