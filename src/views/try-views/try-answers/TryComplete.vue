<template>
  <div class="try-complete">
    <h2 class="title">
      {{
        doneQuestions == tryAnswers.length
          ? `Chúc mừng bạn đã hoàn thành toàn bộ câu hỏi!`
          : `Bạn còn ${tryAnswers.length - doneQuestions}/${
              tryAnswers.length
            } câu chưa làm`
      }}
    </h2>
    <h1 class="total-score">Tổng điểm {{ totalScore() }}</h1>
    <p class="text">Nhấn vào để quay lại làm tốt nhé</p>
    <div class="list-answers">
      <div
        v-for="(answer, index) in tryAnswers"
        :key="index"
        class="item margin-left-8 margin-right-8"
      >
        <el-button
          class="item-answer"
          @click="chooseQuestionOnClick(index)"
          v-bind:class="{ isDone: answer.isDone }"
        >
          {{ index + 1 }}</el-button
        >
      </div>
    </div>
    <p class="text-or">Hoặc</p>
    <div class="btn-item">
      <base-button :text="textComplete" />
    </div>

    <p class="text-note">Lưu ý hệ thống sẽ lưu lại 2 lần làm bài gần nhất</p>

    <div class="gift-complete">
      <h3 class="text-complete">Bạn có cơ hội sở hữu</h3>
      <div class="images-complete">
        <img
          class="image"
          :src="
            require('../../../assets/subjects-avatar/lamborghini-black.jpg')
          "
          alt=""
        />
        <img
          class="image margin-left-16"
          :src="require('../../../assets/subjects-avatar/anh_5.jpg')"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import BaseButton from "../../../components/BaseButton.vue";
export default {
  props: {
    doneQuestions: Number,
  },
  components: { BaseButton },
  computed: {
    ...mapState({
      tryAnswers: (state) => state.try_exercise.tryAnswers,
    }),
  },
  methods: {
    chooseQuestionOnClick(index) {
      this.$emit("setIndexQuestion", index);
    },
    totalScore() {
      let total = 0;
      this.tryAnswers.forEach((question) => {
        if (Object.prototype.hasOwnProperty.call(question, "answer")) {
          if (question.answer) {
            total++;
          }
        }
        if (Object.prototype.hasOwnProperty.call(question, "answers")) {
          let answers = question.answers;
          if (!answers.includes(undefined) && answers.length != 0) {
            //kiểm tra tất cả các câu trả lời có đúng hay không
            let correct = answers.every((answer) => {
              return answer == true;
            });
            if (correct) {
              total++;
            }
          }
        }
      });
      console.log(`total`, total);
      return total;
    },
  },
  data() {
    return {
      indexQuestion: "1",
      textComplete: "Hoàn thành bài",
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-button.is-round {
  padding: 0;
}
::v-deep .t-btn {
  min-width: 0px;
}
::v-deep .el-button {
  border-radius: 10px;
}
.try-complete {
  box-sizing: border-box;
  position: absolute;
  transform: translate(-50%, -50%);
  top: calc(50% + 32px);
  left: 50%;
  width: 800px;
  height: calc(100% - 170px);
  --tw-bg-opacity: 1;
  background-color: rgba(255, 248, 214, var(--tw-bg-opacity));
  border-radius: 10px;
  padding: 50px 75px 50px 75px;
  text-align: center;
}

.list-answers {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 48px;
  min-width: 48px;
}
.btn-item {
  width: 300px;
  margin: auto;
}
.gift-complete {
  display: flex;
  margin-top: 60px;
  flex-direction: column;
}

.item-answer.isDone {
  background-color: var(--active-primary);
  color: #fff;
}
.images-complete {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image {
  max-height: 200px;
  border-radius: 10px;
}
</style>
