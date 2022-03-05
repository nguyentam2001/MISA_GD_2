<template>
  <div class="answers-view">
    <div
      class="answer-content"
      v-for="(answer, index) in answers"
      :key="index"
      @click="chooseAnsswer(index)"
    >
      <div
        class="chart flex-center"
        v-bind:class="{
          active: tryAnswers[indexQuestion].chooseIndex == index,
        }"
      >
        {{ convertOrder(index) }}
      </div>
      <div class="content-text">{{ answer.Content }}</div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";

export default {
  props: {
    indexQuestion: Number,
    // currentAnswers: Object,
  },
  computed: {
    ...mapState(["exerciseObj"]),
    ...mapGetters(["convertOrder"]),
    ...mapState({
      tryAnswers: (state) => state.try_exercise.tryAnswers,
    }),
    answers() {
      if (Array.isArray(this.exerciseObj.questions)) {
        return JSON.parse(
          JSON.stringify(this.exerciseObj.questions[this.indexQuestion].Answers)
        );
      } else {
        return null;
      }
    },
  },

  methods: {
    //Chọn câu trả lời đúng
    chooseAnsswer(index) {
      //gán đáp án  được chọn
      this.tryAnswers[this.indexQuestion].chooseIndex = index;
      //set vào mảng kết quả
      // kiểu mới v2
      this.tryAnswers[this.indexQuestion].answer =
        this.exerciseObj.questions[this.indexQuestion].Answers[index].Correct; //đúng hay sai
      //đánh dấu câu hỏi đã làm
      this.tryAnswers[this.indexQuestion].isDone = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.answers-view {
  width: 100%;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #fff;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.answer-content {
  position: relative;
  width: 20%;
  border-radius: 10px;
  background-color: aqua;
  height: 80%;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .chart {
    top: 0;
    left: 0;
    position: absolute;
    width: 42px;
    height: 42px;
    margin: 10px;
    border-radius: 50%;
  }
  .chart.active {
    background-color: var(--active-primary);
    color: #fff;
  }
  .content-text {
    display: block;
    font-size: 20px;
  }
}
.answer-content:first-child {
  margin-left: 0px;
}
</style>
