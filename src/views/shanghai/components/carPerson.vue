<style scoped lang="scss"> 
.left-box-box{
  width: 100%;
  height: 100%;
  background: #090909;
  padding:20px;
  box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
}
.color-orange{
  color:#EA791B 
}
.dongtai-txt{
  font-family: DingTalk;
  font-weight: normal;
  font-size: 20px;
  color: #FFFFFF;
}
.dongtai-title{
  text-align:right;
  margin-bottom: 20px;
  margin-right:8px;
}
</style>
<script setup>
import IndexTitle from '@/components/indexTitle.vue'
import cirle from '@/components/cirle.vue'
import sliderPick from '@/components/sliderPick.vue'
const emit = defineEmits(['clickChild'])
const changeTab = function(){
  emit('clickChild',false)
}
let list = reactive(
  [
    {
      title:'342',
      desc:'进入',
    },
    {
      title:'293',
      desc:'离开',
    },
  ]
)
</script>

<template>
  <div class="left-box-box">
    <!-- <div @click="changeTab" class="flex-row align-center" style="width:60px;height:60px;float:right;">
      <img style="margin-top:20px;width:16px;height:16px;" src="@/assets/images/x.png"/>
    </div> -->
    <div style="clear:both"></div>
    <IndexTitle img="2-1" title="办公照明亮度"></IndexTitle>
    <div class="flex-row justify-between" style="flex-wrap: wrap;">
      <cirle v-for="(item,index) in list" :key="index" style="margin-bottom:18px;"
        :title="item.title" :desc="item.desc" :unit="item.unit">
      </cirle>
    </div>
    <IndexTitle img="2-1" title="实时人流" style="margin-top:20px;"></IndexTitle>

    <div class="dongtai-txt dongtai-title"><span class="color-orange">26F </span>卫生间</div>
    <sliderPick :activeName="3" :tabList="['闲','正常','忙','拥挤']" style="margin-bottom:60px"></sliderPick>

    <div class="dongtai-txt dongtai-title">餐厅 当前档口综合人流<span class="color-orange">12</span>人/小时</div>
    <sliderPick :activeName="1" :tabList="['闲','正常','忙','拥挤']" style="margin-bottom:60px"></sliderPick>

    <div class="dongtai-txt dongtai-title">停车位 <span class="color-orange">232</span>/543</div>
    <sliderPick :activeName="3" :tabList="['闲','正常','忙','拥挤']"></sliderPick>
  </div>
</template>