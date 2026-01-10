<style scoped lang="scss"> 
.left-box-box{
  width: 100%;
  height: 100%;
  background: #202838;
  padding:20px 40px;
  .content{
    width:100%;
    padding:20px 13px;
    margin-bottom:20px;
    border-radius: 16px;
    position: relative;
    background-image: linear-gradient(112.88deg, #52647D 4.92%, #34435B 22.21%, #313F56 35.62%, #2E3B51 55.07%, #314157 74.54%);
    &::before{
      content:'';
      display: inline-block;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      position: absolute;
      top:1px;
      left:1px;
      border-radius: 16px;
      background: #263041;
    }

    .rooms{
      gap:16px;
      flex-wrap: wrap;
      .rooms-item{
        font-size: 32px;
        width: 354px;
        height:88px;
        flex:0 0 354px;
        flex-wrap: wrap;
        border-radius: 14px;
        position: relative;
        background-image: linear-gradient(96.08deg, #607594 5.78%, rgba(63, 79, 108, 0) 22.99%, rgba(63, 79, 108, 0) 75.06%, #3F4F6C 91.49%);
       &::before{
          content:'';
          display: inline-block;
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          position: absolute;
          top:1px;
          left:1px;
          border-radius: 14px;
          background: #54647DE0;
        }
      .txt{
        font-size: 32px;
      }
     }
      .bg-active{
        background: #F95C2A88!important;
        border-radius: 14px;
        &::before{
          content:'';
          display: inline-block;
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          position: absolute;
          top:1px;
          left:1px;
          border-radius: 14px;
          background: #F95C2A88;
        }
      }
      .color-green{
        color:#22B9A5;
      }
    }
    
  }
}

</style>

<script setup>
import IndexTitle from '@/components/indexTitle.vue'
</script>
<script>
export default{
  data(){
    return{
      dialogVisible:false,
      currentrooms:0,//当前操作的灯的index
      dialogTxt:'确认关闭',
      roomsList:[
        {name:'2602',status:'空闲'}, 
        {name:'2602',status:'空闲'},
        {name:'2602',status:'使用中'}, 
        {name:'2602',status:'空闲'},
        {name:'2602',status:'空闲'}, 
        {name:'2602',status:'空闲'},
      ],
      wcList:[
        {name:'男卫',status:'空闲'}, 
        {name:'女卫',status:'全满'},
      ]
    }
  },
  methods:{
  }
 
}
</script>
<template>
  <div class="left-box-box">
    <IndexTitle title="能源消耗"></IndexTitle>
  </div>
</template>