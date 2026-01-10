<style scoped lang="scss">
.left-box-box {
  width: 100%;
  height: 100%;
  padding: 20px 40px;
  .content {
    width: calc(100%);
    min-height: 196px;
    padding: 0px 24px 24px 24px;
    margin-bottom: 60px;
    border-radius: 16px;
    background: #5d5d5d33;
    margin-top: 20px;
    overflow: hidden;
    .title {
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      text-align: left;
      color: #fff;
      opacity: 0.85;
      clear: both;
      margin: 32px 0 16px 0;
    }
    .serice {
      gap: 24px;
      flex-wrap: wrap;
      .serice-item {
        width: calc(50% - 12px);
        flex-wrap: wrap;
        height: 196px;
        gap: 20px;
        border-radius: 14px;
        position: relative;
        padding: 0 20px;
        overflow: hidden;
        background: #ffffff1a;
        .erweima {
          width: 148px;
          height: 148px;
        }
        .txt-box {
          margin-left: 40px;
        }
        .txt1 {
          font-size: 28px;
          color: #fff;
        }
        .txt2 {
          font-size: 20px;
          color: #fff;
          opacity: 0.45;
          margin-bottom: 20px;
        }
        .txt3 {
          font-size: 22px;
          color: #fff;
          opacity: 0.65;
          margin-bottom: 14px;
        }
        .txt4 {
          font-size: 14px;
          color: #fff;
          opacity: 0.45;
        }
        .bgService {
          width: 200px;
          height: 190px;
          position: absolute;
          right: -20px;
          bottom: -30px;
        }
        .txt {
          font-size: 18px;
        }
      }

      .close {
        background-image: linear-gradient(
          96.08deg,
          #3d4d65 5.78%,
          rgba(63, 79, 108, 0) 22.99%,
          rgba(63, 79, 108, 0) 75.06%,
          #2c3850 91.49%
        );
        &::before {
          content: "";
          display: inline-block;
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          border-radius: 16px;
          position: absolute;
          top: 1px;
          left: 1px;
          border-radius: transparent;
          background: #1a2130 !important;
        }
      }
    }
  }
  .hujiu-item {
    width: calc(100% - 40px);
    margin-left: 20px;
    height: 296px;
    gap: 20px;
    border-radius: 14px;
    position: relative;
    padding: 0 20px;
    overflow: hidden;
    background: #263041;
    .erweima {
      width: 310px;
      height: 310px;
    }
    .txt-box {
      margin-left: 40px;
    }
    .txt1 {
      font-size: 22px;
      color: #fff;
      opacity: 0.65;
      line-height: 38px;
    }
    .txt2 {
      font-size: 22px;
      color: #fff;
      opacity: 0.8;
      line-height: 34px;
    }
    .txt3 {
      font-size: 22px;
      color: #fff;
      opacity: 0.4;
    }
    .bgService {
      width: 300px;
      height: auto;
      position: absolute;
      right: 0px;
      bottom: 0px;
    }
    .txt {
      font-size: 18px;
    }
  }
}
</style>

<style lang="scss">
.dialog-footer {
  margin: 0px 0 40px 0 !important;
  padding: 0 20px;
}
.huliu-txt {
  font-size: 20px;
  font-weight: 400;
  text-align: left;
  color: #fff;
  opacity: 0.65;
  margin-top: 16px;
  text-align: left;
  line-height: 28px;
  opacity: 0.45;
  padding: 0 30px;
}
.el-dialog__header {
  text-align: center;
  font-size: 24px;
}
</style>
<script setup>
import IndexTitle from "@/components/indexTitle.vue";
import bgService1 from "@/assets/images/bgService1.png";
import bgService2 from "@/assets/images/bgService2.png";
import qqj from "@/assets/images/shqqj_new.png";
import fmanage3 from "@/assets/images/B8floorManager.jpg";
import ceoManage from "@/assets/images/ceo_manage.jpg";

import { defineEmits } from "vue";
const emit = defineEmits(["childFun"]);
const props = defineProps({
  data: Object,
  disabledSos: Boolean,
});
const dialogSos = ref(false);
const adminInfo = computed(() => {
  const {
    obj: { floorarea },
  } = props.data || {};

  const urlMap = {
    B8: fmanage3,
  };

  const phoneMap = {
    B8: "13818655183",
  };
  if (["53F", "52F", "54F"].includes(props.data.obj.floor)) {
    return {
      url: ceoManage,
      phone: "13777586082",
    };
  }
  return {
    url: urlMap[floorarea],
    phone: phoneMap[floorarea],
  };
});
const sosVisible = () => {
  dialogSos.value = false;
};

defineExpose({
  sosVisible,
});

const setSos = () => {
  dialogSos.value = false;
  const timer = setTimeout(() => {
    emit("childFun", true);
    clearTimeout(timer);
  }, 200);
};
</script>
<template>
  <div class="left-box-box">
    <div class="content">
      <IndexTitle
        title="综合服务"
        style="color: #fff; font-size: 26px; font-weight: 600; margin-left: 0"
      ></IndexTitle>
      <div class="serice flex-row align-center">
        <div class="serice-item flex-row align-center">
          <div
            class="flex-row align-center"
            style="position: relative; z-index: 2; width: 100%; height: 100%"
          >
            <img
              class="erweima"
              :src="`/wallpad/images/${props.data.obj.floor}_${props.data.obj.code}.png`"
            />
            <div class="txt-box">
              <div class="txt1">报事报修</div>
              <div class="txt2">Scan for admin service</div>
              <div class="txt3">故障/清洁/维修“码上报单”</div>
              <div class="txt4">请使用企业微信扫描二维码</div>
            </div>
            <img class="bgService" :src="bgService1" />
          </div>
        </div>
        <div class="serice-item flex-row align-center">
          <div
            class="flex-row align-center"
            style="position: relative; z-index: 2; width: 100%; height: 100%"
          >
            <img class="erweima" :src="qqj" />
            <div class="txt-box">
              <div class="txt1">轻轻君</div>
              <div class="txt2">administrative service</div>
              <div class="txt3">行政服务咨询 Tel:18667086452</div>
              <div class="txt4">请使用企业微信扫描二维码</div>
            </div>
            <img class="bgService" :src="bgService2" />
          </div>
        </div>
        <div class="serice-item flex-row align-center">
          <div
            class="flex-row align-center"
            style="position: relative; z-index: 2; width: 100%; height: 100%"
          >
            <img class="erweima" :src="adminInfo?.url" />
            <div class="txt-box">
              <div class="txt1">楼层管家</div>
              <div class="txt2">floor butler</div>
              <div class="txt3">
                有问题直接找楼长 Tel:{{ adminInfo?.phone }}
              </div>
              <div class="txt4">请使用企业微信扫描二维码</div>
            </div>
            <img class="bgService" :src="bgService2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
