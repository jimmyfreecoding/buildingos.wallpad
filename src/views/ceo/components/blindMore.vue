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
        <div class="action" v-for="k in item.children" :key="k.name">
          <div class="bulian">
            <img :src="k.name === '布帘' ? bulian : shalian" alt="" />
            <p>{{ k.name }}</p>
          </div>
          <div
            v-for="i in k.actions"
            :class="{
              btn: true,
              down: downType === item.name + k.name + i.action ? true : false,
            }"
            :key="i.action"
            @touchstart="
              handleDownCommon(
                $event,
                item.name,
                k.name,
                i.action,
                k.id,
                'down'
              )
            "
            @touchend="
              handleDownCommon($event, item.name, k.name, i.action, k.id, 'up')
            "
          >
            <img :src="blindIcon[i.action]" alt="" />
            <p>
              {{ i.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import open from "@/assets/images/open.png";
// @ts-ignore
import close from "@/assets/images/close.png";
// @ts-ignore
import pause from "@/assets/images/pause.png";
// @ts-ignore
import bulian from "@/assets/images/bulian.png";
// @ts-ignore
import shalian from "@/assets/images/shalian.png";
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
  id: string,
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
      const name = blindSource.value?.find((x) => x.code === id)?.name;
      publish(
        `/iot/action/blind/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${name}`,
        JSON.stringify({ action: type })
      );
      publish(
        `/iot/action/blind/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}/${name}`,
        JSON.stringify({ action: "status" })
      );
    }
    downType.value = "";
  }
};
getMessage((topic, message) => {
  if (
    topic.indexOf(
      `/iot/setting/device/HGH-WC/${localInfo.value.floorarea}/${localInfo.value.floor}/${localInfo.value.code}`
    ) !== -1
  ) {
    let devices = JSON.parse(message);
    blindSource.value = devices?.blind ?? [];
    const arr = devices.blind
      ?.map((x) => {
        const [num, position, type] = x.name.split("_");
        return {
          name: `窗帘${!position ? `` : position}`,
          children: [
            {
              name: type,
              id: x?.code,
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
            },
          ],
        };
      })
      .filter(Boolean);
    if (arr.length) {
      const mergedData = arr.reduce((acc, curr) => {
        const existingItem = acc.find((item) => item.name === curr.name);
        if (existingItem) {
          existingItem.children = existingItem?.children?.concat(curr.children);
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);
      blinds.value = mergedData;
      if (blinds.value.length > 1) {
        blinds.value.sort((a, b) => {
          const order = ["窗帘左", "窗帘中", "窗帘右"];
          let nameA = a.name;
          let nameB = b.name;
          let indexA = order.indexOf(nameA);
          let indexB = order.indexOf(nameB);

          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          } else if (indexA !== -1) {
            return -1;
          } else if (indexB !== -1) {
            return 1;
          } else {
            return a.name.localeCompare(b.name);
          }
        });
      }
      blinds.value.forEach((item) => {
        item.children.sort((a, b) =>
          a.name === "布帘" ? -1 : b.name === "布帘" ? 1 : 0
        );
      });
    }
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
  }
});
</script>

<style scoped lang="scss">
.blind-more {
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
      height: 280px;
      background: #5d5d5d33;
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
        width: 340px;
        height: 80px;
        border-radius: 16px;
        background: #ffffff1a;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        .bulian {
          width: 52px;
          height: 56px;
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
            line-height: 20px;
          }
        }
        .down {
          background: rgba(0, 0, 0, 0.3) !important;
        }
        .btn {
          width: 82.67px;
          height: 60px;
          border-radius: 8px;
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
            font-size: 14px;
            color: #fff;
            line-height: 22px;
          }
        }
      }
    }
  }
}
</style>
