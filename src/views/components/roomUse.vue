<style scoped lang="scss">
.left-box-box {
  width: 900px;
  height: 100%;
  background: #202838;
  padding: 20px 40px;
  .content {
    width: calc(100% - 40px);
    margin-left: 20px;
    padding: 24px;
    margin-bottom: 20px;
    border-radius: 16px;
    position: relative;
    background-image: linear-gradient(
      112.88deg,
      #52647d 4.92%,
      #34435b 22.21%,
      #313f56 35.62%,
      #2e3b51 55.07%,
      #314157 74.54%
    );
    &::before {
      content: "";
      display: inline-block;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 16px;
      background: #263041;
    }

    .rooms {
      gap: 24px;
      flex-wrap: wrap;
      .rooms-item {
        font-size: 32px;
        height: 88px;
        flex: 1 0 354px;
        flex-wrap: wrap;
        border-radius: 14px;
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
          border-radius: 14px;
          background: #54647de0;
        }
        &:last-child {
          flex: 0 0 354px;
        }
        .txt {
          font-size: 32px;
        }
      }
      .bg-active {
        background: #f95c2a88 !important;
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
          background: #f95c2a88;
        }
      }
      .color-green {
        color: #22b9a5;
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
  console.log(props.data.roomoSensorObj, '>>>>>>>>>>>web获取数据')
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
    <IndexTitle title="会议室实时状态"></IndexTitle>
    <div class="content">
      <div class="rooms flex-row align-center justify-between">
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
    </div>
    <IndexTitle style="margin-top: 40px" title="厕卫实时状态"></IndexTitle>
    <div class="content">
      <div
        class="rooms flex-row align-center justify-around"
        v-if="obj.floor !== '34F' && obj.floor !== '35F'"
      >
        <div
          class="rooms-item flex-row align-center justify-between"
          :class="[
            showText(props.data.wcmanStatusObj) === '无人' ? 'bg-black' : '',
          ]"
        >
          <div
            style="width: 100%; position: relative; z-index: 2"
            class="padding20 flex-row align-center justify-between"
          >
            <div class="txt">男卫</div>
            <div class="txt">{{ showText(props.data.wcmanStatusObj) }}</div>
          </div>
        </div>

        <div
          class="rooms-item flex-row align-center justify-between"
          :class="[
            showText(props.data.wcwomanStatusObj) === '无人' ? 'bg-black' : '',
          ]"
        >
          <div
            style="width: 100%; position: relative; z-index: 2"
            class="padding20 flex-row align-center justify-between"
          >
            <div class="txt">女卫</div>
            <div class="txt">{{ showText(props.data.wcwomanStatusObj) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
