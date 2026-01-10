<style scoped lang="scss"> 
.cicle-box{
  width: 100%;
  height: 64px; 
  font-family: DingTalk;
  font-weight: normal;
  font-size: 20px;
  border-radius: 32px;
  border: 2px solid rgba(255,255,255,0.4);
}
</style>
<script setup>

const props = defineProps({
  titleBefore:String,
  title:String,
  titleAfter:String,
  num:[Number,String],
  per:[Number,String],
  unit:String
})                
const {title1,title2,per,unit} =toRefs(props)
</script>

<template>
  <div class="cicle-box flex-col align-center justify-center">
    <span style="color:#EA791B">{{titleBefore}}</span>{{ title }}
  </div>
</template>