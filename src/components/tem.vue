<template>
  <div style="text-align:center">
    <div class="title-num">30<span style="font-size: 80px">.0</span><span style="font-size:60px;line-height: 208px;vertical-align: text-top;display:inline-block;width:0px">℃</span></div>
    <div class="item-box flex-row align-center justify-center">
      <div style="padding-right:5px">湿度</div><div class="num" style="padding-right:50px">{{ data.humidityNum ? parseInt(data.humidityNum) : '' }}<span>%</span></div>
      <div style="padding-right:5px">PM2.5</div><div class="num">{{ data.pm25 }}</div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {}
  },
})
</script>
<style scoped lang="scss">
.title{
  font-family: DingTalk;
  font-weight: normal;
  font-size: 60px;
}
.title-num{
  font-family: ly-regular;
  font-weight: 400;
  font-size: 308px;
  color: #FFFFFF;
}
.item-box{
  .num{
    font-family: ly-light;
    font-weight: 300;
    font-size: 60px;
    color: #FFFFFF;
  }
  .img{
    width:37.8px;
    height:47.5px;
  }
}
.desc{
  margin-top:62px;
  .txt{
    font-family: DingTalk;
    font-size: 18px;
    vertical-align: middle;
  }
  .num{
    font-family: ly-regular;
    font-size: 35px;
    margin-left:2px;
    margin-right:10px;
    vertical-align: middle;
  }
}
</style>
<script setup>
</script>