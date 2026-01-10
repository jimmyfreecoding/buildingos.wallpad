<style scoped lang="scss"> 
.wc-box{
  width:100%;
  height:100%;
  background:#1A2130;
  .content{
    width: 1760px;
    height:660px;
    border-radius: 16px;
    position: relative;
    background:#263041;
    padding:40px;
    .wc{
      width: 1080px;
      height: 459px;
    }
    .txt1{
      font-size: 32px;
      opacity: 1;
      position: relative;
      color:#fff;
      margin-top:10px;
    }
    .txt2{
      font-size: 48px;
      opacity: 1;
      color:#fff;
      position: relative;
      margin-top:30px;
    }
    .txt3{
      font-size: 32px;
      color:#fff;
      opacity: 0.5;
      position: relative;
      margin-top:10px;
    }
  }
  .border-bg{
    position: relative;
    width:456px;
    height:249px;
    border-radius: 16px;
    padding:20px;
    background-image: linear-gradient(112.88deg, #52647D 4.92%, #34435B 22.21%, #313F56 35.62%, #2E3B51 55.07%, #314157 74.54%);
    &::before{
      content:'';
      display: inline-block;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      border-radius: 16px;
      position: absolute;
      top:1px;
      left:1px;
      border-radius: transparent;
      background: linear-gradient(102.66deg, #3B475C 6.07%, #2B374A 91.4%);
    }
   
  }

}
</style>

<script>
import wc from '@/assets/images/wc.png'
export default{
  data(){
    return{
      dialogLight:false,//灯的控制弹窗显示
      dialogFankui:false,//温度反馈控制弹窗显示
      currentLight:0,//当前操作的灯的index
      dialogTxt:'确认关闭',
      lightList:[
        {name:'照明 1',status:1}, //0：关，1：开
        {name:'照明 2',status:0},
        {name:'照明 3',status:1},
        {name:'照明 4',status:1},
        {name:'过道照明 1',status:1},
        {name:'过道照明 2',status:1},
      ]
    }
  },
  methods:{
    toggleLight(index){
      this.dialogLight = true
      this.currentLight = index
      this.dialogTxt = '确认' +(this.lightList[index].status==0?'打开':'关闭') + this.lightList[index].name
    },
    setLight(){
      this.lightList[this.currentLight].status = !this.lightList[this.currentLight].status
      this.dialogLight = false
    },
  }
 
}
</script>
<template>
  <div class="wc-box">
    <div class="content">
      <div >
        <div class="border-bg">
          <div class="txt1">42F-男厕最近保洁时间</div>
          <div class="txt2">14:30</div>
          <div class="txt3">05月13日</div>
        </div>
        <div class="border-bg" style="margin-top:40px;">
          <div class="txt1">42F-男厕最近保洁时间</div>
          <div class="txt2">14:30</div>
          <div class="txt3">05月13日</div>
        </div>
      </div>
      <img :src="wc"/>
    </div>
    <div class="content1">
      <div class="border-bg">

      </div>
    </div>
  </div>
</template>