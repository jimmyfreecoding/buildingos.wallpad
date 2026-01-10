<template>
  <!-- 主屏幕 -->
  <div v-if="!(obj.type==='wc' || obj.type==='wcw')&&!isWuxiui" class="main-box flex-col animate__animated">
    <div v-if="sosAnimate" class="sos-animate"></div>
    <bgImage v-if="bgParams.type==='image'" style="position: absolute;left:0;top:0;" :bgUrls="bgParams.urls" ></bgImage>
    <bgVideo v-if="bgParams.type==='video'" style="position: absolute;left:0;top:0;" :bgUrls="bgParams.urls"></bgVideo>
    <!-- <bgVideo v-if="bgParams.type==='video'" style="position: absolute;left:0;top:0;" :bgUrls="bgParams.urls"></bgVideo> -->
    <!-- <div :class="class6" style="position: absolute;left:0;top:0;" class="bg-shdow animate__animated" ></div> -->
    <!-- <img  class="chahua" :src="chahua"/> -->

    <div style="position: absolute;top: 0;width: 100%;padding:80px 100px" class="flex-row justify-between">
      <Logo :class="class1" class="animate__animated" ref="logoCom" ></Logo>
      <LocalTime :class="class2" class="animate__animated "  ></LocalTime>
    </div>

    <div style="position: absolute;top: 160px;width: 100%;padding:80px 100px" 
         class="content flex-row justify-between">
      <div class="left flex-col justify-between">
        <IndexTitle :img="iconWen" :title="obj.floor+' '+obj.code+'区 室内'" style="opacity: 0.6;"></IndexTitle>
        <div class="flex-row align-end justify-between">
          <div class="title-num">
            <span > {{ (inside.temperature-1).toFixed(0)}} <span class="font100">.2</span></span>
            <span style="font-size:60px;line-height: 100px;vertical-align: text-top;display:inline-block;width:0px">℃</span>
          </div>
          <el-divider direction="vertical" style="marginLeft:80px;width:20px;opacity:0.8;height:125px;position:relative;bottom:30px;color:red"/>
          <div style="flex:1">
            <IndexTitle :img="iconTem" title="湿度"></IndexTitle>
            <div class="title-num1">{{ inside.humidity }}% <span style="color:#2AD4F9;margin-left:10px">舒适</span></div>
          </div>
        </div>
        <div class="flex-row" style="gap:20px">
          <div class="zhibiao shadow">
            <div class="title-box flex-row align-center  justify-between">
              <div class="flex-row align-center">
                <div class="dot bgcolor1"></div>
                <div>甲醛</div>
              </div>
              <div class="color1" style="margin-left:14px">安全</div>
            </div>
            <el-progress color="#00000000" :percentage="(100 - inside.formaldehyde * 1000)"  :stroke-width="4">
              <div text style="color:rgba(255,255,255,0.4);text-align: right;">{{ inside.formaldehyde }}</div>
            </el-progress>
          </div>
          <div class="zhibiao shadow">
            <div class="title-box flex-row align-center  justify-between">
              <div class="flex-row align-center">
                <div class="dot bgcolor2"></div>
                <div>CO₂</div>
              </div>
              <div class="color2" style="margin-left:14px">清新</div>
            </div>
            <el-progress color="#00000000" :percentage="100-inside.co2/20"  :stroke-width="4">
              <div text style="color:rgba(255,255,255,0.4);text-align: right;">{{ inside.co2 }}</div>
            </el-progress>
          </div>
          <div class="zhibiao shadow">
            <div class="title-box flex-row align-center  justify-between">
              <div class="flex-row align-center">
                <div class="dot bgcolor1"></div>
                <div>PM2.5</div>
              </div>
              <div class="color1" style="margin-left:14px">优</div>
            </div>
            <el-progress color="#00000000" :percentage="100-(inside.pm25/250) * 100"  :stroke-width="4">
              <div text style="color:rgba(255,255,255,0.4);text-align: right;">{{ inside.pm25 }}</div>
            </el-progress>
          </div>
        </div>
      </div>
      <img class="bg-line" :src="bgLine"/>
      <div class="right  flex-col justify-between">
        <IndexTitle  :img="iconWen"  title="室外" style="opacity: 0.6;"></IndexTitle>
        <div class="flex-row align-end">
          <div class="title-num">{{ outside.temperatureNum}}<span class="font100">.2</span><span style="font-size:60px;line-height: 100px;vertical-align: text-top;display:inline-block;width:0px">℃</span></div>
          <div style="flex:1">
            <div class="title-num1">{{ outside.today }}</div>
          </div>
        </div>
        <div class="flex-row" style="gap:20px">
          <div class="zhibiao shadow">
            <div class="title-box flex-row align-center  justify-between">
              <div class="flex-row align-center">
                <div class="dot bgcolor2"></div>
                <div>AQI</div>
              </div>
              <div class="color2" style="margin-left:14px">清新</div>
            </div>
            <el-progress color="#00000000" :percentage="100-outside.AIQ"  :stroke-width="4">
              <div text style="color:rgba(255,255,255,0.4);text-align: right;">{{ outside.AIQ }}</div>
            </el-progress>
          </div>
          <div class="zhibiao shadow">
            <div class="title-box flex-row align-center  justify-between">
              <div class="flex-row align-center">
                <div class="dot bgcolor1"></div>
                <div>PM2.5</div>
              </div>
              <div class="color1" style="margin-left:14px">优</div>
            </div>
            <el-progress color="#00000000" :percentage="100-(outside.pm25/100) * 100"  :stroke-width="4">
              <div text style="color:rgba(255,255,255,0.4);text-align: right;">{{ outside.pm25 }}</div>
            </el-progress>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-tab">
      <div @click="showIndex(0)" class="bottom-all flex-row justify-center align-center">
          <img class="icon" :src="tabAll"/>
          <div>全部</div>
        </div>
      <div class="bottom-box flex-row align-center justify-around">
        <div @click="showIndex(0)" class="flex-row justify-center">
          <img class="icon" :src="iconfw"/>
          <div>行政服务</div>
        </div>
        <el-divider style="flex:0 0 1px" direction="vertical"  />
        <div @click="showIndex(2)" class="flex-row justify-center">
          <img class="icon" src="@/assets/images/iconzm.png"/>
          <div>照明空调 </div>
        </div>
        <el-divider style="flex:0 0 1px" direction="vertical" />
        <div @click="showIndex(1)" class="flex-row justify-center">
          <img class="icon" src="@/assets/images/iconhj.png"/>
          <div>室内环境 </div>
        </div>
        <el-divider style="flex:0 0 1px" direction="vertical" />
        <div @click="showIndex(3)" class="flex-row justify-center">
          <img class="icon" src="@/assets/images/iconkj.png"/>
          <div>空间使用 </div>
        </div>
      </div>
      <div @click="dialogSOS=true" class="bottom-soc flex-row justify-center align-center">
        <img class="icon" :src="iconSos1"/>
        <div>SOS</div>
      </div>
    </div>

    <div class="chahua">
      <img  class="img" :src="chahua"/>
      <div class="txt">
        <div>有点热！</div>
        <div>轻轻君智能调温中~</div>
      </div>
      <!-- <img  class="img" :src="chahua"/>
      <div class="txt" style="margin-left:6px">全天候温度、空气智能调节中~</div> -->
    </div>

    <div v-if="sosAnimate" class="sos-jinling">
      <div class="txt1">紧急呼叫中！安保人员正在前往此楼层</div>
      <div class="txt2"></div>
    </div>
    <!-- 功能弹出层 -->
    <el-drawer
      append-top-body
        v-model="drawer"
        :modal="false"
        direction="btt"
        :show-close="false"
        :with-header="false"
        class="cus-drawer"
        size="100%"
        :z-index="2"
    >
      <div class="index-box flex-row">
        <div v-if="sosAnimateDia" class="sos-animate"></div>
        <leftNav :style="(tabIndex===0 || tabIndex==4)?'width:220px;z-index:3':'width:1220px;z-index:3'" :active="tabIndex" @clickChild="navFun" :data ="{obj:obj}"></leftNav>
        <div style="width:calc(100% - 220px);height:100%;background: #090909;z-index:3;position: relative;left:-1px">
          <service v-if="tabIndex===0&&!sosAnimateDia" @childFun="dialogSOS = true" :data = "{obj:obj}"></service>
          <serviceGaojing v-if="tabIndex===0&&sosAnimateDia" :data = "{obj:obj}"></serviceGaojing>
          <huanjing v-if="tabIndex===1" :data = "{obj:obj,inside:inside,outside:outside}"></huanjing>
          <zhaoming v-if="tabIndex===2" ref="zhaomingPanel" :data="{obj:obj,lightobj:lightobj,acobj:acobj,inside:inside}"></zhaoming>
          <roomUse v-if="tabIndex===3"  :data = "{obj:obj,roomoSensorObj:roomoSensorObj,wcmanStatusObj:wcmanStatusObj,wcwomanStatusObj:wcwomanStatusObj}"></roomUse>
<!--          <energyUse v-if="tabIndex===4" :data = "data"></energyUse>-->
          <intelligent v-if="tabIndex===4" :data = "data"></intelligent>
        </div>
<!--         <maps style="z-index:2;flex:1;-webkit-flex:1;" ref="mapPanel" :tabIndex="tabIndex" :data = "data" @clickChild="clickEven"></maps>-->
        <div v-show="tabIndex===1 || tabIndex===2 || tabIndex===3"  style="width:810px;height:100%!important;background: #090909;z-index:2;flex:1;-webkit-flex:1;position: relative;left:-2px">
<!--          <div id="mapId" style="height:800px!important;width:750px!important;position:relative!important;z-index:2" ></div>-->
          <img :src="map42"  style="top:200px;width:800px;background: #090909;z-index:2;flex:1;-webkit-flex:1;position: relative;"/>
        </div>

      </div>
    </el-drawer>

  </div>
  <!-- 厕所屏幕 -->
  <div v-if="obj.type==='wc' || obj.type==='wcw'" class="main-box flex-col animate__animated wc">
    <div style="position: absolute;top: 0;width: 100%;padding:80px 100px;z-index:1" class="flex-row justify-between">
      <Logo :class="class1" class="animate__animated" ref="logoCom" ></Logo>
      <LocalTime :class="class2" class="animate__animated "  ></LocalTime>
    </div>
    <div class="wc-box flex-col align-center">
      <div class="content flex-row align-center" >
        <div class="left-box flex-col justify-between">
          <div class="border-bg">
            <div class="txt1">{{obj.type ==='wc'?'':''}}最近保洁时间</div>
            <div class="txt2">{{ baojie.endTime.split(" ")[1] }}</div>
            <div class="txt3">{{ baojie.endTime.split(" ")[0] }}</div>
          </div>
          <div class="border-bg" style="">
            <div class="txt1">其他楼层</div>
            <div class="txt4 flex-row align-center justify-between">
              <div>{{parseInt(obj.floor.substring(0,obj.floor.length-1))+1}}F-空闲：5</div>
              <div class="flex-row align-center">
                <div class="flex-row align-center">
                  <div class="weizhi"></div>
                  <div class="weizhi"></div>
                  <div class="weizhi"></div>
                  <div class="weizhi"></div>
                </div>
                <el-divider direction="vertical"/>
                <div class="weizhi"></div>
              </div>
            </div>
            <el-divider />
            <div class="txt4 flex-row align-center justify-between">
              <div>{{ parseInt(obj.floor.substring(0,obj.floor.length-1))-1 }}F-空闲：5</div>
              <div class="flex-row align-center">
                <div class="flex-row align-center">
                  <div class="weizhi"></div>
                  <div class="weizhi"></div>
                  <div class="weizhi"></div>
                  <div class="weizhi"></div>
                </div>
                <el-divider direction="vertical"/>
                <div class="weizhi"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-box flex-row align-center justify-center" style="flex:1;text-align:center">
          <img class="bg-liudong" :src="bgWC" />
        <!--        <img style="" class="bg" :src="wc"/>-->
        <div class="flex-col align-center">
          <div class="txt1">{{obj.floor}}{{obj.type ==='wc'?'':''}}</div>
          <div v-if="obj.type ==='wc'" class="txt4 flex-row align-center justify-center" >
            <div class="flex-row align-center">
              <div class="flex-row align-center">
                <template v-for="(item,index) in wcmanStatusObj">
                <div  v-if="index>0 && index<8 && (wcmanStatusObj[index]===0 || wcmanStatusObj[index]===1)" :class="wcmanStatusObj[index]===0?'weizhi':'weizhi-active'"  ></div>
                </template>
               <!-- <div class="weizhi weizhi-margin" ></div>
               <div class="weizhi weizhi-margin" ></div>
               <div class="weizhi weizhi-margin" ></div> -->
              </div>
              <el-divider direction="vertical"/>
              <div v-if="wcmanStatusObj[9]===0" :class="wcmanStatusObj[9]===0?'weizhi weizhi-margin':'weizhi-active weizhi-margin'"  ></div>

                           <!-- <div class="weizhi-active weizhi-margin" ></div> -->
            </div>
          </div>


          <div  v-if="obj.type ==='wcw'" class="txt4 flex-row align-center justify-center">
            <div class="flex-row align-center">
              <div class="flex-row align-center" >
                <template v-for="(item,index) in wcwomanStatusObj">
                  <div  v-if="index>0 && index<8 && wcwomanStatusObj[index]===0" :class="wcwomanStatusObj[index]===0?'weizhi weizhi-margin':'weizhi-active weizhi-margin'"  ></div>
                </template>
                               <!-- <div class="weizhi weizhi-margin" ></div>
                               <div class="weizhi weizhi-margin" ></div>
                               <div class="weizhi weizhi-margin" ></div> -->
              </div>
              <el-divider direction="vertical"/>
              <div v-if="wcwomanStatusObj[9]===0" :class="wcwomanStatusObj[9]===0?'weizhi weizhi-margin':'weizhi-active weizhi-margin'"   ></div>

                           <!-- <div class="weizhi-active weizhi-margin" ></div> -->
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="content1 flex-row align-center">
        <div class="border-bg zhibiao" >
            <div class="title-box flex-row align-center  justify-between">
              <div class="flex-row align-center">
                <div class="dot bgcolor1"></div>
                <div>温度</div>
              </div>
              <div class="color1" style="margin-left:14px">舒适</div>
            </div>
            <el-progress color="#00000000" :percentage="((toiletAir.temperature - 16) / (36 - 16)) * 100"  :stroke-width="4">
              <div text style="font-size:32px;color:rgba(255,255,255,1);text-align: right;">{{ toiletAir.temperature }}℃</div>
            </el-progress>
        </div>
        <div class="border-bg zhibiao">
          <div class="title-box flex-row align-center  justify-between">
            <div class="flex-row align-center">
              <div class="dot bgcolor1 "></div>
              <div>湿度</div>
            </div>
            <div class="color1" style="margin-left:14px">舒适</div>
          </div>
          <el-progress color="#00000000" :percentage="toiletAir.humidity"  :stroke-width="4">
            <div text style="font-size:32px;color:rgba(255,255,255,1);text-align: right;">{{ toiletAir.humidity }}%</div>
          </el-progress>
        </div>
        <div class="border-bg zhibiao">
          <div class="title-box flex-row align-center  justify-between">
            <div class="flex-row align-center">
              <div class="dot bgcolor2"></div>
              <div>二氧化硫</div>
            </div>
            <div class="color1" style="margin-left:14px">安全</div>
          </div>
          <el-progress color="#00000000" :percentage="0"  :stroke-width="4">
            <div text style="font-size:32px;color:rgba(255,255,255,1);text-align: right;">0ppm</div>
          </el-progress>
        </div>
        <div class="border-bg zhibiao">
          <div class="title-box flex-row align-center  justify-between">
            <div class="flex-row align-center">
              <div class="dot bgcolor1"></div>
              <div>PM2.5</div>
            </div>
            <div class="color1" style="margin-left:14px">优</div>
          </div>
          <el-progress color="#00000000" :percentage="10"  :stroke-width="4">
            <div text style="font-size:32px;color:rgba(255,255,255,1);text-align: right;">{{ toiletAir.pm25 }}μg/m³</div>
          </el-progress>
        </div>

        <div class="border-bg zhibiao">
          <div class="title-box flex-row align-center  justify-between">
            <div class="flex-row align-center">
              <div class="dot bgcolor1"></div>
              <div>氨气</div>
            </div>
            <div class="color1 " style="margin-left:14px">安全</div>
          </div>
          <el-progress color="#00000000" :percentage="toiletAir.nh3"  :stroke-width="4">
            <div text style="font-size:32px;color:rgba(255,255,255,1);text-align: right;">{{ toiletAir.nh3 }}ppm</div>
          </el-progress>
        </div>

      </div>
    </div>
  </div>
  <!-- 午休屏幕 -->
  <div v-if="!isWc&&isWuxiui" class="main-box flex-col animate__animated">
    <div v-if="sosAnimate" class="sos-animate"></div>
    <bgImage  style="position: absolute;left:0;top:0;" :bgUrls="[{url:wuxiuBg}]" ></bgImage>
    <div style="position: absolute;top: 0;width: 100%;padding:80px 100px" class="flex-row justify-between">
      <Logo :class="class1" class="animate__animated" ref="logoCom" ></Logo>
      <LocalTime :class="class2" class="animate__animated "  ></LocalTime>
    </div>
    <div class="wuxiu-box flex-col align-center">
      <img style="" class="icon" :src="wuxiu"/>
      <div class="txt1">当前已进入午休模式，照明将在午休结束后开启</div>
      <div @click="toMainBox" class="btn">返回首屏</div>
    </div>

  </div>


  <!-- sos弹窗 -->
  <el-dialog
   class="soc-dia"
    v-model="dialogSOS"
    append-top-body
    top="44vh"
    width="450"
    :show-close="false"
  >
    <div class="title">SOS紧急呼叫</div>
    <div class="txt1">当您处于紧急情况下可点击立即呼叫，系统将发送当前位置的求助信息至安保值班室</div>
    <div class="txt2"></div>
    <template #footer>
      <div class="dialog-footer flex-row justify-center">
        <el-button type="default" @click="dialogSOS = false">取消</el-button>
        <el-button type="danger" @click="sosConfirm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogFormVisible" title="初始化平板" width="500">
    <el-form :model="form">
      <el-form-item label="属地" :label-width="formLabelWidth">
        <el-select v-model="form.spaceIndex" placeholder="选择属地">
          <el-option :label="space.name" :value="index" v-for="(space,index) in spaceObj" />
        </el-select>
      </el-form-item>
      <el-form-item label="楼层区域" :label-width="formLabelWidth" v-if="spaceObj[form.spaceIndex]">
        <el-select v-model="form.floorareaIndex" placeholder="选择楼层区域">
          <el-option :label="fa.name" :value="index2" v-for="(fa,index2) in spaceObj[form.spaceIndex].floorArea" />
        </el-select>
      </el-form-item>
      <el-form-item label="楼层" :label-width="formLabelWidth"  v-if="spaceObj[form.spaceIndex] && spaceObj[form.spaceIndex].floorArea &&  spaceObj[form.spaceIndex].floorArea[form.floorareaIndex]">
        <el-select v-model="form.floorIndex" placeholder="选择楼层">
          <el-option :label="floor.name" :value="index" v-for="(floor,index) in spaceObj[form.spaceIndex].floorArea[form.floorareaIndex].floor" />
        </el-select>
      </el-form-item>
      <el-form-item label="绑定区域" :label-width="formLabelWidth" v-if="spaceObj[form.spaceIndex] && spaceObj[form.spaceIndex].floorArea &&  spaceObj[form.spaceIndex].floorArea[form.floorareaIndex] && spaceObj[form.spaceIndex].floorArea[form.floorareaIndex].floor[form.floorIndex]">
        <el-select v-model="form.areaIndex" placeholder="绑定区域" size="large">
          <el-option :label="area.name" :value="index" v-for="(area,index) in spaceObj[form.spaceIndex].floorArea[form.floorareaIndex].floor[form.floorIndex].area " />
        </el-select>
      </el-form-item>
      <el-form-item label="绑定类型" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="绑定类型" size="large">
          <el-option label="墙面pad" value="wall" />
          <el-option label="卫生间pad-男" value="wc" />
          <el-option label="卫生间pad-女" value="wcw" />
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="设备类型" :label-width="formLabelWidth">-->
      <!--        <el-select v-model="form.type" placeholder="Please select a zone">-->
      <!--          <el-option label="会议室电子门牌" value="meetingPad" />-->
      <!--          <el-option label="墙面中控平板" value="wallPad" />-->
      <!--          <el-option label="卫生间平板" value="wcPad" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="saveData">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <audio style="display:none" ref="audioPlayer" src="http://10.205.66.6:1880/file/emergent/voice.mp3" controls @ended="restartAudio"></audio>
</template>
<script setup>


// import bg from '@/assets/images/new.jpg';
import 'animate.css';
import autofit from "autofit.js"
import LocalTime from '@/components/localTime.vue'
import Logo from '@/components/logo.vue'
import bgImage from '@/components/bgImage.vue'
import IndexTitle from '@/components/indexTitle.vue'
import leftNav from '@/views/components/leftNav.vue'
import huanjing from '@/views/components/huanjing.vue'
import zhaoming from '@/views/components/zhaoming.vue'
import energyUse from '@/views/components/energyUse.vue'
import roomUse from '@/views/components/roomUse.vue'
import service from '@/views/components/service.vue'
import serviceGaojing from '@/views/components/serviceGaojing.vue'
import intelligent from '@/views/components/intelligent.vue'
import maps from '@/views/components/maps.vue'

import bg from '@/assets/images/bgNew1.jpg'; //背景图片——————bgNew1--bgNew5
import tabBgall from '@/assets/images/tabBgall.png';
import bgLine from '@/assets/images/bgLine.png';
import bgIconsos from '@/assets/images/bgIconsos.png';
import tabAll from '@/assets/images/tabAll.png';
import iconSos1 from '@/assets/images/iconSos1.png';
import chahua from '@/assets/images/chahuaNew1.png';
import bgWC from '@/assets/images/bgWC.png'

// import bgVideo from '@/components/bgVideo.vue'
const subscribe = inject('subscribe') // 订阅信息
const unsubscribe = inject('unsubscribe') // 订阅信息
const getMessage = inject('getMessage') // 订阅信息
const publish = inject('publish') // 订阅信息
const obj = ref({})//本地配置对象
const dialogFormVisible = ref(false) //配置窗口
const timer1 = ref(null)
const audioPlayer = ref(null)
const spaceObj = ref([])
const padObj = ref({
  name:'',
  code:'',
  gateway:'',
  layer:'',
  status:{
    online:1,
    status:"busy"
  }
})
const lightobj = ref([
  {name:'照明 1',status:1}, //0：关，1：开
  {name:'照明 2',status:0},
  {name:'照明 3',status:1},
  {name:'照明 4',status:1},
  {name:'过道照明 1',status:1},
  {name:'过道照明 2',status:1},
])
const acobj = ref([])
// const roomObj = ref([])
const roomoSensorObj = ref([])
// const tolietobj = ref([])
const wcmanStatusObj = ref([10])
const wcwomanStatusObj = ref([10])
const baojie =ref({
  endTime:' 暂无'
})
const toiletAir = ref({})
const dialogSOS = ref(false)
const sosAnimate = ref(false)//首页告警
const sosAnimateDia = ref(false)//弹窗页告警

const form = reactive({
  floorarea:'',
  code: '',
  floor: '',
  type:'',
  space:'',
  spaceIndex:0,
  floorareaIndex:0,
  floorIndex:0,
  areaIndex:0
})
const stopTimer=(time)=>{
  if(time){
    clearInterval(time)
    time = null
  }
}

// bgParams:{
//   type: 'video',
//       urls:[{url:'/zeekrpad/images/rain.mp4'}]
// },
let flag = true
let bgParams = reactive({type:"image",urls:[{url:bg}]})

//页面数据
const outside = ref(
    {
      humidity:20,
      temperature:20,
      temperatureNum:20,
      humidityNum:45,
      today:'多云',
      AIQ:20,
      suggest:20,
      pm25:20,
      wind:0
    },
)
const inside = ref({
      co2: 552,
      formaldehyde: 0.01,
      humidity: 42.3,
      light: 35,
      online: 1,
      pm10: 37,
      pm25: 29,
      status: "on",
      temperature: 23.1,
      tovc: 408
})

const map = ref(null)

const getMap = ()=>{
  if(map.value==null){
    console.info("newmap")
    console.info(document.getElementById("mapId"))
    map.value = new AirocovMap.Map({
      container: document.getElementById("mapId"),
      mapUrl:`/wallpad/static/acmap/${obj.value.floor}.acmap`,
      themeUrl: '/wallpad/static/theme/theme.json',
      floorSwitch: { show: false },
      mergeModels:['desk','seat','wall'],
      clickModels: ['seat'],
      key: 'KMED1W0N50YIWIYJCUNLYPMJ49JDLASE',
      zoom: 0.7,
      bgColor: "#161616",
      minPolarAngle: 0,
      maxPolarAngle: 180,
      name: "ZeekrMap",
      font: {
        fontScale: 2,
        fontFamily: '"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",sans-serif',
        color: "#000",
        strokecolor: "#FFF",
        iconScale: 1,
        indent: 5,
      },
      onReady: function () {
        // map.value.event.on('click', handleClick); // 左键单击
        map.value.enableControl(false)
        // map.value.render.camera.control.autoRotate = false;
        // //当前位置标识
        // setWallpad(obj.value.code)
        // //照明标识
        // setLight(obj.value.code)
        //空气标识
        // setAir(obj.value.code)
      },
    })
  }
}

onMounted(() => {
  // playAudio()

  let data = localStorage.getItem("data")
  if(data){
    publish('/iot/setting/get/device',
        JSON.stringify({
          spaceCode:JSON.parse(data).space,
          floorAreaCode:JSON.parse(data).floorarea,
          floorCode:JSON.parse(data).floor,
          areaCode:JSON.parse(data).code,
        })
    )

    let jsondata = JSON.parse(data)
    obj.value.code = jsondata.code
    obj.value.floor = jsondata.floor
    obj.value.floorarea = jsondata.floorarea
    obj.value.type = jsondata.type
    // getMap()

    // roomObj.value = jsondata.spaceObj[jsondata.spaceIndex].floorArea[jsondata.floorareaIndex].floor[jsondata.floorIndex].mettingRoom

    // console.info(jsondata.floor)
    // console.info( lights.value[jsondata.floor])
    // }
    //新订阅
    subscribe(`/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`)
    //
    subscribe(`/iot/status/humensensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/#`)
    subscribe('/wallpad/outside')
    subscribe(`/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${obj.value.code}区空气传感器`)
    // subscribe(`/iot/status/power/HGH-WC/A3/26F/${obj.value.code}/${obj.value.code}区用电量`)

    subscribe(`/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN/#`)
    subscribe(`/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN/#`)
    subscribe(`/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN/#`)
    subscribe(`/iot/status/wcinfo/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN`)

    subscribe(`/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN/#`)
    subscribe(`/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN/#`)
    subscribe(`/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN/#`)
    subscribe(`/iot/status/wcinfo/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN`)




    // subscribe(`/iot/status/power/HGH-WC/A3/26F/${obj.value.code}/${obj.value.code}区昨日用电量`)
    // subscribe(`/iot/status/power/HGH-WC/A3/26F/${obj.value.code}/${obj.value.code}区今日用电量`)
    subscribe(`/iot/status/power/HGH-WC/${obj.value.floorarea}/${obj.value.floor}`)
//处理指令
//     subscribe(`/iot/action/pad/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${obj.value.code}区中控屏`)
    subscribe(`/iot/action/pad/HGH-WC/#`)
//获取照明状态
    subscribe(`/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/#`)
    subscribe(`/iot/status/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/#`)
//获取告警确认信息
    subscribe(`/iot/emergent/security/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`)

    // subscribe(`/iot/status/light/HGH-WC/A3/26F/${obj.value.code}/#`)

  }else{
    subscribe('/iot/setting/structure/result')
    dialogFormVisible.value = true
    console.info("没有本地数据"+dialogFormVisible)
  }
  autofit.init({
        dh: 1080,
        dw: 1920,
        el: "#app",
        resize: true
      },
      false
  )
  publish('/iot/setting/get/structure')
  timer1.value = setInterval(link,30000)
})
onUnmounted(()=>{
  //新订阅
  unsubscribe('/iot/setting/structure/result')
  unsubscribe(`/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`)
  unsubscribe(`/iot/status/humensensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/#`)
  unsubscribe('/wallpad/outside')
  unsubscribe(`/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${obj.value.code}区空气传感器`)




  unsubscribe(`/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN/#`)
  unsubscribe(`/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN/#`)
  unsubscribe(`/iot/status/wcinfo/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN`)
  unsubscribe(`/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN`)


  unsubscribe(`/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN/#`)
  unsubscribe(`/iot/status/wcinfo/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN`)
  unsubscribe(`/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN/#`)
  unsubscribe(`/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN`)

  // unsubscribe(`/iot/status/power/HGH-WC/A3/26F/${obj.value.code}/${obj.value.code}区昨日用电量`)
  // unsubscribe(`/iot/status/power/HGH-WC/A3/26F/${obj.value.code}/${obj.value.code}区今日用电量`)
  unsubscribe(`/iot/status/power/HGH-WC/${obj.value.floorarea}/${obj.value.floor}`)
  // unsubscribe(`/iot/action/pad/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${obj.value.code}区中控屏`)
  unsubscribe(`/iot/action/pad/HGH-WC/#`)
  unsubscribe(`/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/#`)
  unsubscribe(`/iot/status/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/#`)
  unsubscribe(`/iot/emergent/security/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`)
  // if(timer){stopTimer(timer)}
  if(timer1){stopTimer(timer1)}
})
const link = () =>{
  if(padObj.value.name===""){
    let data = localStorage.getItem("data")
    if(data) {
      publish('/iot/setting/get/device',
          JSON.stringify({
            spaceCode:JSON.parse(data).space,
            floorAreaCode:JSON.parse(data).floorarea,
            floorCode:JSON.parse(data).floor,
            areaCode:JSON.parse(data).code,
          })
      )
    }
  }else{
    //   智能平板code命名规则 ：
    //    WALLPAD-26F-B
    //    MEETINGPAD-26F-M2601
    //    TOILETPAD-26F-TMAN
    let topic = ""
    let pad = [padObj.value]

    topic =`/iot/status/pad/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${padObj.value.name}`
    publish(
        topic,
        JSON.stringify(pad)
    )
    // console.info("心跳")
    // console.info(`/iot/status/pad/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${padObj.value.name}`)
    // console.info(pad)
  }

  // publish(
  //     `/iot/status/report`,
  //     {action:"status"}
  // )
  // publish('/iot/action/airsensor/HGH-WC/A3/26F/A/A区空气传感器','{"action":"status"}')
  // publish('/iot/action/airsensor/HGH-WC/A3/26F/TMAN/男卫生间空气传感器','{"action":"status"}')
}
const playAudio = () => {
  audioPlayer.value.play();
}
const restartAudio = ()=>{
  audioPlayer.value.currentTime = 0;
  audioPlayer.value.play();
}
const saveData = () => {
  // console.info(form)
  // form.spaceIndex
  form.space = spaceObj.value[form.spaceIndex].code
  form.floorarea = spaceObj.value[form.spaceIndex].floorArea[form.floorareaIndex].code
  form.floor = spaceObj.value[form.spaceIndex].floorArea[form.floorareaIndex].floor[form.floorIndex].code
  form.code = spaceObj.value[form.spaceIndex].floorArea[form.floorareaIndex].floor[form.floorIndex].area[form.areaIndex].code
  form.spaceObj = spaceObj.value
  console.info(form)
  localStorage.setItem("data",JSON.stringify(form))
  dialogFormVisible.value = false
  location.reload()
}
const setBg = (urls)=>{
  bgParams.urls = urls
  console.info(bgParams)
}
const setInitBg = ()=>{
  let today = outside.value.today
  // bgParams.urls.splice(0,bgParams.urls.length)
  //
  // if(today){
  //   if(today ==='多云' || today ==='阴' || today.indexOf('雾')!==-1){
  //     bgParams.urls = [{url:'/zeekrpad/images/cloud.png'}]
  //   }else if(today ==='晴'){
  //     // console.info("+++++++++++++setInitBg+++++++++++++")
  //     // console.info(today)
  //     bgParams.urls = [{url:'/zeekrpad/images/sun.png'}]
  //   }else if(today.indexOf('雨')!==-1){
  //     bgParams.urls = [{url:'/zeekrpad/images/rain.png'}]
  //   }else{
  //     bgParams.urls = [{url:'/zeekrpad/images/sun.png'}]
  //   }
  // }

  // if(today){
  //   bgParams.type = 'video'
  //   bgParams.urls = [{url:'/wallpad/images/sun.mp4'}]
  //   if(today ==='多云' || today ==='阴' || today.indexOf('雾')!==-1){
  //     bgParams.urls = [{url:'/wallpad/images/sun.mp4'}]
  //   }else if(today ==='晴'){
  //     // console.info("+++++++++++++setInitBg+++++++++++++")
  //     // console.info(today)
  //     bgParams.urls = [{url:'/wallpad/images/sun.mp4'}]
  //   }else if(today.indexOf('雨')!==-1){
  //     bgParams.urls = [{url:'/wallpad/images/rain.mp4'}]
  //   }else{
  //     bgParams.urls = [{url:'/wallpad/images/sun.mp4'}]
  //   }
  // }
  // console.info(bgParams)
}
const cannelAlter = () =>{
  sosAnimate.value = false
  //暂停语音
  audioPlayer.value.pause();
  audioPlayer.value.currentTime = 0;
}
//确认sos-告警
const sosConfirm =() =>{
  dialogSOS.value = false
  sosAnimate.value = true
  if(localStorage.getItem("data")) {
    let jsondata = JSON.parse(localStorage.getItem("data"))
    // on confirm
    let data = {
      "spaceCode":"HGH-WC",
      "floorAreaCode":jsondata.floorarea,
      "floorCode":jsondata.floor,
      "areaCode":jsondata.code,
      "sourceName":jsondata.floor.substring(0,jsondata.floor.length-1)+"楼"+jsondata.code+"区中控屏",
      "emergentType":"紧急事件",
      "emergentContent":"请注意"+jsondata.floor.substring(0,jsondata.floor.length-1)+"楼"+jsondata.code+"区有紧急事件，请立即前往！"
    }
    console.info("/iot/action/emergent/security")
    console.info(data)
    publish("/iot/action/emergent/security",JSON.stringify(data))
  }

}
getMessage((topic, message) => {
  // // console.info(`/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN/`)
  // console.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  // // // // console.info('/iot/status/light/HGH-WC/A3/26F/A/#')
  // console.info(topic)
  // // // console.info(`/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`)
  // // // console.info(topic===`/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`)
  // console.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  sessionStorage.setItem("mqtt","message")
  // /iot/status/sensor/HGH-WC/A4/41F/#

  if(topic.indexOf(`/iot/status/humensensor/HGH-WC/${obj.value.floorarea}`)!==-1){
    let allSensor = JSON.parse(message)
    // console.info("+++++++++++++++++++++++++++++")
    // console.info(allSensor[0])
    // console.info(topic)
    let mcode = topic.split('/')[7]
    // console.info(roomObj.value)
   if(roomoSensorObj.value[mcode]) {
     if(roomoSensorObj.value[mcode].deviceId !== allSensor[0].code){
       if(roomoSensorObj.value[mcode].status ==="busy" || allSensor[0].status.status==='busy'){
         allSensor[0].status.status = "busy"
       }
     }
   }
    roomoSensorObj.value[mcode] = allSensor[0].status
    roomoSensorObj.value[mcode].deviceId = allSensor[0].code
    // roomoSensorObj.value.splice(0,roomoSensorObj.value.length)
    // roomoSensorObj.value.push()
    // console.info(roomoSensorObj.value)
    // console.info("++++++++++++++"+mcode+"+++++++++++++++")
    // console.info(roomoSensorObj.value)
    // sensors.value.splice(0, sensors.value.length);
    // allSensor.forEach(function(s){
    //   sensors.value.push(s)
    // })
  }
  if(topic==="/wallpad/outside"){
    // console.info(JSON.parse(message))
    if(outside.value.today!==JSON.parse(message)?.today&&flag){
      // console.info("发现不一样")
      outside.value = JSON.parse(message)
      // console.info(outside.value.today)
      // console.info(JSON.parse(message))
      setInitBg()
    }
    outside.value = JSON.parse(message)

  }
  if(topic===`/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${obj.value.code}区空气传感器`){
    console.info(JSON.parse(message.toString()))
    inside.value = JSON.parse(message.toString())[0].status

  }
  if(topic===`/iot/status/power/HGH-WC/${obj.value.floorarea}/${obj.value.floor}`){
    // power.value = { totalkwh:JSON.parse(message.toString()) }
    // console.info(JSON.parse(message.toString()))
    // energyData.vlaue.totalKwh = JSON.parse(message.toString()).totalKwh
    // energyData.vlaue.totalKw = JSON.parse(message.toString()).totalKw
    // Object.assign(energyData.value, JSON.parse(message.toString()))
    // console.log("energyData:",energyData)
  }
  if(obj.value.type==='wc' && topic.indexOf(`/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN`)!==-1){
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
    let cw = JSON.parse(message.toString())
    if(cw){
      toiletAir.value = cw[0].status
    }
    console.log("ces",toiletAir.value)
  }
  if(obj.value.type==='wcw' && topic.indexOf(`/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN`)!==-1){
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
    let cw = JSON.parse(message.toString())
    if(cw){
      toiletAir.value = cw[0].status
    }
    console.log("ces",toiletAir.value)

    // console.log("ces",JSON.parse(message.toString()))
  }
  if(topic.indexOf(`/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN/`)!==-1){
    // console.info(topic)
    // console.info(JSON.parse(message.toString())[0])
    let cw = JSON.parse(message.toString())[0]
    // let code = topic.split("/")[7]
    let cwindex = topic.substring(topic.length-1,topic.length)
    // console.info(cwindex)
    // console.info(code)
    if(cwindex!=='P'){
      wcmanStatusObj.value[parseInt(cwindex)] = parseInt(cw.status.status)
    }else{
      wcmanStatusObj.value[9] = parseInt(cw.status.status)
    }
    // console.info(wcmanStatusObj.value)
    // if(cw && cw.code){
    //   // console.info(cw.code)
    //   // let index = cw.code.substring(cw.code.length-1,cw.code.length)
    //   toilet.value[cw.code] = cw
    //
    //   toilet.value.forEach(function(t,index){
    //     if(cw.code===t.code){
    //       toilet.value[index] = cw
    //     }
    //   })
    //
    // }
  }
  if(topic.indexOf(`/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN/`)!==-1){
    // console.info(topic)
    // console.info(JSON.parse(message.toString())[0])
    let cw = JSON.parse(message.toString())[0]
    // let code = topic.split("/")[7]
    let cwindex = topic.substring(topic.length-1,topic.length)
    // console.info(cwindex)
    // console.info(code)
    if(cwindex!=='P'){
      wcwomanStatusObj.value[parseInt(cwindex)] = parseInt(cw.status.status)
    }else{
      wcwomanStatusObj.value[9] = parseInt(cw.status.status)
    }
    // console.info(wcwomanStatusObj.value)
    // if(cw && cw.code){
    //   // console.info(cw.code)
    //   // let index = cw.code.substring(cw.code.length-1,cw.code.length)
    //   toilet.value[cw.code] = cw
    //
    //   toilet.value.forEach(function(t,index){
    //     if(cw.code===t.code){
    //       toilet.value[index] = cw
    //     }
    //   })
    //
    // }
  }
  if (topic.indexOf(`/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`)!==-1) {
    // let areaLights = alllight.value[obj.value.code]
    // let topicArr = topic.split("/")
    // let name = topicArr[topicArr.length-1]
    // let pos = areaLights.indexOf(name)
    let status = JSON.parse(message)
    // console.info(status)
    lightobj.value.forEach(function(l){
        if( l.code===status[0].code ){
          l.status = status[0].status.status
        }
    })
    // if(pos !== -1 && areaLights[pos] !== undefined && alllightStatus.value[obj.value.code][pos] !== undefined){
    //   let s = "off"
    //   if(status[0] && status[0].status && status[0].status.status === "on"){
    //     s = "on"
    //   }
    //   alllightStatus.value[obj.value.code][pos] = s
    // }
  }
  if (topic.indexOf(`/iot/status/airconditioning/HGH-WC`)!==-1) {
    let airconditioning = JSON.parse(message)
    console.info("空调")
    acobj.value.forEach(function(air){
      air.status = airconditioning[0].status
    })
    // console.info(acobj.value)
  }

  if(topic===`/iot/status/wcinfo/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN`){
    // console.info(JSON.parse(message.toString()))
    // toiletUseCount.value = JSON.parse(message.toString()).useCount
  }
  // if(topic===`/iot/action/pad/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${obj.value.code}区中控屏`){
  if(topic.indexOf(`/iot/action/pad/HGH-WC/`)!==-1){
    // console.info(topic)
    // console.info(JSON.parse(message.toString()))
    let router = topic.split('/')
    // console.info(router)
    let itsme = false
    if(router.length===9){
      //发给指定pad
      console.info("发给指定pad:"+router[6] +"|"+router[8])
      if(obj.value.type==='wc'){
        if(router[6]===obj.value.floor && router[8]===`男卫生间门牌`){
          itsme = true
        }
      }else if(obj.value.type==='wcw'){
        if(router[6]===obj.value.floor && router[8]===`女卫生间门牌`){
          itsme = true
        }
      }else{
        if(router[6]===obj.value.floor && router[8]===`${obj.value.code}区中控屏`){
          itsme = true
        }
      }
    }else if(router.length===8 && router[7]!==''){
      //发给指定区域
      console.info("发给指定区域:"+router[6] +"|"+router[7])
      if(router[6]===obj.value.floor && router[7]===obj.value.code){
        itsme = true
      }
    }else if(router.length===8){
      //发给指定楼层
      console.info("发给指定楼层:"+router[6])
      if(router[6]===obj.value.floor){
        itsme = true
      }
    }

    if(itsme){
      let cw = JSON.parse(message.toString())
      console.info(cw)
      if(cw.action === "refresh"){
        console.info("执行刷新")
        location.reload()
      }
      if(cw.action === "play"){
        console.info("播放")
        cw.pic =  [{url:'/wallpad/images/new.png'},{url:'/wallpad/images/new2.png'}]
        setBg(cw.pic)
        animateOut()
      }
      if(cw.action === "stop"){
        console.info("停止")
        setInitBg()
        animateIn()
      }
      if(cw.action === "fullscreen"){
        console.info("全屏")
        animateIn()
        // logoCom.value.SetFullScreen()
        //onFullScreen()
        //SetFullScreen()
      }
      if(cw.action === "bind"){
        console.info("绑定")
        localStorage.clear()
        location.reload()
      }
    }
  }
  if(obj.value.type ==='wc' && topic.indexOf(`/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN`)!==-1){
    // /iot/status/cleaning/HGH-WC/A4/42F/TMAN
    let message1 = JSON.parse(message)
    console.info("获取到了最新保洁信息")
    console.info(message1)
    baojie.value.empName = message1.empName
    baojie.value.endTime = message1.endTime
    baojie.value.updateTime = message1.updateTime
  }
  if(obj.value.type ==='wwc' && topic.indexOf(`/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN`)!==-1){
    // /iot/status/cleaning/HGH-WC/A4/42F/TMAN
    let message1 = JSON.parse(message)
    console.info("获取到了最新保洁信息")
    console.info(message1)
    baojie.value.empName = message1.empName
    baojie.value.endTime = message1.endTime
    baojie.value.updateTime = message1.updateTime
  }
  //新订阅
  // subscribe('/iot/setting/get/device')
  // subscribe(`/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`)
  if(topic === `/iot/setting/structure/result` ){
    console.log('/iot/setting/structure/result',JSON.parse(message))
    spaceObj.value = JSON.parse(message)
    console.log(`/iot/setting/structure/result`, spaceObj.value)
  }
  if(topic ===`/iot/emergent/security/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`){
    console.info("警告确认+++++++++++++++++++++++++++++++++++")
    let emergent = JSON.parse(message)
    console.info(emergent)
    if(emergent.action ===1){
      //播放语音
      console.info('播放语音')
      playAudio()
    }else{
      cannelAlter()

    }
  }
  if(topic === `/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`){
    console.log(`/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`,JSON.parse(message))
    let devices = JSON.parse(message)
    //转换照明数据
    // alllight.value = {}
    // alllightStatus.value ={}
    // let lights = []
    // let lightsstatus = []

      lightobj.value.splice(0,lightobj.value.length)
      devices.light.forEach(function(e){
        if(JSON.parse(e.status)){
          lightobj.value.push({
            name:e.name,
            code:e.code,
            status:JSON.parse(e.status).status
          })
        }
      })

    //转换空调数据
    acobj.value.splice(0,acobj.value.length)
    devices.airconditioning.forEach(function(e){
      acobj.value.push({
        name:e.name,
        code:e.code,
        status:JSON.parse(e.status)
      })
    })





  if(devices.pad){
      //转换pad数据
      let pad = {
        name:devices.pad[0].name,
        code:devices.pad[0].code,
        gateway:devices.pad[0].gatewayMac,
        layer:devices.pad[0].layer,
        status:{
          online:1,
          status:"busy"
        }
      }
      padObj.value = pad
  }
    // console.info("++++++++++++++++++++++++++")
    // console.info(padObj.value)
    // console.info("++++++++++++++++++++++++++")

  }

  setTimeout(function(){
    sessionStorage.setItem("mqtt","connect")
  },500)
})
</script>
<script>
import autofit from "autofit.js"
// import bg from '@/assets/images/new.jpg'
import iconTem from  '@/assets/images/temWhite.png'
// import iconAir from  '@/assets/images/airWhite.png'
import iconWen from  '@/assets/images/wenWhite.png'
// import chahua from  '@/assets/images/chahua.png'
import iconfw from '@/assets/images/iconfw.png'
// import iconzm from '@/assets/images/iconzm.png'
// import iconhj from '@/assets/images/iconhj.png'
// import iconkj from '@/assets/images/iconkj.png'
// import iconall from '@/assets/images/iconall.png'
// import wc from '@/assets/images/wc.png'
import map42 from '@/assets/images/42.png'

import wuxiu from '@/assets/images/wuxiuNew.png'
import wuxiuBg from '@/assets/images/wuxiuBgNew.jpg'
// const publish = inject('publish') // 订阅信息
// bgParams:{
//   type: 'image',
//       urls:[{url:bg}]
// },
// bgParams:{
//   type: 'video',
//       urls:[{url:'/zeekrpad/images/rain.mp4'}]
// },
export default{
  data(){
    return {
      isWc:true, //是否是厕所屏幕
      isWuxiui:false,//是否午休
      drawer:false,
      tabIndex:0,//选中菜单
      obj:null,
      // dialogSOS:false,
      // sosAnimate:false,//首页告警
      // sosAnimateDia:false, //弹窗页告警
      // sosAnimateDia:false, //弹窗页告警
      class1:'',
      class2:''
    }
  },
  mounted(){
    // //适配大小
    // autofit.init({
    //     dh: 1080,
    //     dw: 1920,
    //     el: "#app",
    //     resize: true
    //   },
    //   false
    // )
    // //获取配置参数
    // let data = localStorage.getItem("data")
    // if(data){
    //   obj.value = JSON.parse(data)//复制给页面对象
    //   publish('/iot/setting/get/device',
    //       JSON.stringify({
    //         spaceCode:obj.value.space,
    //         floorAreaCode:obj.value.floorarea,
    //         floorCode:obj.value.floor,
    //         areaCode:obj.value.code,
    //       }),
    //
    //   )
    // }else{
    //   subscribe('/iot/setting/structure/result')
    //   dialogFormVisible.value = true
    //   console.info("没有本地数据"+dialogFormVisible)
    // }
  },
  methods:{
    // animateFun(){
    //     flag = e=='in'
    //     // console.log('flag',flag)
    //     let index = 0
    //   timer.valiue = setInterval(() => {
    //       index++
    //       if(index>=6){
    //         clearInterval(timer.value)
    //       }
    //       if(index===1){
    //         class1.value=flag?'animate__fadeInLeft':'animate__fadeOutLeft'
    //       }
    //       if(index===2){
    //         class2.value=flag?'animate__fadeInRight':'animate__fadeOutRight'
    //       }
    //       if(index===3){
    //         class3.value=flag?'animate__fadeInLeft':'animate__fadeOutLeft'
    //       }
    //       if(index===4){
    //         class4.value=flag?'animate__fadeInRight':'animate__fadeOutRight'
    //       }
    //       if(index===6){
    //         class6.value=flag?'animate__fadeIn':'animate__fadeOut'
    //       }
    //     }, 10);
    //
    // },
    // //确认sos-告警
    // sosConfirm(){
    //   this.dialogSOS = false
    //   this.sosAnimate = true
    //   if(localStorage.getItem("data")) {
    //     let jsondata = JSON.parse(localStorage.getItem("data"))
    //     // on confirm
    //     let data = {
    //       "spaceCode":"HGH-WC",
    //       "floorAreaCode":jsondata.floorarea,
    //       "floorCode":jsondata.floor,
    //       "areaCode":jsondata.code,
    //       "sourceName":jsondata.floor.substring(0,jsondata.floor.length-1)+"楼"+jsondata.code+"区中控屏",
    //       "emergentType":"紧急事件",
    //       "emergentContent":"请注意"+jsondata.floor.substring(0,jsondata.floor.length-1)+"楼"+jsondata.code+"区有紧急事件，请立即前往！"
    //     }
    //     console.info("/iot/action/emergent/security")
    //     console.info(data)
    //     publish("/iot/action/emergent/security",JSON.stringify(data))
    //   }
    //
    // },
    cannelSos(){
      this.sosAnimate = false
    },
    showIndex(e){
      this.drawer = true
      this.tabIndex = e
    },
    //弹窗告警

    //菜单点击事件
    navFun(e){
      if(e==-1){
        this.drawer = false
        return false
      }
      this.tabIndex = e
    },
    //午休返回首页
    toMainBox(){
      this.isWuxiui = false
    }
  }
}


</script>
<style scoped lang="scss">

:v-deep()  .el-drawer__close-btn{
  position: absolute;
  left: 1060px;
  color: #fff;
  z-index: 3;
  font-weight: 900;
  font-size: 30px;
  top: 25px;
}
:v-deep()  .el-drawer__body{
  width:100%;
  height:100%;
}

.main-box{
  width: 1920px;
  height: 1080px;
  margin: 0 auto;
  left:-1px;
  position: relative;
  color:#fff;
  font-family: DingTalk;
  font-size: 24px;
  box-sizing: border-box;
  .bg-shdow{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    //height: calc(100% - 118px);
    height:100%;
    background: rgba(0,0,0,0.5);
  }
  .chahua{
    position: absolute;
    width: 435px;
    height: 236.29px;
    top: 200px;
    left: 673.04px;
    .img{
      position: absolute;
      width: 248px;
      height: 236.29px;
      top:0;
      right:0
    }
    .txt{
      position: absolute;
      top: 122px;
      left:-78px;
      font-size: 20px;
      width: 290px;
      margin-left: 0;
      text-align: right;
      opacity: 0.8;
    }

  }
  .content{
    gap:40px;
    .index-title-box{
      font-size: 36px;
      font-family: PingFang SC;
    }
    .title-num{
      font-family: ly-regular;
      font-weight: 400;
      font-size: 300px;
      color: #FFFFFF;
      line-height: 280px;
      position: relative;
    }
    .font200{
      font-size: 200px;
      line-height: 200px;

    }
    .font100{
      font-size: 100px;
      line-height: 100px;
      position: relative;
      right: 10px;
      bottom:0;
    }
    .title-num1{
      font-size: 44px;
      margin: 20px;
    }
    .zhibiao{
      width: 320px;
      height: 114px;
      padding: 20px;
      border-radius: 16px;
      opacity: 0px;
      background: rgba(255, 255, 255, 0.1);
      margin-top:40px;
      position: relative;
      z-index: 1;
      .title-box{
        margin-bottom:14px;
        position: relative;
        z-index: 1;
      }
      .dot{
        width:8px;
        height:8px;
        border-radius: 50%;
        background-color:#3AAD81;
        margin-right:8px;
      }
      .color1{
        color:#3AAD81
      }
      .bgcolor1{
        background:#3AAD81
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
    }
    .left{
      position: relative;
      width: 1142px;
      height: 632px;
      border-radius: 32px;
      // border: 2px solid;
      padding:20px 0px 40px 0px;
      // background-image: linear-gradient(238.13deg, rgba(255, 255, 255, 0) 34.07%, rgba(255, 255, 255, 0.15) 63.53%, rgba(255, 255, 255, 0.2) 96.41%);
      // border-image: linear-gradient(113.99deg, rgba(255, 255, 255, 0.8) 5.73%, rgba(255, 255, 255, 0.1) 42.8%, rgba(255, 255, 255, 0.1) 98.9%) 1 1;
      // clip-path: inset(0 round 32px);
    }
    .bg-line{
      width: 79px;
      height: 611px;
      position: relative;
      left:-40px;
    }
    .right{
      width: 578px;
      height: 632px;
      border-radius: 32px;
      padding:20px 0px 40px 0px;
      // border: 2px solid;
      // background-image: linear-gradient(238.13deg, rgba(255, 255, 255, 0) 34.07%, rgba(255, 255, 255, 0.15) 63.53%, rgba(255, 255, 255, 0.2) 96.41%);
      // border-image: linear-gradient(113.99deg, rgba(255, 255, 255, 0.8) 5.73%, rgba(255, 255, 255, 0.1) 42.8%, rgba(255, 255, 255, 0.1) 98.9%) 2 2;
      // clip-path: inset(0 round 32px);
    }
  }
  .bottom-tab{
    position: absolute;
    bottom:0;
    width:100%;
  }

  .bottom-all{
    width:268px;
    height:76px;
    position: absolute;
    left:0;
    bottom:19px;
    z-index:1;
    margin:auto;
    background: linear-gradient(180deg, #5C5C5C 0%, #3D3D3D 122%);

    .icon{
      width: 36px;
      height: 36px;
      margin-right:10px;
      margin-left:-48px;
    }
  }
  .bottom-box{
    width:100%;
    height:96px;
    background:url('@/assets/images/bottomBg.png');
    background-size: 100% 96px;
    position: relative;
    z-index: 2;
    padding: 0 180px;
    // background: linear-gradient(180.16deg, rgba(63, 63, 63, 0.9) 0.1%, #252525 99.83%);

    &>div{
      width:23%;
      cursor: pointer;
    }
    .icon{
      width: 30px;
      height: 30px;
      margin-right:10px;
    }
  }
  .bottom-soc{
    width:268px;
    height:76px;
    position: absolute;
    bottom:19px;
    z-index:1;
    right:0px;
    margin:auto;
    background: linear-gradient(180.09deg, #FF794F -1.06%, #EF523B 75.84%);
    .icon{
      width: 30px;
      height: 30px;
      margin-right:10px;
      margin-left:48px;
    }
  }
  .sos-jinling{
    width:457px;
    height:88px;
    background:url('@/assets/images/jingBg.png');
    background-size: 100% 116px;
    position: absolute;
    top:60px;
    left:50%;
    margin-left:-230px;
    font-size: 32px;
    cursor: pointer;
    padding-left:50px;
    &::before{
      content:'';
      display: inline-block;
      width:100px;
      height:100px;
      position: absolute;
      top:-4px;
      left:-50px;
      background:url('@/assets/images/jingling.png');
    }
    .txt1{
      font-size: 22px;
      margin-top:14px;
    }
    .txt2{
      font-size: 20px;
      opacity: 0.8;
      margin-top:6px;
    }
  }
  .hide{
    // display: none!important;
    visibility: hidden;
  }
  .show{
    display: block;
  }
}
.wc{
  background:#1A2130;
  width:100%;
  height:100%;
  .wc-box{
    padding: 140px 0 0 0;
    .bg{
      width: 1080px;
      height: 459px;

    }
    .content{
      width: 1760px;
      height:660px;
      border-radius: 16px;
      position: relative;
      background:#263041;
      padding:40px ;
      .left-box{
        height: 580px;
        .border-bg{
          min-height: 250px;
        }
      }
      .right-box{
        width: 1194px;
        height: 580px;
        border-radius: 16px;
        position: relative;
        background-image:linear-gradient(112.88deg, #52647D 4.92%, #34435B 22.21%, #313F56 35.62%, #2E3B51 55.07%, #314157 74.54%);
        .txt1{
          font-size: 72px;
        }
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
        .bg-liudong{
          position: absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
        }
      }
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
        margin-bottom:36px;
      }
      .txt2{
        font-size: 48px;
        opacity: 1;
        color:#fff;
        position: relative;
      }
      .txt3{
        font-size: 32px;
        color:#fff;
        opacity: 0.5;
        position: relative;
        margin-top:10px;
      }
      .txt4{
        font-size: 24px;
        font-weight: 400;
        line-height: 38px;
        color: #E3E7EE;
        position: relative;
      }
      .weizhi{
        width: 34px;
        height: 34px;
        border-radius: 50%;
        position: relative;
        margin-left:10px;
        background-image:linear-gradient(112.88deg, #52647D 4.92%, #34435B 22.21%, #313F56 35.62%, #2E3B51 55.07%, #314157 74.54%);
        &::before{
          content:'';
          display: inline-block;
          width: calc(100% - 6px);
          height: calc(100% - 6px);
          border-radius: 16px;
          position: absolute;
          top:3px;
          left:3px;
          border-radius: 50%;
          //background: #54647D88;
          background: #37ff4088;
        }

      }
      
      .weizhi-active{
          width: 34px;
          height: 34px;
          border-radius: 50%;
          position: relative;
          margin-left:10px;
          background-image:linear-gradient(112.88deg, #52647D 4.92%, #34435B 22.21%, #313F56 35.62%, #2E3B51 55.07%, #314157 74.54%);
          &::before{
            content:'';
            display: inline-block;
            width: calc(100% - 6px);
            height: calc(100% - 6px);
            border-radius: 16px;
            position: absolute;
            top:3px;
            left:3px;
            border-radius: 50%;
            background: #F95C2A;
          }
        }
        .weizhi-margin{
          margin:0 50px!important;
          width:80px;
          height:80px;
        }
    }
  .content1{
    width: 1760px;
    height:180px;
    border-radius: 16px;
    position: relative;
    background:#263041;
    padding:40px ;
    margin-top:40px;
    gap:20px;
    background-image:linear-gradient(112.88deg, #52647D 4.92%, #34435B 22.21%, #313F56 35.62%, #2E3B51 55.07%, #314157 74.54%);
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
      background: #263041;
    }
    .zhibiao{
      width:328px!important;
      .title-box{
        margin-bottom:14px;
        position: relative;
        z-index: 1;
        font-size: 30px;
      }
      .dot{
        width:8px;
        height:8px;
        border-radius: 50%;
        background-color:#3AAD81;
        margin-right:8px;
      }
      .color1{
        color:#39D72C
      }
      .bgcolor1{
        background:#39D72C
      }
      .color2{
        color:#2AD4F9
      }
      .bgcolor2{
        background:#2AD4F9
      }
      .color3{
        color:#FF5443
      }
      .bgcolor3{
        background:#FF5443
      }
    }
  }
  .border-bg{
    position: relative;
    width:456px;
    border-radius: 16px;
    padding:30px;
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
}
.wuxiu-box{
  padding: 16% 0 0 0;
  width:100%;
  position: absolute;
  .icon{
    width: 248px;
    height: 237px;

  }
  .txt1{
    font-size: 36px;
    font-weight: 400;
    line-height: 50.4px;
    color:#fff;
    margin-top:40px;

  }
  .btn{
    width: 180px;
    height: 64px;
    line-height: 64px;
    border-radius: 8px;
    font-size: 24px;
    background: #FFFFFF1A;
    color:#fff;
    text-align: center;
    margin-top:220px;
  }
}

.sos-animate{
  border: 1px solid #FF3636;
  box-shadow: inset 0 0 50px #FF363650;
  width:100%;
  height:100%;
  position: absolute;
  top:0;
  left:0;
  z-index: 10;
  &::after{
    content:'';
    display: inline-block;
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    border: 2px solid #FF3636;
    box-shadow: inset 0 0 120px #FF3636;
    animation: myfirst 1s infinite;
  }
  @keyframes myfirst
    {
        from {
          border: 2px solid #FF3636;
          box-shadow: inset 0 0 120px #FF3636;
        }
        to {
          border: 1px solid #FF363650;
          box-shadow: inset 0 0 120px #FF363600;
        }
    }
}
</style>
<style lang="scss">
.el-progress-bar__outer{
  overflow: visible !important;
}
.zhibiao.shadow .el-progress-bar{
  transform:rotate(180deg);
}
.zhibiao .el-progress-bar__outer{
  background: linear-gradient(90deg, #418BFB 0%, #87DD8B 25%, #EEE73D 50%, #F49301 75%, #EE4730 100%)!important;
}
.zhibiao.shadow .el-progress-bar__inner{
  background-color: rgba(61, 66, 69, 0.8)!important;
  height:6px;
  top:-1px;
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
.content .el-progress-bar__inner::after{
  width: 6px;
  height: 6px;
  position: absolute;
  right: 0px;
  border-radius: 50%;

  // top:0.5px;
  border: 4px solid #fff;
}
.content .zhibiao .el-progress-bar__outer{
  background: linear-gradient(90deg, #418BFB 0%, #87DD8B 25%, #EEE73D 50%, #F49301 75%, #EE4730 100%);
}
.wc .el-progress-bar__inner::after{
  width: 6px;
  height: 6px;
  position: absolute;
  right: 0px;
  border-radius: 50%;
  top:-2px;
  border: 4px solid #fff;
}
</style>
<style scoped lang="scss">
body{
  width:1920px;
  height:1080px;
}

.index-box{
  width: 100%;
  height:1080px;
  overflow: hidden;
  bottom:0;
  position: absolute;
  left:0;
  background-color:#fff !important;
}
:v-deep()  .el-overlay{
  background:#090909;
}
:v-deep()  .el-drawer__body{
  padding: 0!important;
}
</style>

