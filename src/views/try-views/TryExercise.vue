<template>
  <div class="content">
    <img
      class="background-image"
      :src="
        require(`../../assets/subjects-avatar/${
          currentMusic.bgimage || 'Background_1366_Sea.e17b18eb.jpg'
        }`)
      "
      alt=""
    />

    <div class="content-question">
      <div class="header-container justify-between">
        <div class="btns-left flex">
          <div class="btn">
            <base-button
              :handleOnClick="cancelTryExerciseOnClick"
              :text="cancelText"
            />
          </div>
          <div class="btn">
            <base-button
              :text="MusicToggleText"
              :handleOnClick="toggleMusicOnClick"
            />
          </div>
        </div>
        <div v-if="!isComplete" class="qty-question">
          Câu {{ indexQuestion + 1 }}/{{ exerciseObj.QtyQuestions }}
        </div>
        <div v-if="!isComplete" class="btns-right flex">
          <div class="btn">
            <base-button
              :text="tryAgainText"
              :handleOnClick="tryAgainOnClick"
            />
          </div>
          <div class="btn">
            <base-button
              :text="completeText"
              :handleOnClick="completeAnswersOnclick"
            />
          </div>
        </div>
      </div>
      <div v-if="!isComplete" class="justify-between content-container">
        <div class="prev-btn">
          <div
            v-if="indexQuestion > 0"
            class="btn-content flex-direction-center border-right"
            @click="prevQuestion"
          >
            <span class="prev-icon"></span>
            <span class="text">Câu trước</span>
          </div>
        </div>
        <div class="question-container">
          <div class="question-view">
            Câu hỏi: {{ indexQuestion + 1 }}
            <span v-html="contentExercies"></span>
            <div class="listImages">
              <img
                v-for="(attachment, index) in attachments"
                :key="index"
                :src="require(`../../assets/subjects-avatar/${attachment}`)"
                alt=""
                class="question-img"
              />
            </div>
          </div>
          <component :is="componentActive" :indexQuestion="indexQuestion" />
        </div>
        <div class="next-btn">
          <div
            v-if="indexQuestion < exerciseObj.questions.length - 1"
            class="btn-content flex-direction-center border-left"
            @click="nextQuestion"
          >
            <span class="next-icon"></span>
            <span class="text"> Câu sau</span>
          </div>
        </div>
      </div>
      <div v-if="isComplete" class="content-container justify-between">
        <try-complete
          :doneQuestions="doneQuestions"
          @setIsComplete="setIsComplete"
          @setIndexQuestion="setIndexQuestion"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";

import BaseButton from "../../components/BaseButton.vue";
import TryChoose from "../../views/try-views/try-answers/TryChoose.vue";
import TryFillTheBlack from "../../views/try-views/try-answers/TryFillTheBlack.vue";
import TryEssay from "../../views/try-views/try-answers/TryEssay.vue";
import TryComplete from "./try-answers/TryComplete.vue";
export default {
  components: { BaseButton, TryEssay, TryComplete },
  computed: {
    ...mapState({
      currentMusic: (state) => state.try_exercise.currentMusic,
      tryAnswers: (state) => state.try_exercise.tryAnswers,
    }),
    ...mapState(["exerciseObj"]),
    contentExercies() {
      if (Array.isArray(this.exerciseObj.questions)) {
        return this.exerciseObj.questions[this.indexQuestion].Content;
      } else {
        return null;
      }
    },

    attachments() {
      if (Array.isArray(this.exerciseObj.questions)) {
        return this.exerciseObj.questions[this.indexQuestion].Attachments;
      } else {
        return null;
      }
    },

    componentActive() {
      switch (this.findQuestionType()) {
        case 1:
          return TryChoose;
        case 3:
          return TryFillTheBlack;
        case 4:
          return TryEssay;
        default:
          return TryChoose;
      }
    },
  },
  created() {
    this.$store.dispatch("loadExerciesByID", this.$route.params.id);
    //copy câu hỏi
  },
  methods: {
    ...mapMutations(["toggleMusic", "resetTryAnswers", "createTryAnswers"]),

    toggleMusicOnClick() {
      this.pauseMusic = !this.pauseMusic;
      this.toggleMusic({ toggle: !this.pauseMusic });
      if (!this.pauseMusic) {
        this.MusicToggleText = "Tắt nhạc";
      } else {
        this.MusicToggleText = "Bật nhạc";
      }
    },
    //kiểm tra mảng có thành phần rỗn hay không
    isArrayHasEmpty(array) {
      if (array.includes(undefined) || array.includes("")) return true;
      else return false;
    },
    checkAnswersIsDone() {
      //kiểm tra xem câu hỏi đó đã làm đầy đủ hay chưa
      //câu điền vào chỗ trống
      if (this.findQuestionType() == 3) {
        //điêu kiện là không có ô nào để trống thì hoàn thành
        let AnswersQty = //số lượng ô trống
          this.exerciseObj.questions[this.indexQuestion].Answers.length;
        let currentAnswersQty = //số lượng ô trống người dùng điền được
          this.tryAnswers[this.indexQuestion].blanks.length;
        if (
          //điêu kiện là không có ô nào để trống thì hoàn thành
          AnswersQty == currentAnswersQty &&
          !this.isArrayHasEmpty(this.tryAnswers[this.indexQuestion].blanks)
        ) {
          this.tryAnswers[this.indexQuestion].isDone = true;
        } else {
          this.tryAnswers[this.indexQuestion].isDone = false;
        }
      }
    },
    nextQuestion() {
      //kiểm tra câu hỏi hoàn thành hay chưa
      this.checkAnswersIsDone();
      //Chuyển sang câu hỏi tiếp theo
      if (this.indexQuestion < this.exerciseObj.questions.length - 1) {
        this.indexQuestion = this.indexQuestion + 1;
      }
    },
    //quay lại câu hỏi trước đó
    prevQuestion() {
      //Chuyển sang câu hỏi tiếp theo
      if (this.indexQuestion > 0) {
        this.indexQuestion = this.indexQuestion - 1;
      }
    },
    cancelTryExerciseOnClick() {
      this.$router
        .push({
          path: `/theme/${this.$route.params.id}`,
        })
        .catch(() => {});
    },
    findQuestionType() {
      let me = this;
      if (Array.isArray(this.exerciseObj.questions)) {
        return this.exerciseObj.questions[me.indexQuestion].Type;
      } else {
        return 0;
      }
    },
    /**
     * reset lại bài làm
     */

    tryAgainOnClick() {
      let me = this;
      //quay trở về câu hỏi đầu tiên
      this.indexQuestion = 0;
      //reset lại tất cả các phần đã làm
      this.resetTryAnswers();
      //tạo các  câu trả lời mới từ người dùng
      this.createTryAnswers({ questions: me.exerciseObj.questions });
    },

    completeAnswersOnclick() {
      this.checkAnswersIsDone();
      this.doneQuestions = 0; //số lượng câu hỏi đã làm
      this.tryAnswers.forEach((answer) => {
        if (answer.isDone) {
          this.doneQuestions++;
        }
      });

      this.setIsComplete(true);
    },
    /**
     * set trạng thái hoàn thành hay  chưa
     */
    setIsComplete(isComplete) {
      this.isComplete = isComplete;
    },
    /**
     * Chọn câu hỏi tương ứng
     */
    setIndexQuestion(index) {
      this.setIsComplete(false);
      //Chọn câu hỏi
      this.indexQuestion = index;
    },
  },
  data() {
    return {
      cancelText: "Quay lại",
      pauseMusic: false,
      MusicToggleText: "Tắt nhạc",
      tryAgainText: "Làm lại",
      completeText: "Hoàn thành",
      currentQuestion: {},
      currentExercise: {},
      indexQuestion: 0,
      doneQuestions: 0,
      isComplete: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
}
.background-image {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.listImages {
  display: flex;
}
.question-img {
  height: 160px;
  margin: 12px 0px 0px 12px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgb(0 0 0 / 16%);
}
.choose-theme {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content-question {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.header-container {
  padding: 20px;
}
.btns-left {
  .btn {
    margin-right: 10px;
  }
}
.btn {
}
.qty-question {
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
}
.btns-right {
  .btn {
    margin-left: 8px;
  }
}

.btn-content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  cursor: pointer;
}

.border-left {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.border-right {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.content-container {
  height: calc(100vh - 80px);
}
.prev-btn {
  width: 98px;
  height: 140px;

  .prev-icon {
    display: block;
    width: 50px;
    height: 29px;
    background-repeat: no-repeat;
    background-image: url("../../assets/subjects-avatar/back_question.9ce314dd.svg");
  }
  .text {
    margin-top: 4px;
    display: block;
  }
}
.question-container {
  box-sizing: border-box;
  height: 100%;
  margin: 20px 20px;
  flex: 1;
}
.question-view {
  box-sizing: border-box;
  width: 100%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #fff;
  height: 50%;
  padding: 12px;
  font-size: 18px;
  border-bottom: 1px solid #ccc;
}

.next-btn {
  width: 98px;
  height: 140px;

  .next-icon {
    display: block;
    width: 50px;
    height: 29px;
    background-repeat: no-repeat;
    background-image: url("../../assets/subjects-avatar/next_question.60d3e07d.svg");
  }
  .text {
    margin-top: 4px;
    display: block;
  }
}
</style>
