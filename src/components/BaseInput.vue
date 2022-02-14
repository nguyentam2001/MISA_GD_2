<template>
  <el-input placeholder="Please input" v-model="input"></el-input>
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
<style lang="scss">
.demo-input-label {
  display: inline-block;
  width: 130px;
}
.t-search-icon {
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("../assets/icons/Group_30044.svg");
}
.el-input__icon {
  line-height: 40px;
}
</style>
