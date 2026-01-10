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
    padding-left:10px
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
<template>
  <div style="text-align:center">
    <div class="title">2<span style="color:#EA791B">2</span>区</div>
    <div class="title-num">3<span style="font-size: 80px" >.4</span><span style="font-size:60px;line-height: 208px;vertical-align: text-top;display:inline-block;width:0px">℃</span></div>
    <div class="item-box flex-row align-center  justify-center">
<!--      <img class="icon" style="width:37px;height:47px;margin:0 10px 0 20px;" src="@/assets/images/7.png"/>-->
<!--      <div class="num">{{ inside.humidity }}<span>%</span></div>-->
<!--      <img class="logo" style="width:32px;height:44px;margin:0 10px 0 40px;" src="@/assets/images/2.png"/>-->
<!--      <div class="num">{{ inside.pm25 }}</div>-->
      <div style="padding-right:5px">湿度</div><div class="num" style="padding-right:50px">3<span>%</span></div>
      <div style="padding-right:5px">PM2.5</div><div class="num">3</div>
    </div>
    <div class="desc" >
      <!--        <span class="txt">Co2</span><span class="num">{{ inside.co2 }}</span>-->
      <!--        <span class="txt">甲醛</span><span class="num">{{ inside.formaldehyde }}</span>-->
      <!--        <span class="txt">TVOC</span><span class="num" style="margin-right:0px">{{ inside.tovc }}</span>-->
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {}
  },
  inside: {
    type: Object,
    default: {}
  },
})
</script>