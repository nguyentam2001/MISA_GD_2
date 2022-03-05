<template>
  <div>
    <el-popover placement="top" width="160" v-model="visible">
      <div class="view-detail" @click="questionView">Xem</div>
      <div class="view-detail" @click="deleteOnClick">Xóa</div>
      <div slot="reference" class="more"></div>
    </el-popover>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    exerciseID: String,
  },
  methods: {
    ...mapActions(["delExerciesByID"]),
    deleteOnClick() {
      console.log(`this.exerciseID`, this.exerciseID);
      this.$store.dispatch("delExerciesByID", this.exerciseID);
      this.visible = false;
    },
    questionView() {
      console.log(`this.exerciseID`, this.exerciseID);
      //load exercise by ID
      this.$store.dispatch("loadExerciesByID", this.exerciseID);
      // chuyển hướng sang giao diện làm bài
      this.$router.push(`/question-type/${this.exerciseID}/list`);
      this.visible = false;
    },
  },
  data() {
    return {
      visible: false,
    };
  },
};
</script>
<style lang="scss" scoped>
.view-detail {
  width: 160px;
  padding: 8px;
  cursor: pointer;
}
.view-detail:hover {
  color: #8a6bf6;
  font-weight: 700;
}
.more {
  width: 8px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  height: 20px;
}
</style>
