<style scoped lang="scss"> 
.left-box-box{
  width: 100%;
  height: 100%;
  background: #202838;
  padding:20px 40px;
  .img{
    width: 88px;
    height: 88px;
    margin-right: 20px;
  }
  .sos{
    .txt1{
      font-size: 22px;
      margin-top:14px;
    }
    .txt2{
      font-size: 20px;
      opacity: 0.8;
      margin-top:6px;
    }
  }
}
</style>
<script>
</script>
<template>
  <div class="left-box-box flex-row align-center justify-center">
    <div class="flex-row">
      <img class="img" src="@/assets/images/sos.png"/>
      <div class="sos">
        <div class="txt1">紧急呼叫中！安保人员正在前往此楼层</div>
        <div class="txt2">（0571）28098488</div>
      </div>
    </div>
  </div>
    
</template>