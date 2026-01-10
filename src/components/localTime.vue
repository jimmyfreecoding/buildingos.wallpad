<script setup>
import {getDate} from '@/assets/js/index'
import moment from "moment";
const props = defineProps({
  size:String
})   
const thistime = ref("")
const thisday = ref('')
const thisweek = ref('')
let timer2
const mqttstatus = ref("")
const getNowTime =() =>{
  thistime.value = moment().format("HH:mm:ss");
  thisday.value = moment().format("YYYY-MM-DD");
  thisweek.value = moment().day()
  mqttstatus.value = sessionStorage.getItem("mqtt")
  timer2 = setInterval(() => {
    thistime.value = moment().format("HH:mm:ss");
    thisday.value = moment().format("YYYY-MM-DD");
    thisweek.value = moment().day()
    mqttstatus.value = sessionStorage.getItem("mqtt")
  }, 1000);
}
onMounted(() =>{
  moment.locale('zh-cn');
  getNowTime()
})
onUnmounted(() =>{
  clearInterval(timer2)
})
const show = () =>{
  // localStorage.clear()
  // location.reload()
}
const getWeek =(date)=> { // 参数时间戳
  let week = moment().day()
  // console.info("++++++++++++++++++++++++++++++++++")
  // console.info(week)
  // console.info("++++++++++++++++++++++++++++++++++")
  switch (week) {
    case 1:
    return '星期一'
    case 2:
    return '星期二'
    case 3:
    return '星期三'
    case 4:
    return '星期四'
    case 5:
    return '星期五'
    case 6:
    return '星期六'
    case 0:
    return '星期日'
  }
}
</script>
<template>
  <div class="flex-col align-center" :class="size" >
    <div class="time" @click="show">{{ thistime }} </div>
    <div class="dotcontent flex-row align-center">
      <div>{{ thisday }}</div>
      <el-divider v-if="size!='mini'" style="margin:0 16px;" direction="vertical" />
      <div v-if="size!='mini'" >{{ getWeek(thisweek) }}</div>
      <div v-if="size!='mini'"  :class="mqttstatus" ></div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.time{
  font-size: 40px;
  line-height: 10px;
}
.dotcontent{
  margin-top:24px;
  font-size: 16px;
  opacity: 0.8;
}
.mini{
  .time{
    font-size: 20px;
    line-height: 0px;
    margin-top:8px;
  }
  .dotcontent{
    margin-top:12px;
    font-size: 14px;
  }
}
</style>