<style scoped lang="scss">
.left-box-box {
  width: 100%;
  height: 100%;
  padding: 40px 40px;
  .content {
    width: calc(100% - 40px);
    padding: 24px;
    margin-bottom: 20px;
    border-radius: 16px;
    position: relative;
    background: #5d5d5d33;
    height: calc(100% - 96px);
    // &::before {
    //   content: "";
    //   display: inline-block;
    //   width: calc(100% - 2px);
    //   height: 100%;
    //   position: absolute;
    //   top: 1px;
    //   left: 1px;
    //   border-radius: 16px;
    //   background: #5d5d5d33;
    // }

    .rooms {
      gap: 24px;
      flex-wrap: wrap;
      .rooms-item {
        width: calc(50% - 12px);
        font-size: 32px;
        height: 88px;
        flex-wrap: wrap;
        border-radius: 14px;
        position: relative;
        color: #fff;
        &::before {
          content: "";
          display: inline-block;
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          position: absolute;
          top: 1px;
          left: 1px;
          border-radius: 14px;
          background: #5d5d5d33;
        }
        .txt {
          font-size: 32px;
        }
      }
      .bg-active {
        background: #ff5841 !important;
        border-radius: 14px;
        &::before {
          content: "";
          display: inline-block;
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          position: absolute;
          top: 1px;
          left: 1px;
          border-radius: 14px;
          background: #ff5841;
        }
      }
      .color-green {
        color: #22b9a5;
      }
    }
    .empty {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      font-weight: 400;
      line-height: 33.6px;
      color: #fff;

      img {
        width: 145.36px;
        height: 181.85px;
        margin-bottom: 20px;
      }
    }
  }
}
.padding20 {
  padding: 24px;
}
</style>

<script setup>
import IndexTitle from "@/components/indexTitle.vue";
const rooms = ref([]);
const props = defineProps({
  data: Object,
});
const obj = ref({});
const showStatus = (code) => {
  let returnStyle = "bg-active";
  let returnTitle = "使用中";
  console.log(props.data.roomoSensorObj, ">>>>>>>>>>>web获取数据");
  if (
    props.data.roomoSensorObj[code] &&
    props.data.roomoSensorObj[code]?.status
  ) {
    if (props.data.roomoSensorObj[code]?.online?.includes(1)) {
      if (!props.data.roomoSensorObj[code]?.status?.includes("busy")) {
        returnStyle = "";
        returnTitle = "空闲";
      } else if (props.data.roomoSensorObj[code]?.status?.includes("busy")) {
        returnStyle = "bg-active";
        returnTitle = "使用中";
      }
    } else {
      returnStyle = "";
      // returnTitle = "设备离线"
      returnTitle = "调试中";
    }
  } else {
    returnStyle = "";
    // returnTitle = "设备掉线"
    returnTitle = "调试中";
  }

  return [returnStyle, returnTitle];
};
const showText = (cwobj) => {
  let count = 0;
  let returnText = "空闲";
  const keys = Object.keys(cwobj);

  if (keys?.length > 0) {
    keys.forEach(function (t, i) {
      if (cwobj[t] == 1) {
        count++;
      }
    });
  }
  // console.info(count)
  if (count === 0) {
    returnText = "无人";
  } else if (count > 0 && count < keys.length) {
    returnText = "空闲";
  } else if (count === keys.length) {
    returnText = "满员";
  }
  // console.info(returnText )
  return returnText;
  // console.info(cwobj)
};
onMounted(() => {
  let data = localStorage.getItem("data");
  if (data) {
    let jsondata = JSON.parse(data);
    obj.value.code = jsondata.code;
    obj.value.floor = jsondata.floor;
    obj.value.floorarea = jsondata.floorarea;
    obj.value.type = jsondata.type;
    console.info(jsondata);
    //

    rooms.value = jsondata.spaceObj[jsondata.spaceIndex].floorArea[
      jsondata.floorareaIndex
    ].floor[jsondata.floorIndex].mettingRoom?.filter((x) => x.code != "M5205");
    console.log(rooms.value, "设备信息");

    // publish('/iot/setting/get/device',
    //     JSON.stringify({
    //       spaceCode:JSON.parse(data).space,
    //       floorAreaCode:JSON.parse(data).floorarea,
    //       floorCode:JSON.parse(data).floor,
    //       areaCode:JSON.parse(data).code,
    //     })
    // )
  }
});
</script>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      currentrooms: 0, //当前操作的灯的index
      dialogTxt: "确认关闭",
      roomsList: [
        { name: "2602", status: "空闲" },
        { name: "2602", status: "空闲" },
        { name: "2602", status: "使用中" },
        { name: "2602", status: "空闲" },
        { name: "2602", status: "空闲" },
        { name: "2602", status: "空闲" },
      ],
      wcList: [
        { name: "男卫", status: "空闲" },
        { name: "女卫", status: "全满" },
      ],
    };
  },
  methods: {},
};
</script>
<template>
  <div class="left-box-box">
    <div class="content">
      <IndexTitle
        v-if="rooms && rooms.length"
        title="会议室实时状态"
        style="color: #fff; margin-top: 0; margin-left: 0"
      ></IndexTitle>
      <div
        class="rooms flex-row align-center justify-between"
        v-if="rooms && rooms.length"
      >
        <div
          v-for="(item, index) in rooms"
          :key="index"
          class="rooms-item flex-row align-center justify-between"
          :style="{ marginRight: index == rooms.length - 1 ? 'auto' : '0' }"
          :class="showStatus(item.code)[0]"
        >
          <div
            style="width: 100%; position: relative; z-index: 2"
            class="padding20 flex-row align-center justify-between"
          >
            <div class="txt">
              {{ item.code.substring(1, item.code.length) }}
            </div>
            <div class="txt">{{ showStatus(item.code)[1] }}</div>
          </div>
        </div>
      </div>
      <div v-else class="empty">
        <img src="@/assets/images/kj.png" alt="" />
        <div>本楼层未设置会议室</div>
      </div>
    </div>
  </div>
</template>
