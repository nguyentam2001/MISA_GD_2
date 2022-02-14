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
          :key="index"
        >
          <div class="item-header">
            {{ question.Content }}
          </div>
          <div class="item-answer">
            <div
              class="answer"
              v-for="(answer, index) in question.Answers"
              :key="index"
            >
              <div class="icons" v-bind:class="{ correct: answer.Correct }">
                {{ convertOrder(index) }}
              </div>
              <div class="text">{{ answer.Content }}</div>
            </div>
          </div>
          <div class="content-footer">
            <div class="footer-right">
              <div class="btn-update margin-left-12">
                <base-button
                  :text="text"
                  :handleOnClick="updateQuestion"
                  :payload="{ id: index, type: question.Type }"
                  :styleObject="btnStyleNormal"
                />
              </div>
              <div class="btn-link margin-left-12"></div>
              <div class="btn-delete margin-left-12"></div>
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
import { mapGetters, mapMutations, mapState } from "vuex";
import BaseButton from "../../BaseButton.vue";
import BaseTooltip from "../../BaseTooltip.vue";
import CoursewareDetail from "../../../views/courseware/CoursewareDetail.vue";
import QuestionTypeDetail from "../../../views/question-type/QuestionTypeDetail.vue";

export default {
  components: {
    BaseButton,
    BaseTooltip,
    QuestionTypeDetail,
    CoursewareDetail,
  },
  methods: {
    ...mapMutations(["showFormQuestion", "updateQuestion"]),
  },
  computed: {
    ...mapState({
      Questions: (state) => state.questions.Questions,
    }),

    ...mapGetters(["convertOrder"]),
  },
  data() {
    return {
      btnStyleNormal: {
        backgroundColor: "#f1f2f7",
        border: "1px solid #a6a9be",
        color: "var(--text-color)",
        padding: "0px",
      },
      text: "Chỉnh sửa",
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
      height: 192px;
      margin-top: 16px;
      overflow: hidden;
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
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 20px;
    margin-right: 20px;
    height: 36%;
    .footer-right {
      display: flex;
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
    }
  }
  .tool-tip-wrapper {
    position: absolute;
    right: -96px;
    top: 0;
  }
}
</style>
