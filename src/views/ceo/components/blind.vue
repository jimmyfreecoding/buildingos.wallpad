<template>
  <div class="blind">
    <div class="title">
      <div style="display: flex; align-items: center">
        窗帘
        <div
          style="
            font-size: 16px;
            color: #bfbfbf;
            display: flex;
            align-items: center;
            margin-left: 16px;
            margin-top: 3px;
          "
        >
          <img
            src="@/assets/images/blindtip.png"
            alt=""
            style="width: 18px; height: 18px; margin-right: 5px"
          />控制窗帘前，请确保已解开束带
        </div>
      </div>
      <div @click="innerDrawer = true">
        更多控制<el-icon size="16px" style="margin-left: 1px"
          ><ArrowRight
        /></el-icon>
      </div>
    </div>
    <div class="action" v-for="item in actions" :key="item.type">
      <div class="bulian">
        <img :src="item.img" alt="" />
        <p>{{ item.name }}</p>
      </div>
      <div
        v-for="k in item.children"
        :class="{
          btn: true,
          down: downMode === item.name + k.type ? true : false,
        }"
        :key="k.type"
        @touchstart="handleAction($event, item.name, k.type, 'down')"
        @touchend="handleAction($event, item.name, k.type, 'up')"
      >
        <img :src="k.img" alt="" />
        <p>{{ k.name }}</p>
      </div>
    </div>
    <el-drawer
      v-model="innerDrawer"
      size="860px"
      destroy-on-close
      :show-close="false"
    >
      <BlindMore @back="innerDrawer = false" />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
// @ts-ignore
import open from "@/assets/images/open.png";
// @ts-ignore
import close from "@/assets/images/close.png";
// @ts-ignore
import pause from "@/assets/images/pause.png";
// @ts-ignore
import BlindMore from "./blindMore.vue";
// @ts-ignore
import bulian from "@/assets/images/bulian.png";
// @ts-ignore
import shalian from "@/assets/images/shalian.png";
import { logClk } from "@/utils/logClk";
const publish = inject("publish"); // 订阅信息
const getMessage = inject("getMessage"); // 订阅信息
const innerDrawer = ref(false);
const startX = ref(0);
const startY = ref(0);
const localInfo = ref<any>({});
const blinds = ref([]);
const actions = ref([
  {
    name: "布帘",
    type: "bulian",
    img: bulian,
    children: [
      {
        type: "up",
        name: "打开",
        img: open,
      },
      {
        type: "pause",
        img: pause,
        name: "暂停",
      },
      {
        type: "down",
        name: "关闭",
        img: close,
      },
    ],
  },
  {
    name: "纱帘",
    type: "shalian",
    img: shalian,
    children: [
      {
        type: "up",
        name: "打开",
        img: open,
      },
      {
        type: "pause",
        img: pause,
        name: "暂停",
      },
      {
        type: "down",
        name: "关闭",
        img: close,
      },
    ],
  },
]);
const downMode = ref("");
const handleAction = (e: any, name: string, type: string, action: string) => {
  e.preventDefault();
  if (action === "down") {
    downMode.value = name + type;
    startX.value = e.changedTouches[0].clientX;
    startY.value = e.changedTouches[0].clientY;
  } else {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    if (
      downMode.value === name + type &&
      Math.abs(startX.value - endX) < 10 &&
      Math.abs(startY.value - endY) < 10
    ) {
      handleClickBlind(name, type);
    }
    downMode.value = "";
  }
};
const handleClickBlind = (name: string, action: string) => {
  const names = blinds.value
    .reduce((acc, x) => {
      if (x.name.includes(name)) {
        acc.push(x.name);
      }
      return acc;
    }, [])
    .join(",");
  publish(
    `/iot/action/blind/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${names}`,
    JSON.stringify({ action })
  );
  // log日志
  logClk({
    sourceName: "/运营/楼宇智控/窗帘/单控",
    deviceType: "blind",
    actionTopic: `/iot/action/blind/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${names}`,
    actionData: JSON.stringify({ action }),
    spaceCode: localInfo.value?.space,
    floorCode: localInfo.value.floor,
    floorAreaCode: localInfo.value.floorarea,
    areaCode: localInfo.value.code,
  });
};
getMessage((topic, message) => {
  if (
    topic.indexOf(
      `/iot/setting/device/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
    ) !== -1
  ) {
    let devices = JSON.parse(message);
    blinds.value = devices?.blind ?? [];
  }
});
onBeforeMount(() => {
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
  }
});
</script>

<style scoped lang="scss">
.blind {
  width: 780px;
  height: 340px;
  border-radius: 16px;
  background: #5d5d5d33;
  margin-top: 20px;
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
  .action {
    width: 740px;
    height: 110px;
    border-radius: 16px;
    background: #ffffff1a;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    .bulian {
      width: 100px;
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 28px;
        height: 28px;
      }
      p {
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        line-height: 28px;
      }
    }
    .down {
      background: rgba(0, 0, 0, 0.3) !important;
    }
    .btn {
      width: 186.67px;
      height: 90px;
      border-radius: 16px;
      background: #ffffff1a;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 28px;
        height: 28px;
      }
      p {
        font-size: 20px;
        color: #fff;
        line-height: 28px;
        margin-top: 4px;
      }
    }
  }
}
</style>
