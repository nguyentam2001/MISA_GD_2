<template>
  <el-select
    v-model="value"
    @change="showFormQuestion(value)"
    placeholder="Chọn loại câu hỏi"
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
import { mapMutations, mapState } from "vuex";

export default {
  watch: {
    /**
     * Kiểm tra kiểu câu hỏi trong state rồi gán gt cho value
     * Author: NVTAM (8/2/2022)
     */
    showQuestionType: function (value) {
      this.value = value;
    },
  },
  computed: {
    ...mapState(["showQuestionType"]),
  },
  methods: {
    ...mapMutations(["showFormQuestion"]),
  },
  data() {
    return {
      options: [
        {
          value: "1",
          label: "Chọn đáp án đúng",
        },
        {
          value: "2",
          label: "Câu hỏi đúng sai",
        },
        {
          value: "3",
          label: "Điền vào chỗ trống",
        },
        {
          value: "4",
          label: "Câu hỏi tự luận",
        },
        {
          value: "6",
          label: "Câu hỏi nhóm",
        },
      ],
      value: "1",
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-input--suffix .el-input__inner {
  padding-right: 30px;
  background-color: transparent;
  border: none;
  font-size: 16px;
  color: var(--text-color);
}
::v-deep .el-select-dropdown {
  background-color: #f8e373 !important;
}

::v-deep .el-select-dropdown__item {
  background-color: #f8e373 !important;
}
</style>
