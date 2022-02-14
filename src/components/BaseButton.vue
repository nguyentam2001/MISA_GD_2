<template>
  <el-row>
    <el-button
      @click="handleOnClick(payload)"
      v-bind:style="styleObject"
      class="t-btn t-btn-primary"
      round
      >{{ text || "Soạn bài" }}</el-button
    >
  </el-row>
</template>
<script>
export default {
  props: {
    styleObject: Object,
    text: String,
    handleOnClick: {
      type: Function,
    },
    payload: Object,
  },
};
</script>
<style lang="scss">
.t-btn-primary {
  background-color: var(--active-primary);
  width: 100%;
  height: 40px;
  color: #ffff;
}
.el-button.is-round {
  border-radius: 10px;
}
.t-btn {
  box-sizing: border-box;
  border-radius: 10px;
  min-width: 100px;
  padding: 12px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
}
</style>
