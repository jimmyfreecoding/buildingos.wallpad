<style scoped lang="scss"> 
.index-cicle-box{
  width: 330px;
  height: 177px;
  background: #1c1c1c;
  border-radius: 20px;
  color:#fff;
  .percentage-value{
    color:#fff;
    margin-top:15px;
    opacity: 0.6;
  }
  .percentage-label{
    color:#fff;
    margin-top:15px;
    opacity: 0.6;
  }
}
:v-deep()  .el-progress  path:first-child {
  stroke: #262626;
}
</style>
<script setup>

const props = defineProps({
  title1:String,
  title2:String,
  num:[Number,String],
  per:[Number,String],
  unit:String,
  color:{String,Number}
})                
const {title1,title2,per,unit,color} =toRefs(props)
</script>

<template>
  <div class="index-cicle-box flex-row align-center justify-center">
    <el-progress :width="150" :height="150" type="dashboard"
    stroke="red"
    :color="color"  :percentage="per" :stroke-width="10">
      <template #default="{ per }">
        <div class="percentage-value"><span style="font-size:32px;font-family: 'ly-regular'">{{ num}}</span><span style="font-size:14px;">{{unit}}</span>{{per}}</div>
        <div class="percentage-label">{{title1}}</div>
        <div class="percentage-label">{{title2}}</div>
      </template>
    </el-progress>
  </div>
</template>