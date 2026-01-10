<style scoped lang="scss">
.tabs-nav {
  width: 680px;
  height: 60px;
  background: #2e3a4d;
  border-radius: 30px;
}
.mini.tabs-nav {
  width: 371px;
  height: 48px;
  background: #263041;
  border-radius: 24px;
  font-size: 18px;
}
.tabs-item {
  width: 340px;
  height: 60px;
  line-height: 60px;
  border-radius: 30px;
  text-align: center;
  top: 0px;
  z-index: 1;
  font-family: DingTalk;
  font-weight: normal;
  font-size: 20px;
  color: #ffffff;
}
.mini .tabs-item {
  width: 50%;
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  border-radius: 24px;
}
.active {
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
    border-radius: 30px;
    background-image: linear-gradient(96.9deg, #4a5a76 8.02%, #34445e 88%);
  }
}
.mini .active {
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
    border-radius: 24px;
    background-image: linear-gradient(96.9deg, #4a5a76 8.02%, #34445e 88%);
  }
}
</style>
<script setup>
const props = defineProps({
  tabList: Array,
  activeName: Number,
  size: String,
});
const { tabList, activeName } = toRefs(props);
const emit = defineEmits(["change"]);
</script>

<template>
  <div class="tabs-nav flex-row" :class="size">
    <div
      class="tabs-item"
      v-for="(item, index) in tabList"
      :key="index"
      :class="[index == activeName ? 'active' : '']"
    >
      <div
        style="position: relative; z-index: 2"
        @click="emit('change', index)"
      >
        <slot></slot> {{ item }}
      </div>
    </div>
  </div>
</template>
