<template>
  <div class="answers-view">
    <div class="answer-content">
      <div class="chart">Nhập đáp án.</div>
      <div class="content-text">
        <textarea
          class="input-result"
          v-model="tryAnswers[indexQuestion].text"
          @input="getValueAnswer($event)"
        >
        </textarea>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    indexQuestion: Number,
  },
  computed: {
    ...mapState({
      tryAnswers: (state) => state.try_exercise.tryAnswers,
    }),
  },
  methods: {
    getValueAnswer(event) {
      //kiểm tra xem có nhập câu trar lời không
      if (event.target.value) {
        this.tryAnswers[this.indexQuestion].answer = true; //set kết quả tại đó là đúng
        //đánh dấu là đã làm
        this.tryAnswers[this.indexQuestion].isDone = true;
      } else {
        this.tryAnswers[this.indexQuestion].answer = false;
        //đánh dấu chưa làm
        this.tryAnswers[this.indexQuestion].isDone = false;
      }
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
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  background-color: aqua;
  /* height: 80%; */
  height: 100%;
  .chart {
    margin: 10px;
    text-align: left;
    flex: none;
    border-radius: 50%;
  }
  .content-text {
    display: block;
    font-size: 20px;
    height: 100%;
  }
}
.answer-content:first-child {
  margin-left: 0px;
}

.input-result {
  box-sizing: border-box;
  background-color: aqua;
  width: 100%;
  height: 100%;
  margin-right: 54px;
  outline: none;
  border: none;
  font-size: 16px;
  padding: 10px;
  font-family: GoogleSans-Regular;
  color: var(--text-color);
}
</style>
