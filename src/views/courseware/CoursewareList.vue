<template>
  <div class="courseware-list">
    <div class="row">
      <el-row :gutter="20">
        <el-col
          :xl="4"
          :lg="6"
          :md="8"
          :sm="12"
          :xs="24"
          v-for="exercise in exercises"
          :key="exercise.ExerciseID"
          ><div class="grid-content bg-purple">
            <base-card v-bind:exercise="exercise" /></div
        ></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
//  :quantities="exercer.Questions.length"
//               :subject="exercer.Avatar.fileName"
//               :title="exercer.Title"
import BaseCard from "../../components/BaseCard.vue";
import common from "../../script/common.js";
import { mapGetters, mapState } from "vuex";
export default {
  components: {
    BaseCard,
  },
  methods: {
    subjectOfGrade(exercer) {
      return common.subjectOfGrade(exercer);
    },
  },
  computed: {
    ...mapState({}),
    ...mapGetters(["exercises"]),
  },
};
</script>

<style lang="scss" scoped>
.el-col-md-8 {
  margin-top: 20px;
}
</style>
