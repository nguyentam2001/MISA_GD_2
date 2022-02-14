<template>
  <div class="left">
    <el-tooltip
      class="item"
      effect="light"
      :content="content || 'Text'"
      placement="left"
    >
      <el-button @click="handleClick(payload)">
        <img
          :src="require(`../assets/icons/${questionType || 'Group_52228'}.svg`)"
          alt=""
        />
      </el-button>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  props: {
    questionType: String,
    content: String,
    handleClick: Function,
    payload: String,
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-button {
  background: #fff;
  border: 1px solid #fff;
  padding: 0px;
}
</style>
