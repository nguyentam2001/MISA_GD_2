<template>
  <div class="block-center">
    <div class="form-value">
      <div class="form-header">
        <div class="text-editor">
          <ckeditor
            class="text-editer-style"
            :editor="editor"
            v-model="AddAnswerQuestion"
            :config="editorConfig"
          ></ckeditor>
        </div>
      </div>
      <div class="group-btn justify-between">
        <div class="btn-left"></div>
        <div class="btns-right flex-algin">
          <div class="btn-with-112">
            <base-button
              :handleOnClick="hideFormQuestion"
              :styleObject="btnStyleNormal"
              :text="cancelText"
            />
          </div>
          <div class="btn-with-112 margin-left-8">
            <base-button :text="save" :handleOnClick="saveAnswerOnClick" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseButton from "../../components/BaseButton.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapMutations, mapState } from "vuex";
import Enum from "../../script/enum";

export default {
  components: {
    BaseButton,
  },
  computed: {
    ...mapState({
      Question: (state) => state.questions.Question,
      QuestionTrueFalse: (state) => state.questions.QuestionTrueFalse,
      FillTheBlank: (state) => state.questions.FillTheBlank,
      Essay: (state) => state.questions.Essay,
      isValid: (state) => state.questions.ruleValid.isValid,
    }),
    ...mapState(["showQuestionType"]),
    AddAnswerQuestion: {
      get: function () {
        switch (this.showQuestionType) {
          case "2":
            return this.QuestionTrueFalse.Hint;
          case "3":
            return this.FillTheBlank.Hint;
          case "4":
            return this.Essay.Hint;
          default:
            return this.Question.Hint;
        }
      },

      set: function (newValue) {
        switch (this.showQuestionType) {
          case "2":
            this.QuestionTrueFalse.Hint = newValue;
            break;
          case "3":
            this.FillTheBlank.Hint = newValue;
            break;
          case "4":
            this.Essay.Hint = newValue;
            break;
          default:
            this.Question.Hint = newValue;
            break;
        }
      },
    },
  },
  methods: {
    ...mapMutations([
      "hideFormQuestion",
      "validateAnswer",
      "showPopUp",
      "showContentListQuestion",
    ]),
    /**
     * Lấy tên và giá trị của câu hỏi hiện tại
     * Author: NVTam (16/2/2022)
     */
    getNameQuestionType() {
      Object.keys(Enum.stateQuestionType).forEach((key) => {
        if (Enum.stateQuestionType[key] == this.showQuestionType) {
          this.currQuestion.type = Enum.stateQuestionType[key];
          this.currQuestion.name = key;
        }
      });
    },
    /**
     * Lưu trữ dữ liệu
     * Author: NVTAM (16/2/2022)
     */
    saveAnswerOnClick() {
      //Lấy tên và giá trị của câu hỏi hiện tại
      this.getNameQuestionType();
      //validate
      this.validateAnswer({
        name: this.currQuestion.name,
        type: this.showQuestionType,
      });

      if (this.isValid) {
        //Ẩn form nhập câu hỏi
        this.hideFormQuestion();
        //Lưu dữ liệu sang trang cuối
        this.showContentListQuestion({
          Type: this.currQuestion.type,
          QuestionForm: Enum.typeFormQuestion.AddQuestion,
        });
        //Chuyển đến view danh sách các câu hỏi
        const path = "/question-type/list";
        if (this.$route.path !== path) this.$router.push(path);
      } else {
        this.showPopUp();
      }
    },
  },
  data() {
    return {
      currQuestion: {
        name: null,
        type: null,
      },
      btnStyleNormal: {
        backgroundColor: "#f1f2f7",
        border: "1px solid #a6a9be",
        color: "var(--text-color)",
        padding: "0px",
        width: "112px",
      },
      cancelText: "Hủy",
      save: "Lưu",
      //Selector
      selectorStyle: {
        width: "100%",
        border: "none",
        backgroundColor: "#f8e373",
      },
      //editor

      editor: ClassicEditor,
      editorData: "Nhập lời giải tại đây...",

      editorConfig: {
        placeholder: "Nhập câu trả lời tại đây...",
        toolbar: [
          "Bold",
          "Italic",
          "Underline",
          "alignment",
          "BulletedList",
          "NumberedList",
          "insertImage",
          "mediaEmbed",
          "BlockQuote",
          "insertTable",
          "undo",
          "redo",
        ],
      },
    };
  },
};
</script>
<style lang="scss" scoped>
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
    color: #afeca4;
    width: 97px;
    position: relative;
    height: 161px;
    overflow: hidden;
    border-top-left-radius: 10px;
    background-repeat: no-repeat;
    background-image: url("../../assets/icons/Rectangle_22473.svg");
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
    .form-value {
      position: relative;
      background-color: #ffffff;
      border-radius: 10px;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .title {
      position: absolute;
      z-index: 1;
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
      .text {
      }
      .icon {
        background-repeat: no-repeat;
        background-position: center;
        width: 10px;
        height: 6px;
        background-image: url("../../assets/icons/ic_Chevron_8_2.svg");
      }
    }
    .group-btn {
      position: absolute;
      right: 24px;
      bottom: 24px;
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
  height: 600px !important;
  overflow: hidden;
}
.form-footer {
  display: flex;
  justify-content: center;

  margin-top: 332px;
  padding: 0 24px;
}
</style>
