<template>
  <div class="blind-more">
    <div class="title">
      <div>更多控制</div>
      <div class="back" @click="emit('back')">
        <img src="@/assets/images/fanhui.png" alt="" />返回
      </div>
    </div>
    <div class="diaodeng">
      <div class="box" v-for="item in blinds" :key="item.name">
        <p>{{ item.name }}</p>
        <div style="display: flex; gap: 18px">
          <div
            class="action"
            v-for="k in item.actions"
            :key="k.name"
            :class="{
              down: downType === item.name + k.name + k.action ? true : false,
            }"
            @touchstart="
              handleDownCommon($event, item.name, k.name, k.action, 'down')
            "
            @touchend="
              handleDownCommon($event, item.name, k.name, k.action, 'up')
            "
            F
          >
            <img :src="blindIcon[k.action]" alt="" />
            <p>
              {{ k.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import open from "@/assets/images/chuanglian1.png";
// @ts-ignore
import close from "@/assets/images/chuanglian3.png";
// @ts-ignore
import pause from "@/assets/images/chuanglian2.png";
const props = defineProps({
  blind2Show: {
    type: String,
    default: "",
  },
});
const getMessage = inject("getMessage"); // 订阅信息
const publish = inject("publish"); // 订阅信息
const emit = defineEmits(["back"]);
const blindSource = ref([]);
const blindIcon = {
  up: open,
  pause: pause,
  down: close,
};
const blinds = ref([]);
const downType = ref("");
const startX = ref(0);
const startY = ref(0);
const localInfo = ref<any>({});
const handleDownCommon = (
  e: any,
  itemType: string,
  kType: string,
  type: string,
  action: string
) => {
  e.preventDefault();
  if (action === "down") {
    downType.value = itemType + kType + type;
    startX.value = e.changedTouches[0].clientX;
    startY.value = e.changedTouches[0].clientY;
  } else if (action === "up") {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    if (
      downType.value === itemType + kType + type &&
      Math.abs(startX.value - endX) < 10 &&
      Math.abs(startY.value - endY) < 10
    ) {
      console.log(
        `/iot/action/blind/HGH-WC/${localInfo.value.floorarea}/${
          localInfo.value.floor
        }/${
          props.blind2Show ? props.blind2Show : localInfo.value.code
        }/${itemType}`,
        JSON.stringify({ action: type })
      );
      publish(
        `/iot/action/blind/HGH-WC/${localInfo.value.floorarea}/${
          localInfo.value.floor
        }/${
          props.blind2Show ? props.blind2Show : localInfo.value.code
        }/${itemType}`,
        JSON.stringify({ action: type })
      );
    }
    downType.value = "";
  }
};
getMessage((topic, message) => {
  if (
    topic.indexOf(
      `/iot/setting/device/HGH-WC/${localInfo.value.floorarea}/${
        localInfo.value.floor
      }/${props.blind2Show ? props.blind2Show : localInfo.value.code}`
    ) !== -1
  ) {
    let devices = JSON.parse(message);
    blindSource.value = devices?.blind ?? [];
    blinds.value = devices.blind?.map((x) => {
      return {
        name: x.name,
        actions: [
          {
            action: "up",
            name: "打开",
          },
          {
            action: "pause",
            name: "暂停",
          },
          {
            action: "down",
            name: "关闭",
          },
        ],
      };
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
        areaCode: props.blind2Show ? props.blind2Show : JSON.parse(data).code,
      })
    );
  }
});
</script>

<style scoped lang="scss">
.blind-more {
  width: 100%;
  height: 100%;
  background: #202838;
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
      height: 180px;
      background: #263041;
      padding: 20px;
      border-radius: 16px;
      margin-top: 20px;
      p {
        color: #fff;
        font-size: 26px;
        font-weight: 500;
        line-height: 40px; /* 153.846% */
      }
      .action {
        width: 100px;
        height: 80px;
        border-radius: 16px;
        background: #ffffff1a;
        margin-top: 20px;
        display: flex;
        padding: 10px;
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
          line-height: 20px;
          margin-top: 6px;
        }
      }
      .down {
        background: rgba(0, 0, 0, 0.3) !important;
      }
    }
  }
}
</style>
