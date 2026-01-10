<template>
  <div class="box">
    <div class="item shadow">
      <div class="title-box flex-row align-center justify-between">
        <div class="flex-row align-center">
          <div class="dot"></div>
          <div>甲醛</div>
        </div>
        <div class="color1" style="margin-left: 14px">安全</div>
      </div>
      <el-progress
        color="#00000000"
        :percentage="airValue(inside.formaldehyde, 'formaldehyde').parcent"
        :stroke-width="4"
      >
        {{ airValue(inside.formaldehyde, "formaldehyde").showValue }}mg/m³
      </el-progress>
    </div>
    <div class="item shadow">
      <div class="title-box flex-row align-center justify-between">
        <div class="flex-row align-center">
          <div class="dot"></div>
          <div>CO₂</div>
        </div>
        <div class="color1" style="margin-left: 14px">清新</div>
      </div>
      <el-progress
        color="#00000000"
        :percentage="airValue(inside.co2, 'co2').parcent"
        :stroke-width="4"
      >
        {{ airValue(inside.co2, "co2").showValue }}ppm
      </el-progress>
    </div>
    <div class="item shadow">
      <div class="title-box flex-row align-center justify-between">
        <div class="flex-row align-center">
          <div class="dot"></div>
          <div>PM2.5</div>
        </div>
        <div class="color1" style="margin-left: 14px">优</div>
      </div>
      <el-progress
        color="#00000000"
        :percentage="airValue(inside.pm25, 'pm25').parcent"
        :stroke-width="4"
      >
        {{ airValue(inside.pm25, "pm25").showValue
        }}<span style="letter-spacing: -3px">μg</span> /m³
      </el-progress>
    </div>
    <div style="width: 10px"></div>
    <div class="item shadow" style="width: 236.5px">
      <div class="title-box flex-row align-center justify-between">
        <div class="flex-row align-center">
          <div class="dot"></div>
          <div>AQI</div>
        </div>
        <div class="color1" style="margin-left: 14px">清新</div>
      </div>
      <el-progress color="#00000000" :percentage="84" :stroke-width="4">
        <div text style="color: rgba(255, 255, 255); text-align: right">
          {{ outside.AIQ }}
        </div>
      </el-progress>
    </div>
    <div class="item shadow" style="width: 236.5px">
      <div class="title-box flex-row align-center justify-between">
        <div class="flex-row align-center">
          <div class="dot"></div>
          <div>室外PM2.5</div>
        </div>
        <div class="color1" style="margin-left: 14px">优</div>
      </div>
      <el-progress
        color="#00000000"
        :percentage="airValue(outside.pm25, 'pm25out').parcent"
        :stroke-width="4"
      >
        {{ outside.pm25 }}<span style="letter-spacing: -3px">μg</span> /m³
      </el-progress>
    </div>
  </div>
</template>

<script setup>
defineProps({
  outside: {
    type: Object,
    default: () => {
      return {};
    },
  },
  inside: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const airValue = (avalue, airtype) => {
  let airValue = {
    showValue: "0",
    parcent: 0,
  };
  if (airtype === "formaldehyde") {
    let sValue = (avalue * 1.23).toFixed(3);
    sValue = parseFloat(sValue);
    let tValue = sValue > 0.08 ? 0.07 : sValue;
    if (tValue === 0) {
      tValue = 0.001;
    }
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 0.16) * 100;
  } else if (airtype === "co2") {
    let sValue = avalue;
    let tValue = sValue > 1000 ? 802 : sValue;
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 2000) * 100;
  } else if (airtype === "pm25") {
    let sValue = avalue;
    let tValue = sValue > 75 ? 75 : sValue;
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 400) * 100;
  } else if (airtype === "tvoc") {
    let sValue = (avalue * 0.0023).toFixed(3);
    sValue = parseFloat(sValue);
    let tValue = sValue > 0.4 ? 0.4 : sValue;
    if (tValue === 0) {
      tValue = 0.1;
    }
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 2) * 100;
  } else if (airtype === "h2s") {
    let sValue = (avalue * 1.391).toFixed(3);
    sValue = parseFloat(sValue);
    let tValue = sValue > 0.011 ? 0.011 : sValue;
    tValue = parseFloat(tValue);
    if (tValue === 0) {
      tValue = 0.001;
    }
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 0.02) * 100;
  } else if (airtype === "nh3") {
    let sValue = (avalue * 0.695).toFixed(3);
    sValue = parseFloat(sValue);
    let tValue = sValue > 9 ? 9.2 : sValue;
    if (tValue === 0) {
      tValue = 0;
    }
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 20) * 100;
  } else if (airtype === "pm25out") {
    let sValue = avalue;
    let tValue = sValue;
    airValue.showValue = tValue;
    airValue.parcent = 100 - (tValue / 400) * 100;
  }
  return airValue;
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  padding: 0 40px;
  position: absolute;
  bottom: 100px;
  display: flex;
  gap: 12px;
}
.item {
  width: 220px;
  height: 102px;
  padding: 14px;
  border-radius: 10.67px;
  background: #ffffff1a;
  .title-box {
    margin-bottom: 14px;
    position: relative;
    z-index: 1;
    color: #fff;
    font-size: 24px;
  }
  .dot {
    width: 5.33px;
    height: 5.33px;
    border-radius: 50%;
    background-color: #79d172;
    margin-right: 8px;
  }
  .color1 {
    color: #79d172;
    font-size: 24px;
  }
}
</style>
<style scoped lang="scss">
:deep(.el-progress-bar__outer) {
  overflow: visible !important;
}
.item.shadow {
  :deep(.el-progress-bar) {
    transform: rotate(180deg);
  }
}

.item {
  :deep(.el-progress-bar__outer) {
    background: linear-gradient(
      90deg,
      #ee4730 0%,
      #f49301 25%,
      #eee73d 50%,
      #87dd8b 75%,
      #418bfb 100%
    ) !important;
    height: 2px !important;
  }
  :deep(.el-progress__text) {
    flex: 1;
    font-size: 20px !important;
    color: #ffffff;
    opacity: 0.8;
    // width: 140px;
    text-align: right;
    color: #fff;
  }
  :deep(.el-progress) {
    height: 30px !important;
  }
}
.item.shadow {
  :deep(.el-progress-bar__inner) {
    background-color: rgba(61, 66, 69, 0.8) !important;
    height: 6px;
    top: -1px;
  }
  :deep(.el-progress-bar) {
    max-width: 70px;
  }
}

:deep(.el-progress-bar__inner::after) {
  width: 4px !important;
  height: 4px !important;
  position: absolute;
  right: 0px;
  border-radius: 50%;
  top: -1px;
  border: 3px solid #fff;
}
</style>
