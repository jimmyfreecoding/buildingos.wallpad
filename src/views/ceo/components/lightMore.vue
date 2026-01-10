<template>
  <div class="light-more">
    <div class="title">
      <div>更多控制</div>
      <div class="back" @click="emit('back')">
        <img src="@/assets/images/fanhui.png" alt="" />返回
      </div>
    </div>
    <div class="diaodeng">
      <div class="box" v-for="item in ddList" :key="item.name">
        <p>{{ item.name }}</p>
        <div
          @click="handleDd(item)"
          :style="
            item.status === 'on'
              ? 'background: #ff5841'
              : 'background: #FFFFFF33;'
          "
        >
          <img src="@/assets/images/off.png" alt="" />
        </div>
      </div>
    </div>
    <div class="tongdeng">
      <div class="box" v-for="item in tdList" :key="item.name">
        <div class="name">
          <div>{{ item.name }}</div>
          <div>{{ Math.round((item.status.ajust / 255) * 100) }}%</div>
        </div>
        <div class="slider" style="width: 100%; margin-top: 20px">
          <el-slider
            v-model="item.status.ajust"
            :show-tooltip="false"
            :min="0"
            :max="255"
            :step="1"
            @change="handleDlightTd(item)"
          />
          <img
            class="img1"
            :src="item.status.ajust > 0 ? gaoliang : diliang"
            alt=""
          />
          <img
            class="img2"
            :src="item.status.ajust > 0 ? gaoliang : diliang"
            alt=""
          />
          <div class="scale">
            <p>0%</p>
            <p>50%</p>
            <p>100%</p>
          </div>
        </div>
        <div
          @click="onDlight(item)"
          class="btn"
          :style="
            item.status.status === 'on'
              ? 'background: #ff5841'
              : 'background: #FFFFFF33;'
          "
        >
          <img src="@/assets/images/off.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import diliang from "@/assets/images/diliang.png";
// @ts-ignore
import gaoliang from "@/assets/images/diliang.png";
import { logClk } from "@/utils/logClk";
const subscribe = inject("subscribe"); // 订阅信息F
const unsubscribe = inject("unsubscribe"); // 订阅信息
const getMessage = inject("getMessage"); // 订阅信息
const publish = inject("publish"); // 订阅信息
const emit = defineEmits(["back", "result"]);
const localInfo = ref<any>({});
const ddList = ref([]);
const tdList = ref([]);
const handleDlightTd = (item: any) => {
  emit("result");
  publish(
    `/iot/action/dlight/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${item.name}`,
    JSON.stringify({
      ajust: item.status.ajust,
      action: item.status.ajust === 0 ? "off" : "on",
    })
  );
  setTimeout(() => {
    publish(
      `/iot/action/dlight/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${item.name}`,
      JSON.stringify({ action: "status" })
    );
  }, 500);
};
const handleDd = (item: any) => {
  emit("result");
  const status = item.status === "on" ? "off" : "on";
  const names = item.name;

  publish(
    `/iot/action/light/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${names}`,
    JSON.stringify({ action: status })
  );

  // log 日志
  logClk({
    sourceName: `/运营/楼宇智控 10 寸/照明/单控`,
    deviceType: "light",
    actionTopic: `/iot/action/light/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${names}`,
    actionData: JSON.stringify({ action: status }),
    spaceCode: localInfo.value.space,
    floorCode: localInfo.value.floor,
    floorAreaCode: localInfo.value.floorarea,
    areaCode: localInfo.value.code,
  });

  setTimeout(() => {
    publish(
      `/iot/action/light/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`,
      JSON.stringify({ action: "status" })
    );
  }, 500);
};
const onDlight = (item: any) => {
  emit("result");
  const action = item.status.status === "on" ? "off" : "on";
  publish(
    `/iot/action/dlight/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${item.name}`,
    JSON.stringify({ action })
  );
  publish(
    `/iot/action/dlight/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${item.name}`,
    JSON.stringify({ action: "status" })
  );
};
getMessage((topic, message) => {
  if (
    topic.indexOf(
      `/iot/setting/device/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
    ) !== -1
  ) {
    let devices = JSON.parse(message);
    ddList.value =
      devices?.light?.map((x) => {
        return {
          ...x,
          status: JSON.parse(x.status)?.status,
        };
      }) ?? [];

    tdList.value =
      devices?.dlight?.map((x) => {
        return {
          ...x,
          status: JSON.parse(x.status),
        };
      }) ?? [];
  }
  if (
    topic.indexOf(
      `/iot/status/light/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
    ) !== -1
  ) {
    let status = JSON.parse(message);
    ddList.value.forEach((l) => {
      if (l.code === status[0].code) {
        l.status = status[0].status.status;
      }
    });
  }
  if (
    topic.indexOf(
      `/iot/status/dlight/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
    ) !== -1
  ) {
    let status = JSON.parse(message);
    tdList.value.forEach((l) => {
      if (l.code === status[0].code) {
        l.status = status[0]?.status;
      }
    });
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
      `/iot/status/light/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/#`
    );
    subscribe(
      `/iot/status/dlight/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/#`
    );
  }
});
onUnmounted(() => {
  unsubscribe(
    `/iot/status/light/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/#`
  );
  unsubscribe(
    `/iot/status/dlight/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/#`
  );
});
</script>

<style scoped lang="scss">
.light-more {
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  padding: 40px;
  overflow-y: auto;
  .title {
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 22px;
    font-weight: 600;
    line-height: 40px;
    img {
      display: block;
      width: 20px;
      height: 20px;
      margin-right: 2px;
    }
    .back {
      width: 88px;
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
  .diaodeng {
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    .box {
      width: 380px;
      height: 160px;
      background: #5d5d5d33;
      padding: 20px;
      position: relative;
      border-radius: 16px;
      margin-top: 20px;
      p {
        color: #fff;
        font-size: 26px;
        font-weight: 500;
        line-height: 40px; /* 153.846% */
      }
      div {
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
      }
    }
  }
  .tongdeng {
    display: flex;
    flex-flow: wrap;
    // gap: 19px;
    justify-content: space-between;
    .box {
      // width: 247px;
      width: 380px;
      height: 220px;
      padding: 20px;
      border-radius: 16px;
      background: rgba(93, 93, 93, 0.2);
      margin-top: 20px;
      position: relative;
      .name {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        width: 100%;
        height: 40px;
        :nth-child(1) {
          font-size: 26px;
          font-weight: 600;
          color: #fff;
        }
        :nth-child(2) {
          font-size: 24px;
          font-weight: 500;
          color: #d3d3d3;
          line-height: 30px;
        }
      }

      .btn {
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
      }
    }
  }
  .dengdai {
    width: 100%;
    height: 220px;
    border-radius: 16px;
    padding: 20px;
    background: #5d5d5d33;
    margin-top: 20px;
    position: relative;
    .name {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 100%;
      height: 40px;
      :nth-child(1) {
        font-size: 26px;
        font-weight: 600;
        color: #fff;
      }
      :nth-child(2) {
        font-size: 24px;
        font-weight: 500;
        color: #d3d3d3;
        line-height: 30px;
      }
    }
    .btn {
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
    }
  }
  .slider {
    width: 100%;
    position: relative;
    .scale {
      width: 100%;
      color: #878787;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      display: flex;
      justify-content: space-between;
    }
    img {
      display: block;
      width: 20px;
      height: 20px;
      position: absolute;
    }
    .img1 {
      left: 10px;
      top: 10px;
    }
    .img2 {
      right: 10px;
      top: 10px;
    }
    :deep(.el-slider) {
      height: 40px;
    }
    :deep(.el-slider__runway) {
      background-color: #545454 !important;
      height: 40px;
      border-radius: 8px;
    }
    :deep(.el-slider__bar) {
      background: #545454;
      height: 39px;
      border-radius: 8px 0 0 8px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.855) 0%,
        rgba(255, 249, 230, 0.9) 100%
      );
      box-shadow: 0px 0px 10.6px 2px #fff0b8cf;
      box-shadow: 0px -1px 0px 0px #fffdf4;
      top: 1px !important;
    }
    :deep(.el-slider__button-wrapper) {
      top: 0px;
      height: 40px;
    }
    :deep(.el-slider__button) {
      width: 5px;
      height: 40px;
      border: none;
      border-radius: 19px;
      box-shadow: 0px 4px 4px 0px #00000026;
    }
  }
}
</style>
