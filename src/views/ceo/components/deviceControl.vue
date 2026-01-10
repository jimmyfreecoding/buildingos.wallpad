<template>
  <div class="devices-control">
    <div>
      <ALight />
      <Blind />
    </div>
    <div class="right">
      <Air :isShowClean="isShowClean" :isShowAirfan="isShowAirfan" />
      <div class="clean">
        <div class="jinghua" v-if="isShowClean">
          <p>净化</p>
          <b class="wind" @click="handleCleanerWind"
            ><img :src="fanWind[currentWind].img" alt=""
          /></b>
          <div
            class="switch"
            @click="handleJinghua"
            :style="
              !isJinghua ? 'background: #FFFFFF33' : 'background: #ff5841;'
            "
          >
            <img src="@/assets/images/off.png" alt="" />
          </div>
        </div>
        <div class="jinghua" v-if="isShowAirfan">
          <p>排风</p>
          <div
            @click="handlePf"
            :style="!isPf ? 'background: #FFFFFF33' : 'background: #ff5841;'"
            class="paifeng"
          >
            <img v-if="!loading" src="@/assets/images/off.png" alt="" />
            <div v-if="loading" class="loading-spinner"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ALight from "./light.vue";
import Blind from "./blind.vue";
import Air from "./air.vue";
import wind from "@/assets/images/wind.png";
import wind2 from "@/assets/images/wind2.png";
import wind3 from "@/assets/images/wind3.png";
import { logClk } from "@/utils/logClk";
const isJinghua = ref(false);
const isPf = ref(false);
const isShowClean = ref(false);
const isShowAirfan = ref(false);
const loading = ref(false);
const subscribe = inject("subscribe"); // 订阅信息
const publish = inject("publish"); // 订阅信息
const getMessage = inject("getMessage"); // 订阅信息
const localInfo = ref({});
const jh = ref([]);
const pf = ref([]);
const unsubscribe = inject("unsubscribe"); // 订阅信息
const handleJinghua = () => {
  const names = jh.value.map((x) => x.name).join(",");
  publish(
    `/iot/action/aircleaner/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${names}`,
    JSON.stringify({ action: isJinghua.value ? "off" : "on" })
  );
  publish(
    `/iot/action/aircleaner/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${names}`,
    JSON.stringify({ action: "status" })
  );
};
const handlePf = () => {
  if (loading.value) return;
  loading.value = true;
  const names = pf.value.map((x) => x.name).join(",");
  publish(
    `/iot/action/airfan/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${names}`,
    JSON.stringify({ action: isPf.value ? "off" : "on" })
  );
  setTimeout(() => {
    publish(
      `/iot/action/airfan/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${names}`,
      JSON.stringify({ action: "status" })
    );
  }, 2000);
  logClk({
    sourceName: "/运营/楼宇智控/排风扇/单控",
    deviceType: "airfan",
    actionTopic: `/iot/action/airfan/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${names}`,
    actionData: JSON.stringify({ action: isPf.value ? "off" : "on" }),
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
    if (devices?.aircleaner) {
      jh.value = devices?.aircleaner.map((x) => {
        return {
          ...x,
          status: JSON.parse(x.status),
        };
      });
      isShowClean.value = true;
      isJinghua.value = jh.value[0].status?.status === "on";
      getCleanerWindStatus(jh.value[0].status);
    }
    if (devices?.airfan) {
      pf.value = devices?.airfan.map((x) => {
        return {
          ...x,
          status: JSON.parse(x.status),
        };
      });
      isShowAirfan.value = true;
      isPf.value = pf.value[0].status?.status === "on";
    }
  }
  if (
    topic.indexOf(
      `/iot/status/aircleaner/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
    ) !== -1
  ) {
    let action = JSON.parse(message);
    const status = action[0].status?.status;
    getCleanerWindStatus(action[0].status);
    isJinghua.value = status === "on" ? true : false;
  }
  if (
    topic.indexOf(
      `/iot/status/airfan/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
    ) !== -1
  ) {
    let action = JSON.parse(message);
    const status = action[0].status?.status;
    const oldStatus = isPf.value ? "on" : "off";
    if (oldStatus != status) {
      loading.value = false;
      isPf.value = status === "on" ? true : false;
    }
  }
});
const fanWind = [
  {
    img: wind,
    name: "弱风",
    value: 15,
  },
  {
    img: wind2,
    name: "中风",
    value: 45,
  },
  {
    img: wind3,
    name: "强风",
    value: 75,
  },
];
const getCleanerWindStatus = (status) => {
  if (fanWind.findIndex((x) => x.value === status?.fan) === 0) {
    currentWind.value = 0;
  } else if (fanWind.findIndex((x) => x.value === status?.fan)) {
    currentWind.value = fanWind.findIndex((x) => x.value === status?.fan);
  }
};
const currentWind = ref(0);
const handleCleanerWind = () => {
  let soureName = "/运营/楼宇智控10寸/空气净化器/单控";
  if (currentWind.value === 2) {
    currentWind.value = 0;
  } else {
    currentWind.value += 1;
  }
  const params = { fan: fanWind[currentWind.value].value, action: "on" };
  publish(
    `/iot/action/aircleaner/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`,
    JSON.stringify(params)
  );
  // log日志
  logClk({
    sourceName: soureName,
    deviceType: "aircleaner",
    actionTopic: `/iot/action/aircleaner/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`,
    actionData: JSON.stringify(params),
    spaceCode: localInfo.value.space,
    floorCode: localInfo.value.floor,
    floorAreaCode: localInfo.value.floorarea,
    areaCode: localInfo.value.code,
  });
  setTimeout(function () {
    publish(
      `/iot/action/aircleaner/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`,
      JSON.stringify({ action: "status" })
    );
  }, 3000);
};
onMounted(() => {
  const data = localStorage.getItem("data");
  if (data) {
    localInfo.value = JSON.parse(data);
    subscribe(
      `/iot/setting/device/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
    );
    subscribe(
      `/iot/status/aircleaner/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/#`
    );
    subscribe(
      `/iot/status/airfan/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/#`
    );
  } else {
    isShowClean.value = false;
    isShowAirfan.value = false;
  }
});
onUnmounted(() => {
  unsubscribe(
    `/iot/setting/device/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
  );
});
</script>

<style scoped lang="scss">
.devices-control {
  padding: 0 40px;
  position: absolute;
  top: 100px;
  left: 0;
  z-index: 99;
  display: flex;
  .right {
    margin-left: 20px;
    .clean {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .jinghua {
        width: 190px;
        height: 140px;
        border-radius: 16px;
        background: #5d5d5d33;
        padding: 20px;
        position: relative;
        p {
          color: #fff;
          font-size: 26px;
          font-weight: 500;
          line-height: 40px; /* 153.846% */
        }
        .paifeng,
        .switch {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ff5841;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          right: 20px;
          bottom: 20px;
          img {
            display: block;
            width: 20px;
            height: 20px;
          }
          .loading-spinner {
            width: 20px;
            height: 20px;
            border: 4px solid rgba(255, 255, 255, 0.2);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        }

        .wind {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 20px;
          bottom: 20px;
          background: #2a2a2a;
          border: 1px solid;

          border-image-source: linear-gradient(
            133.75deg,
            rgba(255, 255, 255, 0.3) 6.97%,
            rgba(255, 255, 255, 0) 48.35%
          );
          box-sizing: content-box;

          img {
            display: block;
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>
