<template>
  <div class="answers-view">
    <div class="answer-content" v-for="(answer, index) in answers" :key="index">
      <div class="chart flex-center">Ô trống {{ index + 1 }}: Nhập đáp án.</div>
      <div class="content-text">
        <el-input
          class="input-result"
          v-model="tryAnswers[indexQuestion].blanks[index]"
          @input="getValueAnswer($event, index)"
        ></el-input>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  props: {
    indexQuestion: Number,
  },

  computed: {
    ...mapState(["exerciseObj"]),

    ...mapState({
      tryAnswers: (state) => state.try_exercise.tryAnswers,
    }),
    ...mapGetters(["convertOrder"]),

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
    ...mapMutations(["setArrayResult"]),

    getValueAnswer(value, index) {
      //so sánh với kết quả
      let content =
        this.exerciseObj.questions[this.indexQuestion].Answers[
          index
        ].Content.join("/");
      //lưu trữ đúng trong câu điền vào chỗ trống
      //Kiểu mới v2
      if (value == content) {
        this.tryAnswers[this.indexQuestion].answers[index] = true;
      } else {
        this.tryAnswers[this.indexQuestion].answers[index] = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-input__inner {
  height: 100%;
  background-color: aqua;
  border: none;
}
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
  box-sizing: border-box;
  padding: 10px;
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
    height: 42px;
    margin: 10px;
    border-radius: 50%;
  }
  .content-text {
    display: block;
    font-size: 20px;
  }
}
.answer-content:first-child {
  margin-left: 0px;
}

.input-result {
  background-color: aqua;
  width: 95%;
  height: 160px;
  margin-right: 54px;
  outline: none;
  border: none;
  text-align: center;
  font-size: 18px;
}
</style>
