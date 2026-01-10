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
    智能化自动调节中，让办公更轻松
  </div>
</template>