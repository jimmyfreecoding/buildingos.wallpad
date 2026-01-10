<template>
    <div class="lines">
    <Transition>
      <div
        class="proportion"
        :style="`width: ${percent}%;`"
      ></div>
    </Transition>
    </div>
  </template>
   
  <script>
  export default {
    name: 'Progress', //进度条
    props: {
      //初始值
      startValue: {
        type: Number,
        default: 0,
      },
      //结束值
      endValue: {
        type: Number,
        default: 100,
      },
      //动画时间
      duration: {
        type: Number,
        default: 1,
      },
    },
    data() {
      return {
        percent: 0,
      }
    },
    mounted() {
      this.percent = this.startValue >= this.endValue ? this.endValue : this.startValue
      this.progress()
    },
    methods: {
      progress(){
        const that = this
        let progress = this.startValue
        const endValue = this.endValue
        let time = this.duration * 1000 / (endValue - progress) //根据传入时间计算执行时间
        if(progress >= endValue) {
          progress = endValue
        }
        let clearInt = setInterval(function(){
          progress=progress+(1/100)
          if(progress >= endValue){
            progress = endValue
            clearInterval(clearInt);
          }
          that.percent = progress
        },time/100)
      },
    },
  }
  </script>
   
  <style lang="scss" scoped>
  .lines {
    width: 100%;
    height: 100%;
    position: relative;
    .proportion {
      background: #ffffff;
      height: 100%;
      position: absolute;
      opacity: 0.5;
    }
  }
  </style>
