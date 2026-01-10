<style scoped lang="scss"> 
.bg-nav-box{
    width: 100%;
    height: 118px;
    background:#00000045;
    padding:0 270px;
    .img-box{
      width: 48px;
      height: 48px;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
    }
}
</style>
<script setup>
const emit = defineEmits(['clickChild'])
const changeTab = function(e){
  emit('clickChild',e)
}
</script>
<template>
  <div class="bg-nav-box flex-row justify-between align-center">
    <div @click="changeTab(4)" class="img-box">
      <img class="img" style="width:19px:height:39px;" src="@/assets/images/1.png"/>
    </div>
    <div @click="changeTab(1)" class="img-box">
      <img class="img" style="width:24px:height:34px;" src="@/assets/images/8.png"/>
    </div>
    <div @click="changeTab(3)" class="img-box">
      <img class="img" style="width:23.5px:height:31px;" src="@/assets/images/4.png"/>
    </div>
    <div class="img-box" style="font-size:48px;font-family: ly-regular;">
      20°
    </div>
    <div @click="changeTab(-1)" class="img-box">
      <img class="img" style="width:34.8px:height:34.8px;" src="@/assets/images/6.png"/>
      <div style="font-family:DingTalk;font-size: 15px;margin-top:12px;">自动</div>
    </div>
    <div class="img-box" style="font-size:48px;font-family: ly-regular;">
      20°
    </div>
    <div @click="changeTab(3)" class="img-box">
      <img class="img" style="width:23.5px:height:31px;"  src="@/assets/images/5.png"/>
    </div>
    <div @click="changeTab(1)" class="img-box">
      <img class="img" style="width:24px:height:34px;" src="@/assets/images/8.png"/>
    </div>
    <div @click="changeTab(4)" class="img-box">
      <img class="img" style="width:19px:height:39px;" src="@/assets/images/1.png"/>
    </div>
    
  </div>
</template>