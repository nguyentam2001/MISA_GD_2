<template>
  <el-select
    v-model="value2"
    multiple
    clearable
    style="margin-left: 20px"
    placeholder="Chọn đáp án"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      value2: [],
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-input__inner {
  border: 1px solid #b6b9ce;
}
::v-deep .el-tag.el-tag--info {
  border-color: #e9e9eb;
  background-color: #afeca4;
  border-radius: 8px;
  width: 74px;
  height: 32px;
  overflow: hidden;
}
::v-deep .el-icon-close:before {
  color: #fff;
}
::v-deep .el-select__tags-text {
  color: #4e5b6a;
}

::v-deep .el-tag .el-icon-close::before {
  background-color: #7b7e8e;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  overflow: hidden;
}
</style>
