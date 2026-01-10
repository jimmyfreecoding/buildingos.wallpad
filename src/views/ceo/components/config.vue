<template>
  <div>
    <el-form :model="form">
      <el-form-item label="属地" :label-width="formLabelWidth">
        <el-select v-model="form.spaceIndex" placeholder="选择属地">
          <el-option
            :label="space.name"
            :value="index"
            v-for="(space, index) in spaceObj"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="楼层区域"
        :label-width="formLabelWidth"
        v-if="spaceObj[form.spaceIndex]"
      >
        <el-select v-model="form.floorareaIndex" placeholder="选择楼层区域">
          <el-option
            :label="fa.name"
            :value="index2"
            v-for="(fa, index2) in spaceObj[form.spaceIndex].floorArea"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="楼层"
        :label-width="formLabelWidth"
        v-if="
          spaceObj[form.spaceIndex] &&
          spaceObj[form.spaceIndex].floorArea &&
          spaceObj[form.spaceIndex].floorArea[form.floorareaIndex]
        "
      >
        <el-select v-model="form.floorIndex" placeholder="选择楼层">
          <el-option
            :label="floor.name"
            :value="index"
            v-for="(floor, index) in spaceObj[form.spaceIndex].floorArea[
              form.floorareaIndex
            ].floor"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="绑定会议室"
        :label-width="formLabelWidth"
        v-if="
          spaceObj[form.spaceIndex] &&
          spaceObj[form.spaceIndex].floorArea &&
          spaceObj[form.spaceIndex].floorArea[form.floorareaIndex] &&
          spaceObj[form.spaceIndex].floorArea[form.floorareaIndex].floor[
            form.floorIndex
          ]
        "
      >
        <el-select
          v-model="form.mettingRoomIndex"
          placeholder="绑定会议室"
          size="large"
        >
          <el-option
            :label="area.name"
            :value="index"
            v-for="(area, index) in spaceObj[form.spaceIndex].floorArea[
              form.floorareaIndex
            ].floor[form.floorIndex].mettingRoom"
          />
        </el-select>
      </el-form-item>

      <!--      <el-form-item label="设备类型" :label-width="formLabelWidth">-->
      <!--        <el-select v-model="form.type" placeholder="Please select a zone">-->
      <!--          <el-option label="会议室电子门牌" value="meetingPad" />-->
      <!--          <el-option label="墙面中控平板" value="wallPad" />-->
      <!--          <el-option label="卫生间平板" value="wcPad" />-->
      <!--        </el-select>-->
      <!--      </el-form-item>-->
    </el-form>
    <div class="dialog-footer">
      <el-button @click="emit('close')">关闭</el-button>
      <el-button type="primary" @click="saveData"> 确认 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  spaceObj: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
const emit = defineEmits(["close"]);
const formLabelWidth = "100px";
const form = reactive({
  floorarea: "",
  name: "",
  code: "",
  floor: "",
  type: "",
  space: "",
  spaceIndex: 0,
  floorareaIndex: 0,
  floorIndex: 0,
  areaIndex: 0,
  spaceObj: [],
});
const saveData = () => {
  // form.spaceIndex
  form.space = props.spaceObj[form.spaceIndex].code;
  form.floorarea =
    props.spaceObj[form.spaceIndex].floorArea[form.floorareaIndex].code;
  form.floor =
    props.spaceObj[form.spaceIndex].floorArea[form.floorareaIndex].floor[
      form.floorIndex
    ].code;
  form.name =
    props.spaceObj[form.spaceIndex].floorArea[form.floorareaIndex].floor[
      form.floorIndex
    ].mettingRoom[form.mettingRoomIndex].name;
  form.code =
    props.spaceObj[form.spaceIndex].floorArea[form.floorareaIndex].floor[
      form.floorIndex
    ].mettingRoom[form.mettingRoomIndex].code;
  localStorage.setItem("data", JSON.stringify(form));
  emit("close");
  location.reload();
};
</script>

<style scoped lang="scss">
:deep(.el-form-item__label) {
  color: #fff;
}
</style>
