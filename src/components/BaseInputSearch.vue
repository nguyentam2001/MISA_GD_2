<template>
  <el-input placeholder="Nhập tên học liệu để tìm kiếm" v-model="input4">
    <i slot="prefix" class="el-input__icon el-icon-search t-search-icon"></i>
  </el-input>
</template>
<script>
export default {
  data() {
    return {
      input4: "",
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep.el-input--prefix .el-input__inner {
  border-radius: 10px;
  border: 1px solid #a6a9be;
}
::v-deep .demo-input-label {
  display: inline-block;
  width: 130px;
}
::v-deep .t-search-icon {
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("../assets/icons/Group_30044.svg");
}
::v-deep .el-input__icon {
  line-height: 40px;
}
</style>
