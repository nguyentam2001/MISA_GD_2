<template>
  <el-select
    class="t-selected"
    v-model="value"
    clearable
    @change="chooseValueCb({ value, typeCb })"
    :placeholder="titleText || 'Tất cả các khối lớp'"
    v-bind:style="selectorStyle"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      v-bind:style="optionStyle"
    >
    </el-option>
  </el-select>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  props: {
    titleText: String,
    selectorStyle: Object,
    optionStyle: Object,
    inputValue: Object,
    typeCb: String, //dùng enum để kiểm tra xem là form gì
    // funcMutaion:String,
  },
  // inputValue:{
  //   data:[],
  //   value,
  //   name
  // }
  created() {
    let me = this;
    if (me.inputValue != null) {
      console.log(me.inputValue);
      this.options = this.convertToCb(
        me.inputValue.data,
        me.inputValue.value,
        me.inputValue.label
      );
    }
  },
  methods: {
    convertToCb(inputValue, value, label) {
      let newArray = [];
      if (Array.isArray(inputValue)) {
        for (let i = 0; i < inputValue.length; i++) {
          let obj = {};
          console.log(obj);
          obj.value = inputValue[i][value];
          obj.label = inputValue[i][label];
          newArray.push(obj);
        }
      }
      return newArray;
    },

    ...mapMutations(["chooseValueCb"]),
  },

  data() {
    return {
      options: [],
      value: "",
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-input__inner {
  border-radius: 10px;
  color: var(--text-color);
  border: 1px solid #a6a9be;
  height: 40px;
  background: none;
}

::v-deep .el-input__inner::placeholder {
  color: var(--text-color);
}

::v-deep.el-select-dropdown__item.selected {
  color: var(--text-color);
  font-weight: 500;
  background: #ece7fe;
  margin: 8px;
  border-radius: 10px;
}
.el-select-dropdown__item {
  margin: 0px 8px;
  padding: 0 8px;
  color: var(--text-color);
}
::v-deep .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  border-radius: 10px;
}
</style>
