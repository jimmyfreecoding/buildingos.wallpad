<template>
  <div>
    <div class="time">{{ time }}</div>
    <div class="date">
      {{ day }} <el-divider direction="vertical" /> {{ getWeek() }}
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
const time = ref("");
const day = ref("");
const week = ref(null);
let timer2;
const mqttstatus = ref("");
const getNowTime = () => {
  time.value = moment().format("HH:mm:");
  day.value = moment().format("MM/DD/YYYY");
  week.value = moment().day();
  mqttstatus.value = sessionStorage.getItem("mqtt");
  timer2 = setInterval(() => {
    time.value = moment().format("HH:mm");
    day.value = moment().format("MM/DD/YYYY");
    week.value = moment().day();
    mqttstatus.value = sessionStorage.getItem("mqtt");
  }, 1000);
};
onMounted(() => {
  moment.locale("zh-cn");
  getNowTime();
});
onUnmounted(() => {
  clearInterval(timer2);
});
const getWeek = () => {
  let week = moment().day();
  switch (week) {
    case 1:
      return "星期一";
    case 2:
      return "星期二";
    case 3:
      return "星期三";
    case 4:
      return "星期四";
    case 5:
      return "星期五";
    case 6:
      return "星期六";
    case 0:
      return "星期日";
  }
};
</script>

<style scoped lang="scss">
.time {
  font-size: 30px;
  font-weight: 700;
  line-height: 36px;
  text-align: right;
  color: #fff;
}
.date {
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  text-align: left;
  color: #ffffffcc;
  display: flex;
  align-items: center;
  :deep(.el-divider--vertical) {
    height: 10px;
    border-left: 1px #ffffff4d var(--el-border-style);
  }
}
</style>
