<template>
  <el-input placeholder="Nhập tên học liệu để tìm kiếm" v-model="queryText">
    <i slot="prefix" class="el-input__icon el-icon-search t-search-icon"></i>
  </el-input>
</template>
<script>
import { mapActions } from "vuex";
import debounce from "debounce";
export default {
  watch: {
    queryText() {
      //gọi hàm tìm kiếm
      this.getExercies();
    },
  },
  created() {
    this.getExercies = debounce(this.getExercies, 500);
  },
  methods: {
    ...mapActions(["loadExercises"]),
    //hàm tìm kiếm
    //set khoảng thời gian tìm kiếm là 500 giây
    getExercies() {
      this.$store.dispatch("loadExercises", this.queryText);
    },
  },
  data() {
    return {
      queryText: "",
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
