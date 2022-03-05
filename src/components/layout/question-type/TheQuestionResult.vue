<template>
  <div class="question-result">
    <div class="content">
      <div class="content-header justify-between">
        <div class="left flex-algin">
          <div class="btn-nomal margin-right-16">
            Chọn câu từ thư viện học liệu
          </div>
          <div class="btn-nomal">Sắp xếp thứ tự câu hỏi</div>
        </div>
        <div class="right flex-algin">
          <div class="btn-nomal">Nhập khẩu</div>
          <div class="btn-nomal margin-left-16">
            Tách câu hỏi tự động sử dụng AI
          </div>
        </div>
      </div>
      <div class="content-list">
        <div
          class="content-item"
          v-for="(question, index) in Questions"
          :key="question.QuestionID"
        >
          <div class="item-header">
            <div class="flex">
              <span class="question-index">Câu {{ index + 1 }}:</span>
              <span class="margin-left-8" v-html="question.Content"></span>
            </div>

            <div>
              <img
                v-for="(attachment, index) in question.Attachments"
                :key="index"
                class="question-img"
                :src="require(`../../../assets/subjects-avatar/${attachment}`)"
              />
            </div>
          </div>
          <div class="item-answer">
            <div
              class="answer"
              v-for="(answer, index) in question.Answers"
              :key="index"
            >
              <div class="icons" v-bind:class="{ correct: answer.Correct }">
                {{
                  question.type != FillTheBlankType
                    ? index + 1
                    : convertOrder(index)
                }}
              </div>
              <div class="text">{{ AnswerContents(answer.Content) }}</div>
            </div>
          </div>
          <div class="content-footer">
            <div class="question-hint" v-if="question.Hint">
              <div class="title">
                Lời giải:
                <span class="text-hint">{{ question.Hint }}</span>
              </div>
            </div>
            <div class="footer-right">
              <div class="btn-update margin-left-12">
                <el-button
                  class="t-btn btnStyleNormal"
                  @click="updateQuestionOnClick(index, question.Type)"
                  >Chỉnh sửa</el-button
                >
              </div>
              <div
                class="btn-link margin-left-12"
                @click="replicationQuestion(index, question.Type)"
              ></div>
              <div
                class="btn-delete margin-left-12"
                @click="deleteQuestionOnClick(question.QuestionID)"
              ></div>
            </div>
          </div>
        </div>
        <div class="tool-tip-wrapper">
          <base-tooltip
            v-for="question in questions"
            :key="question.image"
            :content="question.text"
            v-bind:handleClick="showFormQuestion"
            :payload="question.type"
            :questionType="question.image"
          />
        </div>
      </div>
    </div>
    <question-type-detail />
    <courseware-detail />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import Enum from "../../../script/enum.js";
import BaseTooltip from "../../BaseTooltip.vue";
import CoursewareDetail from "../../../views/courseware/CoursewareDetail.vue";
import QuestionTypeDetail from "../../../views/question-type/QuestionTypeDetail.vue";

export default {
  components: {
    BaseTooltip,
    QuestionTypeDetail,
    CoursewareDetail,
  },

  methods: {
    ...mapMutations(["showFormQuestion", "bindQuestion", "setFormMode"]),
    ...mapActions(["handleQuestion"]),
    /**
     *
     */
    AnswerContents(value) {
      if (Array.isArray(value)) {
        return value.join(" / ");
      } else {
        return value;
      }
    },
    /**
     * Sửa đổi câu hỏi
     * Author: NVTAM (14/2/2022)
     */
    updateQuestionOnClick(index, questionType) {
      //Hiện form nhập câu hỏi tương dứng
      this.showFormQuestion({
        questionForm: Enum.typeFormQuestion.UpDateQuestion, //form ở trạng thái update
        questionType: questionType + "",
      });
      //bind dữ liệu câu hỏi vào form
      this.bindQuestion({ id: index, type: questionType + "" });
    },
    /**
     * Nhân bản câu hỏi giống update và thêm mới
     * index là index của câu hỏi
     * questionType là kiểu câu hỏi
     * Author:  NVTAM (14/2/2022)
     */

    replicationQuestion(index, questionType) {
      //Hiện form nhập câu hỏi tương dứng
      this.showFormQuestion({
        questionForm: Enum.typeFormQuestion.AddQuestion, //form ở trạng thái thêm mới
        questionType: questionType + "",
      });
      //bind dữ liệu câu hỏi vào form
      this.bindQuestion({ id: index, type: questionType + "" });
    },

    deleteQuestionOnClick(questionID) {
      this.setFormMode({
        formMode: Enum.typeFormQuestion.DeleteQuestion,
        id: questionID,
      });

      //Gửi request xóa
      this.handleQuestion();
      if (this.exerciseObj.QtyQuestions <= 1) {
        this.$router.replace({ path: "/" });
      }
    },
  },
  mounted() {
    this.$store.dispatch("loadExerciesByID", this.$route.params.id);
  },
  computed: {
    ...mapState({
      Questions: (state) => state.exerciseObj.questions,
    }),
    ...mapState(["exerciseObj"]),

    ...mapGetters(["convertOrder"]),
  },
  data() {
    return {
      FillTheBlankType: Enum.stateFromQuestion.FillBlank,
      questions: [
        {
          type: "1",
          text: "Thêm câu chọn đáp án",
          image: "Group_52228",
        },
        {
          type: "2",
          text: "Thêm câu đúng sai",
          image: "Group_52229",
        },
        {
          type: "3",
          text: "Thêm câu Điền vào chỗ trống",
          image: "Group_52230",
        },
        {
          type: "4",
          text: "Thêm câu tự luận",
          image: "Group_52231",
        },
        {
          type: "6",
          text: "Thêm câu ghép nối",
          image: "Group_52306",
        },
        {
          type: "6",
          text: "Thêm câu hỏi nhóm",
          image: "Group_52232",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.content {
  padding: 24px 170px;
  .content-header {
    .btn-nomal {
      font-weight: 500;
      color: #8a6bf6;
      background-color: rgba(138, 107, 246, 0.2);
      border-radius: 10px;
      padding: 0 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      overflow: hidden;
    }
  }
  .content-list {
    margin-top: 24px;
    position: relative;
    .content-item {
      background-color: #ffffff;
      border-radius: 6px;
      border-top: 8px solid #00a9ec;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);

      margin-top: 16px;
      overflow: hidden;
      .question-index {
        font-weight: 600;
      }
      .item-header {
        margin-top: 28px;
        margin-left: 20px;
        margin-bottom: 24px;
      }
    }
    .item-answer {
      margin-left: 20px;
      margin-right: 20px;
      padding-bottom: 24px;
      border-bottom: 2px solid #d8d7d7;
      display: flex;
      align-items: center;
      .answer {
        display: flex;
        align-items: center;
        .icons {
          margin-right: 8px;
          margin-left: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #b6b9ce;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          overflow: hidden;
          font-weight: 700;
          color: #ffffff;
        }

        .icons.correct {
          background-color: #00c542;
        }
      }
      .answer:first-child > .icons {
        margin-left: 0px;
      }
    }
  }
  .content-footer {
    margin: 12px 20px;
    height: 36%;

    .question-hint {
      padding-bottom: 12px;
      border-bottom: 2px solid #d8d7d7;
    }
    .title {
      font-weight: 600;
    }
    .text-hint {
      font-weight: 500;
    }

    .footer-right {
      display: flex;
      justify-content: flex-end;
      margin-top: 12px;
      .btn-link {
        cursor: pointer;
        width: 40px;
        height: 40px;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("../../../assets/icons/Group_52104.svg");
      }
      .btn-delete {
        cursor: pointer;
        width: 40px;
        height: 40px;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("../../../assets/icons/Group_47435.svg");
      }
      .btnStyleNormal {
        background-color: #f1f2f7;
        border: 1px solid #a6a9be;
        color: var(--text-color);
        padding: 0px;
      }
    }
  }
  .tool-tip-wrapper {
    position: absolute;
    right: -96px;
    top: 0;
  }
  .question-img {
    height: 140px;
    margin: 12px 0px 0px 12px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgb(0 0 0 / 16%);
  }
}
</style>
