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
import BaseCard from "../../components/BaseCard.vue";
import { mapState } from "vuex";
export default {
  components: {
    BaseCard,
  },
  methods: {
    test() {},
  },
  mounted() {
    this.$store.dispatch("loadExercises");
    console.log(`exercises`, this.exercises);
  },
  computed: {
    ...mapState(["exercises"]),
  },
};
</script>

<style lang="scss" scoped>
.el-col-md-8 {
  margin-top: 20px;
}
</style>
