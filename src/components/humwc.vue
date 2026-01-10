<style scoped lang="scss">
.percentage-label{
  padding-top:10px
}
.meeting-list {
  .title {
    height: 44px;
    background: #9C9C9C;
    opacity: 0.6;
  }

  .btn {
    width: 95px;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    text-align: center;
    font-size: 20px;
    color:#fff;
    margin:0 auto;
    margin-top: 6px;
  }
  .btn-jinxingzhong{
    background: #F36604;
  }
  .btn-keyuyue{
    background: #40891F;
  }
  .btn-weikaishi{
    background: #1054D2;
  }
  .el-table{
    background-color: transparent!important;
  }
  :v-deep()  .el-table .el-table__cell{
    width:100%;
    height:100%;
    height: 44px;
    line-height: 44px;
    font-size: 22px;
    font-family: 'ly-regular';
    border-bottom:none!important;
  }
  :v-deep()  .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf{
    background: rgba(255,255,255,0);
    border-bottom:none!important;
    padding:4px 0;
    .cell{
      width:100%;
      height:100%;
      background:rgba(127, 127, 127, 0.2) ;
      height: 44px;
      line-height: 44px;
      font-size: 22px;
      font-family: "钉钉进步体",'LynkcoLight',serif!important;
    }
  }
  :v-deep()  .el-table tr::hover{
    background:rgba(127, 127, 127, 0.2)!important ;
  }
  :v-deep()  .el-table__inner-wrapper::before{
    content:'';
    background-color:rgba(127, 127, 127, 0)!important;
  }
}
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
  <div class="left-box-box">
    <!--  <div class="flex-row justify-between" style="flex-wrap: wrap;margin-top:80px;">-->
    <!--    <cirle v-for="(item,index) in list" :key="index" style="margin-bottom:18px;"-->
    <!--           :title="item.title" :desc="item.desc" :unit="item.unit">-->
    <!--    </cirle>-->
    <!--  </div>-->
    <span style='font-family: "钉钉进步体", "LynkcoLight";font-size:40px;margin-bottom: 30px;' >最近保洁时间：{{moment().format('YYYY-MM-DD')}}<span style="color:#EA791B;padding-left:20px">{{moment().subtract('hours', 1).format('HH:00')}}</span></span>
    <br/>
<!--    <span style='font-family: "钉钉进步体", "LynkcoLight";font-size:40px;margin-bottom: 30px;padding-top:80px' >今日使用频次：<span style="color:#EA791B">{{ data.toiletUseCount }}</span>次</span>-->

    <!--  <div style="text-align:center" class="meeting-list">-->
    <!--    <el-table-->
    <!--        :data="mlist"-->
    <!--        height="300"-->
    <!--        row-class-name="row-class-name"-->
    <!--        header-row-class-name="header-row-class-name"-->
    <!--        :row-style="{background: 'rgba(255,255,255,0)',color:'#fff',borderColor:'rgba(255,255,255,0)'}"-->
    <!--        :header-cell-style="{background: 'rgba(156, 156, 156)',color:'#fff', fontSsize: '22px',fontFamily: 'ly-regular'}"-->
    <!--        style="width: 100%">-->
    <!--      <template slot="empty">-->
    <!--        <span>暂无数据</span>-->
    <!--      </template>-->
    <!--      <el-table-column align="center" label="保洁时间"  width="180px" >-->
    <!--        <template #default="{ row }">-->
    <!--          {{row.startTime}}-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--      <el-table-column prop="name" align="center" label="保洁姓名" />-->
    <!--      <el-table-column prop="status" align="center" label="保洁状态" >-->
    <!--        <template #default="scope">-->
    <!--         已完成-->
    <!--        </template>-->
    <!--      </el-table-column>-->

    <!--    </el-table>-->
    <!--  </div>-->
    <el-row :span="10" style="padding-top:100px">
      <el-col :span="12" style="text-align: center">
        <el-progress :width="150" :height="150" type="dashboard"
                     stroke="red"
                     :color="tempcolors"
                     :percentage="((data.air.temperature - 16) / (32 - 16)) * 100" :stroke-width="10">
          <template #default="{ per }">
            <div class="percentage-value" style="color:white"><span style="font-size:32px;font-family: 'ly-regular'">{{ data.air.temperature }}</span><span style="font-size:14px;">°C</span></div>
            <div class="percentage-label" style="color:white">温度</div>
            <div class="percentage-label" style="color:white">{{ temp2Text(data.air.temperature) }}</div>
          </template>
        </el-progress>
      </el-col>
      <el-col :span="12" style="text-align: center">
        <el-progress :width="150" :height="150" type="dashboard"
                     stroke="red"
                     :color="humiditycolors"
                     :percentage="data.air.humidity" :stroke-width="10">
          <template #default="{ per }">
            <div class="percentage-value" style="color:white"><span style="font-size:32px;font-family: 'ly-regular'">{{ data.air.humidity }}</span><span style="font-size:14px;">%</span></div>
            <div class="percentage-label" style="color:white">湿度</div>
            <div class="percentage-label" style="color:white">{{ humidity2Text(data.air.humidity) }}</div>
          </template>
        </el-progress>
      </el-col>
      <el-col :span="12" style="text-align: center">
        <el-progress :width="150" :height="150" type="dashboard"
                     stroke="red"
                     :color="pm25colors"
                     :percentage="data.air.pm25" :stroke-width="10">
          <template #default="{ per }">
            <div class="percentage-value" style="color:white"><span style="font-size:32px;font-family: 'ly-regular'">{{ data.air.pm25 }}</span><span style="font-size:14px;">μg/m3</span></div>
            <div class="percentage-label" style="color:white">PM2.5</div>
            <div class="percentage-label" style="color:white">{{ pm25Text(data.air.pm25) }}</div>
          </template>
        </el-progress>
      </el-col>
      <el-col :span="12" style="text-align: center">
        <el-progress :width="150" :height="150" type="dashboard"
                     stroke="red"
                     :color="tvoccolors"
                     :percentage="data.air.tvoc / 224" :stroke-width="10">
          <template #default="{ per }">
            <div class="percentage-value" style="color:white"><span style="font-size:32px;font-family: 'ly-regular'">{{  (data.air.tvoc / 22400 ).toFixed(2) }}</span><span style="font-size:14px;"></span></div>
            <div class="percentage-label" style="color:white">TVOCmg/m³</div>
            <div class="percentage-label" style="color:white"> {{ data.air.tvoc / 22400 <= 0.5 ? '安全' : '超标' }}</div>
          </template>
        </el-progress>
      </el-col>
      <el-col :span="12" style="text-align: center">
        <el-progress :width="150" :height="150" type="dashboard"
                     stroke="red"
                     :color="so2colors"
                     :percentage="data.air.so2" :stroke-width="10">
          <template #default="{ per }">
            <div class="percentage-value" style="color:white"><span style="font-size:32px;font-family: 'ly-regular'">{{ data.air.so2 }}</span><span style="font-size:14px;">ppm</span></div>
            <div class="percentage-label" style="color:white">二氧化硫</div>
            <div class="percentage-label" style="color:white"> {{ data.air.so2 <= 0.3 ? '安全' : '超标' }}</div>
          </template>
        </el-progress>
      </el-col>
      <el-col :span="12" style="text-align: center">
        <el-progress :width="150" :height="150" type="dashboard"
                     stroke="red"
                     :color="nh3colors"
                     :percentage="data.air.nh3*10" :stroke-width="10">
          <template #default="{ per }">
            <div class="percentage-value" style="color:white"><span style="font-size:32px;font-family: 'ly-regular'">{{ (data.air.nh3/1).toFixed(2) }}</span><span style="font-size:14px;">ppm</span></div>
            <div class="percentage-label" style="color:white">氨气</div>
            <div class="percentage-label" style="color:white"> {{ data.air.nh3 <= 10 ? '安全' : '超标' }}</div>
          </template>
        </el-progress>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import moment from 'moment'
const tempcolors = [
  { color: '#6f7ad3', percentage: ((19 - 16) / (32 - 16)) * 100 },
  { color: '#5cb87a', percentage: ((20 - 16) / (32 - 16)) * 100 },
  { color: '#5cb87a', percentage: ((22 - 16) / (32 - 16)) * 100 },
  { color: '#5cb87a', percentage: ((24 - 16) / (32 - 16)) * 100 },
  { color: '#5cb87a', percentage: ((26 - 16) / (32 - 16)) * 100 },
  { color: '#f56c6c', percentage: ((28 - 16) / (32 - 16)) * 100 },
  { color: '#f56c6c', percentage: ((30 - 16) / (32 - 16)) * 100 },
]
const humiditycolors = [
  { color: '#f5c367', percentage: 0 },
  { color: '#5cb87a', percentage: 30 },
  { color: '#6f7ad3', percentage: 60 },
  //30-80
]
const pm25colors = [
  { color: '#f5c367', percentage: 0 },
  { color: '#5cb87a', percentage: 30 },
  { color: '#6f7ad3', percentage: 60 },
  //30-80
]
// ≤35，优；>35 且≤75，良；>75 且≤115，轻度污染；>115 且≤150，中度污染；>150 且≤250，重度污染；>250，严重污染。

const co2colors = [
  { color: '#f5c367', percentage: 0 },
  { color: '#5cb87a', percentage: 50 },
  { color: '#6f7ad3', percentage: 70 },
  //50-70
]
const so2colors = [
  { color: '#f5c367', percentage: 0 },
  { color: '#5cb87a', percentage: 30 },
]
const nh3colors = [
  { color: '#f56c6c', percentage: 60 },
  { color: '#f5c367', percentage: 40 },
  { color: '#5cb87a', percentage: 0 },
]
const noisecolors = [
  { color: '#f56c6c', percentage: 60 },
  { color: '#f5c367', percentage: 40 },
  { color: '#5cb87a', percentage: 0 },
]

const tvoccolors = [
  { color: '#5cb87a', percentage: 50 },
  { color: '#f56c6c', percentage: 100 },
  //30-80
]

const formaldehydecolors = [
  { color: '#5cb87a', percentage: 80 },
  { color: '#f56c6c', percentage: 100 },
]

const humidity2Text = (h) => {
  // 夏季：干燥<40%，适宜≥40%且≤60%，微湿>60%且≤70%，高湿>70%
  // 过渡季：干燥<30%，适宜≥30%且≤70%，高湿>70%
  // 冬季：干燥<30%，适宜≥30%且≤60%，高湿>60%
  let returnText = ''
  if (h < 30) {
    returnText = '干燥'
  } else if (h >= 30 && h <= 60) {
    returnText = '适宜'
  } else if (h > 60) {
    returnText = '高湿'
  }
  return returnText
}
const temp2Text = (t) => {
  // 夏季：<24偏冷，≥24且≤28适宜，>28偏热
  // 过渡季：<18偏冷，≥18且≤28适宜，>28偏热
  // 冬季：<18偏冷，≥18且≤24适宜，>24偏热
  let returnText = ''
  if (t < 18) {
    returnText = '偏冷'
  } else if (t >= 18 && t <= 24) {
    returnText = '适宜'
  } else if (t > 24) {
    returnText = '偏热'
  }
  return returnText
}
const pm25Text = (t) => {
  // ≤35，优；>35 且≤75，良；>75 且≤115，轻度污染；>115 且≤150，中度污染；>150 且≤250，
  let returnText = ''
  if (t <= 35) {
    returnText = '优'
  } else if (t > 35 && t <= 75) {
    returnText = '良'
  } else if (t > 75 && t <= 115) {
    returnText = '轻度污染'
  } else if (t > 115 && t <= 150) {
    returnText = '中度污染'
  } else if (t > 150 && t <= 250) {
    returnText = '重度污染'
  } else if (t > 250) {
    returnText = '污染爆表'
  }
  return returnText
}

const co2Text = (t) => {
  // ≤500，非常清新；>500 且≤800，清新；>800 且≤1000，较清新；>1000 且≤1500，较污浊；>1500 且≤2000，污浊；>2000，非常污浊。
  let returnText = ''
  if (t <= 500) {
    returnText = '非常清新'
  } else if (t > 500 && t <= 800) {
    returnText = '清新'
  } else if (t > 800 && t <= 1000) {
    returnText = '较清新'
  } else if (t > 1000 && t <= 1500) {
    returnText = '较污浊'
  } else if (t > 1500 && t <= 2000) {
    returnText = '污浊'
  } else if (t > 2000) {
    returnText = '非常污浊'
  }
  return returnText
}
const light2Text = (t) => {
  let returnText = ''
  // 参考国标关于教室的室内照度值：
  // 室内天然光设计照度不应低于450lx。
  // 依据国家标准《建筑照明设计标准》GB 50034—2004，
  // 高档办公室照度500 lx，照度设计的功率密度为15-18W/平米。
  // 英国照明工程学会关于办公室照明的照度推荐值是：
  // 500～750lx，
  // 日本办公楼照明的照度标准是：
  // 500～1500lx。
  if (t <= 450) {
    returnText = '昏暗'
  } else if (t > 450 && t <= 500) {
    returnText = '正常'
  } else if (t >500 && t <= 750) {
    returnText = '明亮'
  } else if (t > 750 && t <= 1000) {
    returnText = '光充足'
  }
  return returnText
}
const charge2Text = (t) => {
  let returnText = ''
  if (t <= 10) {
    returnText = '极低'
  } else if (t > 10 && t <= 20) {
    returnText = '低'
  } else if (t >20 && t <= 50) {
    returnText = '偏低'
  } else if (t > 50 && t <= 80) {
    returnText = '正常'
  } else if (t > 80 && t <= 100) {
    returnText = '充足'
  }
  return returnText
}

// co2: 0
// formaldehyde: 3.97
// humidity: 72
// light: 0
// nh3: 860
// online: 1
// pm10: 69
// pm25: 57
// so2: 0
// status: "on"
// tvoc: 79
const mlist = ref( [
  {
    name:'何铮',
    dept:'开发部',
    startTime:'9:00',
    endTime:'9:39',
    status:1
  },
  {
    name:'蒲江',
    dept:'开发部',
    startTime:'10:00',
    endTime:'9:39',
    status:0
  },
  {
    name:'何铮',
    dept:'开发部',
    startTime:'11:00',
    endTime:'9:39',
    status:1
  },
  {
    name:'蒲江',
    dept:'开发部',
    startTime:'12:00',
    endTime:'9:39',
    status:0
  },
])
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