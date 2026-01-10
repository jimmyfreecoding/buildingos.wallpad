<template>
  <div class="devices" id="devices">
    <div class="beijing">
      <img src="@/assets/images/devices_background.png" alt="" />
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="智能调控" name="first"></el-tab-pane>
      <el-tab-pane label="关于智控" name="second"> </el-tab-pane>
    </el-tabs>
    <DeviceControl v-if="activeName == 'first'" />
    <Introduce v-if="activeName == 'second'" />
    <div class="hint" @click.stop="emit('clickBack')">
      <!-- <el-icon size="28px" color="#fff"><ArrowUp /></el-icon> -->
      <img src="@/assets/images/backhome.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import DeviceControl from "./deviceControl.vue";
import Introduce from "./introduce.vue";
const emit = defineEmits(["clickBack"]);
const activeName = ref("first");
const handleClick = (tab: any, event: any) => {
  console.log(tab, event);
};
</script>

<style scoped lang="scss">
.devices {
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, #0e0e0e, #0e0e0e),
    radial-gradient(
      78.48% 101.62% at 50% 0%,
      rgba(255, 123, 67, 0.65) 0%,
      rgba(0, 0, 0, 0.0065) 100%
    );
  .beijing {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .hint {
    width: 360px;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -180px;
    z-index: 1;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<style lang="scss" scoped>
:deep(.el-tabs) {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep(.el-tabs__active-bar) {
  background-color: #ff5841;
  width: 40px !important;
  height: 3px;
  margin-left: 23px;
}
:deep(.el-tabs__nav-scroll) {
  overflow: visible;
}
:deep(.el-tabs__item) {
  color: #ffffff4d;
  font-size: 22px;
  line-height: 40px;
  font-weight: 600;
}
:deep(.is-active) {
  color: #fff;
}
:deep(.el-tabs__nav-wrap::after) {
  background-color: transparent !important;
}
:deep(.el-message) {
  background-color: #ffffffa6;
  border: none;
}
:deep(.el-message .el-message-icon--warning) {
  color: #3e5fe5;
}
</style>
