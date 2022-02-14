<template>
  <div class="base-pagging">
    <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="100"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  methods: {},
  data() {
    return {
      currentPage1: 5,
    };
  },
};
</script>

<style lang="scss">
.el-pagination {
  font-weight: 500;
}
</style>
