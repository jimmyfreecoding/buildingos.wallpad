<style scoped lang="scss"> 
.tabs-nav{
    width: 680px;
    height: 60px;
    background: #272727;
    border-radius: 30px;
    position: relative;
    .img{
        position: absolute;
        margin:auto;
        top: 0;
        bottom:0;
        right:10px;
    }
}
.tabs-item{
    width: 150px;
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
    text-align: center;
    position: absolute;
    top: 0px;
    z-index: 1;
    left:0;
    font-family: DingTalk;
    font-weight: normal;
    font-size: 20px;
    color: #FFFFFF;
}
.active{
    background:#6E6E6E;
}

</style>
<script setup>
let rangess = 100
const props = defineProps({
  ranges:Array,
  num:Number,
})                
const {ranges,num} =toRefs(props)

let cha = ref(0)
cha.value = 5.3*((num.value-ranges.value[0])/(ranges.value[1]-ranges.value[0]))*100
</script>

<template>
    <div class="tabs-nav">
      <div :style="{left:cha+'px'}" class="tabs-item active" >
          {{ num }}流明
      </div>
      <img class="img" src="@/assets/images/light.png"/>
    </div>
  </template>