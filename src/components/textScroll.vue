
<template>
    <div class="scrolling-text">{{ text1 }}</div>
</template>
<script setup>
  const props = defineProps({
    data: {
      type: Object,
      default: {}
    },
  })
  const text1 = ref('Hello，ZEEKRer！当前区域已装载环境感知AI算法和11个传感器，提供智能化L5级别能力，环境已达到人体舒适标准')

//   中控屏的文案
//
//   Hello，ZEEKRer！早上好！（下午好！/ 晚上好！）
//   当前区域已装载环境感知AI算法和XX个传感器，提供智能化L5级别能力，环境已达到人体舒适标准
//
//   Hello，ZEEKRer！中午好！
// 当前为午休模式，环境已达到人体舒适标准，午睡一下，精神翻倍！
</script>
<style>
.scrolling-text {
  display: block; /* 或者 inline, inline-block */
  white-space: nowrap; /* 确保文本不换行 */
  overflow: hidden; /* 隐藏超出容器部分的文本 */
  animation: scroll 30s linear infinite; /* 应用滚动动画 */
  font-size: 40px;
}
 
@keyframes scroll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
  </style>
  