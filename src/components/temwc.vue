<template>
  <div style="text-align:center">
    <div class="title"><span>{{ data.obj.floor }}</span><span  style="color:#EA791B" > 男卫</span></div>
    <div class="title-num" :style="'color:'+getColor(data.toilet)">{{ getlableText(data.toilet) }}<span style="font-size:60px;line-height: 208px;vertical-align: text-top;display:inline-block;width:0"></span></div>
    <div class="item-box flex-row align-center justify-center">
      <div class="dotcontent">
        <div class="dotrow">
<!--          <div :class="data.toilet[0].status.status==='1'?'online':'offline'"  title="传感器1" />-->
<!--          <div :class="data.toilet[1].status.status==='1'?'online':'offline'"  title="传感器2" />-->
<!--          <div :class="data.toilet[2].status.status==='1'?'online':'offline'"  title="传感器3" />-->
<!--          <div :class="data.toilet[3].status.status==='1'?'online':'offline'" title="传感器4" />-->
          <img  class="logo" v-if="data.toilet[0].status.status==='1'" src="@/assets/images/use.png"/><img class="logo" v-else src="@/assets/images/none.png"/>
          <img  class="logo" v-if="data.toilet[1].status.status==='1'" src="@/assets/images/use.png"/><img class="logo" v-else src="@/assets/images/none.png"/>
          <img  class="logo" v-if="data.toilet[2].status.status==='1'" src="@/assets/images/use.png"/><img class="logo" v-else src="@/assets/images/none.png"/>
          <img  class="logo" v-if="data.toilet[3].status.status==='1'" src="@/assets/images/use.png"/><img class="logo" v-else src="@/assets/images/none.png"/>

        </div>
      </div>
    </div>
<!--    <div class="desc">-->
<!--      <span class="txt">So2</span><span class="num">434</span>-->
<!--      <span class="txt">挥发物</span><span class="num" style="margin-right:0px">78</span>-->
<!--    </div>-->
  </div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: {}
  },
})
const getlableText = (tobj)=>{
  // return "空"
  let count = 0
  let returnText = "闲"
  tobj.forEach(function(t){
    console.info(t.status.status)
    if(t && t.status && t.status.status==='1'){
      count++
    }
  })
  if(count===0){
    returnText =  "无人"
  }
  if(count===1){
    returnText =  "空闲"
  }
  if(count===2){
    returnText = "空闲"
  }
  if(count===3){
    returnText = "空闲"
  }
  if(count===4){
    returnText = "满员"
  }
  return returnText
}
const getColor = (tobj)=>{
  let count = 0
  tobj.forEach(function(t){
    if(t && t.status && t.status.status==='1'){
      count++
    }
  })
  if(count===0){
    return "#fff"
  }
  if(count===1){
    return "#fff"
  }
  if(count===2){
    return "#fff"
  }
  if(count===3){
    return "#fff"
  }
  if(count===4){
    return "#EA791B"
  }
}
</script>
<style scoped lang="scss">
.logo{
  width: 100px;
}
.dotcontent {
  top: 100%;
}
.dotrow {
  display: flex;
  flex-direction: row;
}
.offline {
  content: '';
  border-radius: 50%;
  margin: 3px;
  width: 30px;
  height: 30px;
  background: #cccccc;
}
.online {
  content: '';
  border-radius: 50%;
  margin: 3px;
  width: 30px;
  height: 30px;
  background: #EA791B;
}
.title{
  font-family: DingTalk;
  font-weight: normal;
  font-size: 60px;
}
.title-num{
  font-family: ly-regular;
  font-weight: 400;
  font-size: 208px;
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
    font-size: 32px;
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