<style scoped lang="scss"> 
.left-box-box{
  width: 722px;
  //height: 962px;
  height:1080px;
  background: #090909;
  padding:20px;
  box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
}
.color-orange{
  color:#EA791B 
}
.dongtai-txt{
  font-family: DingTalk;
  font-weight: normal;
  font-size: 20px;
  color: #FFFFFF;
  clear: both;
}

</style>
<script setup>
import cirle from '@/components/cirle.vue'
// const emit = defineEmits(['clickChild'])
// const changeTab = function(){
//   emit('clickChild',false)
// }
</script>

<template>
  <div class="left-box-box">
    <span style="width:100%;text-align: center;font-size: 42px;">杭州极氪大厦智能化<span style="color:#EA791B">L5级</span></span>
    <!-- <div @click="changeTab" class="flex-row align-center" style="width:60px;height:60px;float:right;">
      <img style="margin-top:20px;width:16px;height:16px;" src="@/assets/images/x.png"/>
    </div> -->
    <!-- <img style="width:100%;height:100%;" src="/images/L1L5.png"/> -->
  </div>
</template>