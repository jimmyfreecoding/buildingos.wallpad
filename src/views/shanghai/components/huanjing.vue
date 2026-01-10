<style scoped lang="scss"> 
.left-box-box{
  width: 900px;
  height: 100%;
  background: #202838;
  padding:20px 40px;
  .content{
    width:calc(100% - 40px);
    margin-left:20px;
    height: 280px;
    padding:0 24px;
    margin-bottom:20px;
    border-radius: 16px;
    background:#263041;
    .main{
      font-size: 22px;
      width: 354px;
      height: 232px;
      padding: 14px 24px;
      border-radius: 16px;
      position: relative;
      background-image: linear-gradient(112.88deg, #52647D 4.92%, #34435B 22.21%, #313F56 35.62%, #2E3B51 55.07%, #314157 74.54%);
      &::before{
        content:'';
        display: inline-block;
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        position: absolute;
        top:1px;
        left:1px;
        border-radius: 16px;
        background: linear-gradient(102.66deg, #3B475C 6.07%, #2B374A 91.4%);
      }
    }
    .dot{
      width:12px;
      height:12px;
      border-radius: 50%;
      background-color:#79D172;
      margin-right:8px;
    }
    .icon{
      width:28px;
      height:28px;
      margin-right:8px;
    }
    .font32{
      font-size: 32px;
      position: relative;
    }
    .color1{
      color:#79D172;
    }
    .bgcolor1{
      background:#79D172;
    }
    .color2{
      color:#88C271
    }
    .bgcolor2{
      background:#88C271
    }
    .color3{
      color:#C7D263
    }
    .bgcolor3{
      background:#C7D263
    }
    .color4{
      color:#79D172;
    }
    .bgcolor4{
      background:#79D172;
    }
    .title-box{
      opacity: 0.65;
    }
    .bot-box{
      opacity: 0.45;
    }
  }
}
.el-progress{
  margin-top:28px;
}

</style>
<style lang="scss">
.el-progress-bar__outer{
  overflow: visible !important;
}
.el-progress-bar{
  transform:rotate(180deg);
}
.tem .el-progress-bar__outer{
  background: linear-gradient(90deg, #EE4730 0%, #F49301 25%, #EEE73D 50%, #87DD8B 75%, #418BFB 100%)!important;
}
.tem .el-progress-bar__inner{
  background-color: rgba(61, 66, 69, 0.8)!important;
  height:6px;
  top:-1px;
}
.tem .el-progress-bar__inner::after{
  width: 6px;
  height: 6px;
  position: absolute;
  right: 0px;
  border-radius: 50%;
  top:-2px;
  border: 4px solid #fff;
}


.hun .el-progress-bar__outer{
  background: linear-gradient(90deg, #EE4730 0%, #F49301 25%, #EEE73D 50%, #87DD8B 75%, #418BFB 100%)!important;
}
.hun .el-progress-bar__inner{
  background-color: rgba(61, 66, 69, 0.8)!important;
  height:6px;
  top:-1px;
}
.hun .el-progress-bar__inner::after{
  width: 6px;
  height: 6px;
  position: absolute;
  right: 0px;
  border-radius: 50%;
  top:-2px;
  border: 4px solid #fff;
}


.qita .el-progress-bar__outer{
  background: linear-gradient(90deg, #EE4730 0%, #F49301 25%, #EEE73D 50%, #87DD8B 75%, #418BFB 100%)!important;
}
.qita .el-progress-bar__inner{
  background-color: rgba(61, 66, 69, 0.8)!important;
  height:6px;
  top:-1px;
}
.qita .el-progress-bar__inner::after{
  width: 6px;
  height: 6px;
  position: absolute;
  right: 0px;
  border-radius: 50%;
  top:-2px;
  border: 4px solid #fff;
}
.tem .el-progress-bar__outer1{
  background: linear-gradient(90deg, #418BFB 0%, #87DD8B 25%, #EEE73D 50%, #F49301 75%, #EE4730 100%)!important;
}
.hun .el-progress-bar__outer1{
  background: linear-gradient(90deg, #F9CC04 0%, #41DAFB 50%, #418BFB 100%)!important;
}
.qita .el-progress-bar__outer1{
  background: linear-gradient(90deg, #31AB83 0%, #99C86E 31%, #FDE35A 55%, #FDAB5A 68%, #D4325A 80%, #8331AB 91%, #96324C 100%)!important;
}
.el-progress-bar__inner::after{
  width: 18px;
  height: 18px;
  position: absolute;
  right: 0px;
  border-radius: 50%;
  top:-2px;
  border: 4px solid #fff;
}
</style>
<script setup>
import IndexTitle from '@/components/indexTitle.vue'
const props = defineProps({
  data:Object,
})
const airValue=(avalue,airtype)=>{
  let airValue = {
    showValue:'0',
    parcent:0,
  }
  if(airtype==='formaldehyde'){
    let sValue = (avalue*1.230).toFixed(3)
    sValue = parseFloat(sValue)
    console.info("sValue"+sValue)
    let tValue = sValue > 0.07 ? 0.07 : sValue
    console.info("tValue"+tValue)
    if(tValue == 0) {tValue = 0.001;}
    //
    // if(tValue === 0) {tValue=0.001;}
    airValue.showValue = tValue
    airValue.parcent = 100-(tValue/0.16*100)
    // console.info(airValue.parcent)
  }else if(airtype==='co2'){
    let sValue = avalue
    console.info("sValue"+sValue)
    let tValue = sValue > 800 ? 802 : sValue
    console.info("tValue"+tValue)
    airValue.showValue = tValue
    airValue.parcent = 100-(tValue/2000*100)
    // console.info(airValue.parcent)
  }else if(airtype === 'pm25'){
    let sValue = avalue
    console.info("sValue" + sValue)
    let tValue = sValue > 75 ? 75 : sValue
    console.info("tValue"+tValue)
    airValue.showValue = tValue
    airValue.parcent = 100-(tValue/400*100)
    // console.info(airValue.parcent)
  }else if(airtype === 'tvoc'){
    let sValue = (avalue*0.0023).toFixed(3)
    sValue = parseFloat(sValue)
    console.info("sValue"+sValue)
    let tValue = sValue > 0.4 ? 0.4 : sValue
    console.info("tValue"+tValue)
    if(tValue == 0) { tValue = 0.1;}
    airValue.showValue = tValue
    airValue.parcent = 100-(tValue/2*100)
    // console.info(airValue.parcent)
  }else if(airtype === 'h2s'){
    let sValue = (avalue*1.391).toFixed(3)
    console.info("sValue"+sValue)
    sValue = parseFloat(sValue)
    let tValue = sValue > 0.011 ? 0.011 : sValue
    console.info("tValue"+tValue)
    airValue.showValue = tValue
    if(tValue == 0) { tValue = 0.001;}
    airValue.parcent = 100-(tValue/0.02*100)
    console.info(airValue.showValue)
  }else if(airtype==='nh3'){
    let sValue = (avalue*0.695).toFixed(3)
    sValue = parseFloat(sValue)
    console.info("sValue"+sValue)
    let tValue = sValue > 9 ? 9.2 : sValue
    console.info("tValue"+tValue)
    if(tValue == 0) { tValue = 1;}
    airValue.showValue = tValue
    airValue.parcent = 100-(tValue/20*100)
    // console.info(airValue.parcent)
  }
  return airValue
}
</script>
<script>
export default{
  data(){
    return{
      obj:{},
      inside:{}
    }
  }
}
</script>
<template>
  <div class="left-box-box">
    <IndexTitle :title="data.obj.floor+' '+data.obj.name+' 室内外体感对比'" ></IndexTitle>
    <div class="content align-center flex-row justify-between">
      <div class="main tem flex-col justify-around">
        <div class="title-box flex-row">
          <img class="icon" src="@/assets/images/wen.png"/>
          <div>室内温度</div>
        </div>
        <div  class="font32 tem-box flex-row">
          <div>{{ (data.inside.temperature).toFixed(1) }}℃</div>
        </div>
        <el-progress color="#00000000" :percentage="100-((data.inside.temperature-1 - 16) / (36 - 16)) * 100" :show-text="false" :stroke-width="4"></el-progress>
        <div class="bot-box">
          室外温度：{{ data.outside.temperatureNum }}℃
        </div>
        
      </div>
      <div class="main hun flex-col justify-around">
        <div class="title-box flex-row">
          <img class="icon" src="@/assets/images/tem.png"/>
          <div>室内湿度</div>
        </div>
        <div  class="font32 tem-box flex-row">
          <div>{{ data.inside.humidity }}%</div>
        </div>
        <el-progress color="#00000000" :percentage="100-data.inside.humidity" :show-text="false" :stroke-width="4"></el-progress>
        <div class="bot-box">
          室外湿度：{{  data.outside.humidity }}
        </div>
        
      </div>
    </div>
    <IndexTitle :title="data.obj.floor+' '+data.obj.name+' 室内环境指标'" ></IndexTitle>
    <div class="content align-center flex-row justify-between">
      <div class="main qita flex-col justify-around">
        <div class="title-box flex-row align-center">
          <div class="dot"></div>
          <div>室内PM2.5</div>
        </div>
        <div  class="font32 tem-box flex-row">
          <div>{{ airValue(data.inside.pm25,'pm25').showValue }}<span style="letter-spacing: -4px;">μg</span> /m³</div>
          <div class="color1" style="margin-left:14px">优</div>
        </div>
        <el-progress color="#00000000" :percentage="airValue(data.inside.pm25,'pm25').parcent " :show-text="false" :stroke-width="4"></el-progress>
        <div class="bot-box">
<!--          安全范围：0～35μg/m³ -->
        </div>
        
      </div>
      <div class="main qita flex-col justify-around">
        <div class="title-box flex-row align-center">
          <div class="dot"></div>
          <div>CO₂</div>
        </div>
        <div  class="font32 tem-box flex-row">
          <div>{{ airValue(data.inside.co2,'co2').showValue }}ppm</div>
          <div class="color1" style="margin-left:14px">清新</div>
        </div>
        <el-progress color="#00000000" :percentage="airValue(data.inside.co2,'co2').parcent" :show-text="false" :stroke-width="4"></el-progress>
        <div class="bot-box">
<!--          安全范围：500～800ppm-->
        </div>
        
      </div>
    </div>
    <div class="content align-center flex-row justify-between">
      <div class="main qita flex-col justify-around">
        <div class="title-box flex-row align-center">
          <div class="bgcolor4 dot"></div>
          <div>TVOC</div>
        </div>
        <div  class="font32 tem-box flex-row">
          <div>{{( airValue(data.inside.tvoc,'tvoc').showValue)}}mg/m³</div>
<!--          <div class="color3" style="margin-left:14px">中等</div>-->
          <div class="color4" style="margin-left:14px">安全</div>
        </div>
        <el-progress color="#00000000" :percentage="airValue(data.inside.tvoc,'tvoc').parcent" :show-text="false" :stroke-width="4"></el-progress>
        <div class="bot-box">
<!--          安全范围：0～0.50ppm-->
        </div>
        
      </div>
      <div class="main qita flex-col justify-around">
        <div class="title-box flex-row align-center">
          <div class="bgcolor4 dot"></div>
          <div>甲醛</div>
        </div>
        <div class="font32 tem-box flex-row">
          <div>{{ airValue(data.inside.formaldehyde,'formaldehyde').showValue}}mg/m³</div>
          <div class="color4" style="margin-left:14px">安全</div>
        </div>
        <el-progress color="#00000000" :percentage="airValue(data.inside.formaldehyde,'formaldehyde').parcent" :show-text="false" :stroke-width="4"></el-progress>
        <div class="bot-box">
<!--          安全范围：0～0.08ppm-->
        </div>
        
      </div>
    </div>
  </div>
</template>