<template>
  <div class="light">
    <div class="title">
      <div>照明</div>
      <div @click="onMore">
        更多控制<el-icon size="16px" style="margin-left: 1px"
          ><ArrowRight
        /></el-icon>
      </div>
    </div>
    <div class="mode">
      <template 
        v-for="mode in modeMap"
        :key="mode.type"
      >
      <div
        v-if="!(mode.name=='会晤模式'&&localInfo.code=='M5205')"
        @touchstart="handleModeCommon($event, mode.type, 'down')"
        @touchend="handleModeCommon($event, mode.type, 'up')"
        :class="{
          active: selectedMode === mode.type ? true : false,
          down: downMode === mode.type ? true : false,
        }"
      >
        <img :src="mode.img" alt="" />
        <p>{{ mode.name }}</p>
      </div>
      </template>
    </div>
    <el-drawer
      v-model="innerDrawer"
      size="860px"
      destroy-on-close
      :show-close="false"
    >
      <LightMore @back="innerDrawer = false" @result="onResult" />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import mode from "@/views/ceo/const";
import { ArrowRight } from "@element-plus/icons-vue";
// @ts-ignore
import richang from "@/assets/images/richang.png";
// @ts-ignore
import huiyi from "@/assets/images/huiyi.png";
// @ts-ignore
import likai from "@/assets/images/likai.png";
// @ts-ignore
import bangong from "@/assets/images/bangong.png";
// @ts-ignore
import richangActive from "@/assets/images/richang-active.png";
// @ts-ignore
import huiyiActive from "@/assets/images/huiyi-active.png";
// @ts-ignore
import likaiActive from "@/assets/images/likai-active.png";
// @ts-ignore
import bangongActive from "@/assets/images/bangong-active.png";
// @ts-ignore
import LightMore from "./lightMore.vue";
import { logClk } from "@/utils/logClk";
const publish = inject("publish"); // 订阅信息
const innerDrawer = ref(false);
const selectedMode = ref("");
const localInfo = ref<any>({});
const downMode = ref("");
const startX = ref(0);
const startY = ref(0);
const modeImages = ref({
  day: { normal: richang, active: richangActive },
  meeting: { normal: huiyi, active: huiyiActive },
  work: { normal: bangong, active: bangongActive },
  leave: { normal: likai, active: likaiActive },
});
const modeMap = ref([
  {
    img: richangActive,
    type: "day",
  },
  {
    img: huiyi,
    type: "meeting",
  },
  {
    img: bangong,
    type: "work",
  },
  {
    img: likai,
    type: "leave",
  },
]);
const handleMode = (type: string) => {
  selectedMode.value = type;
  localStorage.setItem("light_mode", type);
  const name = modeMap.value.find((x) => x.type === type)?.name.substring(0, 2);
  console.log(
    `/iot/action/scenemode/HGH-WC/${localInfo.value.floorarea}/${
      localInfo.value.floor
    }/${localInfo.value.code}/${name == "一键" ? "全关" : name}`
  );
  publish(
    `/iot/action/scenemode/HGH-WC/${localInfo.value.floorarea}/${
      localInfo.value.floor
    }/${localInfo.value.code}/${name == "一键" ? "全关" : name}`
  );
  logClk({
    sourceName: "/运营/楼宇智控/照明/单控",
    deviceType: "light",
    actionTopic: `/iot/action/scenemode/HGH-WC/${localInfo.value.floorarea}/${
      localInfo.value.floor
    }/${localInfo.value.code}/${name == "一键" ? "全关" : name}`,
    actionData: JSON.stringify({ action: type }),
    spaceCode: localInfo.value?.space,
    floorCode: localInfo.value.floor,
    floorAreaCode: localInfo.value.floorarea,
    areaCode: localInfo.value.code,
  });
};
const handleModeCommon = (e: any, type: string, downType: string) => {
  e.preventDefault();
  if (downType === "down") {
    downMode.value = type;
    startX.value = e.changedTouches[0].clientX;
    startY.value = e.changedTouches[0].clientY;
  } else if (downType === "up") {
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
const onMore = () => {
  innerDrawer.value = true;
};
const onResult = () => {
  selectedMode.value = "";
  localStorage.setItem("light_mode", "no");
};
watch(
  () => selectedMode.value,
  (newValue, oldValue) => {
    if (newValue) {
      modeMap.value = modeMap.value.map((item) => {
        if (item.type === newValue) {
          item.img = modeImages.value[newValue].active;
        } else {
          item.img = modeImages.value[item.type].normal;
        }
        return item;
      });
    } else {
      modeMap.value = modeMap.value.map((item) => {
        item.img = modeImages.value[item.type].normal;
        return item;
      });
    }
  },
  { deep: true, immediate: true }
);
onMounted(() => {
  const data = localStorage.getItem("data");
  if (data) {
    localInfo.value = JSON.parse(data);
    modeMap.value = modeMap.value
      .map((item, index) => {
        return {
          ...item,
          name: mode?.[localInfo.value.code]?.[index]?.name,
        };
      })
      .filter((x) => x.name);
  }
  const local_mode = localStorage.getItem("light_mode");
  if (local_mode) {
    selectedMode.value = local_mode !== "no" ? local_mode : "";
  } else {
    selectedMode.value = "day";
    const name = modeMap.value
      .find((x) => x.type === "day")
      ?.name.substring(0, 2);
    publish(
      `/iot/action/scenemode/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${name}`
    );
  }
});
</script>

<style scoped lang="scss">
.light {
  width: 780px;
  height: 280px;
  border-radius: 16px;
  background: #5d5d5d33;
  padding: 20px;
  .title {
    display: flex;
    justify-content: space-between;
    color: #fff;
    :nth-child(1) {
      font-size: 26px;
      font-weight: 500;
      line-height: 40px;
    }
    :nth-child(2) {
      width: 120px;
      height: 40px;
      border-radius: 57px;
      background: #5d5d5d33;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 400;
    }
  }
  .mode {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    div {
      width: 170px;
      height: 180px;
      border-radius: 16px;
      background: #00000026;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 40px;
        height: 40px;
      }
      p {
        font-size: 20px;
        font-weight: 500;
        color: #bfbfbf;
        margin-top: 12px;
      }
    }
    .active {
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 76.9%
      );
      border: 2px solid;
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
      background: #0000004d;
    }
  }
  :deep(.el-drawer__header) {
    display: none !important;
  }
  :deep(.el-drawer__body) {
    padding: 0 !important;
  }
}
</style>
