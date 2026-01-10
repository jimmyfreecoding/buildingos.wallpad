<style scoped lang="scss">
.index-title-box {
  font-size: 32px;
  letter-spacing: 2px;
  .img-box {
    width: 40px;
    height: 40px;
    .img {
      width: 36px;
      height: 36px;
      margin-right: 18px;
    }
  }
  .title-before {
    color: #ea791b;
  }
  .txt {
    color: #fff;
  }
}
</style>
<script setup>
const props = defineProps({
  title: String,
  titleBefore: String,
  img: {
    type: String,
    default: "",
  },
});
const { title, img } = toRefs(props);
</script>

<template>
  <div class="index-title-box flex-row align-center">
    <div v-if="!!img" class="img-box flex-row align-center justify-center">
      <img fit="cover" class="img" :src="img" />
    </div>
    <div class="txt">
      <span class="title-before"> {{ titleBefore }}</span
      >{{ title }}
    </div>
  </div>
</template>
