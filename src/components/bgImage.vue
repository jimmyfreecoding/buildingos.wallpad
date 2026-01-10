<style scoped lang="scss"> 
.bg-box{
  width: 1920px;
  height: 1080px;
  margin: 0 auto;
  position: relative;
  background: #000;
}
.bg-box-video{
    width: 1920px;
    height: 1080px;
    background: #000;
}
:v-deep()  .el-carousel__container{
    width:100%;height:100%
}
</style>
<script setup>
const props = defineProps({
  bgUrls: {
    type: [Object,Array],
  },
})
const {  bgUrls } =toRefs(props)
const imgList = ref(null)
watch(bgUrls,(newValue, oldValue) => {
  imgList.value = newValue
},
{
  immediate:true
})


</script>
<script>
import getAssetsFile from '../utils/util.js'
import useMqtt from '../utils/useMqtt.ts'
</script>
<template>
    <!-- 轮播图 -->
  <el-carousel
    :motion-blur="true"
    v-if="imgList.length>1" class="bg-box" :interval="10000" indicator-position="outside">
      <el-carousel-item v-for="item in imgList" :key="item">
          <el-image fit="cover" style="width:100%;height:100%" :src="item.url"/>
      </el-carousel-item>
  </el-carousel>
  <el-image v-else fit="cover" style="width:100%;height:100%" :src="imgList[0].url"/>
</template>