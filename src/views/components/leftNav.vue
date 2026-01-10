<style scoped lang="scss">
.left-nav-box {
  background: rgba(26, 33, 48, 1);
  padding: 10px 0;
  position: relative;
  .box {
    color: rgba(255, 255, 255, 0.85);
    font-size: 20px;
    border-right: 4px solid rgb(26, 33, 48);
    height: 48px;
    margin: 42px 0;
    .txt {
      letter-spacing: 4px;
    }
    .img-box {
      width: 48px;
      height: 48px;
      margin-right: 20px;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .active {
    opacity: 1;
    color: #ed8733;
    border-right: 4px solid #ed8733;
    box-sizing: border-box;
  }
  .back-btn {
    width: 180px;
    height: 64px;
    font-size: 20px;
    position: absolute;
    bottom: 60px;
    left: 20px;
    background: linear-gradient(
      96.86deg,
      #607594 3.4%,
      rgba(96, 117, 148, 0.4) 12.25%,
      rgba(53, 70, 96, 0.4) 77%,
      #354660 94.45%
    );
    border-radius: 16px;
    &::before {
      content: "";
      display: inline-block;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      border-radius: 16px;
      position: absolute;
      top: 1px;
      left: 1px;
      background-image: linear-gradient(
        96.54deg,
        #2e3a4d 3.38%,
        #263245 95.54%
      );
    }
    .icon {
      margin-right: 8px;
      width: 24px;
      height: 24px;
    }
  }
  .chahua {
    width: 195px;
    height: auto;
    font-size: 20px;
    position: absolute;
    bottom: 160px;
    left: 0;
  }
}
</style>
<script setup>
const props = defineProps({
  data: Object,
  active: {
    type: [String, Number],
    default: 0,
  },
});
const { active, data } = toRefs(props);
let list = ref([
  { img: icon1, imgActive: icon1Active, txt: "行政服务" },
  { img: icon2, imgActive: icon2Active, txt: "室内环境" },
  { img: icon3, imgActive: icon3Active, txt: "照明空调", txtBefore: "" },
  { img: icon4, imgActive: icon4Active, txt: "空间使用" },
  // {img:icon5,imgActive:icon5Active,txt:'能源消耗'},
  { img: icon6, imgActive: icon6Active, txt: "关于智控", txtAfter: "" },
]);
if (props?.data?.obj?.floor === "54F") {
  list.value.splice(3, 1);
}
const emit = defineEmits(["clickChild"]);
const change = function (e) {
  emit("clickChild", e);
};
</script>
<script>
import icon1 from "@/assets/images/icon1.png";
import icon2 from "@/assets/images/icon2.png";
import icon3 from "@/assets/images/icon3.png";
import icon4 from "@/assets/images/icon4.png";
import icon5 from "@/assets/images/icon5.png";
import icon6 from "@/assets/images/icon6.png";
import icon1Active from "@/assets/images/icon1Active.png";
import icon2Active from "@/assets/images/icon2Active.png";
import icon3Active from "@/assets/images/icon3Active.png";
import icon4Active from "@/assets/images/icon4Active.png";
import icon5Active from "@/assets/images/icon5Active.png";
import icon6Active from "@/assets/images/icon6Active.png";
import back from "@/assets/images/back.png";
import qsj from "@/assets/images/chahuaJun.png";
</script>
<template>
  <div class="left-nav-box">
    <div
      class="box flex-row align-center justify-center"
      :class="[active === index ? 'active' : '']"
      @click="change(index)"
      v-for="(item, index) in list"
      :key="index"
    >
      <div class="img-box">
        <img
          class="img"
          style="width: auto; height: auto"
          :src="active === index ? item.imgActive : item.img"
        />
      </div>
      <div class="txt">
        <span style="color: #ea791b">{{ item.txtBefore }}</span
        >{{ item.txt }}<span style="color: #ea791b">{{ item.txtAfter }}</span>
      </div>
    </div>
    <img
      class="chahua"
      :src="qsj"
      v-if="!['52F', '53F', '54F'].includes(data.obj.floor)"
    />
    <div
      @click="change(-1)"
      class="back-btn flex-row align-center justify-center"
    >
      <div class="flex-row align-center justify-center" style="z-index: 2">
        <img class="icon" :src="back" /> 返回首页
      </div>
    </div>
  </div>
</template>
