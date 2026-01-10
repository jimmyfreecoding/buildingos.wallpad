<template>
  <div>
    <div class="title">系统管理</div>
    <div class="txt1">输入管理员密码：</div>
    <div class="txt2">
      <!-- 密码输入框 -->
      <van-password-input
        :value="value"
        :length="4"
        :error-info="errorInfo"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        v-model="value"
        :show="showKeyboard"
        @blur="showKeyboard = false"
      />
    </div>
    <div class="dialog-footer flex-row justify-center">
      <el-button type="danger" @click="reload" v-if="passwordFlag === true">
        刷新
      </el-button>
      <el-button type="danger" @click="reset" v-if="passwordFlag === true">
        绑定
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const value = ref("");
const showKeyboard = ref(false);
const passwordFlag = ref(false);
const errorInfo = ref("");
const reload = () => {
  location.reload();
};
const reset = () => {
  localStorage.clear();
  location.reload();
};
watch(value, (newVal) => {
  let password = "";
  let area = "";
  let data = localStorage.getItem("data");
  if (data) {
    let jsondata = JSON.parse(data);
    console.info(jsondata);
    password = jsondata.floor.substring(0, jsondata.floor.length - 1);
    if (jsondata.type === "wc") {
      area = "05";
    } else if (jsondata.type === "wcw") {
      area = "06";
    } else {
      if (jsondata.code === "A") {
        area = "01";
      } else if (jsondata.code === "B") {
        area = "02";
      } else if (jsondata.code === "C") {
        area = "03";
      } else if (jsondata.code === "D") {
        area = "04";
      } else {
        area = "00";
      }
    }
    password = password + area;
    console.info(
      "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
    console.info(password);
    console.info(
      "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
  } else {
    password = "0000";
  }
  if (newVal.length === 4 && newVal !== password) {
    errorInfo.value = "密码错误";
    value.value = "";
  } else {
    errorInfo.value = "";
    if (newVal.length === 4) {
      passwordFlag.value = true;
    }
  }
});
</script>

<style scoped></style>
