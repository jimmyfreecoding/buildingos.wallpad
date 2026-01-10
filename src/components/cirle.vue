<style scoped lang="scss"> 
.cicle-box{
  width: 330px;
  height: 177px;
  background: #1c1c1c;
  border-radius: 20px;
  color:#fff;
}
.time1{
  font-family: 'ly-regular';
  font-weight: 400;
  font-size: 60px;
  color: #FFFFFF;
}
.time2{
  font-family: DingTalk;
  font-weight: normal;
  font-size: 20px;
  color: #FFFFFF;
  margin-top:8px;
}
.color-orange{
  color:#EA791B 
}
.mini.cicle-box{
  width: 142px;
  height: 76px;
  .time1{
    font-size: 26px;
  }
  .time2{
    font-size: 10px;
    margin-top:4px;
  }
}
</style>
<script setup>

const props = defineProps({
  titleBefore:String,
  title:String,
  unit:String,
  desc:String,
  status:Number,
  mini:Boolean
})                
const {titleBefore,title,unit,txt} =toRefs(props)
</script>

<template>
  <div :class="[mini?'mini':'']" class="cicle-box flex-col align-center justify-center">
    <div class="time1" :class="[status==1?'color-orange':'']">{{title}}<span style="font-size:16px;">{{unit}}</span></div>
    <div class="time2">{{ desc }}</div>
  </div>
</template>