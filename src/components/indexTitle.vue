<style scoped lang="scss"> 
.index-title-box{
  font-size: 26px;
  letter-spacing: 2px;
  margin: 20px 20px 20px 26px;
  .img-box{
    width:48px;
    height:48px;
    .img{
      width:40px;
      height:40px;
      margin-right:18px;
    }
  }
  .title-before{
    color:#EA791B;
  }
}
</style>
<script setup>

const props = defineProps({
  title:String,
  titleBefore:String,
  img:{
    type:String,
    default:''
  }
})
const {title,img} =toRefs(props)
</script>

<template>
  <div class="index-title-box flex-row align-center">
    <div v-if="!!img" class="img-box flex-row align-center justify-center">
      <img fit="cover" class="img"  :src="img"/>
    </div>
    <div class="txt"><span class="title-before"> {{ titleBefore }}</span>{{title}}</div>
</div>
</template>