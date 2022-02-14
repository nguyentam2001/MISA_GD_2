<template>
  <div v-bind:class="{ 'is-hide': isHide }">
    <div class="choose-correct-answer">
      <div class="block-left">
        <div class="icon-top-right"></div>
        <div class="text-left">Xem giao diện làm bài</div>
        <div class="icon-center"></div>
        <div class="icon-bottom-center"></div>
      </div>
      <div class="block-center">
        <div class="index-question">
          Câu {{ !Questions.length ? 1 : Questions.length + 1 }}:
        </div>
        <div class="title">
          <base-select-question />
        </div>
        <component :is="componentActive" />
      </div>
      <div class="block-right">
        <div
          class="block-right-group"
          v-if="stateFromQuestion.AddAnswers != showQuestionType"
          @click="showFormQuestion(stateFromQuestion.AddAnswers)"
        >
          <div class="icon-top-left"></div>
          <div class="icon-center"></div>
          <div class="icon-bottom-right"></div>
          <div class="text-right">Thêm lời giải</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChooseCorrectAnswer from "../question-type/ChooseCorrectAnswer.vue";
import TrueFalse from "../question-type/TrueFalse.vue";
import FillTheBlank from "../question-type/FillTheBlank.vue";
import EssayQuestions from "../question-type/EssayQuestions.vue";
import AddAnswers from "../question-type/AddAnswers.vue";
import GroupQuestions from "../question-type/GroupQuestions.vue";
import BaseSelectQuestion from "../../components/layout/question-type/BaseSelectQuestion.vue";

import { mapState, mapMutations } from "vuex";

export default {
  props: {},
  components: {
    ChooseCorrectAnswer,
    TrueFalse,
    FillTheBlank,
    EssayQuestions,
    AddAnswers,
    GroupQuestions,
    BaseSelectQuestion,
  },
  computed: {
    componentActive() {
      switch (this.showQuestionType) {
        case this.stateFromQuestion.Choose:
          return ChooseCorrectAnswer;
        case this.stateFromQuestion.TrueFalse:
          return TrueFalse;
        case this.stateFromQuestion.FillBlank:
          return FillTheBlank;
        case this.stateFromQuestion.Essay:
          return EssayQuestions;
        case this.stateFromQuestion.AddAnswers:
          return AddAnswers;
        case this.stateFromQuestion.GroupQuestion:
          return GroupQuestions;
        default:
          break;
      }
      return null;
    },
    ...mapState(["isHide", "showQuestionType", "stateFromQuestion"]),
    ...mapState({
      Questions: (state) => state.questions.Questions,
    }),
  },
  created() {},
  methods: {
    ...mapMutations(["showFormQuestion"]),
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.is-hide {
  display: none;
}
.choose-correct-answer {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #0000004d;
  .block-left {
    color: #afeca4;
    border-top-right-radius: 10px;
    width: 96px;
    position: relative;
    height: 162px;
    overflow: hidden;
    background-repeat: no-repeat;
    background-image: url("../../assets/icons/Rectangle_22473_2.svg");
    .icon-top-right {
      background-color: #96e189;
      border-radius: 50%;
      width: 64px;
      height: 64px;
      position: absolute;
      overflow: hidden;
      right: -18px;
      top: -18px;
      background-image: url("../../assets/icons/Ellipse_5910_2.svg");
    }
    .text-left {
      width: 70px;
      height: 64px;
      z-index: 1;
      right: 17px;
      top: 54px;
      color: var(--text-color);
      position: absolute;
    }
    .icon-center {
      position: absolute;
      color: #42d674;
      width: 44px;
      height: 48px;
      right: 28px;
      top: 23px;
      background-image: url("../../assets/icons/Group_52263.svg");
    }
    .icon-bottom-center {
      background-color: #96e189;
      border-radius: 50%;
      width: 64px;
      height: 64px;
      position: absolute;
      overflow: hidden;
      bottom: -18px;
      left: -18px;
      background-image: url("../../assets/icons/Ellipse_5910_2.svg");
    }
  }

  .block-right {
    width: 97px;
    position: relative;
    height: 161px;
    overflow: hidden;
    border-top-left-radius: 10px;
    background-repeat: no-repeat;

    .block-right-group {
      color: #afeca4;
      cursor: pointer;
      width: 100%;
      height: 100%;
      background-image: url("../../assets/icons/Rectangle_22473.svg");
    }
    .icon-top-left {
      top: -18px;
      left: -18px;
      position: absolute;
      background-color: #fff2ab;
      border-radius: 50%;
      width: 64px;
      height: 64px;
      background-image: url("../../assets/icons/Ellipse_5910.svg");
    }
    .icon-center {
      position: absolute;
      background-color: #fff2ab;
      border-radius: 50%;
      width: 64px;
      height: 64px;
      background-repeat: no-repeat;
      top: 20px;
      background-position: center;
      left: 24px;
      background-image: url("../../assets/icons/flaticon_3025463.svg");
    }
    .icon-bottom-right {
      position: absolute;
      background-color: #fff2ab;
      border-radius: 50%;
      width: 64px;
      height: 64px;
      background-repeat: no-repeat;
      bottom: -20px;
      background-position: center;
      right: -18px;
      background-image: url("../../assets/icons/Ellipse_5910.svg");
    }
    .text-right {
      width: 70px;
      height: 64px;
      right: 4px;
      top: 64px;
      color: var(--text-color);
      position: absolute;
    }
  }
  .block-center {
    position: relative;
    width: 1122px;
    height: 612px;
    .form-value {
      background-color: #ffffff;
      border-radius: 10px;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .index-question {
      position: absolute;
      z-index: 3;
      /* margin-top: 10px; */
      padding-left: 10px;
      background-color: #f8e373;
      border-top-left-radius: 10px;
      height: 4p;
      line-height: 40px;
      font-size: 17px;
    }
    .title {
      position: absolute;
      z-index: 2;
      margin-left: 41px;
      border-top-left-radius: 10px;
      border-bottom-right-radius: 10px;
      background-color: #f8e373;
      width: 298px;
      height: 40px;
      font-size: 16px;
      font-weight: 700;
      color: #4e5b6a;
      margin-bottom: 10px;
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .icon {
        background-repeat: no-repeat;
        background-position: center;
        width: 10px;
        height: 6px;
        background-image: url("../../assets/icons/ic_Chevron_8_2.svg");
      }
    }
    .group-btn {
    }
  }
}
.form-header {
  position: relative;
  background-color: #fff2ab;
}
.text-editor {
  position: absolute;
  top: 0px;
  z-index: 0;
  left: 0;
  right: 0;
}
::v-deep .ck.ck-toolbar.ck-toolbar_grouping > .ck-toolbar__items {
  justify-content: flex-end;
}
::v-deep .ck.ck-toolbar.ck-toolbar_grouping > .ck-toolbar__items {
  background-color: #fff2ab;
  width: 100%;
}
::v-deep .ck.ck-toolbar {
  border: none;
}
::v-deep .ck.ck-editor__main > .ck-editor__editable {
  background-color: #fff2ab;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  outline: none;
  border: none;
  width: 100%;
  height: var(--height-ckeditor);
  overflow: hidden;
}
.form-footer {
  display: flex;
  justify-content: space-between;
  margin-top: calc(var(--height-ckeditor) + 60px);
  padding: 0 24px;
}
</style>
