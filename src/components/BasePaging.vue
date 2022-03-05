<template>
  <div class="base-pagging">
    <el-pagination
      :page-size="PageSize"
      layout="prev, pager, next"
      :total="TotalRecord"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    //  PageSize: 14,
    // PageIndex: 1,
    // TotalPage: null,
    // TotalRecord: null,
    ...mapState(["PageSize", "TotalPage", "TotalRecord", "TotalPage"]),
    ...mapState({
      PageSize: (state) => state.paging.PageSize,
      PageIndex: (state) => state.paging.PageIndex,
      TotalPage: (state) => state.paging.TotalPage,
      TotalRecord: (state) => state.paging.TotalRecord,
    }),
  },

  methods: {
    handleCurrentChange(val) {
      this.$store.dispatch("setPageIndex", val);
    },
  },
  data() {
    return {
      currentPage1: 1,
    };
  },
};
</script>

<style lang="scss">
.el-pagination {
  font-weight: 500;
}
</style>
