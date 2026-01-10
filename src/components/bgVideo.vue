<style scoped lang="scss" >
.bg-box{
  width: 1920px;
  height: 1080px;
  margin: 0 auto;
  position: relative;
}
.bg-box-video{
  width: 1920px;
  height: 1080px;
  background: #000;
  position: relative;
  z-index:0;
}
::v-deep .el-carousel__container{
  width:100%;height:100%
}
</style>
<script setup>
const props = defineProps({
  bgUrls: {
    type: Array,
  },
})
const { bgUrls } =toRefs(props)
let url =  ref(null)
watch(bgUrls,(newValue, oldValue) => {
  // console.log(555555555555,newValue)
  url.value = newValue[0].url
},
{
  immediate:true,
  deep:true
})
</script>
<template>
  <!-- 视频 -->
  <video :src="url" loop autoplay muted preload="auto"></video>
</template>