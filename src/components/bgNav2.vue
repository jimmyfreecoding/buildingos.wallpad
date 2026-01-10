<style scoped lang="scss">
.bg-nav-box{
  width: 100%;
  height: 118px;

  position: relative;
  &::after{
    position: absolute;
    content:'';
    display: inline-block;
    width:100%;
    height:100%;
    background-color:#00000045;
  }
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
let imgList = reactive([
    '/wallScreen/images/sun.png',
])
</script>
<template>
  <img @click="changeTab(4)"  class="img" style="width:320px;height:320px;" src="@/assets/images/qsj.png"/>
</template>