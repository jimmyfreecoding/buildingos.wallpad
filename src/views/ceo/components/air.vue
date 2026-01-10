<template>
  <div
    class="air"
    :style="isShowClean || isShowAirfan ? 'height: 480px' : 'height: 100%'"
  >
    <div class="title">
      <div>空调</div>
      <div class="zhezhao" v-show="switchStatus !== 'on'"></div>
      <div class="control">
        <div
          :class="controlMode ? 'active' : ''"
          @click="handleControlMode(true)"
        >
          智控模式
        </div>
        <div
          :class="!controlMode ? 'active' : ''"
          @click="handleControlMode(false)"
        >
          手动模式
        </div>
      </div>
    </div>
    <div class="action">
      <div class="zhezhao" v-show="switchStatus !== 'on'"></div>
      <div class="slider">
        <div class="wendu">
          <div>16.0℃</div>
          <div
            :style="switchStatus === 'on' ? 'color: #fff' : 'color: #838383'"
          >
            {{ pretemperature }}℃
          </div>
          <div>30.0℃</div>
        </div>
        <el-slider
          v-model="pretemperature"
          :show-tooltip="false"
          :min="16"
          :max="30"
          :step="1"
          ref="sliderRef"
          @change="handleChange"
        />
      </div>
      <div class="mode">
        <div
          v-for="item in modes"
          :key="item.type"
          @touchstart="handleModeCommon($event, item.type, 'down')"
          @touchend="handleModeCommon($event, item.type, 'up')"
          :class="{
            active: selectedMode === item.type ? true : false,
            down: downMode === item.type ? true : false,
          }"
        >
          <img :src="item.img" alt="" />
          <p
            :style="
              selectedMode === item.type
                ? { color: modelConfig[item.type].color }
                : ''
            "
          >
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
    <div class="speed">
      <div class="zhezhao" v-show="switchStatus !== 'on'"></div>
      <div
        v-for="item in wind"
        :key="item.type"
        @touchstart="handleWindCommon($event, item.type, 'down')"
        @touchend="handleWindCommon($event, item.type, 'up')"
        :class="{
          btn: true,
          active: selectedSpeed === item.type ? true : false,
          down: downSpeed === item.type ? true : false,
        }"
      >
        <img :src="item.img" alt="" />
        <p
          :style="
            selectedSpeed === item.type
              ? { color: windConfig[item.type].color }
              : ''
          "
        >
          {{ item.name }}
        </p>
      </div>
    </div>
    <div
      class="switch"
      :style="
        switchStatus === 'on'
          ? { background: '#ff5841' }
          : { background: '#FFFFFF4D' }
      "
      @touchstart="handleSwitchCommon($event, 'down')"
      @touchend="handleSwitchCommon($event, 'up')"
    >
      <div class="zhezhao" v-show="isPress"></div>
      <img src="@/assets/images/off.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import songfeng from "@/assets/images/songfeng.png";
// @ts-ignore
import songfengActive from "@/assets/images/songfeng-active.png";
// @ts-ignore
import zhileng from "@/assets/images/zhileng.png";
// @ts-ignore
import zhilengActive from "@/assets/images/zhileng-active.png";
// @ts-ignore
import zhire from "@/assets/images/zhire.png";
// @ts-ignore
import zhireActive from "@/assets/images/zhire-active.png";
// @ts-ignore
import xiaofeng from "@/assets/images/xiaofeng.png";
// @ts-ignore
import xiaofengActive from "@/assets/images/xiaofeng-active.png";
// @ts-ignore
import zhongfeng from "@/assets/images/zhongfeng.png";
// @ts-ignore
import zhongfengActive from "@/assets/images/zhongfeng-active.png";
// @ts-ignore
import dafeng from "@/assets/images/dafeng.png";
// @ts-ignore
import dafengActive from "@/assets/images/dafeng-active.png";
import { logClk } from "@/utils/logClk";
import { ElMessage } from "element-plus";
const props = defineProps({
  isShowClean: {
    type: Boolean,
    default: true,
  },
  isShowAirfan: {
    type: Boolean,
    default: true,
  },
});
const modeEnum = {
  2: "wind",
  3: "cold",
  4: "hot",
};
const subscribe = inject("subscribe"); // 订阅信息F
const unsubscribe = inject("unsubscribe"); // 订阅信息
const controlMode = ref(true);
const getMessage = inject("getMessage"); // 订阅信息
const publish = inject("publish"); // 订阅信息
const pretemperature = ref(20);
const selectedMode = ref("");
const downMode = ref("");
const startX = ref(0);
const startY = ref(0);
const switchStartX = ref(0);
const switchStartY = ref(0);
const selectedSpeed = ref("");
const localInfo = ref<any>({});
const downSpeed = ref("");
const windStartX = ref(0);
const windStartY = ref(0);
const sliderRef = ref(null);
const switchStatus = ref("off");
const timer = ref(null);
const isPress = ref(false);
const airList = ref([]);
const lastChangeTime = ref(0);
const modelConfig = ref({
  cold: {
    normal: zhileng,
    active: zhilengActive,
    background: "linear-gradient(90deg, #d4f7ff 0%, #2ad4f9 96.97%)",
    color: "#2AD4F9",
  },
  hot: {
    normal: zhire,
    active: zhireActive,
    background:
      "linear-gradient(90deg, #FFD4D0 0%, #FF9389 48.97%, #FC5B4B 85.37%)",
    color: "#FC5B4B",
  },
  wind: {
    normal: songfeng,
    active: songfengActive,
    background:
      "linear-gradient(90.62deg, #DAFFD7 0.43%, #ABE8A6 48.4%, #79D172 85.03%)",
    color: "#79D172",
  },
});
const modes = ref([
  {
    img: zhileng,
    name: "制冷",
    type: "cold",
  },
  {
    img: zhire,
    name: "制热",
    type: "hot",
  },
  {
    img: songfeng,
    name: "送风",
    type: "wind",
  },
]);
const windConfig = ref({
  weak: {
    normal: xiaofeng,
    active: xiaofengActive,
  },
  center: {
    normal: zhongfeng,
    active: zhongfengActive,
  },
  strong: {
    normal: dafeng,
    active: dafengActive,
  },
});
const wind = ref([
  {
    img: zhileng,
    name: "弱风",
    type: "weak",
  },
  {
    img: zhire,
    name: "中风",
    type: "center",
  },
  {
    img: songfeng,
    name: "强风",
    type: "strong",
  },
]);
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
const handleControlMode = (val, isCheckTime?: boolean) => {
  const currentTime = new Date().getTime();
  if (!isCheckTime) {
    if (currentTime - lastChangeTime.value < 3000) {
      controlMode.value = !val;
      return;
    }
  }
  lastChangeTime.value = currentTime;
  publish(
    `/iot/setting/pad/policy/switch`,
    JSON.stringify({
      spaceCode: "HGH-WC",
      floorAreaCode: localInfo.value.floorarea,
      floorCode: localInfo.value.floor,
      areaCode: localInfo.value.code,
      tc: val ? "open" : "close",
    })
  );
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
const handleMode = (type: string) => {
  if (controlMode.value) {
    controlMode.value = false;
    handleControlMode(false);
  }
  selectedMode.value = type;
  let soureName = "/运营/楼宇智控10寸/空调/单控";
  let mode = 3;
  if (type === "wind") {
    mode = 2;
  } else if (type === "cold") {
    mode = 3;
  } else if (type === "hot") {
    mode = 4;
  }
  const params = { mode, action: "on" };
  publish(
    `/iot/action/airconditioning/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`,
    JSON.stringify(params)
  );
  // log日志
  logClk({
    sourceName: soureName,
    deviceType: "airconditioning",
    actionTopic: `/iot/action/airconditioning/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`,
    actionData: JSON.stringify(params),
    spaceCode: localInfo.value.space,
    floorCode: localInfo.value.floor,
    floorAreaCode: localInfo.value.floorarea,
    areaCode: localInfo.value.code,
  });
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
  timer.value = setTimeout(() => {
    publish(
      "/iot/setting/get/device",
      JSON.stringify({
        spaceCode: localInfo.value.space,
        floorAreaCode: localInfo.value.floorarea,
        floorCode: localInfo.value.floor,
        areaCode: localInfo.value.code,
      })
    );
  }, airList.value.length * 5000);
};
const handleChange = (val: number) => {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
  if (controlMode.value) {
    controlMode.value = false;
    handleControlMode(false);
  }
  let soureName = "/运营/楼宇智控10寸/空调/单控";
  const params = { temperature: val, action: "on" };
  publish(
    `/iot/action/airconditioning/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`,
    JSON.stringify(params)
  );
  // log日志
  logClk({
    sourceName: soureName,
    deviceType: "airconditioning",
    actionTopic: `/iot/action/airconditioning/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`,
    actionData: JSON.stringify(params),
    spaceCode: localInfo.value.space,
    floorCode: localInfo.value.floor,
    floorAreaCode: localInfo.value.floorarea,
    areaCode: localInfo.value.code,
  });

  timer.value = setTimeout(function () {
    publish(
      "/iot/setting/get/device",
      JSON.stringify({
        spaceCode: localInfo.value.space,
        floorAreaCode: localInfo.value.floorarea,
        floorCode: localInfo.value.floor,
        areaCode: localInfo.value.code,
      })
    );
  }, airList.value.length * 5000);
};
const handleModeCommon = (e: any, type: string, mode: string) => {
  e.preventDefault();
  if (mode === "down") {
    downMode.value = type;
    startX.value = e.changedTouches[0].clientX;
    startY.value = e.changedTouches[0].clientY;
  } else if (mode === "up") {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    if (
      downMode.value === type &&
      Math.abs(startX.value - endX) < 10 &&
      Math.abs(startY.value - endY) < 10
    ) {
      downMode.value = "";
      handleMode(type);
    } else {
      downMode.value = "";
    }
  }
};
const handleSwitch = () => {
  if (airList.value && airList.value.length) {
    switchStatus.value = switchStatus.value === "on" ? "off" : "on";
    selectedMode.value = switchStatus.value === "off" ? "" : "cold";
    selectedSpeed.value = switchStatus.value === "off" ? "" : "center";
    let soureName = "/运营/楼宇智控10寸/空调/群控";
    const params = { action: switchStatus.value };
    if (switchStatus.value === "off" && controlMode.value) {
      controlMode.value = false;
      handleControlMode(controlMode.value, true);
    } else if (switchStatus.value === "on") {
      controlMode.value = true;
      handleControlMode(controlMode.value, true);
    }
    publish(
      `/iot/action/airconditioning/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`,
      JSON.stringify(params)
    );
    // log日志
    logClk({
      sourceName: soureName,
      deviceType: "airconditioning",
      actionTopic: `/iot/action/airconditioning/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`,
      actionData: JSON.stringify(params),
      spaceCode: localInfo.value.space,
      floorCode: localInfo.value.floor,
      floorAreaCode: localInfo.value.floorarea,
      areaCode: localInfo.value.code,
    });
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }
    timer.value = setTimeout(function () {
      publish(
        "/iot/setting/get/device",
        JSON.stringify({
          spaceCode: localInfo.value.space,
          floorAreaCode: localInfo.value.floorarea,
          floorCode: localInfo.value.floor,
          areaCode: localInfo.value.code,
        })
      );
    }, 1000);
  }
};
const handleSwitchCommon = (e: any, mode: string) => {
  if (mode === "down") {
    e.preventDefault();
    isPress.value = true;
    switchStartX.value = e.changedTouches[0].clientX;
    switchStartY.value = e.changedTouches[0].clientY;
  } else if (mode === "up") {
    e.preventDefault();
    isPress.value = false;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    if (
      Math.abs(switchStartX.value - endX) < 10 &&
      Math.abs(switchStartY.value - endY) < 10
    ) {
      handleSwitch();
    }
  }
};
const handleWind = (type: string) => {
  if (controlMode.value) {
    controlMode.value = false;
    handleControlMode(false);
  }
  let soureName = "/运营/楼宇智控10寸/空调/单控";
  selectedSpeed.value = type;
  let fan = "";
  if (type === "weak") {
    fan = "15";
  } else if (type === "center") {
    fan = "45";
  } else if (type === "strong") {
    fan = "75";
  }
  const params = { fan, action: "on" };
  publish(
    `/iot/action/airconditioning/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`,
    JSON.stringify(params)
  );
  // log日志
  logClk({
    sourceName: soureName,
    deviceType: "airconditioning",
    actionTopic: `/iot/action/airconditioning/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`,
    actionData: JSON.stringify(params),
    spaceCode: localInfo.value.space,
    floorCode: localInfo.value.floor,
    floorAreaCode: localInfo.value.floorarea,
    areaCode: localInfo.value.code,
  });
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
  timer.value = setTimeout(function () {
    publish(
      "/iot/setting/get/device",
      JSON.stringify({
        spaceCode: localInfo.value.space,
        floorAreaCode: localInfo.value.floorarea,
        floorCode: localInfo.value.floor,
        areaCode: localInfo.value.code,
      })
    );
  }, airList.value.length * 5000);
};
const handleWindCommon = (e: any, type: string, mode: string) => {
  if (mode === "down") {
    e.preventDefault();
    downSpeed.value = type;
    windStartX.value = e.changedTouches[0].clientX;
    windStartY.value = e.changedTouches[0].clientY;
  } else if (mode === "up") {
    e.preventDefault();
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    if (
      downSpeed.value === type &&
      Math.abs(windStartX.value - endX) < 10 &&
      Math.abs(windStartY.value - endY) < 10
    ) {
      downSpeed.value = "";
      handleWind(type);
    } else {
      downSpeed.value = "";
    }
  }
};
const setWind = (value: number) => {
  if (value === 15) {
    selectedSpeed.value = "weak";
  } else if (value === 45) {
    selectedSpeed.value = "center";
  } else if (value === 75) {
    selectedSpeed.value = "strong";
  }
};
const setMode = (value: number) => {
  selectedMode.value = modeEnum[value];
};
watch(
  () => selectedMode.value,
  (newValue, oldValue) => {
    if (newValue) {
      modes.value = modes.value.map((item) => {
        if (item.type === newValue) {
          item.img = modelConfig.value[newValue].active;
        } else {
          item.img = modelConfig.value[item.type].normal;
        }
        return item;
      });
      nextTick(() => {
        sliderRef.value.$el.querySelector(".el-slider__bar").style.background =
          modelConfig.value[newValue].background;
        sliderRef.value.$el.querySelector(
          ".el-slider__button-wrapper"
        ).style.display = "block";
      });
    } else {
      modes.value = modes.value.map((item) => {
        item.img = modelConfig.value[item.type].normal;
        return item;
      });
      nextTick(() => {
        sliderRef.value.$el.querySelector(".el-slider__bar").style.background =
          "#545454";
        sliderRef.value.$el.querySelector(
          ".el-slider__button-wrapper"
        ).style.display = "none";
      });
    }
  },
  { deep: true, immediate: true }
);
getMessage((topic, message) => {
  if (
    topic.indexOf(
      `/iot/setting/device/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
    ) !== -1
  ) {
    let devices = JSON.parse(message);
    airList.value = devices?.airconditioning?.map((item: any) => {
      return {
        ...item,
        status: JSON.parse(item.status),
      };
    });
    switchStatus.value =
      airList.value && airList.value.length > 0
        ? majorityCandidate(airList.value, "status")
        : "off";
    if (switchStatus.value === "on") {
      setWind(majorityCandidate(airList.value, "fan"));
      setMode(majorityCandidate(airList.value, "mode"));
      pretemperature.value = majorityCandidate(airList.value, "pretemperature");
    } else {
      selectedMode.value = switchStatus.value === "off" ? "" : "cold";
      selectedSpeed.value = switchStatus.value === "off" ? "" : "center";
    }
  }
  if (
    topic.indexOf(
      `/iot/pad/policy/switch/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
    ) !== -1
  ) {
    let policy = JSON.parse(message);
    controlMode.value = policy.tc === "open" ? true : false;
  }
});
onMounted(() => {
  const data = localStorage.getItem("data");
  if (data) {
    localInfo.value = JSON.parse(data);
    publish(
      "/iot/setting/get/device",
      JSON.stringify({
        spaceCode: JSON.parse(data).space,
        floorAreaCode: JSON.parse(data).floorarea,
        floorCode: JSON.parse(data).floor,
        areaCode: JSON.parse(data).code,
      })
    );
    subscribe(
      `/iot/pad/policy/switch/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
    );
    publish(
      `/iot/action/pad/policy/switch/status`,
      JSON.stringify({
        spaceCode: "HGH-WC",
        floorAreaCode: localInfo.value.floorarea,
        floorCode: localInfo.value.floor,
        areaCode: localInfo.value.code,
      })
    );
  }
});
watch(
  () => selectedSpeed.value,
  (newValue, oldValue) => {
    if (newValue) {
      wind.value = wind.value.map((item) => {
        if (item.type === newValue) {
          item.img = windConfig.value[newValue].active;
        } else {
          item.img = windConfig.value[item.type].normal;
        }
        return item;
      });
    } else {
      wind.value = wind.value.map((item) => {
        item.img = windConfig.value[item.type].normal;
        return item;
      });
    }
  },
  { deep: true, immediate: true }
);
</script>

<style scoped lang="scss">
.air {
  width: 400px;
  height: 480px;
  border-radius: 16px;
  background: #5d5d5d33;
  padding: 20px;
  touch-action: none;
  .title {
    color: #fff;
    font-size: 26px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    position: relative;
    .zhezhao {
      width: 208px;
      height: 38px;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      border-radius: 16px;
      top: 0;
      right: 0;
      z-index: 999;
    }
    .disabled {
      pointer-events: none;
    }
    .control {
      display: flex;
      align-items: center;
      width: 208px;
      height: 38px;
      font-size: 16px;
      font-weight: 400;
      background: #5d5d5d33;
      border-radius: 87px;
      color: #ffffffd9;
      div {
        width: 50%;
        text-align: center;
        height: 100%;
        line-height: 38px;
      }
      .active {
        background: #ff5841;
        border-radius: 87px;
        color: #fff;
      }
    }
  }
  .action {
    width: 360px;
    height: 188px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.1);
    margin-top: 20px;
    padding: 10px;
    position: relative;
    .zhezhao {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      border-radius: 16px;
      top: 0;
      left: 0;
      z-index: 999;
    }
    .slider {
      .wendu {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        color: #707070;
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 12px;
        :nth-child(2) {
          color: #fff;
          font-size: 24px;
          font-weight: 500;
        }
      }
      :deep(.el-slider__runway) {
        background-color: #545454 !important;
        height: 30px;
        border-radius: 8px;
      }
      :deep(.el-slider__bar) {
        background: #545454;
        height: 30px;
        border-radius: 8px 0 0 8px;
      }
      :deep(.el-slider__button-wrapper) {
        top: -3px;
      }
      :deep(.el-slider__button) {
        width: 10px;
        height: 34px;
        border: none;
        border-radius: 19px;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
      }
    }

    .mode {
      display: flex;
      justify-content: space-between;
      margin-top: 22px;
      div {
        width: 105px;
        height: 72px;
        background: #00000040;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img {
          width: 28px;
          height: 28px;
        }
        p {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          color: #bfbfbf;
        }
      }
      .active {
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.05) 76.9%
        );
        border: 1px solid;
        border-image-source: linear-gradient(
          133.75deg,
          rgba(255, 255, 255, 0.3) 6.97%,
          rgba(255, 255, 255, 0) 48.35%
        );
      }
      .down {
        background: #00000059;
      }
    }
  }
  .speed {
    width: 360px;
    height: 86px;
    background: #ffffff1a;
    border-radius: 16px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 10px;
    .zhezhao {
      width: 360px;
      height: 86px;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      border-radius: 16px;
      top: 0;
      left: 0;
      z-index: 999;
    }
    .btn {
      width: 105px;
      height: 64px;
      background: #00000040;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 28px;
        height: 28px;
      }
      p {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: #bfbfbf;
      }
    }
    .active {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 76.9%
      );
      border: 1px solid;
      border-image-source: linear-gradient(
        133.75deg,
        rgba(255, 255, 255, 0.3) 6.97%,
        rgba(255, 255, 255, 0) 48.35%
      );
      p {
        color: #fff;
      }
    }
    .down {
      background: #00000059;
    }
  }
  .switch {
    width: 360px;
    height: 68px;
    border-radius: 16px;
    background: #ff5841;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    position: relative;
    .zhezhao {
      width: 360px;
      height: 68px;
      border-radius: 16px;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }
    img {
      width: 28px;
      height: 28px;
    }
  }
}
:deep(.el-switch__core) {
  height: 24px !important;
  border-radius: 999px;
}
:deep(.el-switch__action) {
  width: 20px !important;
  height: 20px !important;
}
:deep(.el-switch.is-checked .el-switch__core .el-switch__action) {
  left: calc(100% - 21px) !important;
}
:deep(.el-switch) {
  --el-switch-on-color: #ff5841;
  --el-switch-off-color: #cccccc;
}
</style>
<style scoped lang="scss"></style>
