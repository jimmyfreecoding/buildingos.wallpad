<template>
  <div class="introduce">
    <div class="list">
      <div class="item" v-for="(item, index) in classList" :key="index">
        <div class="left">
          <img :src="item.img" alt="" />
          <img :src="zcjt" alt="" v-if="index < 4" />
        </div>
        <div class="right">
          <p>
            {{ item.title }}
          </p>
          <p
            :style="
              index === 0 ? 'color:#fff;opacity: 0.8;font-size: 20px' : ''
            "
          >
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>
    <img :src="jk" alt="" class="jk" />
    <div class="box">
      <div class="title">AI算法控制</div>
      <div class="text">
        极氪智慧楼宇按照智能化L5级标准建设，通过物联网数据中台可以完成30年的超长存储，通过数据进行机器学习，不断优化AI算法来完成L5级楼宇智能。
      </div>
      <img class="xuxian" src="@/assets/images/suanfa.png" alt="" />
      <div class="line"></div>
    </div>
    <div class="box" style="top: 331px">
      <div class="title" style="width: 82px">场景配置</div>
      <div class="text">配置逻辑条件进行智能化控制，如实现场景联动等应用。</div>
      <img
        class="xuxian"
        style="width: 116.81px; right: -109.01px"
        src="@/assets/images/changjing.png"
        alt=""
      />
      <div class="line"></div>
    </div>
    <div class="box" style="top: 505px">
      <div class="title" style="width: 82px">多操作端</div>
      <div class="text">远程进行运维管理：建筑运维。</div>
      <img
        class="xuxian"
        style="width: 104.5px; right: -96.5px"
        src="@/assets/images/caozuo.png"
        alt=""
      />
      <div class="line"></div>
    </div>
    <div class="box1">
      <div class="title" style="width: 130px">多种传感器覆盖</div>
      <div class="text">
        上万个传感器可对楼宇的空气、环境、能耗指标实时监测和调控。
      </div>
      <img class="xuxian" src="@/assets/images/chuangan.png" alt="" />
      <div class="line"></div>
    </div>
    <div class="box1" style="top: 361px">
      <div class="title" style="width: 82px">算法策略</div>
      <div class="text">
        通过AI调控策略自动进行调节，确保时刻处于能耗和体验的最佳平衡点。
      </div>
      <img
        class="xuxian"
        style="width: 112.342px; height: 67.936px; top: 29px; left: -104.35px"
        src="@/assets/images/celue.png"
        alt=""
      />
      <div class="line"></div>
    </div>
  </div>
</template>

<script setup>
import jk from "@/assets/images/jk.png";
import zcdj from "@/assets/images/zcdj.png";
import zcjt from "@/assets/images/zcjt.png";
import duigou from "@/assets/images/duigou.png";
const classList = ref([
  {
    title: "智能化等级Lv.5",
    desc: "自我学习控制",
    img: zcdj,
  },
  {
    title: "智能化等级Lv.4",
    desc: "感知控制",
    img: duigou,
  },
  {
    title: "智能化等级Lv.3",
    desc: "逻辑控制",
    img: duigou,
  },
  {
    title: "智能化等级Lv.2",
    desc: "定时控制",
    img: duigou,
  },
  {
    title: "智能化等级Lv.1",
    desc: "远程运维",
    img: duigou,
  },
]);
</script>

<style scoped lang="scss">
.introduce {
  position: relative;
  width: 100%;
  padding: 40px;
  .list {
    .item {
      display: flex;
      .left {
        :nth-child(1) {
          display: block;
          width: 36px;
          height: 36px;
        }
        :nth-child(2) {
          display: block;
          width: 23px;
          height: 83px;
          margin: 8px 0 4px 6.5px;
        }
      }
      .right {
        margin-left: 16px;
        :nth-child(1) {
          font-size: 24px;
          font-weight: 500;
          line-height: 36px;
          color: #fff;
        }
        :nth-child(2) {
          margin-top: 10px;
          color: #8d8d8d;
          font-size: 16px;
          font-weight: 400;
          line-height: 32px; /* 200% */
        }
      }
    }
  }
  .box {
    padding: 20px;
    top: 53px;
    left: 360px;
    border-radius: 5.82px;
    position: absolute;
    background: #5d5d5d33;
    .title {
      width: 95px;
      height: 30px;
      border-radius: 2.91px;
      font-size: 16px;
      font-weight: 400;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ffffff33;
    }
    .text {
      width: 238px;
      font-size: 16px;
      font-weight: 400;
      line-height: 22.4px;
      color: #fff;
      margin-top: 20px;
    }
    .xuxian {
      display: block;
      width: 111.95px;
      height: 14.5px;
      position: absolute;
      top: 28.81px;
      right: -104.11px;
    }
    .line {
      width: 7px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 5.82px 0px 0px 5.82px;
      background: #ff5841;
    }
  }
  .box1 {
    padding: 20px;
    top: 53px;
    right: 40px;
    border-radius: 5.82px;
    position: absolute;
    background: #5d5d5d33;
    .title {
      width: 177px;
      height: 30px;
      border-radius: 2.91px;
      font-size: 16px;
      font-weight: 400;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ffffff33;
      position: absolute;
      right: 20px;
    }
    .text {
      width: 200px;
      font-size: 16px;
      font-weight: 400;
      line-height: 22.4px;
      color: #fff;
      margin-top: 50px;
    }
    .xuxian {
      display: block;
      width: 146.97px;
      height: 88.19px;
      position: absolute;
      top: 26.81px;
      left: -139px;
    }
    .line {
      width: 7px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      border-radius: 0px 5.82px 5.82px 0px;
      background: #ff5841;
    }
  }
  .jk {
    position: absolute;
    top: 20px;
    right: 299px;
    width: 310px;
    height: 620px;
  }
}
</style>
