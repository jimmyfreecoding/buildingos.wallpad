<style scoped lang="scss">
:deep(.lightdia .el-radio-button__inner) {
  font-size: 32px !important;
}
:deep(.lightdia .el-radio-group) {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.left-box-box {
  width: 900px;
  height: 100%;
  background: #202838;
  padding: 20px 40px;
  :deep(.el-drawer__body) {
    padding: 0 !important;
  }
  :deep(.el-drawer__header) {
    display: none !important;
  }
  .air_error {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 135px;
    height: 32px;
    padding: 4px 16px 6px 16px;
    border-radius: 38px;
    background: #2e3a4d;
    margin-top: 40px;
    span {
      font-size: 14px;
    }
  }
  .action_more {
    width: 120px;
    height: 40px;
    border-radius: 57px;
    background: #263041;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    color: #fff;
    margin-right: 20px;
  }
  .content {
    width: calc(100% - 40px);
    margin-left: 20px;
    min-height: 148px;
    max-height: 608px;
    overflow-y: auto;
    padding: 24px;
    // padding: 1px 24px 24px 24px;
    border-radius: 16px;
    background: #263041;
    position: relative;
    &.light-wrap {
      max-height: 355px;
      // &.no-control {
      //   max-height: 460px;
      // }
    }
    .chuanglian-box {
      width: 230px;
      height: 60px;
      border-radius: 30px;
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
        position: absolute;
        top: 1px;
        left: 1px;
        border-radius: 30px;
        background-image: linear-gradient(96.9deg, #4a5a76 8.02%, #34445e 88%);
      }
      & > div {
        position: relative;
        z-index: 2;
      }
      &:active {
        background: #2e3a4d;
        &::before {
          background: #2e3a4d;
        }
      }
      .xuanzhuan {
        @-webkit-keyframes spin {
          from {
            -webkit-transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        -webkit-animation: spin 0.7s linear infinite;
        animation: spin 0.7s linear infinite;
      }
      &.active {
        background: #2e3a4d;
        &::before {
          background: #2e3a4d;
        }
      }
    }
    .colorOrange {
      color: #ed8733;
      font-size: 18px;
      cursor: pointer;
      position: absolute;
      right: 0;
      top: -43px;
    }
    .icon-chuanglian {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
    .title {
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      text-align: left;
      color: #fff;
      opacity: 0.85;
      clear: both;
      margin: 24px 0 16px 0;
    }
    .light {
      gap: 20px;
      margin-top: 20px;
      .offline {
        width: 105px;
        flex: 0 0 105px;
        flex-wrap: wrap;
        height: 105px;
        gap: 10px;
        border-radius: 14.5px;
        position: relative;
        background: #2f3644;
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
          background: #2f3644;
        }
        .icon {
          width: 36px;
          height: 42px;
          margin-bottom: 6px;
        }
        .txt {
          font-size: 18px;
          color: #ffffff73;
        }
      }
      .light-item {
        width: 105px;
        flex: 0 0 105px;
        flex-wrap: wrap;
        height: 105px;
        gap: 10px;
        border-radius: 14.5px;
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
          border-radius: 16px;
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

    .air-box {
      font-size: 22px;
      margin-top: 20px;
      width: 100%;
      height: auto;
      padding: 14px 24px;
      border-radius: 16px;
      position: relative;
      background: #2e3a4d;
      .txt {
        line-height: 40px;
        font-size: 20px;
      }
      .opa85 {
        opacity: 0.85;
      }
    }
  }
}
.msg {
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  text-align: left;
  color: #505455;
  span {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    text-align: left;
    color: #1e1e1e;
  }
}
.btn {
  width: 100%;
  height: 60px;
  border-radius: 98px;
  border: 2px solid #939393;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  font-weight: 400;
  color: #1e1e1e;
  margin-top: 24px;
}
</style>
<style lang="scss">
.air-box {
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
      top: 7px;
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
.temp-control {
  font-size: 20px !important;
  height: 102px !important;

  .floor {
    margin-right: 14px;
  }
  .celling {
    margin-left: 12px;
  }
}
</style>
<script setup lang="ts">
import { http } from "@/utils/http";
import moment from "moment";
import IndexTitle from "@/components/indexTitle.vue";
import sliderPick from "@/components/sliderPick.vue";
import sliderPick2 from "@/components/sliderPick2.vue";
import erweimma from "@/assets/images/erweima.png";
import chuanglian1 from "@/assets/images/chuanglian1.png";
import chuanglian2 from "@/assets/images/chuanglian2.png";
import chuanglian3 from "@/assets/images/chuanglian3.png";
import chuanglian4 from "@/assets/images/chuanglian4.png";
import fmanage3 from "@/assets/images/3floorManager.jpg";
import fmanage4 from "@/assets/images/4floorManager.jpg";
import fmanage5 from "@/assets/images/5floorManager.jpg";
import ceoManage from "@/assets/images/ceo_manage.jpg";
import { logClk } from "@/utils/logClk";
import { WarnTriangleFilled, ArrowRight } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import Blind from "./blind.vue";
// 配置需要显示温控区域的楼层
const TEMP_CONTROL_BAR_FLOOR = ["34F", "35F", "54F"];
const phoneMap = {
  A3: "18667083301",
  A4: "18667083298",
  A5: "18667083299",
};
const publish = inject("publish"); // 订阅信息
const props = defineProps({
  data: Object,
  lights: Array,
});
const emit = defineEmits(["syncLightStatus", "syncLight", "syncAllLight"]);
const errorList = ref([]);
const innerDrawer = ref(false);
const syncLightStatus = (bln) => {
  emit("syncLightStatus", bln);
};
const syncLight = (light) => {
  emit("syncLight", light);
};
const syncAllLight = (lights) => {
  emit("syncAllLight", lights);
};
const currentFloor = ref("");
onMounted(() => {
  obj.value = props.data.obj;
  if (obj.value.code == "HAMEETING3") {
    tabList.value = [
      {
        name: "会议等候区3",
        floorAreaName: "会议等候区3",
        code: "HAMEETING3",
        floor: "52F",
        blind: [],
        air: {},
        airLoading: false,
        lightActiveTab: 0,
      },
      {
        name: "会议等候区2",
        floorAreaName: "会议等候区2",
        code: "HAMEETING2",
        floor: "52F",
        blind: [],
        air: {},
        airLoading: false,
        lightActiveTab: 0,
      },
      {
        name: "52F楼梯",
        floorAreaName: "楼梯",
        code: "LT",
        floor: "52F",
        lightActiveTab: 0,
      },
      {
        name: "53F楼梯",
        floorAreaName: "楼梯",
        code: "LT",
        floor: "53F",
        lightActiveTab: 0,
      },
    ];
  }
  if (obj.value.code == "HA") {
    tabList.value = [
      {
        name: "等候区",
        floorAreaName: "等候区",
        code: "HA",
        floor: "53F",
        blind: [],
        air: {},
        airLoading: false,
        lightActiveTab: 0,
      },
      {
        name: "53F楼梯",
        floorAreaName: "楼梯",
        code: "LT",
        floor: "53F",
        lightActiveTab: 0,
      },
      {
        name: "52F楼梯",
        floorAreaName: "楼梯",
        code: "LT",
        floor: "52F",
        lightActiveTab: 0,
      },
    ];
  }
  // 当前floor
  currentFloor.value = obj.value?.floor;
  //进入查询一次照明和空调
  publish(
    `/iot/action/light/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`,
    JSON.stringify({ action: "status" })
  );
  publish(
    `/iot/action/blind/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/`,
    JSON.stringify({ action: "status" })
  );
  publish(
    `/iot/action/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`,
    JSON.stringify({ action: "status" })
  );
  // changeAirconditioningStatus()
  // console.info(props.data)
});
// toggleLight = (index){
//   this.dialogLight = true
//   this.currentLight = index
//   this.dialogTxt = '确认' +(this.lightList[index].status==0?'打开':'关闭') + this.lightList[index].name
// },
const acObject = ref({
  pretemperature: 0,
  mode: 0,
  fan: "",
  status: "on",
  tempVal: 0,
  fanVal: "",
});
const acObject2 = ref({
  pretemperature: 0,
  mode: 0,
  fan: "",
  status: "on",
  tempVal: 0,
  fanVal: "",
});
const fanActive = ref(0);
const obj = ref({});
const dialogLight = ref(false);
const dialogLightAll = ref(false);
const dialogAcAll = ref(false);
const lightallbutton = ref(0);
const areaTab = ref(0);
const acbutton = ref(0);
const dialogFankui = ref(false);
const loadingFlag = ref(false);
const acloadingFlag = ref(false);
const blindShow = ref(false);
const blind2Show = ref(false);
const dialogTxt = ref("");
const currentCode = ref("");
const currentCode2 = ref("");
const currtlight = ref({});
const dialogAirError = ref(false);
const currtstatus = ref("off");
const tempStatus = ref("off");
const radio = ref("60");
const handleChange = (val: string | number) => {
  radio.value = String(val);
};
const currentBlind = ref("");
const specialLight = ref([]);
const tabList = ref([
  {
    name: "会议等候区3",
    floorAreaName: "会议等候区3",
    code: "HAMEETING3",
    floor: "52F",
    blind: [],
    air: {},
    airLoading: false,
    lightActiveTab: 0,
  },
  {
    name: "会议等候区2",
    floorAreaName: "会议等候区2",
    code: "HAMEETING2",
    floor: "52F",
    blind: [],
    air: {},
    airLoading: false,
    lightActiveTab: 0,
  },
  {
    name: "52F楼梯",
    floorAreaName: "楼梯",
    code: "LT",
    floor: "52F",
    lightActiveTab: 0,
  },
  {
    name: "53F楼梯",
    floorAreaName: "楼梯",
    code: "LT",
    floor: "53F",
    lightActiveTab: 0,
  },
]);

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
const feedbackVisible = () => {
  dialogFankui.value = false;
  dialogAcAll.value = false;
  dialogLightAll.value = false;
  dialogLight.value = false;
};
defineExpose({
  feedbackVisible,
});

const setLight = function () {
  const status = currtlight.value.status === "on" ? "off" : "on";
  publish(
    `/iot/action/light/HGH-WC/${currtlight.value.areaCode}/${currtlight.value.floorCode}/${currtlight.value.floorAreaCode}/${currtlight.value.name}`,
    JSON.stringify({ action: status })
  );
  // 照明和地图Map联动
  syncLightStatus(false);
  syncLight({ ...currtlight.value, status });
  // log日志
  logClk({
    sourceName: "/运营/楼宇智控/照明/单控",
    deviceType: "light",
    actionTopic: `/iot/action/light/HGH-WC/${currtlight.value.areaCode}/${currtlight.value.floorCode}/${currtlight.value.floorAreaCode}/${currtlight.value.name}`,
    actionData: JSON.stringify({ action: status }),
    spaceCode: currtlight.value?.spaceCode,
    floorCode: currtlight.value?.floorCode,
    floorAreaCode: currtlight.value?.floorAreaCode,
    areaCode: currtlight.value?.areaCode,
  });

  setTimeout(function () {
    publish(
      `/iot/action/light/HGH-WC/${currtlight.value.areaCode}/${currtlight.value.floorCode}/${currtlight.value.floorAreaCode}/${currtlight.value.name}`,
      JSON.stringify({ action: "status" })
    );
  }, 500);

  loadingFlag.value = true;

  setTimeout(() => {
    loadingFlag.value = false;
    dialogLight.value = false;
  }, 2000);
};

const lightAllOP = function (e, code?: string) {
  let status = "";
  if (e.target.innerText === "全开") {
    status = "off";
  } else if (e.target.innerText === "全关") {
    status = "on";
  } else if (e.target.innerText === "自定义") {
    lightallbutton.value = 2;
  }
  currentCode.value = code ?? "";
  if (status !== "") {
    currtstatus.value = status;
    dialogLightAll.value = true;
    dialogTxt.value = "确认" + (status === "on" ? "关闭" : "打开") + "所有照明";
  }
};

const lightAll = function () {
  syncLightStatus(true);
  let actionStr = "";
  let groupedData = {};
  if (currentCode.value) {
    groupedData = specialLight.value.reduce((acc, cur) => {
      const key = `${cur.floorCode}-${cur.floorAreaCode}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(cur);
      return acc;
    }, {});
  } else {
    groupedData = props.data.lightobj.reduce((acc, cur) => {
      const key = `${cur.floorCode}-${cur.floorAreaCode}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(cur);
      return acc;
    }, {});
  }

  console.log(groupedData, "groupedData");
  if (currtstatus.value === "on") {
    currentCode.value
      ? (tabList.value[areaTab.value].lightActiveTab = 0)
      : (lightallbutton.value = 0);
    actionStr = "off";
  } else {
    currentCode.value
      ? (tabList.value[areaTab.value].lightActiveTab = 1)
      : (lightallbutton.value = 1);
    actionStr = "on";
  }
  loadingFlag.value = true;
  for (const key in groupedData) {
    if (Object.prototype.hasOwnProperty.call(groupedData, key)) {
      const element = groupedData[key];
      console.log(
        `/iot/action/light/HGH-WC/${element[0].areaCode}/${
          element[0].floorCode
        }/${element[0].floorAreaCode}/${element.map((l) => l.name).join(",")}`,
        JSON.stringify({ action: actionStr })
      );
      publish(
        `/iot/action/light/HGH-WC/${element[0].areaCode}/${
          element[0].floorCode
        }/${element[0].floorAreaCode}/${element.map((l) => l.name).join(",")}`,
        JSON.stringify({ action: actionStr })
      );
      setTimeout(function () {
        loadingFlag.value = false;
        dialogLightAll.value = false;
        publish(
          `/iot/action/light/HGH-WC/${element[0].areaCode}/${element[0].floorCode}/${element[0].floorAreaCode}`,
          JSON.stringify({ action: "status" })
        );
      }, 4000);
    }
  }

  syncLightStatus(false);
};
const handleBlind = (action: string, code?: string) => {
  let names;
  if (code === "HAMEETING2") {
    names = props.data.blind2.map((x) => x.name).join(",");
  } else {
    names = props.data.blind?.map((x) => x.name).join(",");
  }
  publish(
    `/iot/action/blind/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${
      code ? code : obj.value.code
    }/${names}`,
    JSON.stringify({ action })
  );
  // /iot/action/blind/HGH-WC/A5/54F/KFGQ/18卷帘 {"action":"up"}
  // publish(
  //   `/iot/action/blind/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/`,
  //   JSON.stringify({ action: "status" })
  // );
};
function isTimeInRange(startTime, endTime) {
  const currentTime = new Date();
  const startTimeParts = startTime.split(":");
  const endTimeParts = endTime.split(":");

  const startDate = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    startTimeParts[0],
    startTimeParts[1]
  );

  const endDate = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    endTimeParts[0],
    endTimeParts[1]
  );

  return currentTime >= startDate && currentTime <= endDate;
}
const acAllOP = function (e, code?: string) {
  const useAirTime = localStorage.getItem("useAirTime");
  if (useAirTime) {
    const time = JSON.parse(useAirTime);
    if (!isTimeInRange(time.startTime, time.endTime)) {
    // if(true){
      ElMessage({
        dangerouslyUseHTMLString: true,
        message:
          '<div style="color: #fff;font-size: 14px;margin-bottom: 8px">温情提示</div><div style="color: #fff;font-size: 14px;">空调运行时间：工作日 7:30-24:00，非工作日 9:00-22:00，若有特殊需求，请联系楼长反馈~</div>',
        type: "warning",
        offset: 100,
        duration: 5000,
        icon: WarnTriangleFilled,
        style: {
          flexDirection: "column",
          justifyContent: "space-around",
          height: "110px",
          backgroundColor: "rgba(0, 0, 0, 1)",
          borderRadius: "9px",
          border: "none",
          textAlign: "center",
          fontSize: "28px",
          color: "red",
        },
      });
      return;
    }
  }
  let status = "";
  if (e.target.innerText === "开启") {
    status = "off";
  } else if (e.target.innerText === "关闭") {
    status = "on";
  }
  currentCode2.value = code ?? "";
  if (status !== "") {
    tempStatus.value = status;
    dialogAcAll.value = true;
    dialogTxt.value = "确认" + (status === "on" ? "关闭" : "打开") + "所有空调";
  }
};
const selectedArea = (i) => {
  const currentArea = tabList.value[i].floor + tabList.value[i].code;
  specialLight.value = props.data.lightobj.filter(
    (x) => x.floorCode + x.floorAreaCode === currentArea
  );
  areaTab.value = i;
  const allOn = specialLight.value.every((x) => x.online && x.status === "on");
  const allOff = specialLight.value.every(
    (x) => x.online && x.status === "off"
  );

  tabList.value[areaTab.value].lightActiveTab = allOn ? 1 : allOff ? 0 : 2;
};
const lightOp = function (light, code?: string) {
  if (light.online == 0) {
    ElMessage({
      message: `<div style="color:#1e1e1e;font-size: 14px">设备离线，请联系楼长反馈</div>`,
      type: "warning",
      duration: 3000,
      dangerouslyUseHTMLString: true,
      style: {
        backgroundColor: "#fff",
        borderColor: "#fff",
      },
    });
    return;
  }
  currentCode.value = code ?? "";
  currtlight.value = light;
  syncLightStatus(true);
  syncLight(light);
  dialogLight.value = true;
  dialogTxt.value =
    "确认" + (light.status === "off" ? "打开" : "关闭") + light.name;
};
const changeAirconditioningStatus = () => {
  let acStatus = [];
  errorList.value = [];
  // console.info(props.data.acobj)
  if (props.data.acobj) {
    // props.data.acobj.forEach(function(ac){
    //   // acStatus.push(ac.status)
    //   console.info(ac)
    //
    // })
    errorList.value = props.data.acobj?.filter(
      (x) => x?.status?.online == 0 || x?.status?.alarmValue != 0
    );
    // console.log(!!errorList.value.length, "errorlist");
    acObject.value.pretemperature = majorityCandidate(
      props.data.acobj,
      "pretemperature"
    );
    acObject.value.fan = majorityCandidate(props.data.acobj, "fan");
    acObject.value.tempVal = majorityCandidate(
      props.data.acobj,
      "pretemperature"
    );
    acObject.value.fanVal = majorityCandidate(props.data.acobj, "fan");
    acObject.value.mode = majorityCandidate(props.data.acobj, "mode");
    acObject.value.status = majorityCandidate(props.data.acobj, "status");
    currtstatus.value = majorityCandidate(props.data.acobj, "status");
    tempStatus.value = majorityCandidate(props.data.acobj, "status");

    // console.info(props.data.acobj, '------temp-------')

    if (acObject.value.status === "on") {
      acObject.value.status = "1";
    } else if (acObject.value.status === "off") {
      acObject.value.status = "0";
    }

    if (acObject.value.fan === 15) {
      acObject.value.fan = "弱风";
      fanActive.value = 0;
    } else if (acObject.value.fan === 45) {
      acObject.value.fan = "中风";
      fanActive.value = 1;
    } else if (acObject.value.fan === 75) {
      acObject.value.fan = "强风";
      fanActive.value = 2;
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
    tabList.value[0].air = acObject.value;
  }
  if (props.data.air2 && props.data.air2.length > 0) {
    // props.data.acobj.forEach(function(ac){
    //   // acStatus.push(ac.status)
    //   console.info(ac)
    //
    // })
    errorList.value = props.data.air2?.filter(
      (x) => x?.status?.online == 0 || x?.status?.alarmValue != 0
    );
    acObject2.value.pretemperature = majorityCandidate(
      props.data.air2,
      "pretemperature"
    );
    acObject2.value.fan = majorityCandidate(props.data.air2, "fan");
    acObject2.value.tempVal = majorityCandidate(
      props.data.air2,
      "pretemperature"
    );
    acObject2.value.fanVal = majorityCandidate(props.data.air2, "fan");
    acObject2.value.mode = majorityCandidate(props.data.air2, "mode");
    acObject2.value.status = majorityCandidate(props.data.air2, "status");
    currtstatus.value = majorityCandidate(props.data.air2, "status");
    tempStatus.value = majorityCandidate(props.data.air2, "status");

    // console.info(props.data.acobj, '------temp-------')

    if (acObject2.value.status === "on") {
      acObject2.value.status = "1";
    } else if (acObject2.value.status === "off") {
      acObject2.value.status = "0";
    }

    if (acObject2.value.fan === 15) {
      acObject2.value.fan = "弱风";
      fanActive.value = 0;
    } else if (acObject2.value.fan === 45) {
      acObject2.value.fan = "中风";
      fanActive.value = 1;
    } else if (acObject2.value.fan === 75) {
      acObject2.value.fan = "强风";
      fanActive.value = 2;
    }
    if (acObject2.value.mode === 1) {
      acObject2.value.mode = "自动";
    } else if (acObject2.value.mode === 2) {
      acObject2.value.mode = "吹风";
    } else if (acObject2.value.mode === 3) {
      acObject2.value.mode = "制冷";
    } else if (acObject2.value.mode === 4) {
      acObject2.value.mode = "制热";
    } else if (acObject2.value.mode === 5) {
      acObject2.value.mode = "除湿";
    }
    tabList.value[1].air = acObject2.value;
  }
  // console.info(acObject)
};
const airconditionAll = function (e, data) {
  let status = "";
  if (tempStatus.value === "on") {
    acbutton.value = 0;
    status = "off";
  } else {
    acbutton.value = 1;
    status = "on";
  }
  let param = {};
  // 空调开关
  param.action = status;
  if (currentCode2.value) {
    responseAirControl2(param, "/运营/楼宇智控/空调/群控");
  } else {
    responseAirControl(param, "/运营/楼宇智控/空调/群控");
  }
};
// 餐厅温控
const handleTempControl = () => {
  let param = {};
  // 空调开关
  param.action = tempStatus.value;
  // 空调温度调节
  if (!!acObject.value.tempVal) {
    param.temperature = acObject.value.tempVal;
  }
  // 风力调节
  if (!!acObject.value.fanVal) {
    param.fan = acObject.value.fanVal;
  }
  if (currentCode2.value) {
    responseAirControl2(param, "/运营/楼宇智控/空调/单控");
  } else {
    responseAirControl(param, "/运营/楼宇智控/空调/单控");
  }
};
// 发送指令
const responseAirControl = (param, sourceName) => {
  publish(
    `/iot/action/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`,
    JSON.stringify(param)
  );
  // log
  logClk({
    sourceName,
    deviceType: "airconditioning",
    actionTopic: `/iot/action/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`,
    actionData: JSON.stringify(param),
    spaceCode: obj.value?.space,
    floorCode: obj.value?.floor,
    floorAreaCode: obj.value?.floorarea,
    areaCode: obj.value.code,
  });

  loadingFlag.value = true;
  acloadingFlag.value = true;
  const timerF = setTimeout(function () {
    loadingFlag.value = false;
    dialogAcAll.value = false;
    clearTimeout(timerF);
  }, 3000);

  const timerL = setTimeout(function () {
    publish(
      `/iot/action/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${obj.value.code}`,
      JSON.stringify({ action: "status" })
    );
    // changeAirconditioningStatus()
    acloadingFlag.value = false;
    clearTimeout(timerL);
  }, 8000);
};
// 发送指令
const responseAirControl2 = (param, sourceName) => {
  console.log(
    `/iot/action/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${currentCode2.value}`,
    JSON.stringify(param)
  );
  publish(
    `/iot/action/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${currentCode2.value}`,
    JSON.stringify(param)
  );
  // log
  logClk({
    sourceName,
    deviceType: "airconditioning",
    actionTopic: `/iot/action/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${currentCode2.value}`,
    actionData: JSON.stringify(param),
    spaceCode: obj.value?.space,
    floorCode: obj.value?.floor,
    floorAreaCode: obj.value?.floorarea,
    areaCode: currentCode2.value,
  });
  const index = areaTab.value;
  loadingFlag.value = true;
  tabList.value[index].airLoading = true;
  const timerF = setTimeout(function () {
    loadingFlag.value = false;
    dialogAcAll.value = false;
    clearTimeout(timerF);
  }, 3000);

  const timerL = setTimeout(function () {
    publish(
      `/iot/action/airconditioning/HGH-WC/${obj.value.floorarea}/${obj.value.floor}/${currentCode2.value}`,
      JSON.stringify({ action: "status" })
    );
    // changeAirconditioningStatus()
    tabList.value[index].airLoading = false;
    clearTimeout(timerL);
  }, 8000);
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

const showLightTitle = function (e) {
  // console.info(e)
  if (e.substring(0, 2) === obj.value.code + "区") {
    return e.substring(2, e.length);
  } else {
    return e;
  }
};

const formatTooltip = (val) => {
  return `${val}℃`;
};

const handleTempChange = (val) => {
  acObject.value.tempVal = val;
  handleTempControl();
};

const switchWindSpeed = (e) => {
  if (e.target.innerText === "弱风") {
    acObject.value.fanVal = "15";
  } else if (e.target.innerText === "中风") {
    acObject.value.fanVal = "45";
  } else if (e.target.innerText === "强风") {
    acObject.value.fanVal = "75";
  }
  handleTempControl();
};
const handleBlindMore = (code?: string) => {
  if (code) {
    currentBlind.value = code;
  }
  innerDrawer.value = true;
};
watch(
  () => props.data,
  (newValue, oldValue) => {
    // console.info("++++++++++++++++++props.data+++++++++++++++++++")
    // console.log(newValue, "newValue");
    changeAirconditioningStatus();
    if (
      newValue.lightobj &&
      newValue.lightobj.length &&
      (obj.value.code === "HAMEETING3" || obj.value.code === "HA")
    ) {
      const currentArea =
        tabList.value[areaTab.value].floor + tabList.value[areaTab.value].code;
      specialLight.value = newValue.lightobj.filter(
        (x) => x.floorCode + x.floorAreaCode === currentArea
      );
      const allOn = specialLight.value.every(
        (x) => x.online && x.status === "on"
      );
      const allOff = specialLight.value.every(
        (x) => x.online && x.status === "off"
      );

      tabList.value[areaTab.value].lightActiveTab = allOn ? 1 : allOff ? 0 : 2;
    }
    if (newValue.blind && newValue.blind.length) {
      blindShow.value = true;
      if (obj.value.code === "HAMEETING3") {
        tabList.value[0].blind = newValue.blind;
      }
    }
    if (newValue.blind2 && newValue.blind2.length) {
      blind2Show.value = true;
      if (obj.value.code === "HAMEETING3") {
        tabList.value[1].blind = newValue.blind2;
      }
    }
    if (newValue.lightobj[0]) {
      // changeAirconditioningStatus()
      let nowstatus = newValue.lightobj[0].status;
      let lflag = 0;
      try {
        newValue.lightobj.forEach(function (l) {
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
        // console.info(newValue.lightobj[0].status);
        if (newValue.lightobj[0].status === "on") {
          lflag = 1;
        } else {
          lflag = 0;
        }
      }
      lightallbutton.value = lflag;
    }
  },
  { deep: true, immediate: true }
);
// 控制空调面板显示隐藏
const airControlDisplay = computed(() => {
  return TEMP_CONTROL_BAR_FLOOR.includes(currentFloor.value);
});
watch(
  () => props.data.lightobj,
  (n, o) => {
    syncAllLight(n);
  },
  { deep: true }
);
</script>

<template>
  <div class="left-box-box" :style="blind2Show ? 'overflow-y: auto' : ''">
    <sliderPick2
      style="width: calc(100% - 40px); margin-left: 20px; margin-top: 20px"
      :activeName="areaTab"
      :tabList="tabList"
      @change="selectedArea"
      v-if="obj.code === 'HAMEETING3' || obj.code === 'HA'"
    ></sliderPick2>
    <div v-if="obj.code === 'HAMEETING3' || obj.code === 'HA'">
      <IndexTitle :title="tabList[areaTab].name + ' 照明控制'"></IndexTitle>
      <div
        class="content light-wrap"
        :class="{ 'no-control': !airControlDisplay }"
      >
        <!-- <div class="title">整区设置</div> -->
        <sliderPick
          style="width: 510px"
          :activeName="tabList[areaTab].lightActiveTab"
          :tabList="['全关', '全开']"
          @click="lightAllOP($event, tabList[areaTab].code)"
        ></sliderPick>
        <!-- <div class="title">分区设置</div> -->
        <div class="light flex-row align-center" style="flex-wrap: wrap">
          <div
            v-for="(item, index) in specialLight"
            :key="index"
            class="flex-col align-center justify-center"
            :class="[
              item.online == 1 ? 'light-item' : '',
              item.status === 'off' && item.online == 1 ? 'close' : '',
              item.online == 0 || !item.online ? 'offline' : '',
            ]"
            @click="lightOp(item, tabList[areaTab].code)"
          >
            <div
              class="flex-col align-center justify-center"
              style="position: relative; z-index: 2"
            >
              <img
                v-if="item.online == 1 && item.status === 'on'"
                class="icon"
                src="@/assets/images/lighton.png"
              />
              <img
                v-if="item.status === 'off' && item.online == 1"
                class="icon"
                src="@/assets/images/lightoff.png"
              />
              <img
                v-if="item.online == 0 || !item.online"
                class="icon"
                style="height: 36px"
                src="@/assets/images/offline.png"
                alt=""
              />
              <div class="txt">{{ showLightTitle(item.name) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="tabList[areaTab].blind">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <IndexTitle :title="tabList[areaTab].name + ' 窗帘控制'"></IndexTitle>
          <div
            class="action_more"
            @click="handleBlindMore(tabList[areaTab].code)"
          >
            更多控制<el-icon size="16px" style="margin-left: 1px"
              ><ArrowRight
            /></el-icon>
          </div>
        </div>

        <div class="content" style="min-height: 0">
          <!-- <div class="title">窗帘设置</div> -->
          <div class="flex-row align-center justify-between">
            <!-- 点击后样式 -->
            <!-- <div class="chuanglian-box active flex-row justify-center align-center">
          <div class="flex-row align-center justify-center">
            <img :src="chuanglian4" class="icon-chuanglian xuanzhuan"/>  打开
          </div>
        </div> -->
            <div
              class="chuanglian-box flex-row justify-center align-center"
              @click="handleBlind('up', tabList[areaTab].code)"
            >
              <div class="flex-row align-center justify-center">
                <img :src="chuanglian1" class="icon-chuanglian" /> 打开
              </div>
            </div>
            <div
              class="chuanglian-box flex-row justify-center align-center"
              @click="handleBlind('pause', tabList[areaTab].code)"
            >
              <div class="flex-row align-center justify-center">
                <img :src="chuanglian2" class="icon-chuanglian" /> 暂停
              </div>
            </div>
            <div
              class="chuanglian-box flex-row justify-center align-center"
              @click="handleBlind('down', tabList[areaTab].code)"
            >
              <div class="flex-row align-center justify-center">
                <img :src="chuanglian3" class="icon-chuanglian" />关闭
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="tabList[areaTab].air">
        <div style="display: flex">
          <IndexTitle
            style="margin-top: 40px"
            :title="tabList[areaTab].name + ' 空调控制'"
          ></IndexTitle>
          <div
            class="air_error"
            @click="dialogAirError = true"
            v-if="
              ['A3', 'A4'].includes(props.data.obj.floorarea) &&
              errorList.length
            "
          >
            <img
              style="width: 22px; height: 20px; display: block"
              src="@/assets/images/error.png"
              alt=""
            />
            <span>设备异常</span>
            <el-icon size="14px" color="#fff"><ArrowRight /></el-icon>
          </div>
        </div>

        <div class="content" style="overflow-y: visible">
          <div class="flex-row justify-between align-center">
            <!-- <div class="title">整区设置</div> -->
            <div @click="dialogFankui = true" class="colorOrange">
              温度不适？点击反馈
            </div>
          </div>

          <div v-if="tabList[areaTab].airLoading">空调指令执行中....</div>
          <div v-else>
            <sliderPick
              style="width: 340px; margin-bottom: 24px"
              :activeName="tabList[areaTab].air.status"
              :tabList="['关闭', '开启']"
              @click="acAllOP($event, tabList[areaTab].code)"
            ></sliderPick>
            <div class="air-box flex-row align-center justify-between">
              <div class="txt">
                <span class="opa85">设置温度：</span
                >{{
                  tabList[areaTab].air.status === "0"
                    ? " 关闭 "
                    : +tabList[areaTab].air.pretemperature + `℃`
                }}
              </div>
              <div class="txt" v-if="tabList[areaTab].air.mode">
                <span class="opa85">空调模式：</span
                >{{
                  tabList[areaTab].air.status === "0"
                    ? "关闭"
                    : tabList[areaTab].air.mode
                }}
              </div>
              <div class="txt">
                <span class="opa85">风量大小：</span
                >{{
                  tabList[areaTab].air.status === "0"
                    ? "关闭"
                    : tabList[areaTab].air.fan
                }}
              </div>
            </div>
            <div class="spec">
              <div class="spec" v-if="airControlDisplay && tempStatus == 'on'">
                <div
                  class="air-box flex-row align-center justify-between temp-control"
                >
                  <span class="floor">17℃</span>
                  <el-slider
                    v-model="tabList[areaTab].air.tempVal"
                    :min="17"
                    :max="26"
                    :step="1"
                    :format-tooltip="formatTooltip"
                    show-tooltip
                    show-stops
                    tooltip-class="temp-tip"
                    @change="handleTempChange"
                    :marks="marks"
                  />
                  <span class="celling">26℃</span>
                </div>
                <div class="flex-row justify-between align-center">
                  <div class="title">风力大小</div>
                </div>
                <div>
                  <sliderPick
                    style="width: 340px"
                    :activeName="fanActive"
                    :tabList="['弱风', '中风', '强风']"
                    @click="switchWindSpeed"
                  ></sliderPick>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <el-drawer
        v-model="innerDrawer"
        size="860px"
        destroy-on-close
        :show-close="false"
      >
        <Blind @back="innerDrawer = false" :blind2Show="currentBlind" />
      </el-drawer>
    </div>
    <div v-if="obj.code !== 'HAMEETING3' && obj.code !== 'HA'">
      <IndexTitle
        :title="data.obj.floor + ' ' + data.obj.name + ' 照明控制'"
      ></IndexTitle>
      <div
        class="content light-wrap"
        :class="{ 'no-control': !airControlDisplay }"
      >
        <!-- <div class="title">整区设置</div> -->
        <sliderPick
          style="width: 510px"
          :activeName="lightallbutton"
          :tabList="['全关', '全开']"
          @click="lightAllOP"
        ></sliderPick>
        <!-- <div class="title">分区设置</div> -->
        <div class="light flex-row align-center" style="flex-wrap: wrap">
          <div
            v-for="(item, index) in data.lightobj"
            :key="index"
            class="flex-col align-center justify-center"
            :class="[
              item.online == 1 ? 'light-item' : '',
              item.status === 'off' && item.online == 1 ? 'close' : '',
              item.online == 0 || !item.online ? 'offline' : '',
            ]"
            @click="lightOp(item)"
          >
            <div
              class="flex-col align-center justify-center"
              style="position: relative; z-index: 2"
            >
              <img
                v-if="item.online == 1 && item.status === 'on'"
                class="icon"
                src="@/assets/images/lighton.png"
              />
              <img
                v-if="item.status === 'off' && item.online == 1"
                class="icon"
                src="@/assets/images/lightoff.png"
              />
              <img
                v-if="item.online == 0 || !item.online"
                class="icon"
                style="height: 36px"
                src="@/assets/images/offline.png"
                alt=""
              />
              <div class="txt">{{ showLightTitle(item.name) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="blindShow">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <IndexTitle
            :title="data.obj.floor + ' ' + data.obj.name + ' 窗帘控制'"
          ></IndexTitle>
          <div class="action_more" @click="handleBlindMore()">
            更多控制<el-icon size="16px" style="margin-left: 1px"
              ><ArrowRight
            /></el-icon>
          </div>
        </div>

        <div class="content" style="min-height: 0">
          <!-- <div class="title">窗帘设置</div> -->
          <div class="flex-row align-center justify-between">
            <!-- 点击后样式 -->
            <!-- <div class="chuanglian-box active flex-row justify-center align-center">
          <div class="flex-row align-center justify-center">
            <img :src="chuanglian4" class="icon-chuanglian xuanzhuan"/>  打开
          </div>
        </div> -->
            <div
              class="chuanglian-box flex-row justify-center align-center"
              @click="handleBlind('up')"
            >
              <div class="flex-row align-center justify-center">
                <img :src="chuanglian1" class="icon-chuanglian" /> 打开
              </div>
            </div>
            <div
              class="chuanglian-box flex-row justify-center align-center"
              @click="handleBlind('pause')"
            >
              <div class="flex-row align-center justify-center">
                <img :src="chuanglian2" class="icon-chuanglian" /> 暂停
              </div>
            </div>
            <div
              class="chuanglian-box flex-row justify-center align-center"
              @click="handleBlind('down')"
            >
              <div class="flex-row align-center justify-center">
                <img :src="chuanglian3" class="icon-chuanglian" />关闭
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div v-if="obj.code !== 'ZZCQ'"> -->
        <div> <!--2025/2/7 开放自助餐区的空调控制，去掉后全楼所有中控屏幕都有空调控制-->
        <div style="display: flex">
          <IndexTitle
            style="margin-top: 40px"
            :title="data.obj.floor + ' ' + data.obj.name + ' 空调控制'"
          ></IndexTitle>
          <div
            class="air_error"
            @click="dialogAirError = true"
            v-if="
              ['A3', 'A4'].includes(props.data.obj.floorarea) &&
              errorList.length
            "
          >
            <img
              style="width: 22px; height: 20px; display: block"
              src="@/assets/images/error.png"
              alt=""
            />
            <span>设备异常</span>
            <el-icon size="14px" color="#fff"><ArrowRight /></el-icon>
          </div>
        </div>

        <div class="content" style="overflow-y: visible">
          <div class="flex-row justify-between align-center">
            <!-- <div class="title">整区设置</div> -->
            <div @click="dialogFankui = true" class="colorOrange">
              温度不适？点击反馈
            </div>
          </div>

          <div v-if="acloadingFlag">空调指令执行中....</div>
          <div v-else>
            <sliderPick
              style="width: 340px; margin-bottom: 24px"
              :activeName="acObject.status"
              :tabList="['关闭', '开启']"
              @click="acAllOP"
            ></sliderPick>
            <div class="air-box flex-row align-center justify-between">
              <div class="txt">
                <span class="opa85">设置温度：</span
                >{{
                  acObject.status === "0"
                    ? " 关闭 "
                    : +acObject.pretemperature + `℃`
                }}
              </div>
              <div class="txt" v-if="acObject.mode">
                <span class="opa85">空调模式：</span
                >{{ acObject.status === "0" ? "关闭" : acObject.mode }}
              </div>
              <div class="txt">
                <span class="opa85">风量大小：</span
                >{{ acObject.status === "0" ? "关闭" : acObject.fan }}
              </div>
            </div>
            <div class="spec">
              <div class="spec" v-if="airControlDisplay && tempStatus == 'on'">
                <div
                  class="air-box flex-row align-center justify-between temp-control"
                >
                  <span class="floor">17℃</span>
                  <el-slider
                    v-model="acObject.tempVal"
                    :min="17"
                    :max="26"
                    :step="1"
                    :format-tooltip="formatTooltip"
                    show-tooltip
                    show-stops
                    tooltip-class="temp-tip"
                    @change="handleTempChange"
                    :marks="marks"
                  />
                  <span class="celling">26℃</span>
                </div>
                <div class="flex-row justify-between align-center">
                  <div class="title">风力大小</div>
                </div>
                <div>
                  <sliderPick
                    style="width: 340px"
                    :activeName="fanActive"
                    :tabList="['弱风', '中风', '强风']"
                    @click="switchWindSpeed"
                  ></sliderPick>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <el-drawer
        v-model="innerDrawer"
        size="860px"
        destroy-on-close
        :show-close="false"
      >
        <Blind @back="innerDrawer = false" :blind2Show="currentBlind" />
      </el-drawer>
    </div>
  </div>
  <el-dialog
    v-model="dialogLight"
    append-top-body
    class="lightdia"
    width="600"
    top="40vh"
    @close="
      () => {
        syncLightStatus(false);
      }
    "
    :show-close="false"
  >

<div v-if="false" style="text-align:left;padding-top:20px;padding-bottom:80px">
  <span v-if="false">当前时间：22:30,已经进入楼宇智控节能模式，现在选中手动延长照明提供时间：</span>
  <div  v-if="false" style="display:flex; flex-direction:column; gap:16px;">
   <el-radio-group v-model="radio" @change="handleChange" size="large" fill="#ED8733" class="lightdia" style="margin: auto; padding-top: 50px">
      <el-radio-button label="30">半小时</el-radio-button>
      <el-radio-button label="60">1小时</el-radio-button>
      <el-radio-button label="120">2小时</el-radio-button>
      <el-radio-button label="180">3小时</el-radio-button>
    </el-radio-group>
  </div>
</div>
</br v-if="false">
    <span style="margin:40px">{{ dialogTxt }}</span>

    <template #footer>
      <div class="dialog-footer flex-row justify-around">
        <el-button
          type="default"
          @click="
            () => {
              dialogLight = false;
              syncLightStatus(false);
            }
          "
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
    <img class="fankui-erweima" v-if="false" :src="erweimma" />

    <img
      class="fankui-erweima"
      v-if="props.data.obj.floorarea === 'A3'"
      :src="fmanage3"
    />
    <img
      class="fankui-erweima"
      v-if="props.data.obj.floorarea === 'A4'"
      :src="fmanage4"
    />
    <img
      class="fankui-erweima"
      v-if="
        !['53F', '52F', '54F'].includes(props.data.obj.floor) &&
        props.data.obj.floorarea === 'A5'
      "
      :src="fmanage5"
    />
    <img
      class="fankui-erweima"
      v-if="['53F', '52F', '54F'].includes(props.data.obj.floor)"
      :src="ceoManage"
    />
    <div class="fankui-txt">请使用企业微信扫描二维码添加</div>
    <div class="fankui-txt">
      TEL：{{
        ["53F", "52F", "54F"].includes(props.data.obj.floor)
          ? "13777586082"
          : phoneMap[props.data.obj.floorarea]
      }}
    </div>
  </el-dialog>
  <el-dialog
    class="soc-dia"
    v-model="dialogAirError"
    append-top-body
    top="260px"
    width="450"
    :show-close="false"
  >
    <div class="title" style="text-align: left">设备异常，请联系楼长反馈</div>
    <el-scrollbar height="190px">
      <div class="msg" v-for="item in errorList" :key="item?.code">
        <span>{{ item?.name }}：</span
        >{{ item?.status?.online == 0 ? "离线" : "" }}
        {{
          item?.status?.online == 1 && item?.status?.alarmValue != 0
            ? `故障代码${item?.status?.alarmValue}`
            : ""
        }}
      </div>
    </el-scrollbar>
    <div class="btn" @click="dialogAirError = false">我知道了</div>
  </el-dialog>
</template>
