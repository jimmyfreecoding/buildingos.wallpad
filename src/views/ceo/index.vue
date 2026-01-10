<template>
  <div class="continer" @click="handleDrawer">
    <div class="shdow animate__animated"></div>
    <div style="height: 100%; width: 100%">
      <video
        :src="bgParams.url"
        loop
        autoplay
        muted
        preload="auto"
        style="height: 100%"
      ></video>
    </div>
    <div class="header">
      <div class="logo" @click.stop="dialogSetup = true">
        <img src="@/assets/images/logo.png" alt="" />
      </div>
      <LocalTime />
    </div>
    <div class="content">
      <div>
        <IconTitle
          :img="iconWen"
          :title="localInfo.floor + ' ' + localInfo?.name"
          style="opacity: 0.6"
        ></IconTitle>
        <div style="display: flex; width: 100%">
          <div class="title-num">
            <span>{{ parseInt(inside?.temperature) }}</span>
            <span>.{{ inside?.temperature?.toFixed(1).split(".")[1] }}</span>
            <span>℃</span>
          </div>
          <!-- <div class="divider">
            <el-divider direction="vertical" />
          </div> -->
          <div class="shidu">
            <div class="title">
              <img fit="cover" class="img" :src="iconTem" />
              <span>湿度</span>
            </div>
            <div class="title-num1">
              {{ inside.humidity }}<span style="font-size: 34px">%</span>
              <span style="color: #79d172; margin-left: 20px; font-size: 36px"
                >舒适</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="line">
        <img src="@/assets/images/Vector1720.png" alt="" />
      </div>
      <div style="position: absolute; left: 760px">
        <IconTitle :img="iconWen" title="室外" style="opacity: 0.6"></IconTitle>
        <div style="display: flex; width: 100%">
          <div class="title-num">
            <span>{{ outside?.temperatureNum }}</span>
            <span>.0</span>
            <span style="margin-left: 20px">℃</span>
            <span>{{ outside?.today }}</span>
          </div>
        </div>
      </div>
    </div>
    <Environment :outside="outside" :inside="inside" />
    <div class="hint" @click.stop="handleDrawer">
      <img src="@/assets/images/Rectangle.png" alt="" />
    </div>
    <el-drawer
      v-model="drawer"
      size="100%"
      destroy-on-close
      direction="btt"
      :show-close="false"
    >
      <Devices @clickBack="closeDrawer" />
    </el-drawer>
  </div>
  <el-dialog
    class="soc-dia"
    v-model="dialogSetup"
    append-top-body
    top="280px"
    width="450"
    :show-close="false"
  >
    <Reset />
  </el-dialog>
  <el-dialog v-model="dialogFormVisible" title="初始化平板" width="500">
    <Config @close="dialogFormVisible = false" :spaceObj="spaceObj" />
  </el-dialog>
</template>

<script setup>
import IconTitle from "@/components/iconTitle.vue";
import iconWen from "@/assets/images/wenWhite.png";
import bg from "@/assets/images/bgNew1.jpg";
import iconTem from "@/assets/images/temWhite.png";
import Reset from "./components/reset.vue";
import Config from "./components/config.vue";
import LocalTime from "./components/localTime.vue";
import Environment from "./components/environment.vue";
import Devices from "./components/devices.vue";
const subscribe = inject("subscribe"); // 订阅信息F
const unsubscribe = inject("unsubscribe"); // 订阅信息
const getMessage = inject("getMessage"); // 订阅信息
const publish = inject("publish"); // 订阅信息
const localInfo = ref({});
const bgParams = reactive({ type: "image", url: bg });
const timer3 = ref(null);
const dialogSetup = ref(false);
const dialogFormVisible = ref(false);
const drawer = ref(false);
const timer = ref(null);
const padObj = ref({});
const timer1 = ref(null);
const airsensorMap = ref([]);
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
const spaceObj = ref([]);
const setBg = (urls) => {
  // 注意要加type
  bgParams.type = "video";
  bgParams.url = "/wallpad/images/rain.mp4";

  if (timer3.value) {
    clearTimeout(timer3.value);
  }
  timer3.value = setTimeout(() => {
    bgParams.url = "/wallpad/images/cloud.mp4";
  }, 3000);
};
const setInitBg = () => {
  console.info("进入修改天气背景的入口");
  let today = outside.value.today;
  if (today) {
    bgParams.type = "video";
    bgParams.url = "/wallpad/images/sun.mp4";
    if (today === "多云") {
      console.info("多云");
      bgParams.url = "/wallpad/images/cloud.mp4";
    } else if (
      today === "阴" ||
      today.indexOf("雾") !== -1 ||
      today.indexOf("霾") !== -1
    ) {
      console.info("阴");
      bgParams.url = "/wallpad/images/overcast.mp4";
    } else if (today === "晴") {
      console.info("晴");
      bgParams.url = "/wallpad/images/sun.mp4";
    } else if (today.indexOf("雨") !== -1) {
      console.info("雨");
      bgParams.url = "/wallpad/images/rain.mp4";
    } else if (today.indexOf("雪") !== -1) {
      console.info("雪");
      bgParams.url = "/wallpad/images/snow.mp4";
    } else {
      bgParams.url = "/wallpad/images/sun.mp4";
    }
  }
};
const handleDrawer = () => {
  drawer.value = true;
  timer.value = setTimeout(() => {
    drawer.value = false;
    clearTimeout(timer.value);
  }, 3 * 60 * 1000);
};
const closeDrawer = () => {
  drawer.value = false;
  if (timer.value) clearTimeout(timer.value);
};
getMessage((topic, message) => {
  //   sessionStorage.setItem("mqtt", "message");
  // 配置信息
  if (topic === `/iot/setting/structure/result`) {
    spaceObj.value = JSON.parse(message);
    spaceObj.value[0].floorArea[3].floor[8].mettingRoom =
      spaceObj.value?.[0]?.floorArea?.[3]?.floor?.[8]?.mettingRoom?.concat(
        spaceObj.value?.[0]?.floorArea?.[3]?.floor?.[8]?.room
      ) ?? spaceObj.value?.[0]?.floorArea?.[3]?.floor?.[8]?.room;

    spaceObj.value[0].floorArea[3].floor[9].mettingRoom =
      spaceObj.value?.[0]?.floorArea?.[3]?.floor?.[9]?.mettingRoom?.concat(
        spaceObj.value?.[0]?.floorArea?.[3]?.floor?.[9]?.room
      ) ?? spaceObj.value?.[0]?.floorArea?.[3]?.floor?.[9]?.room;
  }
  if (
    topic.indexOf(
      `/iot/setting/device/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
    ) !== -1
  ) {
    let devices = JSON.parse(message);
    console.log(devices);
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
  }
  // 室内环境
  if (
    topic ===
    `/iot/status/areaairsensor/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
  ) {
    if (airsensorMap.value?.some((x) => x?.status?.online == 1)) {
      console.log(JSON.parse(message.toString())[0].status, "123123123");
      inside.value = JSON.parse(message.toString())[0].status;
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
  //室外环境
  if (topic === "/wallpad/outside") {
    if (outside.value.today !== JSON.parse(message).today) {
      outside.value = JSON.parse(message);
      setInitBg();
    }
    outside.value = JSON.parse(message);
  }
  if (topic.indexOf(`/iot/action/pad/HGH-WC/`) !== -1) {
    let router = topic.split("/");
    console.log(router);
    let itsme = false;
    if (router.length === 9) {
      //发给指定pad
      console.info("发给指定pad:" + router[6] + "|" + router[8]);
      if (localInfo.value.type === "wc") {
        if (
          router[6] === localInfo.value.floor &&
          router[8] === `男卫生间门牌`
        ) {
          itsme = true;
        }
      } else if (localInfo.value.type === "wcw") {
        if (
          router[6] === localInfo.value.floor &&
          router[8] === `女卫生间门牌`
        ) {
          itsme = true;
        }
      } else {
        if (
          router[6] === localInfo.value.floor &&
          router[7] === `${localInfo.value.code}`
        ) {
          itsme = true;
        }
      }
    } else if (router.length === 8 && router[7] !== "") {
      //发给指定区域
      console.info("发给指定区域:" + router[6] + "|" + router[7]);
      if (
        router[6] === localInfo.value.floor &&
        router[7] === localInfo.value.code
      ) {
        itsme = true;
      }
    } else if (router.length === 8) {
      //发给指定楼层
      console.info("发给指定楼层:" + router[6]);
      if (router[6] === localInfo.value.floor) {
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
      }
      if (cw.action === "fullscreen") {
        console.info("全屏");
      }
      if (cw.action === "bind") {
        console.info("绑定");
        localStorage.clear();
        location.reload();
      }
    }
  }
});
const stopTimer = (time) => {
  if (time) {
    clearInterval(time);
    time = null;
  }
};
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

    topic = `/iot/status/pad/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${padObj.value.name}`;
    console.info(topic, "aaaaa");
    publish(topic, JSON.stringify(pad));
  }
};
onMounted(() => {
  const data = localStorage.getItem("data");
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

    localInfo.value = JSON.parse(data);
    localStorage.setItem("data", JSON.stringify(localInfo.value));
    setBg();
    subscribe(
      `/iot/setting/device/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
    );
    subscribe(
      `/iot/status/areaairsensor/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
    );
    subscribe("/wallpad/outside");
    subscribe(`/iot/action/pad/HGH-WC/#`);
  } else {
    subscribe("/iot/setting/structure/result");
    publish("/iot/setting/get/structure");
    dialogFormVisible.value = true;
    console.info("没有本地数据" + dialogFormVisible);
  }
  timer1.value = setInterval(link, 30000);
});
onUnmounted(() => {
  unsubscribe("/wallpad/outside");
  unsubscribe(
    `/iot/setting/device/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
  );
  unsubscribe("/iot/setting/structure/result");
  unsubscribe(`/iot/action/pad/HGH-WC/#`);
  unsubscribe(
    `/iot/status/areaairsensor/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
  );
  if (timer1) {
    stopTimer(timer1);
  }
});
</script>

<style lang="scss" scoped>
.continer {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  :deep(.el-drawer__header) {
    display: none;
  }
  :deep(.el-drawer__body) {
    padding: 0;
  }
  :deep(.el-dialog__title) {
    color: #fff;
  }
  :deep(.el-select-dropdown__wrap) {
    max-height: 350px !important;
  }
  .shdow {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(
      180deg,
      rgba(30, 30, 30, 0.5) 0%,
      rgba(30, 30, 30, 0.7) 46.82%,
      #1e1e1e 100%
    );
  }
  .header {
    position: absolute;
    top: 0;
    height: 148px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    .logo img {
      width: 150px;
    }
  }
  .content {
    width: 100%;
    padding: 0 40px;
    position: absolute;
    top: 220px;
    display: flex;
    .title-num {
      text-align: left;
      color: #fff;
      font-weight: 500;
      position: relative;
      :nth-child(1) {
        font-size: 234px;
      }
      :nth-child(2) {
        font-size: 84px;
      }
      :nth-child(3) {
        font-size: 44px;
        font-weight: 400;
        line-height: 56.67px;
        text-align: left;
        position: absolute;
        top: 20px;
        left: 335px;
      }
      :nth-child(4) {
        font-size: 36.08px;
        font-weight: 400;
        line-height: 50.51px;
        color: #fff;
        margin-left: 16px;
      }
    }
    .divider {
      position: absolute;
      bottom: 45px;
      left: 445px;
      opacity: 0.3;
      :deep(.el-divider--vertical) {
        height: 105px;
        border-left: 1px solid #fff;
      }
    }
    .shidu {
      position: absolute;
      bottom: 36px;
      left: 485px;
      color: #fff;
      .title {
        font-size: 26px;
        height: 36px;
        display: flex;
        align-items: center;
        opacity: 0.6;

        img {
          display: block;
          width: 26px;
          height: 26px;
          margin-right: 8px;
        }
      }
      .title-num1 {
        font-size: 52px;
        margin-top: 10px;
      }
    }
    .line {
      position: absolute;
      bottom: -160px;
      left: 688px;
      img {
        display: block;
        width: 52px;
        height: 562px;
      }
    }
  }
  .hint {
    width: 360px;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -180px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
