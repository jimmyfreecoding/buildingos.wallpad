<template>
  <!-- 主屏幕 -->
  <div
    v-if="
      !(
        obj.type === 'wc' ||
        obj.type === 'wcw' ||
        obj.type === 'wc1' ||
        obj.type === 'wc2'
      ) && !isWuxiui
    "
    class="main-box flex-col animate__animated"
  >
    <div v-if="sosAnimate" class="sos-animate"></div>
    <bgImage
      v-if="bgParams.type === 'image'"
      style="position: absolute; left: 0; top: 0"
      :bgUrls="bgParams.urls"
    ></bgImage>
    <bgVideo
      v-if="bgParams.type === 'video'"
      style="position: absolute; left: 0; top: 0; height: 100%; width: 100%"
      :bgUrls="bgParams.urls"
    ></bgVideo>
    <div
      :class="class6"
      style="position: absolute; left: 0; top: 0"
      class="bg-shdow animate__animated"
    ></div>

    <div
      style="position: absolute; top: 0; width: 100%; padding: 80px 100px"
      class="flex-row justify-between"
    >
      <Logo :class="class1" class="animate__animated" ref="logoCom"></Logo>
      <LocalTime :class="class2" class="animate__animated"></LocalTime>
    </div>

    <div
      style="position: absolute; top: 160px; width: 100%; padding: 80px 100px"
      class="content flex-row justify-between"
    >
      <div class="left flex-col justify-between">
        <IndexTitle
          :img="iconWen"
          :title="obj.floor + ' ' + obj.name + ' 室内'"
          style="opacity: 0.6"
        ></IndexTitle>
        <div class="flex-row align-end justify-between">
          <div class="title-num">
            <span style="font-family: DINPro, serif !important"
              >{{ parseInt(inside.temperature)
              }}<span class="font100" style="font-family: DINPro !important"
                >.{{ inside.temperature.toFixed(1).split(".")[1] }}</span
              ></span
            >
            <span class="unit">℃</span>
          </div>
          <el-divider
            v-if="!['52F', '53F', '54F'].includes(obj.floor)"
            direction="vertical"
            style="
              marginleft: 80px;
              width: 20px;
              opacity: 0.8;
              height: 125px;
              position: relative;
              bottom: 30px;
              color: red;
            "
          />
          <div style="flex: 1">
            <IndexTitle :img="iconTem" title="湿度"></IndexTitle>
            <div class="title-num1">
              {{ inside.humidity }}%
              <span style="color: #79d172; margin-left: 10px">{{getHuanjingText('humidity',inside.humidity)}}</span>
            </div>
          </div>
        </div>
        <div class="flex-row" style="gap: 20px">
          <div class="zhibiao shadow">
            <div class="title-box flex-row align-center justify-between">
              <div class="flex-row align-center">
                <div class="dot bgcolor1"></div>
                <div>甲醛</div>
              </div>
              <div class="color1" style="margin-left: 14px">安全</div>
            </div>
            <el-progress
              color="#00000000"
              :percentage="
                airValue(inside.formaldehyde, 'formaldehyde').parcent
              "
              :stroke-width="4"
            >
              {{ airValue(inside.formaldehyde, "formaldehyde").showValue }}mg/m³
            </el-progress>
          </div>
          <div class="zhibiao shadow">
            <div class="title-box flex-row align-center justify-between">
              <div class="flex-row align-center">
                <div class="dot bgcolor1"></div>
                <div>CO₂</div>
              </div>
              <div class="color1" style="margin-left: 14px">清新</div>
            </div>
            <el-progress
              color="#00000000"
              :percentage="airValue(inside.co2, 'co2').parcent"
              :stroke-width="4"
            >
              {{ airValue(inside.co2, "co2").showValue }}ppm
            </el-progress>
          </div>
          <div class="zhibiao shadow">
            <div class="title-box flex-row align-center justify-between">
              <div class="flex-row align-center">
                <div class="dot bgcolor1"></div>
                <div>PM2.5</div>
              </div>
              <div class="color1" style="margin-left: 14px">优</div>
            </div>
            <el-progress
              color="#00000000"
              :percentage="airValue(inside.pm25, 'pm25').parcent"
              :stroke-width="4"
            >
              {{ airValue(inside.pm25, "pm25").showValue
              }}<span style="letter-spacing: -3px">μg</span> /m³
            </el-progress>
          </div>
        </div>
      </div>
      <img class="bg-line" :src="bgLine" />
      <div class="right flex-col justify-between">
        <IndexTitle
          :img="iconWen"
          title="室外"
          style="opacity: 0.6"
        ></IndexTitle>
        <div class="flex-row align-end">
          <div class="title-num">
            {{ outside.temperatureNum }}<span class="font100">.0</span>
            <span class="unit">℃</span>
          </div>
          <div style="flex: 1">
            <div class="title-num1">{{ outside.today }}</div>
          </div>
        </div>
        <div class="flex-row" style="gap: 20px">
          <div class="zhibiao shadow">
            <div class="title-box flex-row align-center justify-between">
              <div class="flex-row align-center">
                <div class="dot bgcolor1"></div>
                <div>AQI</div>
              </div>
              <div class="color1" style="margin-left: 14px">清新</div>
            </div>
            <el-progress color="#00000000" :percentage="84" :stroke-width="4">
              <div
                text
                style="color: rgba(255, 255, 255, 0.4); text-align: right"
              >
                {{ outside.AIQ }}
              </div>
            </el-progress>
          </div>
          <div class="zhibiao shadow">
            <div class="title-box flex-row align-center justify-between">
              <div class="flex-row align-center">
                <div class="dot bgcolor1"></div>
                <div>PM2.5</div>
              </div>
              <div class="color1" style="margin-left: 14px">优</div>
            </div>
            <el-progress
              color="#00000000"
              :percentage="airValue(outside.pm25, 'pm25out').parcent"
              :stroke-width="4"
            >
              {{ outside.pm25 }}<span style="letter-spacing: -3px">μg</span> /m³
            </el-progress>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-tab">
      <div
        @click="showIndex(0)"
        class="bottom-all flex-row justify-center align-center"
      >
        <img class="icon" :src="tabAll" />
        <div>全部</div>
      </div>
      <div class="bottom-box flex-row align-center justify-around">
        <div
          @click="showIndex(0)"
          class="bottom-width flex-row justify-center align-center"
          style="opacity: 0"
        >
          <img class="icon" :src="tabAll" />
          <div>全部</div>
        </div>
        <div
          @click="showIndex(0)"
          class="flex-row justify-center align-center menu-box"
        >
          <img class="icon" :src="iconfw" />
          <div>行政服务</div>
        </div>
        <el-divider style="flex: 0 0 1px" direction="vertical" />
        <div
          @click="showIndex(2)"
          class="flex-row justify-center align-center menu-box"
        >
          <img class="icon" src="@/assets/images/iconzm.png" />
          <div>照明空调</div>
        </div>
        <el-divider style="flex: 0 0 1px" direction="vertical" />
        <div
          @click="showIndex(1)"
          class="flex-row justify-center align-center menu-box"
        >
          <img class="icon" src="@/assets/images/iconhj.png" />
          <div>室内环境</div>
        </div>
        <el-divider style="flex: 0 0 1px" direction="vertical" />
        <div
          v-if="obj.floor !== '54F'"
          @click="showIndex(3)"
          class="flex-row justify-center align-center menu-box"
        >
          <img class="icon" src="@/assets/images/iconkj.png" />
          <div>空间使用</div>
        </div>
        <div
          @click="openSos"
          class="bottom-width flex-row justify-center align-center"
          style="opacity: 0"
        >
          <img class="icon" :src="iconSos1" />
          <div>SOS</div>
        </div>
      </div>
      <div
        @click="openSos"
        class="bottom-soc flex-row justify-center align-center"
      >
        <img class="icon" :src="iconSos1" />
        <div style="margin-top: 4px">SOS</div>
      </div>
    </div>

    <div class="chahua" v-if="!['52F', '53F', '54F'].includes(obj.floor)">
      <img class="img" :src="chahua" />
      <div class="txt">
        <div>全天候温度、空气</div>
        <div>智能调节中~~</div>
      </div>
      <!-- <img  class="img" :src="chahua"/>
        <div class="txt" style="margin-left:6px">全天候温度、空气智能调节中~</div> -->
    </div>

    <div v-if="sosAnimate" class="sos-jinling flex-col justify-center">
      <div class="txt1">紧急呼叫中！安保人员正在前往此楼层</div>
      <div class="txt2">安保处联络方式：（0571）28098488</div>
    </div>
    <!-- 功能弹出层 -->
    <el-drawer
      append-top-body
      v-model="drawer"
      :modal="false"
      direction="btt"
      :show-close="false"
      :with-header="false"
      destroy-on-close
      class="cus-drawer"
      size="100%"
      :z-index="2"
    >
      <div class="index-box flex-row">
        <div v-if="sosAnimateDia" class="sos-animate"></div>
        <leftNav
          :style="
            obj.floor == '54F'
              ? tabIndex === 0 || tabIndex == 3 || tabIndex == 4
                ? 'width:220px;z-index:3'
                : 'width:1220px;z-index:3'
              : tabIndex === 0 || tabIndex == 4
              ? 'width:220px;z-index:3'
              : 'width:1220px;z-index:3'
          "
          :active="tabIndex"
          @clickChild="navFun"
          :data="{ obj: obj }"
        ></leftNav>
        <div
          style="
            width: calc(100% - 220px);
            height: 100%;
            background: #090909;
            z-index: 3;
            position: relative;
            left: -1px;
          "
        >
          <service
            ref="sosRef"
            v-if="tabIndex === 0 && !sosAnimateDia"
            @childFun="serviceGaojingFun"
            :disabledSos="disabledSos"
            :data="{ obj: obj }"
          ></service>
          <serviceGaojing
            v-if="tabIndex === 0 && sosAnimateDia"
            :data="{ obj: obj }"
          ></serviceGaojing>
          <huanjing
            v-if="tabIndex === 1"
            :data="{ obj: obj, inside: inside, outside: outside }"
          ></huanjing>
          <zhaoming
            v-if="tabIndex === 2"
            ref="zhaomingPanel"
            @syncLight="syncLight"
            @syncAllLight="syncAllLight"
            @syncLightStatus="syncLightStatus"
            :data="{
              obj,
              lightobj,
              acobj,
              inside,
              blind,
              blind2,
              air2,
            }"
            :lights="lights"
          ></zhaoming>
          <roomUse
            v-if="tabIndex === 3 && obj.floor !== '54F'"
            :data="{
              obj: obj,
              roomoSensorObj: roomoSensorObj,
              wcmanStatusObj: wcmanStatusObj,
              wcwomanStatusObj: wcwomanStatusObj,
            }"
          ></roomUse>
          <!--          <energyUse v-if="tabIndex===4" :data = "data"></energyUse>-->
          <intelligent
            v-if="obj.floor == '54F' ? tabIndex === 3 : tabIndex === 4"
            :data="data"
          ></intelligent>
        </div>
        <!-- 2.5D地图版本 start-->
        <div v-if="!(obj.floor == '54F' && tabIndex === 3)">
          <div
            v-if="
              (DYNAMIC_MAP_SHOW_FLOOR.includes(obj.floor) &&
                ![0, 4].includes(tabIndex) &&
                !mapDom) ||
              mapDom
            "
            class="floor-map dynamic"
            style="
              height: 100% !important;
              background: #161616;
              z-index: 2;
              flex: 1;
              -webkit-flex: 1;
              position: relative;
              left: -2px;
            "
          >
            <maps
              v-if="mapData"
              style="
                z-index: 2;
                flex: 1;
                -webkit-flex: 1;
                background-color: #161616;
              "
              ref="mapPanel"
              :tabIndex="tabIndex"
              :data="JSON.parse(mapData)"
              :lights="lights"
              :currentLight="currentLight"
              :currentLightStatus="currentLightStatus"
              @clickChild="clickEven"
            />
          </div>
          <!-- 2.5D地图版本 end-->
          <!-- 地图静态图片版本 start-->
          <div
            class="floor-map"
            v-if="[1].includes(tabIndex)"
            style="
              width: 800px;
              height: 100% !important;
              background: #161616;
              z-index: 2;
              flex: 1;
              -webkit-flex: 1;
              position: relative;
              left: -2px;
            "
          >
            <img
              :src="`/wallpad/images/map/${obj.floor}.png`"
              style="
                /* top: 146px; */
                width: 800px;
                background: #090909;
                z-index: 2;
                flex: 1;
                -webkit-flex: 1;
                position: relative;
              "
            />
          </div>
          <div
            class="floor-map"
            v-if="[2, 3].includes(tabIndex)"
            style="
              width: 800px;
              height: 100% !important;
              background: #161616;
              z-index: 2;
              flex: 1;
              -webkit-flex: 1;
              position: relative;
              left: -2px;
            "
          >
            <img
              :src="`/wallpad/images/map/${obj.floor}.png`"
              style="
                top: 146px;
                width: 800px;
                background: #090909;
                z-index: 2;
                flex: 1;
                -webkit-flex: 1;
                position: relative;
              "
            />
          </div>
          <!-- 地图静态图片版本 end-->
        </div>
      </div>
    </el-drawer>
  </div>
  <!-- 厕所屏幕 -->
  <div
    v-if="
      !['53F'].includes(obj.floor) && (obj.type === 'wc' || obj.type === 'wcw')
    "
    class="main-box flex-col animate__animated wc"
  >
    <div
      style="
        position: absolute;
        top: 0;
        width: 100%;
        padding: 80px 100px;
        z-index: 1;
      "
      class="flex-row justify-between"
    >
      <Logo :class="class1" class="animate__animated" ref="logoCom"></Logo>
      <LocalTime :class="class2" class="animate__animated"></LocalTime>
    </div>
    <div class="wc-box flex-col align-center">
      <div class="content flex-row align-center">
        <div class="left-box flex-col justify-between">
          <div class="border-bg" @click="handleCleanBtnStatus">
            <div class="txt1">
              {{ obj.type === "wc" ? "" : "" }}最近保洁时间
            </div>
            <div class="wc-clean">
              <div class="wc-clean__time">
                <div class="txt2">{{ baojie.endTime.split(" ")[1] }}</div>
                <div class="txt3">{{ baojie.endTime.split(" ")[0] }}</div>
              </div>
              <div class="wc-clean__btn" v-if="cleanBtnVisible">
                <el-button
                  v-if="!isOk"
                  type="success"
                  plain
                  @click="handleCleanRecord"
                  :loading="loading"
                  >立即清扫</el-button
                >
                <el-button
                  v-else
                  type="success"
                  :icon="CircleCheck"
                  class="result"
                  plain
                  >打卡成功</el-button
                >
              </div>
            </div>
          </div>
          <div class="border-bg" style="">
            <div class="txt1">其他楼层</div>
            <div class="txt4 flex-row align-center justify-between">
              <div>
                {{ otherFloor }}F-空闲：{{
                  obj.floor === "52F"
                    ? Object.values(ceowcStatusObj).filter(
                        (value) => value === 0
                      ).length +
                      Object.values(ceowcStatusObj2).filter(
                        (value) => value === 0
                      ).length
                    : Object.values(wcmanOtherFloorObj).filter(
                        (value) => value === 0
                      ).length
                }}
              </div>
              <div class="flex-row align-center">
                <div class="flex-row align-center" v-if="obj.floor !== '52F'">
                  <template
                    v-for="(item, index) in Object.keys(wcmanOtherFloorObj)"
                  >
                    <div
                      v-if="
                        [0, 1].includes(wcmanOtherFloorObj[item]) &&
                        item !== 'vip'
                      "
                      :key="index"
                      :class="
                        wcmanOtherFloorObj[item] === 0
                          ? 'weizhi'
                          : 'weizhi-active weizhi'
                      "
                      :style="{
                        marginLeft:
                          Object.keys(wcmanOtherFloorObj).length === 6 ||
                          Object.keys(wcmanOtherFloorObj2).length === 6
                            ? '10px'
                            : '15px',
                      }"
                    ></div>
                  </template>
                  <!-- <div class="weizhi weizhi-margin" ></div>
                 <div class="weizhi weizhi-margin" ></div>
                 <div class="weizhi weizhi-margin" ></div> -->
                </div>
                <div class="flex-row align-center" v-else>
                  <template
                    v-for="(item, index) in Object.keys(ceowcStatusObj).concat(
                      Object.keys(ceowcStatusObj2)
                    )"
                  >
                    <div
                      v-if="
                        [0, 1].includes(ceowcStatusObj[item]) ||
                        ([0, 1].includes(ceowcStatusObj2[item]) &&
                          item !== 'vip')
                      "
                      :key="index"
                      :class="
                        ceowcStatusObj[item] === 0 ||
                        ceowcStatusObj2[item] === 0
                          ? 'weizhi'
                          : 'weizhi-active weizhi'
                      "
                      :style="{
                        marginLeft: '15px',
                      }"
                    ></div>
                  </template>
                  <!-- <div class="weizhi weizhi-margin" ></div>
                 <div class="weizhi weizhi-margin" ></div>
                 <div class="weizhi weizhi-margin" ></div> -->
                </div>
                <el-divider
                  direction="vertical"
                  v-if="wcmanOtherFloorObj.hasOwnProperty('vip')"
                />
                <div
                  v-if="[0, 1].includes(wcmanOtherFloorObj.vip)"
                  :class="
                    wcmanOtherFloorObj.vip === 0
                      ? 'weizhi'
                      : 'weizhi-active weizhi'
                  "
                  :style="{
                    marginLeft:
                      Object.keys(wcmanOtherFloorObj).length === 6 ||
                      Object.keys(wcmanOtherFloorObj2).length === 6
                        ? '10px'
                        : '15px',
                  }"
                ></div>
              </div>
            </div>
            <el-divider v-if="obj.floor !== '52F'" />
            <div
              class="txt4 flex-row align-center justify-between"
              v-if="obj.floor !== '52F'"
            >
              <div>
                {{ otherFloor2 }}F-空闲：{{
                  Object.values(wcmanOtherFloorObj2).filter(
                    (value) => value === 0
                  ).length
                }}
              </div>
              <div class="flex-row align-center">
                <div class="flex-row align-center">
                  <template
                    v-for="(item, index) in Object.keys(wcmanOtherFloorObj2)"
                  >
                    <div
                      v-if="
                        [0, 1].includes(wcmanOtherFloorObj2[item]) &&
                        item !== 'vip'
                      "
                      :key="index"
                      :class="
                        wcmanOtherFloorObj2[item] === 0
                          ? 'weizhi'
                          : 'weizhi-active weizhi'
                      "
                      :style="{
                        marginLeft:
                          Object.keys(wcmanOtherFloorObj).length === 6 ||
                          Object.keys(wcmanOtherFloorObj2).length === 6
                            ? '10px'
                            : '15px',
                      }"
                    ></div>
                  </template>
                  <!-- <div class="weizhi weizhi-margin" ></div>
                 <div class="weizhi weizhi-margin" ></div>
                 <div class="weizhi weizhi-margin" ></div> -->
                </div>
                <el-divider
                  direction="vertical"
                  v-if="wcmanOtherFloorObj2.hasOwnProperty('vip')"
                />
                <div
                  v-if="[0, 1].includes(wcmanOtherFloorObj2.vip)"
                  :class="
                    wcmanOtherFloorObj2.vip === 0
                      ? 'weizhi'
                      : 'weizhi-active weizhi'
                  "
                  :style="{
                    marginLeft:
                      Object.keys(wcmanOtherFloorObj).length === 6 ||
                      Object.keys(wcmanOtherFloorObj2).length === 6
                        ? '10px'
                        : '15px',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="right-box flex-row align-center justify-center"
          style="flex: 1; text-align: center"
        >
          <img class="bg-liudong" :src="bgWC" />
          <!--        <img style="" class="bg" :src="wc"/>-->
          <div class="flex-col align-center">
            <div class="txt1">{{ obj.floor }}</div>
            <div
              v-if="obj.type === 'wc'"
              class="txt4 flex-row align-center justify-center"
            >
              <div class="flex-row align-center">
                <div class="flex-row align-center">
                  <template
                    v-for="(item, index) in Object.keys(wcmanStatusObj)"
                    :key="index"
                  >
                    <div
                      v-if="
                        [0, 1].includes(wcmanStatusObj[item]) && item !== 'vip'
                      "
                      :class="
                        wcmanStatusObj[item] === 0
                          ? 'weizhi weizhi-margin'
                          : 'weizhi-active weizhi-margin'
                      "
                    ></div>
                  </template>
                  <!-- <div class="weizhi weizhi-margin" ></div>
                 <div class="weizhi weizhi-margin" ></div>
                 <div class="weizhi weizhi-margin" ></div> -->
                </div>
                <el-divider
                  direction="vertical"
                  v-if="wcmanStatusObj.hasOwnProperty('vip')"
                />
                <div
                  v-if="[0, 1].includes(wcmanStatusObj.vip)"
                  :class="
                    wcmanStatusObj.vip === 0
                      ? 'weizhi weizhi-margin'
                      : 'weizhi-active weizhi-margin'
                  "
                ></div>
                <!-- <div class="weizhi-active weizhi-margin" ></div> -->
              </div>
            </div>

            <div
              v-if="obj.type === 'wcw'"
              class="txt4 flex-row align-center justify-center"
            >
              <div class="flex-row align-center">
                <div class="flex-row align-center">
                  <template
                    v-for="(item, index) in Object.keys(wcwomanStatusObj)"
                    :key="index"
                  >
                    <div
                      v-if="
                        [0, 1].includes(wcwomanStatusObj[item]) &&
                        item !== 'vip'
                      "
                      :class="
                        wcwomanStatusObj[item] === 0
                          ? 'weizhi weizhi-margin'
                          : 'weizhi-active weizhi-margin'
                      "
                    ></div>
                  </template>
                  <!-- <div class="weizhi weizhi-margin" ></div>
                                 <div class="weizhi weizhi-margin" ></div>
                                 <div class="weizhi weizhi-margin" ></div> -->
                </div>
                <el-divider
                  direction="vertical"
                  v-if="wcwomanStatusObj.hasOwnProperty('vip')"
                />
                <div
                  v-if="[0, 1].includes(wcwomanStatusObj.vip)"
                  :class="
                    wcwomanStatusObj.vip === 0
                      ? 'weizhi weizhi-margin'
                      : 'weizhi-active weizhi-margin'
                  "
                ></div>

                <!-- <div class="weizhi-active weizhi-margin" ></div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content1 flex-row align-center">
        <div class="border-bg zhibiao">
          <div class="title-box flex-row align-center justify-between">
            <div class="flex-row align-center">
              <div class="dot bgcolor1"></div>
              <div>温度</div>
            </div>
            <div class="color1" style="margin-left: 14px">舒适</div>
          </div>
          <el-progress
            color="#000"
            :percentage="100 - toiletAir.temperature"
            :stroke-width="4"
          >
            <div
              text
              style="
                font-size: 20px;
                color: rgba(255, 255, 255, 1);
                text-align: right;
              "
            >
              {{ toiletAir.temperature }}℃
            </div>
          </el-progress>
        </div>
        <div class="border-bg zhibiao">
          <div class="title-box flex-row align-center justify-between">
            <div class="flex-row align-center">
              <div class="dot bgcolor1"></div>
              <div>湿度</div>
            </div>
            <div class="color1" style="margin-left: 14px">{{getHuanjingText('humidity',toiletAir.humidity)}}</div>
          </div>
          <el-progress
            color="#000"
            :percentage="Math.ceil(100 - toiletAir.humidity)"
            :stroke-width="4"
          >
            <div
              text
              style="
                font-size: 20px;
                color: rgba(255, 255, 255, 1);
                text-align: right;
              "
            >
              {{ toiletAir.humidity?.toFixed(2) }}%
            </div>
          </el-progress>
        </div>
        <div class="border-bg zhibiao">
          <div class="title-box flex-row align-center justify-between">
            <div class="flex-row align-center">
              <div class="dot bgcolor2"></div>
              <div>硫化氢</div>
            </div>
            <div class="color1" style="margin-left: 14px">正常</div>
          </div>
          <el-progress
            color="#000"
            :percentage="airValue(toiletAir.h2s, 'h2s').parcent"
            :stroke-width="4"
          >
            <div
              text
              style="
                font-size: 20px;
                color: rgba(255, 255, 255, 1);
                text-align: right;
              "
            >
              {{ airValue(toiletAir.h2s, "h2s").showValue }}mg/m³
            </div>
          </el-progress>
        </div>
        <div class="border-bg zhibiao">
          <div class="title-box flex-row align-center justify-between">
            <div class="flex-row align-center">
              <div class="dot bgcolor1"></div>
              <div>PM2.5</div>
            </div>
            <div class="color1" style="margin-left: 14px">优</div>
          </div>
          <el-progress
            color="#000"
            :percentage="airValue(toiletAir.pm25, 'pm25').parcent"
            :stroke-width="4"
          >
            <div
              text
              style="
                font-size: 20px;
                color: rgba(255, 255, 255, 1);
                text-align: right;
              "
            >
              {{ airValue(toiletAir.pm25, "pm25").showValue
              }}<span style="letter-spacing: -3px">μg</span> /m³
            </div>
          </el-progress>
        </div>

        <div class="border-bg zhibiao">
          <div class="title-box flex-row align-center justify-between">
            <div class="flex-row align-center">
              <div class="dot bgcolor1"></div>
              <div>氨气</div>
            </div>
            <div class="color1" style="margin-left: 14px">正常</div>
          </div>
          <el-progress
            color="#000"
            :percentage="airValue(toiletAir.nh3, 'nh3').parcent"
            :stroke-width="4"
          >
            <div
              text
              style="
                font-size: 20px;
                color: rgba(255, 255, 255, 1);
                text-align: right;
              "
            >
              {{ airValue(toiletAir.nh3, "nh3").showValue }}mg/m³
            </div>
          </el-progress>
        </div>
      </div>
    </div>
  </div>
  <!-- 午休屏幕 -->
  <div v-if="!isWc && isWuxiui" class="main-box flex-col animate__animated">
    <div v-if="sosAnimate" class="sos-animate"></div>
    <bgImage
      style="position: absolute; left: 0; top: 0"
      :bgUrls="[{ url: wuxiuBg }]"
    ></bgImage>
    <div
      style="position: absolute; top: 0; width: 100%; padding: 80px 100px"
      class="flex-row justify-between"
    >
      <Logo :class="class1" class="animate__animated" ref="logoCom"></Logo>
      <LocalTime :class="class2" class="animate__animated"></LocalTime>
    </div>
    <div class="wuxiu-box flex-col align-center">
      <img style="" class="icon" :src="wuxiu" />
      <div class="txt1">当前已进入午休模式，照明将在午休结束后开启</div>
      <div @click="toMainBox" class="btn">返回首屏</div>
    </div>
  </div>
  <!-- 总裁层厕所屏幕 -->
  <div
    v-if="
      ['53F'].includes(obj.floor) && (obj.type === 'wc1' || obj.type === 'wc2')
    "
    class="main-box flex-col animate__animated wc"
  >
    <div
      style="
        position: absolute;
        top: 0;
        width: 100%;
        padding: 80px 100px;
        z-index: 1;
      "
      class="flex-row justify-between"
    >
      <Logo :class="class1" class="animate__animated" ref="logoCom"></Logo>
      <LocalTime :class="class2" class="animate__animated"></LocalTime>
    </div>
    <div class="wc-box flex-col align-center">
      <div class="content flex-row align-center">
        <div class="left-box flex-col justify-between">
          <div class="border-bg" @click="handleCleanBtnStatus">
            <div class="txt1">
              {{ obj.type === "wc" ? "" : "" }}最近保洁时间
            </div>
            <div class="wc-clean">
              <div class="wc-clean__time">
                <div class="txt2">{{ baojie.endTime.split(" ")[1] }}</div>
                <div class="txt3">{{ baojie.endTime.split(" ")[0] }}</div>
              </div>
              <div class="wc-clean__btn" v-if="cleanBtnVisible">
                <el-button
                  v-if="!isOk"
                  type="success"
                  plain
                  @click="handleCleanRecord"
                  :loading="loading"
                  >立即清扫</el-button
                >
                <el-button
                  v-else
                  type="success"
                  :icon="CircleCheck"
                  class="result"
                  plain
                  >打卡成功</el-button
                >
              </div>
            </div>
          </div>
          <div class="border-bg" style="">
            <div class="txt1">其他楼层</div>
            <div class="txt4 flex-row align-center justify-between">
              <div>
                {{ otherFloor }}F-空闲：{{
                  Object.values(wcmanOtherFloorObj).filter(
                    (value) => value === 0
                  ).length +
                  Object.values(wcwomanOtherFloorObj).filter(
                    (value) => value === 0
                  ).length
                }}
              </div>
              <div
                class="flex-row"
                :class="{ 'wc-reverse': obj.type === 'wc2' }"
              >
                <div class="flex-row align-center">
                  <div class="flex-row align-center">
                    <template
                      v-for="(item, index) in Object.keys(wcwomanOtherFloorObj)"
                    >
                      <div
                        v-if="
                          [0, 1].includes(wcwomanOtherFloorObj[item]) &&
                          item !== 'vip'
                        "
                        :key="index"
                        :class="
                          wcwomanOtherFloorObj[item] === 0
                            ? 'weizhi'
                            : 'weizhi-active weizhi'
                        "
                        :style="{
                          marginLeft:
                            Object.keys(wcwomanOtherFloorObj).length === 6
                              ? '10px'
                              : '15px',
                        }"
                      ></div>
                    </template>
                    <!-- <div class="weizhi weizhi-margin" ></div>
                 <div class="weizhi weizhi-margin" ></div>
                 <div class="weizhi weizhi-margin" ></div> -->
                  </div>
                  <el-divider
                    direction="vertical"
                    v-if="wcwomanOtherFloorObj.hasOwnProperty('vip')"
                  />
                  <div
                    v-if="[0, 1].includes(wcwomanOtherFloorObj.vip)"
                    :class="
                      wcwomanOtherFloorObj.vip === 0
                        ? 'weizhi'
                        : 'weizhi-active weizhi'
                    "
                    :style="{
                      marginLeft:
                        Object.keys(wcwomanOtherFloorObj).length === 6
                          ? '10px'
                          : '15px',
                    }"
                  ></div>
                </div>
                <el-divider
                  direction="vertical"
                  v-if="Object.keys(wcmanOtherFloorObj).length > 0"
                />
                <div class="flex-row align-center">
                  <div class="flex-row align-center">
                    <template
                      v-for="(item, index) in Object.keys(wcmanOtherFloorObj)"
                    >
                      <div
                        v-if="
                          [0, 1].includes(wcmanOtherFloorObj[item]) &&
                          item !== 'vip'
                        "
                        :key="index"
                        :class="
                          wcmanOtherFloorObj[item] === 0
                            ? 'weizhi'
                            : 'weizhi-active weizhi'
                        "
                        :style="{
                          marginLeft:
                            Object.keys(wcmanOtherFloorObj).length === 6 ||
                            Object.keys(wcmanOtherFloorObj2).length === 6
                              ? '10px'
                              : '15px',
                        }"
                      ></div>
                    </template>
                    <!-- <div class="weizhi weizhi-margin" ></div>
                 <div class="weizhi weizhi-margin" ></div>
                 <div class="weizhi weizhi-margin" ></div> -->
                  </div>
                  <el-divider
                    direction="vertical"
                    v-if="wcmanOtherFloorObj.hasOwnProperty('vip')"
                  />
                  <div
                    v-if="[0, 1].includes(wcmanOtherFloorObj.vip)"
                    :class="
                      wcmanOtherFloorObj.vip === 0
                        ? 'weizhi'
                        : 'weizhi-active weizhi'
                    "
                    :style="{
                      marginLeft:
                        Object.keys(wcmanOtherFloorObj).length === 6 ||
                        Object.keys(wcmanOtherFloorObj2).length === 6
                          ? '10px'
                          : '15px',
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="right-box flex-row align-center justify-center"
          style="flex: 1; text-align: center"
        >
          <img class="bg-liudong" :src="bgWC" />
          <!--        <img style="" class="bg" :src="wc"/>-->
          <div class="flex-col align-center">
            <div class="txt1">{{ obj.floor }}</div>
            <div
              style="display: flex; align-items: center"
              :class="{ 'wc-reverse': obj.type === 'wc1' }"
            >
              <div class="txt4 flex-row align-center justify-center">
                <div class="flex-row align-center">
                  <div class="flex-row align-center">
                    <template
                      v-for="(item, index) in Object.keys(wcmanStatusObj)"
                      :key="index"
                    >
                      <div
                        v-if="
                          [0, 1].includes(wcmanStatusObj[item]) &&
                          item !== 'vip'
                        "
                        :class="
                          wcmanStatusObj[item] === 0
                            ? 'weizhi weizhi-margin'
                            : 'weizhi-active weizhi-margin'
                        "
                      ></div>
                    </template>
                    <!-- <div class="weizhi weizhi-margin" ></div>
                 <div class="weizhi weizhi-margin" ></div>
                 <div class="weizhi weizhi-margin" ></div> -->
                  </div>
                  <el-divider
                    direction="vertical"
                    v-if="wcmanStatusObj.hasOwnProperty('vip')"
                  />
                  <div
                    v-if="[0, 1].includes(wcmanStatusObj.vip)"
                    :class="
                      wcmanStatusObj.vip === 0
                        ? 'weizhi weizhi-margin'
                        : 'weizhi-active weizhi-margin'
                    "
                  ></div>
                  <!-- <div class="weizhi-active weizhi-margin" ></div> -->
                </div>
              </div>
              <el-divider direction="vertical" style="height: 3em" />
              <div class="txt4 flex-row align-center justify-center">
                <div class="flex-row align-center">
                  <div class="flex-row align-center">
                    <template
                      v-for="(item, index) in Object.keys(wcwomanStatusObj)"
                      :key="index"
                    >
                      <div
                        v-if="
                          [0, 1].includes(wcwomanStatusObj[item]) &&
                          item !== 'vip'
                        "
                        :class="
                          wcwomanStatusObj[item] === 0
                            ? 'weizhi weizhi-margin'
                            : 'weizhi-active weizhi-margin'
                        "
                      ></div>
                    </template>
                    <!-- <div class="weizhi weizhi-margin" ></div>
                                 <div class="weizhi weizhi-margin" ></div>
                                 <div class="weizhi weizhi-margin" ></div> -->
                  </div>
                  <el-divider
                    direction="vertical"
                    v-if="wcwomanStatusObj.hasOwnProperty('vip')"
                  />
                  <div
                    v-if="[0, 1].includes(wcwomanStatusObj.vip)"
                    :class="
                      wcwomanStatusObj.vip === 0
                        ? 'weizhi weizhi-margin'
                        : 'weizhi-active weizhi-margin'
                    "
                  ></div>

                  <!-- <div class="weizhi-active weizhi-margin" ></div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content1 flex-row align-center">
        <div class="border-bg zhibiao">
          <div class="title-box flex-row align-center justify-between">
            <div class="flex-row align-center">
              <div class="dot bgcolor1"></div>
              <div>温度</div>
            </div>
            <div class="color1" style="margin-left: 14px">舒适</div>
          </div>
          <el-progress
            color="#000"
            :percentage="100 - toiletAir.temperature"
            :stroke-width="4"
          >
            <div
              text
              style="
                font-size: 20px;
                color: rgba(255, 255, 255, 1);
                text-align: right;
              "
            >
              {{ toiletAir.temperature }}℃
            </div>
          </el-progress>
        </div>
        <div class="border-bg zhibiao">
          <div class="title-box flex-row align-center justify-between">
            <div class="flex-row align-center">
              <div class="dot bgcolor1"></div>
              <div>湿度</div>
            </div>
            <div class="color1" style="margin-left: 14px">舒适</div>
          </div>
          <el-progress
            color="#000"
            :percentage="Math.ceil(100 - toiletAir.humidity)"
            :stroke-width="4"
          >
            <div
              text
              style="
                font-size: 20px;
                color: rgba(255, 255, 255, 1);
                text-align: right;
              "
            >
              {{ toiletAir.humidity?.toFixed(2) }}%
            </div>
          </el-progress>
        </div>
        <div class="border-bg zhibiao">
          <div class="title-box flex-row align-center justify-between">
            <div class="flex-row align-center">
              <div class="dot bgcolor2"></div>
              <div>硫化氢</div>
            </div>
            <div class="color1" style="margin-left: 14px">正常</div>
          </div>
          <el-progress
            color="#000"
            :percentage="airValue(toiletAir.h2s, 'h2s').parcent"
            :stroke-width="4"
          >
            <div
              text
              style="
                font-size: 20px;
                color: rgba(255, 255, 255, 1);
                text-align: right;
              "
            >
              {{ airValue(toiletAir.h2s, "h2s").showValue }}mg/m³
            </div>
          </el-progress>
        </div>
        <div class="border-bg zhibiao">
          <div class="title-box flex-row align-center justify-between">
            <div class="flex-row align-center">
              <div class="dot bgcolor1"></div>
              <div>PM2.5</div>
            </div>
            <div class="color1" style="margin-left: 14px">优</div>
          </div>
          <el-progress
            color="#000"
            :percentage="airValue(toiletAir.pm25, 'pm25').parcent"
            :stroke-width="4"
          >
            <div
              text
              style="
                font-size: 20px;
                color: rgba(255, 255, 255, 1);
                text-align: right;
              "
            >
              {{ airValue(toiletAir.pm25, "pm25").showValue
              }}<span style="letter-spacing: -3px">μg</span> /m³
            </div>
          </el-progress>
        </div>

        <div class="border-bg zhibiao">
          <div class="title-box flex-row align-center justify-between">
            <div class="flex-row align-center">
              <div class="dot bgcolor1"></div>
              <div>氨气</div>
            </div>
            <div class="color1" style="margin-left: 14px">正常</div>
          </div>
          <el-progress
            color="#000"
            :percentage="airValue(toiletAir.nh3, 'nh3').parcent"
            :stroke-width="4"
          >
            <div
              text
              style="
                font-size: 20px;
                color: rgba(255, 255, 255, 1);
                text-align: right;
              "
            >
              {{ airValue(toiletAir.nh3, "nh3").showValue }}mg/m³
            </div>
          </el-progress>
        </div>
      </div>
    </div>
  </div>
  <!-- sos弹窗 -->
  <el-dialog
    class="soc-dia"
    v-model="dialogSOS"
    append-top-body
    top="280px"
    width="450"
    :show-close="false"
  >
    <div class="title">SOS紧急呼叫</div>
    <div class="txt1">
      当您处于紧急情况下可点击立即呼叫，系统将发送当前位置的求助信息至安保值班室
    </div>
    <div class="txt2">7*24小时安保电话:（0571）28098488</div>
    <template #footer>
      <div class="dialog-footer flex-row justify-center">
        <el-button type="default" @click="dialogSOS = false">取消</el-button>
        <el-button type="danger" @click="sosConfirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogFormVisible" title="初始化平板" width="500">
    <el-form :model="form">
      <el-form-item label="属地" :label-width="formLabelWidth">
        <el-select v-model="form.spaceIndex" placeholder="选择属地">
          <el-option
            :label="space.name"
            :value="index"
            v-for="(space, index) in spaceObj"
            :key="index"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="楼层区域"
        :label-width="formLabelWidth"
        v-if="spaceObj[form.spaceIndex]"
      >
        <el-select v-model="form.floorareaIndex" placeholder="选择楼层区域">
          <el-option
            :label="fa.name"
            :value="index2"
            v-for="(fa, index2) in spaceObj[form.spaceIndex].floorArea"
            :key="index2"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="楼层"
        :label-width="formLabelWidth"
        v-if="
          spaceObj[form.spaceIndex] &&
          spaceObj[form.spaceIndex].floorArea &&
          spaceObj[form.spaceIndex].floorArea[form.floorareaIndex]
        "
      >
        <el-select v-model="form.floorIndex" placeholder="选择楼层">
          <el-option
            :label="floor.name"
            :value="index"
            v-for="(floor, index) in spaceObj[form.spaceIndex].floorArea[
              form.floorareaIndex
            ].floor"
            :key="index"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="绑定区域"
        :label-width="formLabelWidth"
        v-if="
          spaceObj[form.spaceIndex] &&
          spaceObj[form.spaceIndex].floorArea &&
          spaceObj[form.spaceIndex].floorArea[form.floorareaIndex] &&
          spaceObj[form.spaceIndex].floorArea[form.floorareaIndex].floor[
            form.floorIndex
          ]
        "
      >
        <el-select v-model="form.areaIndex" placeholder="绑定区域" size="large">
          <el-option
            :label="area.name"
            :value="index"
            v-for="(area, index) in spaceObj[form.spaceIndex].floorArea[
              form.floorareaIndex
            ].floor[form.floorIndex].area"
            :key="index"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="绑定类型" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="绑定类型" size="large">
          <el-option label="墙面pad" value="wall" />
          <el-option
            label="卫生间pad-男"
            :value="
              ['53F'].includes(
                spaceObj[form.spaceIndex]?.floorArea?.[form.floorareaIndex]
                  ?.floor?.[form.floorIndex]?.code
              )
                ? 'wc1'
                : 'wc'
            "
          />
          <el-option
            label="卫生间pad-女"
            :value="
              ['53F'].includes(
                spaceObj[form.spaceIndex]?.floorArea?.[form.floorareaIndex]
                  ?.floor?.[form.floorIndex]?.code
              )
                ? 'wc2'
                : 'wcw'
            "
          />
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
        <el-button type="primary" @click="saveData"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
  <audio
    style="display: none"
    ref="audioPlayer"
    src="http://10.205.66.6:1880/file/emergent/voice.mp3"
    controls
    @ended="restartAudio"
  ></audio>
</template>
<script setup>
import "animate.css";
import { CircleCheck, WarnTriangleFilled } from "@element-plus/icons-vue";
import { http } from "@/utils/http";
import moment from "moment";
import { ElMessage } from "element-plus";
import autofit from "autofit.js";
import LocalTime from "@/components/localTime.vue";
import Logo from "@/components/logo.vue";
import bgImage from "@/components/bgImage.vue";
import IndexTitle from "@/components/indexTitle.vue";
import leftNav from "@/views/components/leftNav.vue";
import huanjing from "@/views/components/huanjing.vue";
import zhaoming from "@/views/components/zhaoming.vue";
// import energyUse from "@/views/components/energyUse.vue";
import roomUse from "@/views/components/roomUse.vue";
import service from "@/views/components/service.vue";
import serviceGaojing from "@/views/components/serviceGaojing.vue";
import intelligent from "@/views/components/intelligent.vue";
import maps from "@/views/components/maps.vue";
import iconTem from "@/assets/images/temWhite.png";
import iconWen from "@/assets/images/wenWhite.png";
import iconfw from "@/assets/images/iconfw.png";
import bg from "@/assets/images/bgNew1.jpg"; //背景图片——————bgNew1--bgNew5
// import tabBgall from "@/assets/images/tabBgall.png";
import bgLine from "@/assets/images/bgLine.png";
// import bgIconsos from "@/assets/images/bgIconsos.png";
import tabAll from "@/assets/images/tabAll.png";
import iconSos1 from "@/assets/images/iconSos1.png";
import chahua from "@/assets/images/chahuaNew1.png";
import bgWC from "@/assets/images/bgWC.png";
import bgVideo from "@/components/bgVideo.vue";
import { logClk } from "@/utils/logClk";
const subscribe = inject('subscribe') // 订阅信息
const unsubscribe = inject('unsubscribe') // 订阅信息
const getMessage = inject('getMessage') // 订阅信息
const publish = inject('publish') // 订阅信息
// import { ajaxUpload } from "element-plus/es/components/upload/src/ajax";
//add by jimmy 1015
import axios from 'axios'
const getStructure = async () => {
  try {
    await axios.post('http://10.205.66.6:1880/iot/setting/get/structure', {}).then(res =>{
      spaceObj.value = res.data
      spaceObj.value.forEach(function(s) {
        if(!s.mqttstring){
          if(s.code=='SH-IJ'){
            s.mqttstring = 'eyJ1cmwiOiJ3czovLzEwLjEzOC40My4xMDk6MTg4MyIsInVzZXJuYW1lIjoiemVla3IiLCJwYXNzd29yZCI6InplZWtyIn0='
            s.videourl = '1111'
          }else{
            s.mqttstring = 'eyJ1cmwiOiJ3czovLzEwLjIwNS42Ni44OjE4ODQiLCJ1c2VybmFtZSI6InplZWtyX2lvdF9wbGF0Zm9ybSIsInBhc3N3b3JkIjoianAyY0pGSjFBRWVPRlVQWWNXTEYifQ=='
            s.videourl = '222'
          }
        }
      });
    })
  } catch (error) {
    console.error(error)
  }
}
//end by jimmy 1015

// 配置需要显示动态2.5D地图的楼层
const DYNAMIC_MAP_SHOW_FLOOR = [];
const obj = ref({}); //本地配置对象
const blind = ref([]);
const blind2 = ref([]);
const air2 = ref([]);
const dialogFormVisible = ref(false); //配置窗口
const timer1 = ref(null);
const timer2 = ref(null);
const timer3 = ref(null);
const loading = ref(false);
const isOk = ref(false);
const cleanBtnVisible = ref(false);
const timer4 = ref(null);
const timer5 = ref(null);
const timer6 = ref(null);
const mapDom = ref(null);
const audioPlayer = ref(null);
const drawer = ref(false);
const isWc = ref(true); //是否是厕所屏幕
const isWuxiui = ref(false); //是否午休
const tabIndex = ref(0); //选中菜单map
// const obj = ref(null)
const class1 = ref("");
const class2 = ref("");
const spaceObj = ref([]);
const ceoHuanJingObj1 = ref({});
const ceoHuanJingObj2 = ref({});
const padObj = ref({
  name: "",
  code: "",
  gateway: "",
  layer: "",
  status: {
    online: 1,
    status: "busy",
  },
});
const lightobj = ref([
  // { name: "照明 1", status: 1 }, //0：关，1：开
  // { name: "照明 2", status: 0 },
  // { name: "照明 3", status: 1 },
  // { name: "照明 4", status: 1 },
  // { name: "过道照明 1", status: 1 },
  // { name: "过道照明 2", status: 1 },
]);
const lights = ref([]);
const acobj = ref([]);
const mapData = ref(null);
// const roomObj = ref([])
const roomoSensorObj = ref([]);
// const tolietobj = ref([])
const wcmanStatusObj = ref({});
const wcmanOtherFloorObj = ref({});
const wcwomanOtherFloorObj = ref({});
const wcmanOtherFloorObj2 = ref({});
const wcwomanStatusObj = ref({});
const ceowcStatusObj = ref({});
const ceowcStatusObj2 = ref({});
const otherFloor = ref();
const otherFloor2 = ref();
const otherArea = ref();
const otherArea2 = ref();
const airsensorMap = ref([]);
const baojie = ref({
  endTime: "--",
});
const toiletAir = ref({});
const dialogSOS = ref(false);
const disabledSos = ref(false);
const sosAnimate = ref(false); // 首页告警
const sosAnimateDia = ref(false); // 弹窗页告警
const currentLightStatus = ref(false);
const currentLight = ref({});
const serviceGaojingFun = () => {
  sosConfirm();

  isWuxiui.value = false;
  drawer.value = false;
  disabledSos.value = true;
  //三秒后关闭告警
  // setTimeout(()=>{
  //     sosAnimateDia.value = false
  // },3000)
};
const form = reactive({
  floorarea: "",
  name: "",
  code: "",
  floor: "",
  type: "",
  space: "",
  spaceIndex: 0,
  spaceObject:{},//add by Jimmy 1015
  floorareaIndex: 0,
  floorIndex: 0,
  areaIndex: 0,
});
// getHuanjingText
const getHuanjingText = (t,v) => {
  let retrunText = ""
  if(t==='humidity'){ 
    retrunText = "舒适"
    if(v<30){
      retrunText = "干燥"
    }else if(v<=60||v>=30){
      retrunText = "舒适"

    }else if(v>60){
      retrunText = "高湿"
    }
  }
//过渡季
  // if(t==='humidity'){ 
  //   retrunText = "舒适"
  //   if(v<30){
  //     retrunText = "干燥"
  //   }else if(v<=70||v>=30){
  //     retrunText = "适宜"

  //   }else if(v>70){
  //     retrunText = "高湿"
  //   }
  // }
//夏季
  // if(t==='humidity'){ 
  //   retrunText = "舒适"
  //   if(v<40){
  //     retrunText = "干燥"
  //   }else if(v<=60||v>=40){
  //     retrunText = "适宜"
  //   }else if(v<=70||v>60){
  //     retrunText = "微湿"
  //   }else if(v>70){
  //     retrunText = "高湿"
  //   }
  // }


  return retrunText
};
const cannelSos = () => {
  sosAnimate.value = false;
};

const openSos = () => {
  if (sosAnimate.value) return;

  dialogSOS.value = true;
};

const showIndex = (e) => {
  if ([0, 4].includes(e)) {
    mapDom.value = null;
  }
  drawer.value = true;
  tabIndex.value = e;

  if (timer2.value) {
    clearTimeout(timer2.value);
  }

  timer2.value = setTimeout(() => {
    navFun(-1);
    instance.refs.zhaomingPanel?.feedbackVisible();
    instance.refs.sosRef?.sosVisible();
  }, 1000 * 60 * 3);
};
// 弹窗收起，清理定时器
watch(drawer, (n, o) => {
  if (n === false) {
    clearTimeout(timer2);
  }
});

const renderMapDom = (index, dom) => {
  if (!dom) return;

  if (![0, 4].includes(index)) {
    dom.style.zIndex = 2;
    dom.style.width = "800px";
  } else {
    dom.style.zIndex = -1;
    dom.style.width = 0;
  }
};

// map init
watch(
  tabIndex,
  (n, o) => {
    if (!mapDom.value) {
      // 清理
      clearTimeout(timer6.value);
      // 延迟获取
      timer6.value = setTimeout(() => {
        mapDom.value = document.querySelector(".floor-map.dynamic");
        renderMapDom(n, mapDom.value);
      }, 50);
      return;
    }

    renderMapDom(n, mapDom.value);
  },
  { immediate: true }
);

const handleCleanBtnStatus = () => {
  if (timer5.value) {
    clearTimeout(timer5.value);
  }

  cleanBtnVisible.value = true;

  timer5.value = setTimeout(() => {
    cleanBtnVisible.value = false;
  }, 15000);
};
// 处理timestamp
const formatTimestamp = (tmp = "") => {
  return moment(tmp).format("YYYY-MM-DD HH:mm");
};
// 保洁打卡
const handleCleanRecord = () => {
  try {
    clearTimeout(timer5);

    const timeSliceTmp =
      new Date(moment().format("YYYY-MM-DD HH:mm")).getTime() -
      (new Date(moment().format(baojie.value?.endTime)).getTime() || 0);
    if (timeSliceTmp < 5 * 60 * 1000) {
      ElMessage({
        dangerouslyUseHTMLString: true,
        message:
          '<div style="color: #fff;font-size: 14px;margin-bottom: 8px">刚刚已经清扫过啦~</div><div style="color: #fff;font-size: 14px;">如果需要再次打卡，至少5分钟后才能操作！</div>',
        type: "warning",
        offset: 100,
        duration: 5000,
        icon: WarnTriangleFilled,
        style: {
          flexDirection: "column",
          justifyContent: "space-around",
          height: "110px",
          backgroundColor: "rgba(0, 0, 0, .2)",
          borderRadius: "9px",
          border: "none",
          textAlign: "center",
          fontSize: "28px",
          color: "red",
        },
      });
      return;
    }

    loading.value = true;
    if (obj.value.type === "wc1" || obj.value.type === "wc2") {
      const spaceCode1 = `HGH-WC_${obj.value.floorarea}_${obj.value.floor}_${
        obj.value.type === "wc1" ? "TMAN1" : "TMAN2"
      }`;
      const spaceCode2 = `HGH-WC_${obj.value.floorarea}_${obj.value.floor}_${
        obj.value.type === "wc1" ? "TWOMAN1" : "TWOMAN2"
      }`;
      console.log(spaceCode1);
      console.log(spaceCode2);
      const time = moment().format("YYYY-MM-DD HH:mm");
      http(`/setCleanTime`, "GET", {
        spaceCode: spaceCode1,
        time: encodeURIComponent(time),
      }).then((data) => {
        console.log(data);
        if (timer4.value) clearTimeout(timer4.value);

        isOk.value = !!data?.success;
        // 时间更新
        if (data?.timestamp) {
          baojie.value.endTime = formatTimestamp(data?.timestamp);
          localStorage.setItem("BAOJIE_TIME", data?.timestamp);
        }
        // 重置
        if (isOk.value) {
          timer4.value = setTimeout(() => {
            isOk.value = false;
            cleanBtnVisible.value = false;
          }, 3000);
        }
      });
      http(`/setCleanTime`, "GET", {
        spaceCode: spaceCode2,
        time: encodeURIComponent(time),
      }).then((data) => {
        console.log(data);
        if (timer4.value) clearTimeout(timer4.value);

        isOk.value = !!data?.success;
        // 时间更新
        if (data?.timestamp) {
          baojie.value.endTime = formatTimestamp(data?.timestamp);
          localStorage.setItem("BAOJIE_TIME", data?.timestamp);
        }
        // 重置
        if (isOk.value) {
          timer4.value = setTimeout(() => {
            isOk.value = false;
            cleanBtnVisible.value = false;
          }, 3000);
        }
      });
    } else {
      const spaceCode = `HGH-WC_${obj.value.floorarea}_${obj.value.floor}_${obj.value.code}`;
      const time = moment().format("YYYY-MM-DD HH:mm");
      http(`/setCleanTime`, "GET", {
        spaceCode,
        time: encodeURIComponent(time),
      }).then((data) => {
        console.log(data);
        if (timer4.value) clearTimeout(timer4.value);

        isOk.value = !!data?.success;
        // 时间更新
        if (data?.timestamp) {
          baojie.value.endTime = formatTimestamp(data?.timestamp);
          localStorage.setItem("BAOJIE_TIME", data?.timestamp);
        }
        // 重置
        if (isOk.value) {
          timer4.value = setTimeout(() => {
            isOk.value = false;
            cleanBtnVisible.value = false;
          }, 3000);
        }
      });
    }

    loading.value = false;
  } catch (e) {
    loading.value = false;
  }
};

//菜单点击事件
const navFun = (e) => {
  if (e === -1) {
    drawer.value = false;
    return false;
  }
  tabIndex.value = e;
};
//午休返回首页
const toMainBox = () => {
  isWuxiui.value = false;
  drawer.value = false;
};

const stopTimer = (time) => {
  if (time) {
    clearInterval(time);
    time = null;
  }
};
const airValue = (avalue, airtype) => {
  let airValue = {
    showValue: "0",
    parcent: 0,
  };
  // console.info("airValue"+airtype)
  if (airtype === "formaldehyde") {
    let sValue = (avalue * 1.23).toFixed(3);
    sValue = parseFloat(sValue);
    // console.info("sValue"+sValue)
    let tValue = sValue > 0.08 ? 0.07 : sValue;
    console.info("tValue" + tValue);
    if (tValue === 0) {
      tValue = 0.001;
    }
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 0.16) * 100;
    // console.info(airValue.parcent)
  } else if (airtype === "co2") {
    let sValue = avalue;
    // console.info("sValue"+sValue)
    let tValue = sValue > 1000 ? 802 : sValue;
    // console.info("tValue"+tValue)
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 2000) * 100;
    // console.info(airValue.parcent)
  } else if (airtype === "pm25") {
    let sValue = avalue;
    // console.info("sValue"+sValue)
    let tValue = sValue > 75 ? 75 : sValue;
    // console.info("tValue"+tValue)
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 400) * 100;
    // console.info(airValue.parcent)
  } else if (airtype === "tvoc") {
    let sValue = (avalue * 0.0023).toFixed(3);
    sValue = parseFloat(sValue);
    // console.info("sValue"+sValue)
    let tValue = sValue > 0.4 ? 0.4 : sValue;
    // console.info("tValue"+tValue)
    if (tValue === 0) {
      tValue = 0.1;
    }
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 2) * 100;
    // console.info(airValue.parcent)
  } else if (airtype === "h2s") {
    let sValue = (avalue * 1.391).toFixed(3);
    // console.info("sValue"+sValue)
    sValue = parseFloat(sValue);
    let tValue = sValue > 0.011 ? 0.011 : sValue;
    tValue = parseFloat(tValue);
    // console.info("tValue"+tValue)
    // console.info(tValue === 0)
    if (tValue === 0) {
      tValue = 0.001;
    }
    airValue.showValue = tValue;
    // console.info("tValue"+tValue)
    airValue.parcent = 100 - (tValue / 0.02) * 100;
    // console.info(airValue.parcent)
  } else if (airtype === "nh3") {
    let sValue = (avalue * 0.695).toFixed(3);
    sValue = parseFloat(sValue);
    // console.info("sValue"+sValue)
    let tValue = sValue > 9 ? 9.2 : sValue;
    // console.info("tValue"+tValue)
    if (tValue === 0) {
      tValue = 0;
    }
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 20) * 100;
    // console.info(airValue.parcent)
  } else if (airtype === "pm25out") {
    let sValue = avalue;
    let tValue = sValue;
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 400) * 100;
    // console.info(airValue.parcent)
  }
  return airValue;
};
// bgParams:{
//   type: 'video',
//       urls:[{url:'/zeekrpad/images/rain.mp4'}]
// },
let flag = true;
let bgParams = reactive({ type: "image", urls: [{ url: bg }] });

//页面数据
const outside = ref({
  humidity: 20,
  temperature: 20,
  temperatureNum: 20,
  humidityNum: 45,
  today: "",
  AIQ: 20,
  suggest: 20,
  pm25: 20,
  wind: 0,
});
const inside = ref({
  co2: 552,
  formaldehyde: 0,
  humidity: 42.3,
  light: 35,
  online: 1,
  pm10: 37,
  pm25: 29,
  status: "on",
  temperature: 24.1,
  tvoc: 408,
});

const map = ref(null);
const mapFlag = ref(false);

const getMap = () => {
  if (
    mapFlag.value == null ||
    document.getElementById("mapId").innerHTML == ""
  ) {
    mapFlag.value = true;
    setTimeout(function () {
      console.info("newmap");
      // console.info(document.getElementById("mapId"))
      map.value = new AirocovMap.Map({
        container: document.getElementById("mapId"),
        mapUrl: `/wallpad/static/acmap/${obj.value.floor}.acmap`,
        themeUrl: "/wallpad/static/theme/theme.json",
        floorSwitch: { show: false },
        mergeModels: ["desk", "seat", "wall"],
        clickModels: ["seat"],
        key: "KMED1W0N50YIWIYJCUNLYPMJ49JDLASE",
        zoom: 0.7,
        bgColor: "#090909",
        minPolarAngle: 0,
        maxPolarAngle: 180,
        name: "ZeekrMap",
        font: {
          fontScale: 2,
          fontFamily: '"Microsoft YaHei",微软雅黑,"Microsoft YaHei",sans-serif',
          color: "#000",
          strokecolor: "#FFF",
          iconScale: 1,
          indent: 5,
        },
        onReady: function () {
          // map.value.event.on('click', handleClick); // 左键单击
          map.value.enableControl(true);
          // map.value.render.camera.control.autoRotate = false;
          // //当前位置标识
          // setWallpad(obj.value.code)
          // //照明标识
          // setLight(obj.value.code)
          //空气标识
          // setAir(obj.value.code)
        },
      });
    }, 3000);
  }
};
const getOtherFloor = () => {
  let floor = parseInt(
    obj.value.floor.substring(0, obj.value.floor.length - 1)
  );
  otherArea.value = obj.value.floorarea;
  otherArea2.value = obj.value.floorarea;
  switch (floor) {
    case 23:
      otherFloor.value = floor + 1;
      otherFloor2.value = floor + 2;
      break;
    case 51:
      otherFloor.value = floor - 1;
      otherFloor2.value = floor - 2;
      break;
    case 32:
      otherArea.value = "A4";
      otherFloor.value = floor + 4;
      otherFloor2.value = floor - 1;
      break;
    case 36:
      otherArea2.value = "A3";
      otherFloor.value = floor + 1;
      otherFloor2.value = floor - 4;
      break;
    case 43:
      otherArea.value = "A5";
      otherFloor.value = floor + 2;
      otherFloor2.value = floor - 1;
      break;
    case 45:
      otherArea2.value = "A4";
      otherFloor.value = floor + 1;
      otherFloor2.value = floor - 2;
      break;
    case 52:
      otherArea.value = "A5";
      otherFloor.value = floor + 1;
      break;
    case 53:
      otherArea.value = "A5";
      otherFloor.value = floor - 1;
      break;
    default:
      otherFloor.value = floor + 1;
      otherFloor2.value = floor - 1;
      break;
  }
  if (["53F"].includes(obj.value.floor)) {
    subscribe(
      `/iot/status/wcsensor/HGH-WC/${otherArea.value}/${otherFloor.value}F/TMAN/#`
    );
    subscribe(
      `/iot/status/wcsensor/HGH-WC/${otherArea.value}/${otherFloor.value}F/TWOMAN/#`
    );
  } else if (obj.value.floor === "52F") {
    subscribe(
      `/iot/status/wcsensor/HGH-WC/${otherArea.value}/${otherFloor.value}F/${
        obj.value.type === "wc" ? "TMAN1" : "TWOMAN1"
      }/#`
    );
    subscribe(
      `/iot/status/wcsensor/HGH-WC/${otherArea.value}/${otherFloor.value}F/${
        obj.value.type === "wc" ? "TMAN2" : "TWOMAN2"
      }/#`
    );
  } else {
    subscribe(
      `/iot/status/wcsensor/HGH-WC/${otherArea.value}/${otherFloor.value}F/${obj.value.code}/#`
    );
    subscribe(
      `/iot/status/wcsensor/HGH-WC/${otherArea2.value}/${otherFloor2.value}F/${obj.value.code}/#`
    );
  }
};
const unOtherFloor = () => {
  if (["53F"].includes(obj.value.floor)) {
    unsubscribe(
      `/iot/status/wcsensor/HGH-WC/${otherArea.value}/${otherFloor.value}F/${obj.value.code}/#`
    );
  } else if (obj.value.floor === "52F") {
    unsubscribe(
      `/iot/status/wcsensor/HGH-WC/${otherArea.value}/${otherFloor.value}F/${
        obj.value.type === "wc" ? "TMAN1" : "TWOMAN1"
      }/#`
    );
    unsubscribe(
      `/iot/status/wcsensor/HGH-WC/${otherArea.value}/${otherFloor.value}F/${
        obj.value.type === "wc" ? "TMAN2" : "TWOMAN2"
      }/#`
    );
  } else {
    unsubscribe(
      `/iot/status/wcsensor/HGH-WC/${otherArea.value}/${otherFloor.value}F/${obj.value.code}/#`
    );
    unsubscribe(
      `/iot/status/wcsensor/HGH-WC/${otherArea2.value}/${otherFloor2.value}F/${obj.value.code}/#`
    );
  }
};
function isWeekend() {
  const today = moment();
  const dayOfWeek = today.day();
  return dayOfWeek === 0 || dayOfWeek === 6;
}
onBeforeMount(() => {
  if (isWeekend()) {
    localStorage.setItem(
      "useAirTime",
      JSON.stringify({ startTime: "9:00", endTime: "24:00" })
    );
  } else {
    localStorage.setItem(
      "useAirTime",
      JSON.stringify({ startTime: "7:30", endTime: "24:00" })
    );
  }
});
onMounted(() => {
  // playAudio()
  mapData.value = localStorage.getItem("data");
  console.log(JSON.parse(mapData.value), '>>>>>>>>>>>>>>>>>>>设备信息')
  if (mapData.value) {
   publish(
      "/iot/setting/get/device",
      JSON.stringify({
        spaceCode: JSON.parse(mapData.value).space,
        floorAreaCode: JSON.parse(mapData.value).floorarea,
        floorCode: JSON.parse(mapData.value).floor,
        areaCode: JSON.parse(mapData.value).code,
      })
    );
    let jsondata = JSON.parse(mapData.value);
    obj.value.code = jsondata.code;
    obj.value.space = JSON.parse(mapData.value).space;
    obj.value.floor = jsondata.floor;
    obj.value.floorarea = jsondata.floorarea;
    obj.value.type = jsondata.type;
    if (jsondata.name) {
      obj.value.name = jsondata.name;
    } else {
      obj.value.name = jsondata.code + "区";
    }
    console.log(obj.value, "设备信息");
    // getMap()
    setBg();
    // getMap()

    // roomObj.value = jsondata.spaceObj[jsondata.spaceIndex].floorArea[jsondata.floorareaIndex].floor[jsondata.floorIndex].mettingRoom

    // console.info(jsondata.floor)
    // console.info( lights.value[jsondata.floor])
    // }
    //新订阅
    const arr = [
      {
        name: "全部应用",
        list: [
          { name: "卫生间", code: "WC" },
          { name: "洗手间", code: "Washroom" },
          { name: "厕所", code: "Toilet" },
        ],
      },
      {
        name: "办公应用",
        list: [
          { name: "会议室", code: "Meeting" },
          { name: "办公室", code: "Office" },
          { name: "厨房", code: "Kitchen" },
          { name: "卧室", code: "Bedroom" },
        ],
      },
    ];
    getOtherFloor();
    subscribe(
      `/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
    );
    //
    subscribe(
      `/iot/status/humensensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/#`
    );
    subscribe("/wallpad/outside");
    subscribe(
      `/iot/status/areaairsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
    );
    // subscribe(`/iot/status/power/HGH-WC/A3/26F/${obj.value.code}/${obj.value.code}区用电量`)
    subscribe(
      `/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN/#`
    );
    subscribe(
      `/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN/#`
    );
    subscribe(
      `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN/#`
    );
    if (obj.value.type === "wc1") {
      subscribe(
        `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN1/#`
      );
      subscribe(
        `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN1/#`
      );
      subscribe(
        `/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN1/#`
      );
      subscribe(
        `/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN1/#`
      );
      subscribe(
      `/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN1/#`
      );
      subscribe(
        `/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN1/#`
      );
    } else if (obj.value.type === "wc2") {
      subscribe(
        `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN2/#`
      );
      subscribe(
        `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN2/#`
      );
      subscribe(
        `/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN2/#`
      );
      subscribe(
        `/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN2/#`
      );
      subscribe(
      `/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN2/#`
      );
      subscribe(
        `/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN2/#`
      );
    }

    subscribe(
      `/iot/status/wcinfo/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN`
    );
    subscribe(
      `/iot/status/wcinfo/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN`
    );
    subscribe(
      `/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN/#`
    );
    subscribe(
      `/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN/#`
    );
    subscribe(
      `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN/#`
    );

    subscribe(
      `/iot/status/wcinfo/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN`
    );

    // subscribe(`/iot/status/power/HGH-WC/A3/26F/${obj.value.code}/${obj.value.code}区昨日用电量`)
    // subscribe(`/iot/status/power/HGH-WC/A3/26F/${obj.value.code}/${obj.value.code}区今日用电量`)
    subscribe(
      `/iot/status/power/HGH-WC/${obj.value.floorarea}/${obj.value.floor}`
    );
    //处理指令
    //     subscribe(`/iot/action/pad/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${obj.value.code}区中控屏`)
    subscribe(`/iot/action/pad/HGH-WC/#`);
    //获取照明状态
    subscribe(
      `/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/#`
    );
    subscribe(
      `/iot/status/blind/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/#`
    );
    subscribe(
      `/iot/status/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/#`
    );
    //获取告警确认信息
    subscribe(
      `/iot/emergent/security/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
    );
    if (obj.value.code == "HA") {
      subscribe(
        `/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/LT`
      );
      subscribe(
        `/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/LT/#`
      );
      subscribe(`/iot/setting/device/HGH-WC/${obj.value.floorarea}/52F/LT`);
      subscribe(`/iot/status/light/HGH-WC/${obj.value.floorarea}/52F/LT/#`);
      publish(
        "/iot/setting/get/device",
        JSON.stringify({
          spaceCode: JSON.parse(mapData.value).space,
          floorAreaCode: JSON.parse(mapData.value).floorarea,
          floorCode: JSON.parse(mapData.value).floor,
          areaCode: "LT",
        })
      );
      publish(
        "/iot/setting/get/device",
        JSON.stringify({
          spaceCode: JSON.parse(mapData.value).space,
          floorAreaCode: JSON.parse(mapData.value).floorarea,
          floorCode: "52F",
          areaCode: "LT",
        })
      );
    }
    if (obj.value.code == "HAMEETING3") {
      subscribe(
        `/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/HAMEETING2`
      );
      subscribe(
        `/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/HAMEETING2/#`
      );
      subscribe(
        `/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/LT`
      );
      subscribe(
        `/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/LT/#`
      );
      subscribe(`/iot/setting/device/HGH-WC/${obj.value.floorarea}/53F/LT`);
      subscribe(`/iot/status/light/HGH-WC/${obj.value.floorarea}/53F/LT/#`);
      subscribe(
        `/iot/status/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/HAMEETING2/#`
      );
      publish(
        "/iot/setting/get/device",
        JSON.stringify({
          spaceCode: JSON.parse(mapData.value).space,
          floorAreaCode: JSON.parse(mapData.value).floorarea,
          floorCode: JSON.parse(mapData.value).floor,
          areaCode: "HAMEETING2",
        })
      );
      publish(
        "/iot/setting/get/device",
        JSON.stringify({
          spaceCode: JSON.parse(mapData.value).space,
          floorAreaCode: JSON.parse(mapData.value).floorarea,
          floorCode: JSON.parse(mapData.value).floor,
          areaCode: "LT",
        })
      );
      publish(
        "/iot/setting/get/device",
        JSON.stringify({
          spaceCode: JSON.parse(mapData.value).space,
          floorAreaCode: JSON.parse(mapData.value).floorarea,
          floorCode: "53F",
          areaCode: "LT",
        })
      );
    }
    // subscribe(`/iot/status/light/HGH-WC/A3/26F/${obj.value.code}/#`)
  } else {
    //subscribe("/iot/setting/structure/result");
    //修改为pre load模式，通过http获取结构信息
    //add by Jimmy 10-15
    getStructure()
    dialogFormVisible.value = true;
    console.info("没有本地数据" + dialogFormVisible);
    //end by jimmy 
  }
  autofit.init(
    {
      dh: 1080,
      dw: 1920,
      el: "#app",
      resize: true,
    },
    false
  );
  publish("/iot/setting/get/structure");
  timer1.value = setInterval(link, 30000);
});
onUnmounted(() => {
  //新订阅
  // unsubscribe("/iot/setting/structure/result");
  if (obj.value.code == "HAMEETING3") {
    unsubscribe(
      `/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/HAMEETING2`
    );
    unsubscribe(
      `/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/HAMEETING2/#`
    );
    unsubscribe(
      `/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/LT`
    );
    unsubscribe(
      `/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/LT/#`
    );
    unsubscribe(`/iot/setting/device/HGH-WC/${obj.value.floorarea}/53F/LT`);
    unsubscribe(`/iot/status/light/HGH-WC/${obj.value.floorarea}/53F/LT/#`);
    unsubscribe(
      `/iot/status/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/HAMEETING2/#`
    );
  }
  if (obj.value.code == "HA") {
    unsubscribe(
      `/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/LT`
    );
    unsubscribe(
      `/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/LT/#`
    );
    unsubscribe(`/iot/setting/device/HGH-WC/${obj.value.floorarea}/52F/LT`);
    unsubscribe(`/iot/status/light/HGH-WC/${obj.value.floorarea}/52F/LT/#`);
  }
  unsubscribe(
    `/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
  );
  unsubscribe(
    `/iot/status/humensensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/#`
  );
  unsubscribe("/wallpad/outside");
  unsubscribe(
    `/iot/status/areaairsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
  );

  unsubscribe(
    `/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN/#`
  );
  unsubscribe(
    `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN/#`
  );

  unsubscribe(
    `/iot/status/wcinfo/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN`
  );
  unsubscribe(
    `/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN`
  );
  unsubscribe(
    `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN1/#`
  );
  unsubscribe(
    `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN1/#`
  );
  unsubscribe(
    `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN2/#`
  );
  unsubscribe(
    `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN2/#`
  );
  unsubscribe(
    `/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN/#`
  );
  unsubscribe(
    `/iot/status/wcinfo/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN`
  );
  unsubscribe(
    `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN/#`
  );
  unsubscribe(
    `/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN`
  );
  unOtherFloor();
  // unsubscribe(`/iot/status/power/HGH-WC/A3/26F/${obj.value.code}/${obj.value.code}区昨日用电量`)
  // unsubscribe(`/iot/status/power/HGH-WC/A3/26F/${obj.value.code}/${obj.value.code}区今日用电量`)
  unsubscribe(
    `/iot/status/power/HGH-WC/${obj.value.floorarea}/${obj.value.floor}`
  );
  // unsubscribe(`/iot/action/pad/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${obj.value.code}区中控屏`)
  unsubscribe(`/iot/action/pad/HGH-WC/#`);
  unsubscribe(
    `/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/#`
  );
  unsubscribe(
    `/iot/status/blind/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/#`
  );
  unsubscribe(
    `/iot/status/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/#`
  );

  unsubscribe(
    `/iot/emergent/security/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
  );
  // if(timer){stopTimer(timer)}
  if (timer1) {
    stopTimer(timer1);
  }
});
const link = () => {
  if (padObj.value.name === "") {
    let data = localStorage.getItem("data");
    if (data) {
      publish(
        "/iot/setting/get/device",
        JSON.stringify({
          spaceCode: JSON.parse(data).space,
          floorAreaCode: JSON.parse(data).floorarea,
          floorCode: JSON.parse(data).floor,
          areaCode: JSON.parse(data).code,
        })
      );
    }
  } else {
    //   智能平板code命名规则 ：
    //    WALLPAD-26F-B
    //    MEETINGPAD-26F-M2601
    //    TOILETPAD-26F-TMAN
    let topic = "";
    let pad = [padObj.value];


    topic = `/iot/status/pad/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${padObj.value.name}`;
    console.info(topic, "aaaaa");
    publish(topic, JSON.stringify(pad));
    console.info("心跳")
    console.info(obj.value)
    console.info(form)
    console.info(topic)
    console.info(pad)
  }

  // publish(
  //     `/iot/status/report`,
  //     {action:"status"}
  // )
  // publish('/iot/action/airsensor/HGH-WC/A3/26F/A/A区空气传感器','{"action":"status"}')
  // publish('/iot/action/airsensor/HGH-WC/A3/26F/TMAN/男卫生间空气传感器','{"action":"status"}')
};
const playAudio = () => {
  audioPlayer.value.play();
};
const restartAudio = () => {
  audioPlayer.value.currentTime = 0;
  audioPlayer.value.play();
};
const saveData = () => {
  // console.info(form)
  // form.spaceIndex
  form.space = spaceObj.value[form.spaceIndex]?.code;
  form.floorarea =
    spaceObj.value[form.spaceIndex].floorArea[form.floorareaIndex]?.code;
  form.floor =
    spaceObj.value[form.spaceIndex].floorArea[form.floorareaIndex].floor[
      form.floorIndex
    ].code;
  form.code =
    spaceObj.value[form.spaceIndex].floorArea[form.floorareaIndex].floor[
      form.floorIndex
    ].area[form.areaIndex]?.code;
  form.name =
    spaceObj.value[form.spaceIndex].floorArea[form.floorareaIndex].floor[
      form.floorIndex
    ].area[form.areaIndex]?.name;
  form.spaceObj = spaceObj.value;
  //add by Jimmy 1015
  form.spaceObject = spaceObj.value[form.spaceIndex]
  //end by
  console.info(form);
  if (form.type === "wc") {
    form.code = "TMAN";
  } else if (form.type === "wcw") {
    form.code = "TWOMAN";
  }
  if (form.type === "wc1") {
    form.code1 = "TMAN1";
    form.code2 = "TWOMAN1";
    form.code = "TMAN1"
  } else if (form.type === "wc2") {
    form.code1 = "TMAN2";
    form.code2 = "TWOMAN2";
    form.code = "TWOMAN2"
  }
  localStorage.setItem("data", JSON.stringify(form));
  // console.log('setItem',form)
  dialogFormVisible.value = false;
  location.reload();
};

const setBg = (urls) => {
  // 注意要加type
  bgParams.type = "video";
  bgParams.urls = [{ url: "/wallpad/images/rain.mp4" }];

  if (timer3.value) {
    clearTimeout(timer3.value);
  }
  timer3.value = setTimeout(() => {
    bgParams.urls = [{ url: "/wallpad/images/cloud.mp4" }];
  }, 3000);
};
// onMounted(()=>{
//
// })
function removeDuplicateObjects(arr, property) {
  return arr.reduce((accumulator, currentValue) => {
    if (
      !accumulator.some((item) => item[property] === currentValue[property])
    ) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);
}
const setInitBg = () => {
  console.info("进入修改天气背景的入口");
  let today = outside.value.today;
  if (today) {
    bgParams.type = "video";
    bgParams.urls = [{ url: "/wallpad/images/sun.mp4" }];
    if (today === "多云") {
      console.info("多云");
      bgParams.urls = [{ url: "/wallpad/images/cloud.mp4" }];
    } else if (
      today === "阴" ||
      today.indexOf("雾") !== -1 ||
      today.indexOf("霾") !== -1
    ) {
      console.info("阴");
      bgParams.urls = [{ url: "/wallpad/images/overcast.mp4" }];
    } else if (today === "晴") {
      console.info("晴");
      bgParams.urls = [{ url: "/wallpad/images/sun.mp4" }];
    } else if (today.indexOf("雨") !== -1) {
      console.info("雨");
      bgParams.urls = [{ url: "/wallpad/images/rain.mp4" }];
    } else if (today.indexOf("雪") !== -1) {
      console.info("雪");
      bgParams.urls = [{ url: "/wallpad/images/snow.mp4" }];
    } else {
      bgParams.urls = [{ url: "/wallpad/images/sun.mp4" }];
    }
  }
};

const syncLightStatus = (bln) => {
  currentLightStatus.value = bln;
};

const syncLight = (light) => {
  currentLight.value = { ...currentLight.value, ...light };
};

const syncAllLight = (allLight) => {
  lights.value = allLight;
};

const cannelAlter = () => {
  sosAnimate.value = false;
  disabledSos.value = false;
  //暂停语音
  audioPlayer.value.pause();
  audioPlayer.value.currentTime = 0;
};
//确认sos-告警
const sosConfirm = () => {
  dialogSOS.value = false;
  sosAnimate.value = true;
  if (localStorage.getItem("data")) {

    let jsondata = JSON.parse(localStorage.getItem("data"));
    // on confirm
    let data = {
      spaceCode: "HGH-WC",
      floorAreaCode: jsondata.floorarea,
      floorCode: jsondata.floor,
      areaCode: jsondata.code,
      sourceName:
        jsondata.floor.substring(0, jsondata.floor.length - 1) +
        "楼" +
        jsondata.code +
        "区中控屏",
      emergentType: "紧急事件",
      emergentContent:
        "请注意" +
        jsondata.floor.substring(0, jsondata.floor.length - 1) +
        "楼" +
        jsondata.code +
        "区有紧急事件，请立即前往！",
    };
    console.info("/iot/action/emergent/security");
    console.info(data);
    publish("/iot/action/emergent/security", JSON.stringify(data));
    // log 日志
    logClk({
      sourceName: "/运营/楼宇智控/SOS/触发",
      deviceType: "SOS",
      actionTopic: "/iot/action/emergent/security",
      actionData: JSON.stringify(data),
      spaceCode: obj.value?.space,
      floorCode: obj.value?.floor,
      floorAreaCode: obj.value?.floorarea,
      areaCode: obj.value?.code,
    });
  }
};
getMessage((topic, message) => {
  sessionStorage.setItem("mqtt", "message");
  if (topic.includes("blind")) {
    const msg = JSON.parse(message);
    // blind.value = msg;
  }
  if (
    topic.indexOf(`/iot/status/humensensor/HGH-WC/${obj.value.floorarea}`) !==
    -1
  ) {
    let allSensor = JSON.parse(message);
    let mcode = topic.split("/")[7];
    // console.log("allSensor", allSensor);
    // console.log("mcode", mcode);
    if (
      !Object.keys(roomoSensorObj.value)?.length ||
      !roomoSensorObj.value[mcode] ||
      roomoSensorObj.value[mcode].deviceId.includes(allSensor[0].code)
    ) {
      // handle data
      roomoSensorObj.value[mcode] = {
        status: [
          allSensor[0]?.status?.online ? allSensor[0]?.status?.status : "",
        ].filter(Boolean),
        online: [allSensor[0]?.status?.online],
        deviceId: [allSensor[0].code],
        name: mcode,
      };
    } else {
      if (!roomoSensorObj.value[mcode].deviceId.includes(allSensor[0].code)) {
        roomoSensorObj.value[mcode].status = [
          ...roomoSensorObj.value[mcode].status,
          allSensor[0]?.status?.online ? allSensor[0]?.status?.status : "",
        ].filter(Boolean);
        roomoSensorObj.value[mcode].online = [
          ...roomoSensorObj.value[mcode].online,
          allSensor[0]?.status?.online,
        ];
        roomoSensorObj.value[mcode].deviceId = [
          ...roomoSensorObj.value[mcode].deviceId,
          allSensor[0]?.code,
        ];
      }
    }
    // console.log(roomoSensorObj.value, "allSensor");
  }

  if (topic === "/wallpad/outside") {
    if (outside.value.today !== JSON.parse(message).today) {
      console.info("发现不一样");
      outside.value = JSON.parse(message);
      setInitBg();
    }
    outside.value = JSON.parse(message);
  }

  if (
    topic ===
    `/iot/status/areaairsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
  ) {
    console.info("室内空气");
    if (airsensorMap.value?.some((x) => x?.status?.online == 1)) {
      inside.value = JSON.parse(message.toString())[0].status;
      if(!inside.value.temperature){
        inside.value.temperature = 24.1
      }
      console.info(inside.value, "123123123123");
    } else {
      inside.value = {
        co2: 552,
        formaldehyde: 0,
        humidity: 42.3,
        light: 35,
        online: 1,
        pm10: 37,
        pm25: 29,
        status: "on",
        temperature: 24.1,
        tvoc: 408,
      };
    }
  }
  if (
    topic ===
    `/iot/status/power/HGH-WC/${obj.value.floorarea}/${obj.value.floor}`
  ) {
  }
  if (
    obj.value.type === "wc" &&
    topic.indexOf(
      `/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString());
    if (cw) {
      toiletAir.value = cw[0].status;
    }
  }
  if (
    topic.indexOf(
      `/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN1`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString());
    if (cw) {
      ceoHuanJingObj1.value = cw[0].status;
      const result = Object.entries(cw[0].status).reduce(
        (acc, [key, value]) => {
          if (ceoHuanJingObj2.value.hasOwnProperty(key)) {
            // 计算平均值并保留三位小数
            acc[key] = Number(
              Number((value + ceoHuanJingObj2.value[key]) / 2).toFixed(3)
            );
          } else if (!isNaN(value)) {
            console.log(value);
            // 如果 ceoHuanJingObj2 中没有该键，但 cw[0].status 中有值，则将该值直接赋给结果对象并保留三位小数
            acc[key] = Number(value?.toFixed(3));
          }
          return acc;
        },
        {}
      );
      toiletAir.value = result;
      console.log(toiletAir.value, "toiletAir");
    }
  }
  if (
    topic.indexOf(
      `/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN2`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString());
    if (cw) {
      ceoHuanJingObj1.value = cw[0].status;
      const result = Object.entries(cw[0].status).reduce(
        (acc, [key, value]) => {
          if (ceoHuanJingObj2.value.hasOwnProperty(key)) {
            // 计算平均值并保留三位小数
            acc[key] = Number(
              Number((value + ceoHuanJingObj2.value[key]) / 2).toFixed(3)
            );
          } else if (!isNaN(value)) {
            // 如果 ceoHuanJingObj2 中没有该键，但 cw[0].status 中有值，则将该值直接赋给结果对象并保留三位小数
            acc[key] = Number(value.toFixed(3));
          }
          return acc;
        },
        {}
      );
      toiletAir.value = result;
      console.log(toiletAir.value, "toiletAir");
    }
  }
  if (
    topic.indexOf(
      `/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN1`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString());
    if (cw) {
      ceoHuanJingObj2.value = cw[0].status;
      const result = Object.entries(cw[0].status).reduce(
        (acc, [key, value]) => {
          if (ceoHuanJingObj1.value.hasOwnProperty(key)) {
            // 计算平均值并保留三位小数
            acc[key] = Number(
              Number((value + ceoHuanJingObj1.value[key]) / 2).toFixed(3)
            );
          } else if (!isNaN(value)) {
            // 如果 ceoHuanJingObj1 中没有该键，但 cw[0].status 中有值，则将该值直接赋给结果对象并保留三位小数
            acc[key] = Number(value.toFixed(3));
          }
          return acc;
        },
        {}
      );
      toiletAir.value = result;
      console.log(toiletAir.value, "toiletAir");
    }
  }
  if (
    topic.indexOf(
      `/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN2`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString());
    if (cw) {
      ceoHuanJingObj2.value = cw[0].status;
      const result = Object.entries(cw[0].status).reduce(
        (acc, [key, value]) => {
          if (ceoHuanJingObj1.value.hasOwnProperty(key)) {
            // 计算平均值并保留三位小数
            acc[key] = Number(
              Number((value + ceoHuanJingObj1.value[key]) / 2).toFixed(3)
            );
          } else if (!isNaN(value)) {
            // 如果 ceoHuanJingObj1 中没有该键，但 cw[0].status 中有值，则将该值直接赋给结果对象并保留三位小数
            acc[key] = Number(value.toFixed(3));
          }
          return acc;
        },
        {}
      );
      toiletAir.value = result;
      console.log(toiletAir.value, "toiletAir");
    }
  }
  if (
    obj.value.type === "wcw" &&
    topic.indexOf(
      `/iot/status/airsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString());
    if (cw) {
      toiletAir.value = cw[0].status;
    }
  }
  if (
    topic.indexOf(
      `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN1/`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString())[0];
    let cwindex = topic.substring(topic.length - 1, topic.length);
    if (cwindex !== "P") {
      wcwomanStatusObj.value = {
        ...wcwomanStatusObj.value,
        [cwindex]: parseInt(cw.status.status),
      };
    } else {
      wcwomanStatusObj.value = {
        ...wcwomanStatusObj.value,
        vip: parseInt(cw.status.status),
      };
    }
    console.log(topic, wcwomanStatusObj.value);
  }
  if (
    topic.indexOf(
      `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN1/`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString())[0];
    let cwindex = topic.substring(topic.length - 1, topic.length);
    if (cwindex !== "P") {
      wcmanStatusObj.value = {
        ...wcmanStatusObj.value,
        [cwindex]: parseInt(cw.status.status),
      };
    } else {
      wcmanStatusObj.value = {
        ...wcmanStatusObj.value,
        vip: parseInt(cw.status.status),
      };
    }
    console.log(topic, wcmanStatusObj.value);
  }
  if (
    topic.indexOf(
      `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN2/`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString())[0];
    let cwindex = topic.substring(topic.length - 1, topic.length);
    if (cwindex !== "P") {
      wcwomanStatusObj.value = {
        ...wcwomanStatusObj.value,
        [cwindex]: parseInt(cw.status.status),
      };
    } else {
      wcwomanStatusObj.value = {
        ...wcwomanStatusObj.value,
        vip: parseInt(cw.status.status),
      };
    }
    console.log(topic, wcwomanStatusObj.value);
  }
  if (
    topic.indexOf(
      `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN2/`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString())[0];
    let cwindex = topic.substring(topic.length - 1, topic.length);
    if (cwindex !== "P") {
      wcmanStatusObj.value = {
        ...wcmanStatusObj.value,
        [cwindex]: parseInt(cw.status.status),
      };
    } else {
      wcmanStatusObj.value = {
        ...wcmanStatusObj.value,
        vip: parseInt(cw.status.status),
      };
    }
    console.log(topic, wcmanStatusObj.value);
  }
  if (
    topic.indexOf(
      `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN/`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString())[0];
    let cwindex = topic.substring(topic.length - 1, topic.length);
    if (cwindex !== "P") {
      wcmanStatusObj.value = {
        ...wcmanStatusObj.value,
        [cwindex]: parseInt(cw.status.status),
      };
    } else {
      wcmanStatusObj.value = {
        ...wcmanStatusObj.value,
        vip: parseInt(cw.status.status),
      };
    }
  }

  if (
    topic.indexOf(
      `/iot/status/wcsensor/HGH-WC/${otherArea.value}/${otherFloor.value}F/${obj.value.code}/`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString())[0];
    let cwindex = topic.substring(topic.length - 1, topic.length);
    if (cwindex !== "P") {
      wcmanOtherFloorObj.value = {
        ...wcmanOtherFloorObj.value,
        [cwindex]: parseInt(cw.status.status),
      };
    } else {
      wcmanOtherFloorObj.value = {
        ...wcmanOtherFloorObj.value,
        vip: parseInt(cw.status.status),
      };
    }
  }
  if (
    topic.indexOf(
      `/iot/status/wcsensor/HGH-WC/${otherArea.value}/${otherFloor.value}F/TMAN/`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString())[0];
    let cwindex = topic.substring(topic.length - 1, topic.length);
    if (cwindex !== "P") {
      wcmanOtherFloorObj.value = {
        ...wcmanOtherFloorObj.value,
        [cwindex]: parseInt(cw.status.status),
      };
    } else {
      wcmanOtherFloorObj.value = {
        ...wcmanOtherFloorObj.value,
        vip: parseInt(cw.status.status),
      };
    }
  }
  if (
    topic.indexOf(
      `/iot/status/wcsensor/HGH-WC/${otherArea.value}/${otherFloor.value}F/TWOMAN/`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString())[0];
    let cwindex = topic.substring(topic.length - 1, topic.length);
    if (cwindex !== "P") {
      wcwomanOtherFloorObj.value = {
        ...wcwomanOtherFloorObj.value,
        [cwindex]: parseInt(cw.status.status),
      };
    } else {
      wcwomanOtherFloorObj.value = {
        ...wcwomanOtherFloorObj.value,
        vip: parseInt(cw.status.status),
      };
    }
  }
  if (
    topic.indexOf(
      `/iot/status/wcsensor/HGH-WC/${otherArea.value}/${otherFloor.value}F/${
        obj.value.type === "wc" ? "TMAN1" : "TWOMAN1"
      }/`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString())[0];
    let cwindex = topic.substring(topic.length - 1, topic.length);
    if (cwindex !== "P") {
      ceowcStatusObj.value = {
        ...ceowcStatusObj.value,
        [cwindex]: parseInt(cw.status.status),
      };
    } else {
      ceowcStatusObj.value = {
        ...ceowcStatusObj.value,
        vip: parseInt(cw.status.status),
      };
    }
  }
  if (
    topic.indexOf(
      `/iot/status/wcsensor/HGH-WC/${otherArea.value}/${otherFloor.value}F/${
        obj.value.type === "wc" ? "TMAN2" : "TWOMAN2"
      }/`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString())[0];
    let cwindex = topic.substring(topic.length - 1, topic.length);
    if (cwindex !== "P") {
      ceowcStatusObj2.value = {
        ...ceowcStatusObj2.value,
        [cwindex]: parseInt(cw.status.status),
      };
    } else {
      ceowcStatusObj2.value = {
        ...ceowcStatusObj2.value,
        vip: parseInt(cw.status.status),
      };
    }
  }
  if (
    topic.indexOf(
      `/iot/status/wcsensor/HGH-WC/${otherArea2.value}/${otherFloor2.value}F/${obj.value.code}/`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString())[0];
    let cwindex = topic.substring(topic.length - 1, topic.length);
    if (cwindex !== "P") {
      wcmanOtherFloorObj2.value = {
        ...wcmanOtherFloorObj2.value,
        [cwindex]: parseInt(cw.status.status),
      };
    } else {
      wcmanOtherFloorObj2.value = {
        ...wcmanOtherFloorObj2.value,
        vip: parseInt(cw.status.status),
      };
    }
  }

  if (
    topic.indexOf(
      `/iot/status/wcsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN/`
    ) !== -1
  ) {
    let cw = JSON.parse(message.toString())[0];
    let cwindex = topic.substring(topic.length - 1, topic.length);
    // console.log(cwindex);
    if (cwindex !== "P") {
      wcwomanStatusObj.value = {
        ...wcwomanStatusObj.value,
        [cwindex]: parseInt(cw.status.status),
      };
    } else {
      wcwomanStatusObj.value = {
        ...wcwomanStatusObj.value,
        vip: parseInt(cw.status.status),
      };
    }
    // console.log(topic, wcwomanStatusObj.value, "woman111");
  }
  if (
    topic.indexOf(
      `/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
    ) !== -1
  ) {
    let status = JSON.parse(message);
    lightobj.value.forEach(function (l) {
      if (l.code === status[0].code) {
        l.status = status[0].status.status;
        l.online = status[0].status.online;
      }
    });
  }
  if (
    topic.indexOf(
      `/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/HAMEETING2`
    ) !== -1
  ) {
    let status = JSON.parse(message);
    console.log(status, "HAMEETING2");
    lightobj.value.forEach(function (l) {
      if (l.code === status[0].code) {
        l.status = status[0].status.status;
        l.online = status[0].status.online;
      }
    });
  }
  if (
    topic.indexOf(
      `/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/LT`
    ) !== -1
  ) {
    let status = JSON.parse(message);
    lightobj.value.forEach(function (l) {
      if (l.code === status[0].code) {
        l.status = status[0].status.status;
        l.online = status[0].status.online;
      }
    });
  }
  if (
    topic.indexOf(`/iot/status/light/HGH-WC/${obj.value.floorarea}/53F/LT`) !==
    -1
  ) {
    let status = JSON.parse(message);
    console.log(status, "LT");
    lightobj.value.forEach(function (l) {
      if (l.code === status[0].code) {
        l.status = status[0].status.status;
        l.online = status[0].status.online;
      }
    });
  }
  if (
    topic.indexOf(`/iot/status/light/HGH-WC/${obj.value.floorarea}/52F/LT`) !==
    -1
  ) {
    let status = JSON.parse(message);
    console.log(status, "52楼梯");
    lightobj.value.forEach(function (l) {
      if (l.code === status[0].code) {
        l.status = status[0].status.status;
        l.online = status[0].status.online;
      }
    });
  }
  if (
    topic.indexOf(
      `/iot/status/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
    ) !== -1
  ) {
    let airconditioning = JSON.parse(message);
    acobj.value.forEach(function (air) {
      air.status = airconditioning[0].status;
    });
  }
  if (
    topic.indexOf(
      `/iot/status/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/HAMEETING2`
    ) !== -1
  ) {
    let airconditioning = JSON.parse(message);
    console.log(airconditioning, "HAMEETING2");
    air2.value.forEach(function (air) {
      air.status = airconditioning[0].status;
    });
  }
  if (
    topic ===
    `/iot/status/wcinfo/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN`
  ) {
  }
  if (topic.indexOf(`/iot/action/pad/HGH-WC/`) !== -1) {
    let router = topic.split("/");
    let itsme = false;
    console.info(topic)
    if (router.length === 9) {
      //发给指定pad
      console.info("发给指定pad:" + router[6] + "|" + router[8]);
      if (obj.value.type === "wc") {
        if (router[6] === obj.value.floor && router[8] === `男卫生间门牌`) {
          itsme = true;
        }
      } else if (obj.value.type === "wcw") {
        if (router[6] === obj.value.floor && router[8] === `女卫生间门牌`) {
          itsme = true;
        }
      } else {
        if (
          router[6] === obj.value.floor &&
          router[8] === `${obj.value.code}区中控屏`
        ) {
          itsme = true;
        }
      }
    } else if (router.length === 8 && router[7] !== "") {
      //发给指定区域
      console.info("发给指定区域:" + router[6] + "|" + router[7]);
      if (router[6] === obj.value.floor && router[7] === obj.value.code) {
        itsme = true;
      }
    } else if (router.length === 8) {
      //发给指定楼层
      console.info("发给指定楼层:" + router[6]);
      if (router[6] === obj.value.floor) {
        itsme = true;
      }
    }

    if (itsme) {
      let cw = JSON.parse(message.toString());
      console.info(cw);
      if (cw.action === "refresh") {
        console.info("执行刷新");
        location.reload();
      }
      if (cw.action === "play") {
        console.info("播放");
        cw.pic = [
          { url: "/wallpad/images/new.png" },
          { url: "/wallpad/images/new2.png" },
        ];
        setBg(cw.pic);
        animateOut();
      }
      if (cw.action === "stop") {
        console.info("停止");
        setInitBg();
        animateIn();
      }
      if (cw.action === "fullscreen") {
        console.info("全屏");
        animateIn();
        // logoCom.value.SetFullScreen()
        //onFullScreen()
        //SetFullScreen()
      }
      if (cw.action === "bind") {
        console.info("绑定");
        localStorage.clear();
        location.reload();
      }
    }
  }
  if (
    obj.value.type === "wc" &&
    topic.indexOf(
      `/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN`
    ) !== -1
  ) {
    // /iot/status/cleaning/HGH-WC/A4/42F/TMAN
    let message1 = JSON.parse(message);
    const lastBjTime = localStorage?.getItem("BAOJIE_TIME") || 0;
    console.info("获取到了最新保洁信息");
    console.info(message1);
    baojie.value.empName = message1.empName;
    baojie.value.endTime =
      lastBjTime > message1.endTime - 1
        ? moment(lastBjTime).format("YYYY-MM-DD HH:mm")
        : moment(message1.endTime).format("YYYY-MM-DD HH:mm");
    baojie.value.updateTime = message1.updateTime;
  }
  if (
    obj.value.type === "wcw" &&
    topic.indexOf(
      `/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN`
    ) !== -1
  ) {
    // /iot/status/cleaning/HGH-WC/A4/42F/TMAN
    let message1 = JSON.parse(message);
    console.info("获取到了最新保洁信息");
    console.info(message1);
    baojie.value.empName = message1.empName;
    baojie.value.endTime = moment(message1.endTime).format("YYYY-MM-DD HH:mm");
    baojie.value.updateTime = message1.updateTime;
  }
  if (
    obj.value.type === "wc1" &&
    topic.indexOf(
      `/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TMAN1`
    ) !== -1
  ) {
    // /iot/status/cleaning/HGH-WC/A4/42F/TMAN
    let message1 = JSON.parse(message);
    const lastBjTime = localStorage?.getItem("BAOJIE_TIME") || 0;
    console.info("获取到了最新保洁信息");
    console.info(message1);
    baojie.value.empName = message1.empName;
    baojie.value.endTime =
      lastBjTime > message1.endTime - 1
        ? moment(lastBjTime).format("YYYY-MM-DD HH:mm")
        : moment(message1.endTime).format("YYYY-MM-DD HH:mm");
    baojie.value.updateTime = message1.updateTime;
  }
  if (
    obj.value.type === "wc2" &&
    topic.indexOf(
      `/iot/status/cleaning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/TWOMAN2`
    ) !== -1
  ) {
    // /iot/status/cleaning/HGH-WC/A4/42F/TMAN
    let message1 = JSON.parse(message);
    const lastBjTime = localStorage?.getItem("BAOJIE_TIME") || 0;
    console.info("获取到了最新保洁信息");
    console.info(message1);
    baojie.value.empName = message1.empName;
    baojie.value.endTime =
      lastBjTime > message1.endTime - 1
        ? moment(lastBjTime).format("YYYY-MM-DD HH:mm")
        : moment(message1.endTime).format("YYYY-MM-DD HH:mm");
    baojie.value.updateTime = message1.updateTime;
  }
  //新订阅
  // subscribe('/iot/setting/get/device')
  // subscribe(`/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`)
  // if (topic === `/iot/setting/structure/result`) {
  //   spaceObj.value = JSON.parse(message);
  //   console.info(spaceObj.value);
  // }
  if (
    topic ===
    `/iot/emergent/security/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
  ) {
    console.info("警告确认+++++++++++++++++++++++++++++++++++");
    let emergent = JSON.parse(message);
    console.info(emergent);
    if (emergent.action === 1) {
      //播放语音
      console.info("播放语音");
      playAudio();
    } else {
      cannelAlter();
    }
  }
  if (
    topic ===
    `/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/HAMEETING2`
  ) {
    let devices = JSON.parse(message);
    console.log(devices, "HAMEETING2");
    if (devices.blind) {
      blind2.value = devices.blind.map((x) => {
        return {
          ...x,
          status: JSON.parse(x.status),
        };
      });
    }
    if (devices.light) {
      const arr = devices.light.map((x) => {
        return {
          ...x,
          status: JSON.parse(x.status).status,
          online: JSON.parse(x.status).online,
        };
      });
      lightobj.value = removeDuplicateObjects(
        [...lightobj.value, ...arr],
        "code"
      );
    }
    if (devices.airconditioning) {
      air2.value = devices.airconditioning.map((x) => {
        return {
          ...x,
          status: JSON.parse(x.status),
        };
      });
    }
  }
  if (
    topic ===
    `/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/LT`
  ) {
    let devices = JSON.parse(message);
    console.log(devices, "52楼梯");
    if (devices.light) {
      const arr = devices.light.map((x) => {
        return {
          ...x,
          status: JSON.parse(x.status).status,
          online: JSON.parse(x.status).online,
        };
      });
      lightobj.value = removeDuplicateObjects(
        [...lightobj.value, ...arr],
        "code"
      );
    }
  }
  if (
    topic === `/iot/setting/device/HGH-WC/${obj.value.floorarea}/53F/LT` &&
    obj.value.code === "HAMEETING3"
  ) {
    let devices = JSON.parse(message);
    console.log(devices, "52楼梯");
    if (devices.light) {
      const arr = devices.light.map((x) => {
        return {
          ...x,
          status: JSON.parse(x.status).status,
          online: JSON.parse(x.status).online,
        };
      });
      lightobj.value = removeDuplicateObjects(
        [...lightobj.value, ...arr],
        "code"
      );
    }
  }
  if (topic === `/iot/setting/device/HGH-WC/${obj.value.floorarea}/52F/LT`) {
    let devices = JSON.parse(message);
    console.log(devices, "52楼梯");
    if (devices.light) {
      const arr = devices.light.map((x) => {
        return {
          ...x,
          status: JSON.parse(x.status).status,
          online: JSON.parse(x.status).online,
        };
      });
      lightobj.value = removeDuplicateObjects(
        [...lightobj.value, ...arr],
        "code"
      );
    }
  }
  if (
    topic ===
    `/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
  ) {
    let devices = JSON.parse(message);
    console.log(devices, "123123132");
    lights.value = devices?.light || [];
    //转换照明数据
    // alllight.value = {}
    // alllightStatus.value ={}
    // let lights = []
    // let lightsstatus = []
    if (obj.value.type !== "wc" && obj.value.type !== "wcw") {
      //转换照明数据
      // alllight.value = {}
      // alllightStatus.value ={}
      // let lights = []
      // let lightsstatus = []
      console.info("转换照明", devices);
      // lightobj.value.splice(0, lightobj.value.length);
      if (devices.light) {
        devices.light.forEach(function (e) {
          if (JSON.parse(e.status)) {
            console.log(e, "232323");
            lightobj.value.push({
              ...e,
              name: e.name,
              code: e.code,
              posX: e.posX || "",
              posY: e.posY || "",
              posZ: e.posZ || "",
              status: JSON.parse(e.status)?.status || "off",
              online: JSON.parse(e.status)?.online || "0",
            });
          } else {
            lightobj.value.push({
              ...e,
              name: e.name,
              code: e.code,
              posX: e.posX || "",
              posY: e.posY || "",
              posZ: e.posZ || "",
              status: { online: "0", status: "off" },
              online: JSON.parse(e.status).online,
            });
          }
        });
        lightobj.value = removeDuplicateObjects(lightobj.value, "code");
      }
      if (devices.blind) {
        blind.value = devices.blind.map((x) => {
          return {
            ...x,
            status: JSON.parse(x.status),
          };
        });
      }
      //转换空调数据
      acobj.value.splice(0, acobj.value.length);
      devices.airconditioning?.forEach(function (e) {
        acobj.value.push({
          name: e.name,
          code: e.code,
          status: JSON.parse(e.status),
        });
      });
    }
    if (devices.pad) {
      //转换pad数据
      let pad = {
        name: devices.pad[0].name,
        code: devices.pad[0].code,
        gateway: devices.pad[0].gatewayMac,
        layer: devices.pad[0].layer,
        status: {
          online: 1,
          status: "busy",
        },
      };
      padObj.value = pad;
    }
    if (devices.airsensor && devices.airsensor.length > 0) {
      airsensorMap.value = devices.airsensor.map((x) => {
        return {
          ...x,
          status: JSON.parse(x.status),
        };
      });
    }
    // console.info("++++++++++++++++++++++++++")
    // console.info(padObj.value)
    // console.info("++++++++++++++++++++++++++")
  }
  setTimeout(function () {
    sessionStorage.setItem("mqtt", "connect");
  }, 500);
  // watch(drawer,(newValue, oldValue) => {
  //   console.info(newValue)
  //   if(drawer.value===true){
  //     // console.info(map.value)
  //     // console.info(document.getElementById('mapId').innerHTML)
  //     if(!mapFlag.value && document.getElementById('mapId').innerHTML===''){
  //       if(tabIndex.value===1 || tabIndex.value===2 || tabIndex.value===3){
  //         getMap()
  //       }
  //    }
  //   }
  // },
  // {
  //   immediate:true
  // })
});
</script>
<style scoped lang="scss">
:v-deep(.el-drawer__close-btn) {
  position: absolute;
  left: 1060px;
  color: #fff;
  z-index: 3;
  font-weight: 900;
  font-size: 30px;
  top: 25px;
}
:v-deep(.el-drawer__body) {
  width: 100%;
  height: 100%;
}

.main-box {
  width: 1920px;
  height: 1080px;
  margin: 0 auto;
  left: -1px;
  position: relative;
  color: #fff;
  font-family: DingTalk;
  font-size: 24px;
  box-sizing: border-box;

  .bg-shdow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    //height: calc(100% - 118px);
    height: 100%;
    //background: linear-gradient(180deg, rgba(30, 30, 30, 0.50) 0%, #1E1E1E 100%);
    //background: linear-gradient(180deg, rgba(30, 30, 30, 0.50) 0%, #1E1E1E 53.5%);
    //background: linear-gradient(180deg, rgba(30, 30, 30, 0.50) 0%, #1E1E1E 100%);
    background: linear-gradient(
      180deg,
      rgba(30, 30, 30, 0.5) 0%,
      rgba(30, 30, 30, 0.7) 46.82%,
      #1e1e1e 100%
    );
    //background: linear-gradient(180deg, rgba(27, 27, 27, 0.50) 0%, rgba(27, 27, 27, 0.30) 32.53%, rgba(27, 27, 27, 0.00) 87.11%);
  }
  .chahua {
    position: absolute;
    width: 435px;
    height: 236.29px;
    top: 200px;
    left: 673.04px;
    .img {
      position: absolute;
      width: 248px;
      height: 236.29px;
      top: 0;
      right: 0;
    }
    .txt {
      position: absolute;
      top: 122px;
      left: -78px;
      font-size: 20px;
      width: 290px;
      margin-left: 0;
      text-align: right;
      opacity: 0.8;
    }
  }
  .content {
    gap: 40px;
    .index-title-box {
      font-size: 36px;
      font-family: PingFang SC;
    }
    .title-num {
      font-family: DingNumber;
      font-weight: 400;
      font-size: 300px;
      color: #ffffff;
      line-height: 280px;
      position: relative;
      .unit {
        font-size: 60px;
        vertical-align: text-top;
        display: inline-block;
        width: 0px;
        position: relative;
        top: -34px;
      }
    }
    .font200 {
      font-size: 200px;
      line-height: 200px;
    }
    .font100 {
      font-size: 100px;
      line-height: 100px;
      position: relative;
      right: 10px;
      bottom: 0;
    }
    .title-num1 {
      font-family: DingNumber;
      font-size: 44px;
      margin: 20px;
    }
    .zhibiao {
      width: 320px;
      height: 114px;
      padding: 20px;
      border-radius: 16px;
      opacity: 0px;
      background: rgba(255, 255, 255, 0.1);
      margin-top: 40px;
      position: relative;
      z-index: 1;
      .title-box {
        margin-bottom: 14px;
        position: relative;
        z-index: 1;
      }
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #79d172;
        margin-right: 8px;
      }
      .color1 {
        color: #79d172;
      }
      .bgcolor1 {
        background: #79d172;
      }
      .color2 {
        color: #88c271;
      }
      .bgcolor2 {
        background: #88c271;
      }
      .color3 {
        color: #c7d263;
      }
      .bgcolor3 {
        background: #c7d263;
      }
    }
    .left {
      position: relative;
      width: 1142px;
      height: 632px;
      border-radius: 32px;
      // border: 2px solid;
      padding: 20px 0px 40px 0px;
      // background-image: linear-gradient(238.13deg, rgba(255, 255, 255, 0) 34.07%, rgba(255, 255, 255, 0.15) 63.53%, rgba(255, 255, 255, 0.2) 96.41%);
      // border-image: linear-gradient(113.99deg, rgba(255, 255, 255, 0.8) 5.73%, rgba(255, 255, 255, 0.1) 42.8%, rgba(255, 255, 255, 0.1) 98.9%) 1 1;
      // clip-path: inset(0 round 32px);
    }
    .bg-line {
      width: 79px;
      height: 611px;
      position: relative;
      left: -40px;
    }
    .right {
      width: 578px;
      height: 632px;
      border-radius: 32px;
      padding: 20px 0px 40px 0px;
      // border: 2px solid;
      // background-image: linear-gradient(238.13deg, rgba(255, 255, 255, 0) 34.07%, rgba(255, 255, 255, 0.15) 63.53%, rgba(255, 255, 255, 0.2) 96.41%);
      // border-image: linear-gradient(113.99deg, rgba(255, 255, 255, 0.8) 5.73%, rgba(255, 255, 255, 0.1) 42.8%, rgba(255, 255, 255, 0.1) 98.9%) 2 2;
      // clip-path: inset(0 round 32px);
    }
  }
  .bottom-tab {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .bottom-all {
    width: 268px;
    height: 75px;
    position: absolute;
    left: 0;
    bottom: 19px;
    z-index: 1;
    margin: auto;
    background: linear-gradient(180deg, #5c5c5c 0%, #3d3d3d 122%);

    .icon {
      width: 36px;
      height: 36px;
      margin-right: 10px;
      margin-left: -48px;
    }
  }
  .bottom-box {
    width: 100%;
    height: 133px;
    background: url("@/assets/images/bottomBg.png");
    background-size: 100% 133px;
    position: relative;
    z-index: 2;
    padding-top: 22px;
    // background: linear-gradient(180.16deg, rgba(63, 63, 63, 0.9) 0.1%, #252525 99.83%);

    & > div {
      width: 23%;
      cursor: pointer;
    }
    .bottom-width {
      width: 284px;
      height: 100%;
    }
    .menu-box {
      height: 100%;
    }
    .icon {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
  .bottom-soc {
    width: 268px;
    height: 76px;
    position: absolute;
    bottom: 19px;
    z-index: 1;
    right: 0px;
    margin: auto;
    background: linear-gradient(180.09deg, #ff794f -1.06%, #ef523b 75.84%);
    .icon {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      margin-left: 48px;
    }
  }
  .sos-jinling {
    width: 457px;
    height: 88px;
    background: url("@/assets/images/jingBg.png") no-repeat;
    background-size: 100% 88px;
    position: absolute;
    top: 60px;
    left: 50%;
    margin-left: -230px;
    font-size: 32px;
    cursor: pointer;
    padding-left: 50px;
    &::before {
      content: "";
      display: inline-block;
      width: 100px;
      height: 100px;
      position: absolute;
      top: -4px;
      left: -46px;
      background: url("@/assets/images/jingling.png");
    }
    .txt1 {
      font-size: 22px;
    }
    .txt2 {
      font-size: 20px;
      opacity: 0.8;
      margin-top: 6px;
    }
  }
  .hide {
    // display: none!important;
    visibility: hidden;
  }
  .show {
    display: block;
  }
}
.wc {
  background: #1a2130;
  width: 100%;
  height: 100%;
  .wc-box {
    padding: 180px 0 0 0;
    .el-divider--horizontal {
      opacity: 0.2;
    }
    .el-divider--vertical {
      opacity: 0.2;
    }
    .bg {
      width: 1080px;
      height: 459px;
    }
    .content {
      width: 1760px;
      height: 660px;
      border-radius: 16px;
      position: relative;
      background: #263041;
      padding: 40px;
      .left-box {
        height: 580px;
        .border-bg {
          min-height: 250px;
        }
        .wc-clean {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          &__time {
            flex: 1 0 auto;
          }
          &__btn {
            width: 100%;
            z-index: 2;
            text-align: right;
          }
          .el-button--success {
            width: 170px;
            height: 60px;
            background-color: #79d172;
            color: #fff;
            font-size: 26px;
            border: none;
            &.result {
              background-color: #e89e42;
            }
          }
        }
        .txt4 {
          .el-divider--vertical {
            opacity: 0.2;
            height: 28px;
            margin: 0 0 0 10px;
          }
        }
      }
      .right-box {
        width: 1194px;
        height: 580px;
        border-radius: 16px;
        position: relative;
        background-image: linear-gradient(
          112.88deg,
          #52647d 4.92%,
          #34435b 22.21%,
          #313f56 35.62%,
          #2e3b51 55.07%,
          #314157 74.54%
        );
        .txt1 {
          font-size: 72px;
        }
        .txt4 {
          .el-divider--vertical {
            height: 50px;
          }
        }
        &::before {
          content: "";
          display: inline-block;
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          border-radius: 16px;
          position: absolute;
          top: 1px;
          left: 1px;
          border-radius: transparent;
          background: linear-gradient(102.66deg, #3b475c 6.07%, #2b374a 91.4%);
        }
        .bg-liudong {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .wc {
        width: 1080px;
        height: 459px;
      }
      .txt1 {
        font-size: 32px;
        opacity: 1;
        position: relative;
        color: #fff;
        margin-top: 10px;
        margin-bottom: 36px;
      }
      .txt2 {
        font-size: 40px;
        opacity: 1;
        color: #fff;
        position: relative;
      }
      .txt3 {
        font-size: 22px;
        color: #fff;
        opacity: 0.5;
        position: relative;
        margin-top: 10px;
      }
      .txt4 {
        font-size: 24px;
        font-weight: 400;
        line-height: 38px;
        color: #e3e7ee;
        position: relative;
      }
      .weizhi {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        position: relative;
        margin-left: 10px;
        background-image: linear-gradient(
          112.88deg,
          #52647d 4.92%,
          #34435b 22.21%,
          #313f56 35.62%,
          #2e3b51 55.07%,
          #314157 74.54%
        );
        &::before {
          content: "";
          display: inline-block;
          width: calc(100% - 6px);
          height: calc(100% - 6px);
          border-radius: 16px;
          position: absolute;
          top: 3px;
          left: 3px;
          border-radius: 50%;
          background: #79d172;
        }
      }

      .weizhi-active {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        position: relative;
        margin-left: 10px;
        background-image: linear-gradient(
          112.88deg,
          #52647d 4.92%,
          #34435b 22.21%,
          #313f56 35.62%,
          #2e3b51 55.07%,
          #314157 74.54%
        );
        &::before {
          content: "";
          display: inline-block;
          width: calc(100% - 6px);
          height: calc(100% - 6px);
          border-radius: 16px;
          position: absolute;
          top: 3px;
          left: 3px;
          border-radius: 50%;
          background: #f95c2a;
        }
      }
      .weizhi-margin {
        margin: 0 50px !important;
        width: 80px;
        height: 80px;
      }
    }
    .content1 {
      width: 1760px;
      height: 180px;
      border-radius: 16px;
      position: relative;
      background: #263041;
      padding: 40px;
      margin-top: 40px;
      gap: 20px;
      background-image: linear-gradient(
        112.88deg,
        #52647d 4.92%,
        #34435b 22.21%,
        #313f56 35.62%,
        #2e3b51 55.07%,
        #314157 74.54%
      );
      &::before {
        content: "";
        display: inline-block;
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        border-radius: 16px;
        position: absolute;
        top: 1px;
        left: 1px;
        border-radius: transparent;
        background: #263041;
      }
      .zhibiao {
        width: 328px !important;
        .title-box {
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
          font-size: 30px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #3aad81;
          margin-right: 8px;
        }
        .color1 {
          color: #79d172;
        }
        .bgcolor1 {
          background: #79d172;
        }
        .color2 {
          color: #2ad4f9;
        }
        .bgcolor2 {
          background: #2ad4f9;
        }
        .color3 {
          color: #ff5443;
        }
        .bgcolor3 {
          background: #ff5443;
        }
      }
    }
    .border-bg {
      position: relative;
      width: 456px;
      border-radius: 16px;
      padding: 30px;
      background-image: linear-gradient(
        112.88deg,
        #52647d 4.92%,
        #34435b 22.21%,
        #313f56 35.62%,
        #2e3b51 55.07%,
        #314157 74.54%
      );
      &::before {
        content: "";
        display: inline-block;
        width: calc(100% - 2px);
        height: calc(100% - 2px);
        border-radius: 16px;
        position: absolute;
        top: 1px;
        left: 1px;
        border-radius: transparent;
        background: linear-gradient(102.66deg, #3b475c 6.07%, #2b374a 91.4%);
      }
    }
  }
}
.wuxiu-box {
  padding: 16% 0 0 0;
  width: 100%;
  position: absolute;
  .icon {
    width: 248px;
    height: 237px;
  }
  .txt1 {
    font-size: 36px;
    font-weight: 400;
    line-height: 50.4px;
    color: #fff;
    margin-top: 40px;
  }
  .btn {
    width: 180px;
    height: 64px;
    line-height: 64px;
    border-radius: 8px;
    font-size: 24px;
    background: #ffffff1a;
    color: #fff;
    text-align: center;
    margin-top: 220px;
  }
}

.sos-animate {
  border: 1px solid #ff3636;
  box-shadow: inset 0 0 50px #ff363650;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  &::after {
    content: "";
    display: inline-block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: 2px solid #ff3636;
    box-shadow: inset 0 0 120px #ff3636;
    animation: myfirst 1s infinite;
  }
  @keyframes myfirst {
    from {
      border: 2px solid #ff3636;
      box-shadow: inset 0 0 120px #ff3636;
    }
    to {
      border: 1px solid #ff363650;
      box-shadow: inset 0 0 120px #ff363600;
    }
  }
}
</style>
<style lang="scss">
.el-progress-bar__outer {
  overflow: visible !important;
}
.zhibiao.shadow .el-progress-bar {
  transform: rotate(180deg);
}

.zhibiao .el-progress-bar__outer {
  background: linear-gradient(
    90deg,
    #418bfb 0%,
    #87dd8b 25%,
    #eee73d 50%,
    #f49301 75%,
    #ee4730 100%
  ) !important;
}
.zhibiao .el-progress__text {
  flex: 1;
  font-size: 20px !important;
  color: #ffffff;
  opacity: 0.8;
  width: 140px;
  text-align: right;
  color: rgba(255, 255, 255, 0.4);
}
.zhibiao .el-progress {
  height: 30px !important;
}
.zhibiao.shadow .el-progress-bar__inner {
  background-color: rgba(61, 66, 69, 0.8) !important;
  height: 6px;
  top: -1px;
}
.el-progress-bar__inner::after {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 0px;
  border-radius: 50%;
  top: -1px;
  border: 4px solid #fff;
}
.content .el-progress-bar__inner::after {
  width: 6px;
  height: 6px;
  position: absolute;
  right: 0px;
  top: -1px;
  border-radius: 50%;

  // top:0.5px;
  border: 4px solid #fff;
}
.content .zhibiao .el-progress-bar__outer {
  background: linear-gradient(
    90deg,
    #ee4730 0%,
    #f49301 25%,
    #eee73d 50%,
    #87dd8b 75%,
    #418bfb 100%
  ) !important;
}
.wc-reverse {
  flex-direction: row-reverse;
}
.wc .el-progress-bar {
  transform: rotate(180deg);
}
.wc .el-progress-bar__outer {
  background: linear-gradient(
    90deg,
    #ee4730 0%,
    #f49301 25%,
    #eee73d 50%,
    #87dd8b 75%,
    #418bfb 100%
  ) !important;
}
.wc .el-progress-bar__inner {
  background-color: rgba(61, 66, 69, 0.8) !important;
  height: 6px;
  top: -1px;
}
.wc .el-progress-bar__inner::after {
  width: 6px;
  height: 6px;
  position: absolute;
  right: 0px;
  border-radius: 50%;
  top: -1px;
  border: 4px solid #fff;
}
</style>
<style scoped lang="scss">
body {
  width: 1920px;
  height: 1080px;
}
.cus-drawer {
  background: rgb(9, 9, 9);
}

.index-box {
  width: 100%;
  height: 1080px;
  overflow: hidden;
  bottom: 0;
  position: absolute;
  left: 0;
  background-color: rgb(9, 9, 9) !important;
}
:v-deep(.el-overlay) {
  background: #090909;
}
:v-deep(.el-drawer__body) {
  padding: 0 !important;
}
</style>
