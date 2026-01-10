<template>
  <el-dialog v-model="dialogFormVisible" title="初始化平板" width="500">
    <el-form :model="form">
      <el-form-item label="属地" :label-width="formLabelWidth">
        <el-select v-model="form.spaceIndex" placeholder="选择属地">
          <el-option
            :label="space.name"
            :value="index"
            v-for="(space, index) in spaceObj"
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
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="绑定会议室"
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
        <el-select
          v-model="form.mettingRoomIndex"
          placeholder="绑定会议室"
          size="large"
        >
          <el-option
            :label="area.name"
            :value="index"
            v-for="(area, index) in spaceObj[form.spaceIndex].floorArea[
              form.floorareaIndex
            ].floor[form.floorIndex].mettingRoom"
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
    <!--    <el-form :model="form">-->
    <!--      <el-form-item label="分区" :label-width="formLabelWidth">-->
    <!--        <el-select v-model="form.floorarea" placeholder="选择楼层区域">-->
    <!--          <el-option label="三区" value="A3" />-->
    <!--          <el-option label="四区" value="A4" />-->
    <!--          <el-option label="五区" value="A5" />-->
    <!--        </el-select>-->
    <!--      </el-form-item>-->
    <!--        <el-form-item label="楼层" :label-width="formLabelWidth">-->
    <!--          <el-select v-model="form.floor" placeholder="选择楼层">-->
    <!--            <el-option :label="(i+22)+'F'" :value="(i+22)+'F'" v-for="i in 10" v-if="form.floorarea==='A3'" />-->
    <!--            <el-option :label="(i+33)+'F'" :value="(i+33)+'F'" v-for="i in 10" v-if="form.floorarea==='A4'" />-->
    <!--            <el-option :label="(i+44)+'F'" :value="(i+44)+'F'" v-for="i in 10" v-if="form.floorarea==='A5'" />-->
    <!--          </el-select>-->
    <!--        </el-form-item>-->
    <!--        <el-form-item label="名称" :label-width="formLabelWidth">-->
    <!--          <el-select v-model="form.code" placeholder="绑定会议室" size="large">-->
    <!--            <el-option v-for="i in 8" :label="form.floor.substring(0,2)+'0'+i" :value="'M'+form.floor.substring(0,2)+'0'+i" />-->
    <!--          </el-select>-->
    <!--&lt;!&ndash;          <el-input  v-model="form.code" size="large"></el-input>&ndash;&gt;-->
    <!--        </el-form-item>-->
    <!--&lt;!&ndash;        <el-select v-model="form.code" placeholder="绑定会议室" size="large">&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="2601会议室" value="2601" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="2602会议室" value="2602" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="2603会议室" value="2603" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="2604会议室" value="2604" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="2605会议室" value="2605" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="2606会议室" value="2606" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="2607会议室" value="2607" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="2608会议室" value="2608" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="4201会议室" value="4201" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="4202会议室" value="4202" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="4203会议室" value="4203" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="4204会议室" value="4204" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="4205会议室" value="4205" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="4206会议室" value="4206" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="4207会议室" value="4207" />&ndash;&gt;-->
    <!--&lt;!&ndash;        </el-select>&ndash;&gt;-->
    <!--&lt;!&ndash;      <el-form-item label="设备类型" :label-width="formLabelWidth">&ndash;&gt;-->
    <!--&lt;!&ndash;        <el-select v-model="form.type" placeholder="Please select a zone">&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="会议室电子门牌" value="meetingPad" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="墙面中控平板" value="wallPad" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="卫生间平板" value="wcPad" />&ndash;&gt;-->
    <!--&lt;!&ndash;        </el-select>&ndash;&gt;-->
    <!--&lt;!&ndash;      </el-form-item>&ndash;&gt;-->
    <!--&lt;!&ndash;      <el-form-item label="屏幕方向" :label-width="formLabelWidth">&ndash;&gt;-->
    <!--&lt;!&ndash;        <el-select v-model="form.hs" placeholder="选择屏幕类型">&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="横屏" value="h" />&ndash;&gt;-->
    <!--&lt;!&ndash;          <el-option label="竖屏" value="s" />&ndash;&gt;-->
    <!--&lt;!&ndash;        </el-select>&ndash;&gt;-->
    <!--&lt;!&ndash;      </el-form-item>&ndash;&gt;-->
    <!--    </el-form>-->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="saveData"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
  <div class="top-box flex-row justify-between align-center">
    <Logo
      size="mini"
      :class="class1"
      class="animate__animated"
      ref="logoCom"
    ></Logo>
    <div style="font-size: 28px">{{ obj.name }}</div>
    <LocalTime
      size="mini"
      :class="class2"
      class="animate__animated"
    ></LocalTime>
  </div>
  <div class="lights-box">
    <div class="flex-row justify-around">
      <div>
        <IndexTitle title="照明控制"></IndexTitle>
        <div class="content">
          <div class="title">整区设置</div>
          <sliderPick
            size="mini"
            style="width: 100%; background: #2e3a4d"
            :activeName="lightallbutton"
            :tabList="['全关', '全开']"
            @click="lightAllOP"
          ></sliderPick>
          <div class="title">分区设置</div>
          <div class="light flex-row align-center">
            <div
              v-for="(item, index) in lightobj"
              :key="index"
              class="light-item flex-col align-center justify-center"
              :class="[item.status === 'off' ? 'close' : '']"
              @click="lightOp(item)"
            >
              <div
                class="flex-col align-center justify-center"
                style="position: relative; z-index: 2"
              >
                <img
                  v-if="item.status === 'on'"
                  class="icon"
                  src="@/assets/images/lighton.png"
                />
                <img
                  v-if="item.status === 'off'"
                  class="icon"
                  src="@/assets/images/lightoff.png"
                />
                <div class="txt">{{ showLightTitle(item.name) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <IndexTitle title="空调控制"></IndexTitle>
        <div class="content">
          <div class="title">整区设置</div>
          <div v-if="acloadingFlag" style="font-size: 32px">
            空调指令执行中....
          </div>
          <sliderPick
            style="width: 342px"
            v-if="!acloadingFlag"
            :activeName="acObject.status"
            :tabList="['关闭', '开启']"
            @click="acAllOP"
          ></sliderPick>


          <sliderPick
            style="width: 342px;margin-top:10px"
            v-if="!acloadingFlag"
            :activeName="controlMode ? 0 : 1"
            :tabList="['智控模式', '手动模式']"
            @click="cMode"
          ></sliderPick>



          <div class="action-desc" v-if="!acloadingFlag">
            <span
              >设置温度：<em>{{
                acObject.status === "0"
                  ? " 关闭 "
                  : acObject.pretemperature + `℃`
              }}</em></span
            >
            <span
              >空调模式：<em>{{
                acObject.status === "0" ? "关闭" : acObject.mode
              }}</em></span
            >
          </div>
          <div v-if="!acloadingFlag && acObject.status != 0">
            <div class="title">温度设置</div>
            <div class="wendu-box">
              <div class="click-box flex-row justify-between">
                <!--                  <div @click="airconditionAll({temperature:(acObject.pretemperature-1<19?19:acObject.pretemperature-1)})" class="img-box flex-row align-center justify-center">-->
                <!--                    <img class="img" src="@/assets/images/wenduJian.png"/>-->
                <!--                  </div>-->
                <!-- <div class="txt" style="text-align: center;width:100%">{{ acObject.pretemperature }} <span class="txt1">℃</span></div> -->
                <!--                  <div @click="airconditionAll({temperature:(acObject.pretemperature+1>28?28:acbject.pretemperature+1)})"  class="img-box flex-row align-center justify-center">-->
                <!--                    <img class="img" src="@/assets/images/wenduAdd.png"/>-->
                <!--                  </div>-->
              </div>
              <!-- 拖动的小圆点pc样式和平板样式不对应，保持目前css样式 -->
              <el-slider
                v-model="acObject.pretemperature"
                :min="17"
                :max="26"
                :step="1"
                :format-tooltip="formatTooltip"
                show-tooltip
                show-stops
                tooltip-class="temp-tip"
                @change="handleChange"
                :marks="marks"
              />
              <div class="min-temp-control">
                <span class="floor">17℃</span>
                <span class="celling">26℃</span>
              </div>
              <!--                 <el-progress style="flex:1" color="#00000000" :percentage="currentWendu" :text-inside="true" :stroke-width="24"></el-progress>-->
            </div>
            <div class="title">风量设置</div>
            <sliderPick
              style="width: 342px"
              :activeName="fanbutton"
              :tabList="['弱风', '中风', '强风']"
              @click="acFanOP"
            ></sliderPick>
          </div>
        </div>
      </div>
      <div>
        <IndexTitle title="室内环境"></IndexTitle>
        <div class="left-box-box">
          <div
            class="content align-center flex-row justify-between"
            style="flex-direction: column"
          >
            <div class="main hun flex-col justify-around">
              <div class="justify-between">
                <div class="title-box flex-row">
                  <img class="icon" src="@/assets/images/wen.png" />
                  <div>温度</div>
                </div>
                <div class="tem-box">{{ inside.temperature }}℃</div>
              </div>
              <el-progress
                color="#00000000"
                :percentage="100 - inside.humidity"
                :show-text="false"
                :stroke-width="4"
              ></el-progress>
              <div class="bot-box"></div>
            </div>
            <div class="main hun flex-col justify-around">
              <div class="justify-between">
                <div class="title-box flex-row">
                  <img class="icon" src="@/assets/images/tem.png" />
                  <div>湿度</div>
                </div>
                <div class="tem-box">{{ inside.humidity }}%</div>
              </div>
              <el-progress
                color="#00000000"
                :percentage="100 - inside.humidity"
                :show-text="false"
                :stroke-width="4"
              ></el-progress>
              <div class="bot-box"></div>
            </div>
            <div class="main qita flex-col justify-around">
              <div class="justify-between">
                <div class="title-box flex-row align-center">
                  <div class="dot"></div>
                  <div>PM2.5</div>
                </div>
                <div class="tem-box">
                  <div>
                    {{ airValue(inside.pm25, "pm25").showValue
                    }}<span>μg</span>/m³
                  </div>
                </div>
              </div>
              <el-progress
                color="#00000000"
                :percentage="airValue(inside.pm25, 'pm25').parcent"
                :show-text="false"
                :stroke-width="4"
              ></el-progress>
              <div class="bot-box">
                <!--          安全范围：0～35μg/m³ -->
              </div>
            </div>
            <div class="main qita flex-col justify-around">
              <div class="justify-between">
                <div class="title-box flex-row align-center">
                  <div class="dot"></div>
                  <div>CO₂</div>
                </div>
                <div class="tem-box">
                  <div>{{ airValue(inside.co2, "co2").showValue }}ppm</div>
                </div>
              </div>
              <el-progress
                color="#00000000"
                :percentage="airValue(inside.co2, 'co2').parcent"
                :show-text="false"
                :stroke-width="4"
              ></el-progress>
              <div class="bot-box">
                <!--          安全范围：500～800ppm-->
              </div>
            </div>
            <div class="main qita flex-col justify-around">
              <div class="justify-between">
                <div class="title-box flex-row align-center">
                  <div class="bgcolor4 dot"></div>
                  <div>TVOC</div>
                </div>
                <div class="tem-box">
                  <div>{{ airValue(inside.tvoc, "tvoc").showValue }}mg/m³</div>
                </div>
              </div>
              <el-progress
                color="#00000000"
                :percentage="airValue(inside.tvoc, 'tvoc').parcent"
                :show-text="false"
                :stroke-width="4"
              ></el-progress>
              <div class="bot-box">
                <!--          安全范围：0～0.50ppm-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="display: none">
        <IndexTitle title="窗帘控制"></IndexTitle>
        <div class="content">
          <div class="title">整区设置</div>
          <sliderPick
            size="mini"
            style="width: 348px; background: #2e3a4d"
            :activeName="0"
            :tabList="['全开', '全关', '自定义']"
          ></sliderPick>
          <div class="title">分区设置</div>
          <div class="chuanglian-box">
            <div class="flex-row align-center">
              <div class="txt">窗帘1</div>
              <sliderPick
                size="mini"
                style="width: 252px"
                :activeName="0"
                :tabList="['开', '暂停', '关']"
              ></sliderPick>
            </div>
            <div class="flex-row align-center" style="margin-top: 20px">
              <div class="txt">窗帘2</div>
              <sliderPick
                size="mini"
                style="width: 252px"
                :activeName="0"
                :tabList="['开', '暂停', '关']"
              ></sliderPick>
            </div>
            <div class="flex-row align-center" style="margin-top: 20px">
              <div class="txt">窗帘3</div>
              <sliderPick
                size="mini"
                style="width: 252px"
                :activeName="0"
                :tabList="['开', '暂停', '关']"
              ></sliderPick>
            </div>
            <div class="flex-row align-center" style="margin-top: 20px">
              <div class="txt">窗帘4</div>
              <sliderPick
                size="mini"
                style="width: 252px"
                :activeName="0"
                :tabList="['开', '暂停', '关']"
              ></sliderPick>
            </div>
            <div class="flex-row align-center" style="margin-top: 20px">
              <div class="txt">窗帘5</div>
              <sliderPick
                size="mini"
                style="width: 252px"
                :activeName="0"
                :tabList="['开', '暂停', '关']"
              ></sliderPick>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="dialogLight"
    append-top-body
    width="500"
    top="40vh"
    :show-close="false"
  >
    <span>{{ dialogTxt }}</span>
    <template #footer>
      <div class="dialog-footer flex-row justify-around">
        <el-button
          type="default"
          @click="dialogLight = false"
          :loading="loadingFlag"
          >取消</el-button
        >
        <el-button type="primary" @click="setLight" :loading="loadingFlag">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="dialogLightAll"
    append-top-body
    width="500"
    top="40vh"
    :show-close="false"
  >
    <span>{{ dialogTxt }}</span>
    <template #footer>
      <div class="dialog-footer flex-row justify-around">
        <el-button
          type="default"
          @click="dialogLightAll = false"
          :loading="loadingFlag"
          >取消</el-button
        >
        <el-button type="primary" @click="lightAll" :loading="loadingFlag">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="dialogAcAll"
    append-top-body
    width="500"
    top="40vh"
    :show-close="false"
  >
    <span>{{ dialogTxt }}</span>
    <template #footer>
      <div class="dialog-footer flex-row justify-around">
        <el-button
          type="default"
          @click="dialogAcAll = false"
          :loading="loadingFlag"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="airconditionAll"
          :loading="loadingFlag"
        >
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- <el-dialog
    v-model="dialogLight"
    append-top-body
    width="500"
    top="40vh"
    :show-close="false"
  >
    <span>{{ dialogTxt }}</span>
    <template #footer>
      <div class="dialog-footer flex-row justify-around">
        <el-button type="default" @click="dialogLight = false">取消</el-button>
        <el-button type="primary" @click="setLight">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="dialogFankui"
    append-top-body
    width="560"
    top="30vh"
    :show-close="true"
  >
    <template #header>
      <div>有问题直接找楼长</div>
    </template>
    <img class="fankui-erweima" :src="erweimma" />
    <div class="fankui-txt">请使用企业微信扫描二维码添加</div>
    <div class="fankui-txt">TEL：13367970560</div>
  </el-dialog> -->
</template>
<style scoped lang="scss">
.top-box {
  width: 100%;
  height: 64px;
  background: #263041;
  padding: 0 40px;
  color: #fff;
  position: absolute;
}
.lights-box {
  width: 100%;
  height: 100%;
  background: #202838;
  color: #fff;
  padding-top: 64px;

  .content {
    width: 390px;
    height: 640px;
    padding: 1px 20px 20px 20px;
    margin-bottom: 20px;
    border-radius: 16px;
    background: #263041;
    .title {
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      text-align: left;
      color: #fff;
      opacity: 0.85;
      clear: both;
      margin: 22px 0 14px 0;
    }
    .light {
      gap: 10px;
      flex-wrap: wrap;
      .light-item {
        width: 107px;
        flex: 0 0 107px;
        flex-wrap: wrap;
        height: 107px;
        gap: 10px;
        border-radius: 20px;
        position: relative;
        background-image: linear-gradient(
          96.08deg,
          #607594 5.78%,
          rgba(63, 79, 108, 0) 22.99%,
          rgba(63, 79, 108, 0) 75.06%,
          #3f4f6c 91.49%
        );
        &::before {
          content: "";
          display: inline-block;
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          border-radius: 20px;
          position: absolute;
          top: 1px;
          left: 1px;
          border-radius: transparent;
          background: linear-gradient(96.9deg, #4a5a76 8.02%, #34445e 88%);
        }
        .icon {
          width: 36px;
          height: 42px;
          margin-bottom: 6px;
        }
        .txt {
          font-size: 18px;
        }
      }
      .close {
        background-image: linear-gradient(
          96.08deg,
          #3d4d65 5.78%,
          rgba(63, 79, 108, 0) 22.99%,
          rgba(63, 79, 108, 0) 75.06%,
          #2c3850 91.49%
        );
        &::before {
          content: "";
          display: inline-block;
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          position: absolute;
          top: 1px;
          left: 1px;
          border-radius: transparent;
          background: #1a2130 !important;
        }
      }
    }

    .wendu-box {
      font-size: 22px;
      width: 100%;
      padding: 24px;
      border-radius: 16px;
      position: relative;
      background: #2e3a4d;
      .click-box {
        width: 100%;
        // padding:0 40px 34px 40px;
      }
      .img-box {
        width: 48px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        position: relative;
        border-radius: 50%;
        background-image: linear-gradient(
          96.08deg,
          #607594 5.78%,
          rgba(63, 79, 108, 0) 22.99%,
          rgba(63, 79, 108, 0) 75.06%,
          #3f4f6c 91.49%
        );
        &::before {
          content: "";
          display: inline-block;
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          border-radius: 20px;
          position: absolute;
          top: 1px;
          left: 1px;
          border-radius: transparent;
          background: linear-gradient(96.9deg, #4a5a76 8.02%, #34445e 88%);
        }
        .img {
          width: 22px;
          height: auto;
          position: relative;
        }
      }
      .txt {
        line-height: 40px;
        font-size: 52px;
      }
      .txt1 {
        line-height: 40px;
        font-size: 22px;
        position: relative;
        left: -4px;
      }
      .opa85 {
        opacity: 0.85;
      }
      .colorOrange {
        color: #ed8733;
        font-size: 18px;
        cursor: pointer;
      }
    }
    .chuanglian-box {
      background: #2e3a4d;
      border-radius: 16px;
      padding: 20px;
      height: 444px;
      overflow-y: scroll;
      .txt {
        width: 80px;
        font-size: 18px;
      }
    }
    .fengliang {
      width: 100%;
      height: 184px;
      background: #2e3a4d;
      border-radius: 20px;
    }
  }
}
</style>
<style scoped lang="scss">
.left-box-box {
  width: 380px;
  height: 100%;
  background: #202838;

  .content {
    padding: 24px;
    margin-bottom: 20px;
    border-radius: 16px;
    background: #263041;
    .main {
      font-size: 22px;
      width: 354px;
      //height: 232px;
      padding: 24px;
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
      &::before {
        content: "";
        display: inline-block;
        //width: calc(100% - 2px);
        //height: calc(100% - 2px);
        position: absolute;
        top: 1px;
        left: 1px;
        border-radius: 16px;
        background: linear-gradient(102.66deg, #3b475c 6.07%, #2b374a 91.4%);
      }
      .tem-box {
        font-size: 22px;
        font-weight: 500;
        color: #fff;
      }
    }
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #79d172;
      margin-right: 12px;
    }
    .icon {
      width: 25px;
      height: 25px;
      margin-right: 8px;
    }
    .font32 {
      font-size: 32px;
      position: relative;
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
    .color4 {
      color: #79d172;
    }
    .bgcolor4 {
      background: #79d172;
    }
    .title-box {
      opacity: 0.65;
      align-items: center;
    }
    .bot-box {
      opacity: 0.45;
    }
  }
}
.el-progress {
  margin-top: 17px;
}
</style>
<style lang="scss">
.el-progress-bar__outer {
  overflow: visible !important;
}
.el-progress-bar {
  transform: rotate(180deg);
}
.tem .el-progress-bar__outer {
  background: linear-gradient(
    90deg,
    #ee4730 0%,
    #f49301 25%,
    #eee73d 50%,
    #87dd8b 75%,
    #418bfb 100%
  ) !important;
}
.tem .el-progress-bar__inner {
  background-color: rgba(61, 66, 69, 0.8) !important;
  height: 6px;
  top: -1px;
}
.tem .el-progress-bar__inner::after {
  width: 6px;
  height: 6px;
  position: absolute;
  right: 0px;
  border-radius: 50%;
  top: -2px;
  border: 4px solid #fff;
}

.hun .el-progress-bar__outer {
  background: linear-gradient(
    90deg,
    #ee4730 0%,
    #f49301 25%,
    #eee73d 50%,
    #87dd8b 75%,
    #418bfb 100%
  ) !important;
}
.hun .el-progress-bar__inner {
  background-color: rgba(61, 66, 69, 0.8) !important;
  height: 6px;
  top: -1px;
}
.hun .el-progress-bar__inner::after {
  width: 6px;
  height: 6px;
  position: absolute;
  right: 0px;
  border-radius: 50%;
  top: -1px;
  border: 4px solid #fff;
}

.qita .el-progress-bar__outer {
  background: linear-gradient(
    90deg,
    #ee4730 0%,
    #f49301 25%,
    #eee73d 50%,
    #87dd8b 75%,
    #418bfb 100%
  ) !important;
}
.qita .el-progress-bar__inner {
  background-color: rgba(61, 66, 69, 0.8) !important;
  height: 6px;
  top: -1px;
}
.qita .el-progress-bar__inner::after {
  width: 6px;
  height: 6px;
  position: absolute;
  right: 0px;
  border-radius: 50%;
  top: -1px;
  border: 4px solid #fff;
}
.tem .el-progress-bar__outer1 {
  background: linear-gradient(
    90deg,
    #418bfb 0%,
    #87dd8b 25%,
    #eee73d 50%,
    #f49301 75%,
    #ee4730 100%
  ) !important;
}
.hun .el-progress-bar__outer1 {
  background: linear-gradient(
    90deg,
    #f9cc04 0%,
    #41dafb 50%,
    #418bfb 100%
  ) !important;
}
.qita .el-progress-bar__outer1 {
  background: linear-gradient(
    90deg,
    #31ab83 0%,
    #99c86e 31%,
    #fde35a 55%,
    #fdab5a 68%,
    #d4325a 80%,
    #8331ab 91%,
    #96324c 100%
  ) !important;
}
.el-progress-bar__inner::after {
  width: 18px;
  height: 18px;
  position: absolute;
  right: 0px;
  border-radius: 50%;
  top: -2px;
  border: 4px solid #fff;
}
.min-temp-control {
  display: flex;
  justify-content: space-between;
  font-size: 20px !important;

  .floor {
    margin-right: 14px;
  }
  .celling {
    margin-left: 12px;
  }
}
.action-desc {
  display: flex;
  width: 342px;
  padding: 18px 16px;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  background: #2e3a4d;
  margin-top: 16px;
  span {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.65);
    font-weight: 400;
    em {
      font-style: normal;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 500;
    }
  }
}
</style>
<style lang="scss">
.wendu-box {
  .el-progress-bar__outer {
    overflow: visible !important;
    margin: 0 20px;
  }
  .el-progress-bar__outer {
    background: #263041 !important;
  }
  .el-progress-bar__inner {
    background: linear-gradient(90deg, #4a5a76, #34445e);
    box-shadow: 1px 0px 0px 0px rgba(104, 122, 154, 0.54),
      -1px 0px 0px 0px rgba(73, 89, 117, 0.54);
  }
  .el-progress-bar {
    transform: rotate(0deg);
  }
  .el-progress-bar__inner::after {
    width: 18px;
    height: 18px;
    background: #ffffff;
    border-radius: 50%;
    top: 3px;
    right: 3px;
  }
  .el-progress-bar__innerText {
    display: inline-block;
    vertical-align: middle;
    color: #000;
    font-size: 16px;
    margin: -14px;
    background: #fff;
    padding: 6px;
    position: relative;
    top: -32px;
    border-radius: 6px;
    opacity: 0;
  }
  .el-slider__runway {
    height: 12px;
    border-radius: 100px;
    background: linear-gradient(
      90deg,
      #418bfb 0%,
      #59a7d5 20%,
      #6dbeb5 34%,
      #87dd8b 52.5%,
      #bee262 69.5%,
      #d5e450 78.5%,
      #eee73d 86%,
      #f0c425 92.5%,
      #f49301 100%
    );
  }
  .el-slider__bar {
    height: 100%;
    background-color: transparent;
  }
  .el-slider__button-wrapper {
    height: 20px;
    width: 20px;
    top: -6px;
    .el-slider__button {
      border: none;
    }
    &::after {
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: #b9e265;
      border-radius: 10px;
      top: 8px;
      left: 5px;
    }
  }
  .el-slider__stop {
    height: 8px;
    width: 8px;
    top: 2px;
  }
}
.el-popper.temp-tip {
  border-radius: 8px !important;
  background: #fff !important;
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  border: none;
  padding: 2px 7px;
  margin-bottom: -5px;

  .el-popper__arrow {
    display: none;
  }
}
</style>
<style lang="scss">
.dialog-footer {
  margin: 0px 0 40px 0 !important;
  padding: 0 20px;
}
.fankui-erweima {
  width: 238px;
  height: 237px;
}
.fankui-txt {
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  color: #fff;
  opacity: 0.65;
  margin-top: 16px;
  text-align: center;
}
.el-dialog__header {
  text-align: center;
  font-size: 24px;
}
</style>
<script setup>
// import { http } from "@/utils/http";
import IndexTitle from "@/components/indexTitle.vue";
import sliderPick from "@/components/sliderPick.vue";
// import erweimma from "@/assets/images/erweima.png";
import autofit from "autofit.js";
import LocalTime from "@/components/localTime.vue";
import Logo from "@/components/logo.vue";
import { logClk } from "@/utils/logClk";
import { ElMessage } from "element-plus";

const subscribe = inject("subscribe"); // 订阅信息
const unsubscribe = inject("unsubscribe"); // 订阅信息
const getMessage = inject("getMessage"); // 订阅信息
const publish = inject("publish"); // 订阅信息
const dialogFormVisible = ref(false); //配置窗口
const obj = ref({});
const spaceObj = ref([]);
const dialogLight = ref(false);
const dialogLightAll = ref(false);
const dialogAcAll = ref(false);
const lightallbutton = ref(0);
const fanbutton = ref(0);
const acbutton = ref(0);
const dialogFankui = ref(false);
const loadingFlag = ref(false);
const acloadingFlag = ref(false);
const value = ref([30, 60]);

const timer1 = ref(null);
const timer2 = ref(null);
const timer3 = ref(null);
const timer4 = ref(null);
const timer5 = ref(null);
const timer6 = ref(null);
//add by jimmy 智控模式和手动模式 
const lastChangeTime = ref(0);
const controlMode = ref(true);
const handleControlMode = (val, isCheckTime) => {
  const currentTime = new Date().getTime();
  console.log("var",val)
  // if (!isCheckTime) {
  //   if (currentTime - lastChangeTime.value < 3000) {
  //     controlMode.value = !val;
  //     return;
  //   }
  // }
  controlMode.value = val;
  localStorage.setItem("controlMode",val)
  lastChangeTime.value = currentTime;
  publish(
    `/iot/setting/pad/policy/switch`,
    JSON.stringify({
      spaceCode: "HGH-WC",
      floorAreaCode: obj.value.floorarea,
      floorCode: obj.value.floor,
      areaCode: obj.value.code,
      tc: val ? "open" : "close",
    })
  );
  console.log("controlMode",controlMode.value)
  const msg = val
    ? "智控模式开启，将根据环境自动调温"
    : "智控模式已关闭，不再自动调温";
  ElMessage({
    type: "warning",
    dangerouslyUseHTMLString: true,
    message: `<div style='color:#1E1E1E;font-size:14px'>${msg}</div>`,
    offset: 100,
    duration: 3000,
    appendTo: "#devices",
  });
};
const cMode = function (e, data) {
  console.log("cMode",e.target.innerText)
  if (e.target.innerText === "智控模式") {
    handleControlMode(true,false)
  }else{
    handleControlMode(false,false)
  }
}
//add by jimmy 智控模式和手动模式 



const dialogTxt = ref("");
const currtlight = ref({});
const currtstatus = ref("off");
const tempStatus = ref("off");
const marks = reactive({
  18: "",
  19: "",
  20: "",
  21: "",
  22: "",
  23: "",
  24: "",
  25: "",
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
const acObject = ref({
  pretemperature: 0,
  mode: 0,
  fan: "",
  status: "on",
});
const lightobj = ref([
  { name: "照明 1", status: 1 }, //0：关，1：开
  { name: "照明 2", status: 0 },
  { name: "照明 3", status: 1 },
  { name: "照明 4", status: 1 },
  { name: "过道照明 1", status: 1 },
  { name: "过道照明 2", status: 1 },
]);
const acobj = ref([]);
const form = reactive({
  floorarea: "",
  name: "",
  code: "",
  floor: "",
  type: "",
  space: "",
  spaceIndex: 0,
  floorareaIndex: 0,
  floorIndex: 0,
  areaIndex: 0,
});
autofit.init(
  {
    dh: 800,
    dw: 1280,
    el: "#app",
    resize: true,
  },
  false
);
const airValue = (avalue, airtype) => {
  let airValue = {
    showValue: "0",
    parcent: 0,
  };
  if (airtype === "formaldehyde") {
    let sValue = (avalue * 1.23).toFixed(3);
    sValue = parseFloat(sValue);
    let tValue = sValue > 0.07 ? 0.07 : sValue;
    if (tValue == 0) {
      tValue = 0.01;
    }
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 0.16) * 100;
    // console.info(airValue.parcent)
  } else if (airtype === "co2") {
    let sValue = avalue;
    let tValue = sValue > 800 ? 802 : sValue;
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 2000) * 100;
    // console.info(airValue.parcent)
  } else if (airtype === "pm25") {
    let sValue = avalue;
    let tValue = sValue > 75 ? 75 : sValue;
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 400) * 100;
    // console.info(airValue.parcent)
  } else if (airtype === "tvoc") {
    let sValue = (avalue * 0.0023).toFixed(3);
    sValue = parseFloat(sValue);
    let tValue = sValue > 0.4 ? 0.4 : sValue;
    if (tValue == 0) {
      tValue = 0.1;
    }
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 2) * 100;
    // console.info(airValue.parcent)
  } else if (airtype === "h2s") {
    let sValue = (avalue * 1.391).toFixed(3);
    sValue = parseFloat(sValue);
    let tValue = sValue > 0.011 ? 0.011 : sValue;
    airValue.showValue = tValue;
    if (tValue == 0) {
      tValue = 0.001;
    }
    airValue.parcent = 100 - (tValue / 0.02) * 100;
  } else if (airtype === "nh3") {
    let sValue = (avalue * 0.695).toFixed(3);
    sValue = parseFloat(sValue);
    let tValue = sValue > 9 ? 9.2 : sValue;
    if (tValue == 0) {
      tValue = 1;
    }
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 20) * 100;
    // console.info(airValue.parcent)
  }
  return airValue;
};
const showLightTitle = function (e) {
  // console.info(e)
  if (e.substring(0, 2) === obj.value.code + "区") {
    return e.substring(2, e.length);
  } else {
    return e;
  }
};
const lightAllOP = function (e, data) {
  let status = "";
  if (e.target.innerText === "全开") {
    // lightallbutton.value = 1
    status = "off";
  } else if (e.target.innerText === "全关") {
    // lightallbutton.value = 0
    status = "on";
  }

  if (status !== "") {
    currtstatus.value = status;
    dialogLightAll.value = true;
    dialogTxt.value = "确认" + (status === "on" ? "关闭" : "打开") + "所有照明";
  }
};
const lightAll = function () {
  let actionStr = "";
  console.log(currtstatus.value, "][][[[[]]]]");
  if (currtstatus.value === "on") {
    lightallbutton.value = 0;
    actionStr = "off";
  } else {
    lightallbutton.value = 1;
    actionStr = "on";
  }
  let areaLights = [];

  lightobj.value.forEach(function (l) {
    areaLights.push(l.name);
  });
  // console.info( `/iot/action/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${areaLights.join(",")}`)
  publish(
    `/iot/action/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${
      obj.value.code
    }/${areaLights.join(",")}`,
    JSON.stringify({ action: actionStr })
  );
  // log日志
  logClk({
    sourceName: "/运营/楼宇智控10寸/照明/群控",
    deviceType: "light",
    actionTopic: `/iot/action/light/HGH-WC/${obj.value.floorarea}/${
      obj.value.floor
    }/${obj.value.code}/${areaLights.join(",")}`,
    actionData: JSON.stringify({ action: actionStr }),
    spaceCode: JSON.parse(data).space,
    floorCode: JSON.parse(data).floor,
    floorAreaCode: JSON.parse(data).floorarea,
    areaCode: JSON.parse(data).code,
  });
  // setTimeout(function(){
  //   publish(
  //       `/iot/action/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`,
  //       JSON.stringify({action:'status'})
  //   )
  // }, 3000)
  loadingFlag.value = true;
  timer2.value = setTimeout(function () {
    loadingFlag.value = false;
    dialogLightAll.value = false;
    publish(
      `/iot/action/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`,
      JSON.stringify({ action: "status" })
    );
  }, 4000);
};

const acAllOP = function (e, data) {
  let status = "";
  if (e.target.innerText === "开启") {
    // lightallbutton.value = 1
    status = "off";
  } else if (e.target.innerText === "关闭") {
    // lightallbutton.value = 0
    status = "on";
  }
  if (status !== "") {
    tempStatus.value = status;
    dialogAcAll.value = true;
    dialogTxt.value = "确认" + (status === "on" ? "关闭" : "打开") + "所有空调";
  }
};
const acFanOP = function (e, data) {
  let fanstatus = "";
  if (e.target.innerText === "弱风") {
    fanstatus = "15";
  } else if (e.target.innerText === "中风") {
    fanstatus = "45";
  } else if (e.target.innerText === "强风") {
    fanstatus = "75";
  }
  airconditionAll({ fan: fanstatus });
};
const handleChange = function (val) {
  // alert(val)
  airconditionAll({ temperature: val });
};
const formatTooltip = (val) => {
  return `${val}℃`;
};
const lightOp = function (light) {
  currtlight.value = light;
  dialogLight.value = true;
  dialogTxt.value =
    "确认" + (light.status === "off" ? "打开" : "关闭") + light.name;
};
const setLight = function () {
  // console.info(currtlight.value)
  // console.info(currtlight.value.name)
  // console.info(currtlight.value.status)
  let status = currtlight.value.status === "on" ? "off" : "on";
  // console.info(status)
  publish(
    `/iot/action/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${currtlight.value.name}`,
    JSON.stringify({ action: status })
  );
  // log日志
  logClk({
    sourceName: "/运营/楼宇智控10寸/照明/单控",
    deviceType: "light",
    actionTopic: `/iot/action/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${currtlight.value.name}`,
    actionData: JSON.stringify({ action: status }),
    spaceCode: JSON.parse(data).space,
    floorCode: JSON.parse(data).floor,
    floorAreaCode: JSON.parse(data).floorarea,
    areaCode: JSON.parse(data).code,
  });
  timer3.value = setTimeout(function () {
    publish(
      `/iot/action/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/${currtlight.value.name}`,
      JSON.stringify({ action: "status" })
    );
  }, 500);
  loadingFlag.value = true;
  timer4.value = setTimeout(function () {
    loadingFlag.value = false;
    dialogLight.value = false;
  }, 2000);
};
const changeAirconditioningStatus = () => {
  let acStatus = [];

  // console.info(acobj.value)
  if (acobj.value) {
    // props.data.acobj.forEach(function(ac){
    //   // acStatus.push(ac.status)
    //   console.info(ac)
    //
    // })

    acObject.value.pretemperature = majorityCandidate(
      acobj.value,
      "pretemperature"
    );
    acObject.value.fan = majorityCandidate(acobj.value, "fan");
    acObject.value.mode = majorityCandidate(acobj.value, "mode");
    acObject.value.status = majorityCandidate(acobj.value, "status");
    currtstatus.value = majorityCandidate(acobj.value, "status");
    tempStatus.value = majorityCandidate(acobj.value, "status");

    // console.info(acObject.value)

    if (acObject.value.status === "on") {
      acObject.value.status = "1";
    } else if (acObject.value.status === "off") {
      acObject.value.status = "0";
    }
    if (acObject.value.fan === 15) {
      fanbutton.value = 0;
      acObject.value.fan = "弱风";
    } else if (acObject.value.fan === 45) {
      fanbutton.value = 1;
      acObject.value.fan = "中风";
    } else if (acObject.value.fan === 75) {
      fanbutton.value = 2;
      acObject.value.fan = "强风";
    }
    if (acObject.value.mode === 1) {
      acObject.value.mode = "自动";
    } else if (acObject.value.mode === 2) {
      acObject.value.mode = "吹风";
    } else if (acObject.value.mode === 3) {
      acObject.value.mode = "制冷";
    } else if (acObject.value.mode === 4) {
      acObject.value.mode = "制热";
    } else if (acObject.value.mode === 5) {
      acObject.value.mode = "除湿";
    }
  }
  console.info(acObject.value);
};
getMessage((topic, message) => {
  if (topic === `/iot/setting/structure/result`) {
    spaceObj.value = JSON.parse(message);
  }
  if (
    topic ===
    `/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
  ) {
    let devices = JSON.parse(message);
    //转换照明数据
    // alllight.value = {}
    // alllightStatus.value ={}
    // let lights = []
    // let lightsstatus = []
    //转换照明数据
    // alllight.value = {}
    // alllightStatus.value ={}
    // let lights = []
    // let lightsstatus = []
    console.info("转换照明");
    lightobj.value.splice(0, lightobj.value.length);
    if (devices.light) {
      devices.light.forEach(function (e) {
        if (JSON.parse(e.status)) {
          lightobj.value.push({
            name: e.name,
            code: e.code,
            status: JSON.parse(e.status).status,
          });
        } else {
          lightobj.value.push({
            name: e.name,
            code: e.code,
            status: { online: "0", status: "off" },
          });
        }
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
    // console.info("++++++++++++++++++++++++++")
    // console.info(padObj.value)
    // console.info("++++++++++++++++++++++++++")
  }

  if (
    topic ===
    `/iot/status/areaairsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
  ) {
    console.info("室内空气");
    console.info(JSON.parse(message.toString()));
    inside.value = JSON.parse(message.toString())[0].status;
  }
  if (
    topic.indexOf(
      `/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
    ) !== -1
  ) {
    // let areaLights = alllight.value[obj.value.code]
    // let topicArr = topic.split("/")
    // let name = topicArr[topicArr.length-1]
    // let pos = areaLights.indexOf(name)
    let status = JSON.parse(message);
    lightobj.value.forEach(function (l) {
      if (l.code === status[0].code) {
        l.status = status[0].status.status;
      }
    });
    // if(pos !== -1 && areaLights[pos] !== undefined && alllightStatus.value[obj.value.code][pos] !== undefined){
    //   let s = "off"
    //   if(status[0] && status[0].status && status[0].status.status === "on"){
    //     s = "on"
    //   }
    //   alllightStatus.value[obj.value.code][pos] = s
    // }
  }
  if (topic.indexOf(`/iot/status/airconditioning/HGH-WC`) !== -1) {
    let airconditioning = JSON.parse(message);
    console.info("空调");
    acobj.value.forEach(function (air) {
      air.status = airconditioning[0].status;
    });
    changeAirconditioningStatus();
    console.info(acobj.value);
  }
  if (topic.indexOf(`/iot/pad/policy/switch/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`) !== -1) {
    let policy = JSON.parse(message);
    controlMode.value = policy.tc === "open" ? true : false;
  }
});
const link = () => {
  if (padObj.value.name === "") {
    let data = localStorage.getItem("data");
    if (data) {
     
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
    // console.info(obj.value)
    // console.info(form)
    console.log("心跳topic",topic)
    console.log("心跳payload",pad)
  }

  // publish(
  //     `/iot/status/report`,
  //     {action:"status"}
  // )
  // publish('/iot/action/airsensor/HGH-WC/A3/26F/A/A区空气传感器','{"action":"status"}')
  // publish('/iot/action/airsensor/HGH-WC/A3/26F/TMAN/男卫生间空气传感器','{"action":"status"}')
};
const stopTimer = (time) => {
  if (time) {
    clearInterval(time);
    time = null;
  }
};
const saveData = () => {
  form.space = spaceObj.value[form.spaceIndex].code;
  form.floorarea =
    spaceObj.value[form.spaceIndex].floorArea[form.floorareaIndex].code;
  form.floor =
    spaceObj.value[form.spaceIndex].floorArea[form.floorareaIndex].floor[
      form.floorIndex
    ].code;
  form.name =
    spaceObj.value[form.spaceIndex].floorArea[form.floorareaIndex].floor[
      form.floorIndex
    ].mettingRoom[form.mettingRoomIndex].name;
  form.code =
    spaceObj.value[form.spaceIndex].floorArea[form.floorareaIndex].floor[
      form.floorIndex
    ].mettingRoom[form.mettingRoomIndex].code;
  console.info(form);
  localStorage.setItem("data", JSON.stringify(form));
  dialogFormVisible.value = false;
  location.reload();
  // localStorage.setItem("data",JSON.stringify(form))
  // dialogFormVisible.value = false
  // location.reload()
};
let data = {};
onMounted(() => {
  data = localStorage.getItem("data");
  controlMode.value = localStorage.getItem("controlMode") === "true" ? true : false;
  console.info(data);
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
    let jsondata = JSON.parse(data);
    obj.value.code = jsondata.code;
    obj.value.floor = jsondata.floor;
    obj.value.floorarea = jsondata.floorarea;
    obj.value.type = jsondata.type;
    obj.value.name = jsondata.name;
    console.info();
    //获取照明状态
    subscribe(
      `/iot/setting/device/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
    );
    subscribe(
      `/iot/status/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/#`
    );
    subscribe(
      `/iot/status/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}/#`
    );
    //空气质量
    subscribe(
      `/iot/status/areaairsensor/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
    );
    //获取控制状态
    subscribe(
      `/iot/pad/policy/switch/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`
    );
    timer1.value = setInterval(link, 30000);
  } else {
    subscribe("/iot/setting/structure/result");
    publish("/iot/setting/get/structure");
    dialogFormVisible.value = true;
  }
});
onUnmounted(() => {
  if (timer1) {
    stopTimer(timer1);
  }
  if (timer2) {
    stopTimer(timer2);
  }
  if (timer3) {
    stopTimer(timer3);
  }
  if (timer4) {
    stopTimer(timer4);
  }
  if (timer5) {
    stopTimer(timer5);
  }
  if (timer6) {
    stopTimer(timer6);
  }
});

const airconditionAll = function (data) {
  let soureName = "/运营/楼宇智控10寸/空调/群控";
  let status = "";
  handleControlMode(false, true);

  if (tempStatus.value === "on") {
    acbutton.value = 0;
    status = "off";
  } else {
    acbutton.value = 1;
    status = "on";
  }
  let param = {};
  param.action = status;
  if (data && data.temperature) {
    param.action = "on";
    param.temperature = data.temperature;
    soureName = "/运营/楼宇智控10寸/空调/单控";
  }
  if (data && data.fan) {
    param.action = "on";
    param.fan = data.fan;
    soureName = "/运营/楼宇智控10寸/空调/单控";
  }

  publish(
    `/iot/action/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`,
    JSON.stringify(param)
  );
  // log日志
  const logData = localStorage.getItem("data");
  logClk({
    sourceName: soureName,
    deviceType: "airconditioning",
    actionTopic: `/iot/action/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`,
    actionData: JSON.stringify(param),
    spaceCode: JSON.parse(logData).space,
    floorCode: JSON.parse(logData).floor,
    floorAreaCode: JSON.parse(logData).floorarea,
    areaCode: JSON.parse(logData).code,
  });

  loadingFlag.value = true;
  acloadingFlag.value = true;
  timer5.value= setTimeout(function () {
    loadingFlag.value = false;
    dialogAcAll.value = false;
  }, 500);
  timer6.value = setTimeout(function () {
    publish(
      `/iot/action/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`,
      JSON.stringify({ action: "status" })
    );
    // changeAirconditioningStatus()
    acloadingFlag.value = false;
  }, 4000);
};
function majorityCandidate(arr, pro) {
  let candidate = [];
  for (let i = 0; i < arr.length; i++) {
    candidate.push(arr[i].status[pro]);
  }
  const mostFrequent = findMostFrequent(candidate);
  return mostFrequent;
}

function findMostFrequent(array) {
  const frequencyMap = new Map();
  let maxCount = 0;
  let mostFrequent = null;
 
  for (const num of array) {
    const count = frequencyMap.get(num) || 0;
    frequencyMap.set(num, count + 1);
 
    if (count + 1 > maxCount) {
      maxCount = count + 1;
      mostFrequent = num;
    }
  }
 
  return mostFrequent;
}

watch(
  () => lightobj.value,
  (newValue, oldValue) => {
    // console.info("++++++++++++++++++lightobj.value+++++++++++++++++++")
    changeAirconditioningStatus();
    if (newValue[0]) {
      // changeAirconditioningStatus()
      let nowstatus = newValue[0].status;
      let lflag = 0;
      try {
        newValue.forEach(function (l) {
          let laststatus = nowstatus;
          nowstatus = l.status;
          // console.info(laststatus+"|"+nowstatus+"|")
          // console.info(laststatus!==nowstatus)

          if (laststatus !== nowstatus) {
            // console.info("zenm hui jinlai")
            lflag = 2;
            throw new Error("Loop terminated");
          }
        });
      } catch (e) {}

      if (lflag !== 2) {
        console.info(newValue[0].status);
        if (newValue[0].status === "on") {
          lflag = 1;
        } else {
          lflag = 0;
        }
      }

      lightallbutton.value = lflag;
      // console.info(lightallbutton.value )
    }
  },
  { deep: true, immediate: true }
);
</script>
