<template>
  <div class="block-center">
    <div class="form-value">
      <div class="form-header">
        <div class="text-editor">
          <ckeditor
            class="text-editer-style"
            :editor="editor"
            v-model="QuestionTrueFalse.Content"
            :config="editorConfig"
          ></ckeditor>
          <div class="add-image-list">
            <div
              v-for="(image, index) in QuestionTrueFalse.Attachments"
              :key="index"
              class="image-attach"
            >
              <div class="del-img" @click="deleteImgOnclick(index)">
                <i class="fas fa-times-circle"></i>
              </div>
              <img
                v-if="image"
                :src="require(`../../assets/subjects-avatar/${image}`)"
                alt=""
                class="img"
              />
            </div>
            <div class="uplaod-img-btn">
              <input
                class="choose-file"
                id="choose-file"
                name="avatar"
                type="file"
                @change="attachImageOnclick"
              />
              <label class="img-icon" for="choose-file">
                <i class="fas fa-plus"></i>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="form-footer">
        <base-card-true-false />
        <div class="spacing-16"></div>
        <!-- item 2
        <base-card-true-false
          :answer="answers[1]"
          :cardStyle="{ backgroundColor: '#ffaec7' }"
        /> -->
      </div>
    </div>
    <div class="group-btn margin-top-20 justify-between">
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
          <base-button
            :handleOnClick="saveAnswerOnClick"
            :payload="payLoad"
            :text="save"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseButton from "../../components/BaseButton.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Enum from "../../script/enum.js";
import BaseCardTrueFalse from "../../components/layout/question-type/BaseCardTrueFalse.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: {
    BaseButton,
    BaseCardTrueFalse,
  },
  computed: {
    ...mapState({
      QuestionTrueFalse: (state) => state.questions.QuestionTrueFalse,
      isValid: (state) => state.questions.ruleValid.isValid,
    }),
    ...mapState(["showQuestionType", "exerciseObj", "QuestionForm"]),
  },
  methods: {
    ...mapActions(["handleQuestion"]),
    ...mapMutations([
      "hideFormQuestion",
      "showContentListQuestion",
      "validateAnswer",
      "showPopUp",
    ]),
    /**
    Tải file ảnh đính kèm
    Author:NVTAM (7/2/2021)
     */
    attachImageOnclick(e) {
      const file = e.target.files[0];
      this.imageAttach = URL.createObjectURL(file);
      //Thêm ảnh vào phần câu hỏi
      this.QuestionTrueFalse.Attachments.push(file.name);
    },
    /**
    Xóa file ảnh đính kèm
    Author:NVTAM (7/2/2021)
     */
    deleteImgOnclick(index) {
      this.QuestionTrueFalse.Attachments.splice(index, 1);
    },
    /**
     * Lưu trữ dữ liệu câu trả lời
     * Author: NVTAM (13/2/2022)
     */
    saveAnswerOnClick() {
      //validate
      this.validateAnswer({
        name: "QuestionTrueFalse",
        type: this.showQuestionType,
      });
      if (this.isValid) {
        //Ẩn form nhập câu hỏi
        this.hideFormQuestion();
        //Lưu dữ liệu sang trang cuối
        this.showContentListQuestion({
          Type: Enum.stateFromQuestion.TrueFalse,
          QuestionForm: this.QuestionForm,
        });
        //Lưu trữ câu hỏi
        this.handleQuestion();
        //Chuyển đến trang danh sách các câu hỏi
        this.$router
          .push({
            path: `/question-type/${this.exerciseObj.ExerciseID}/list`,
          })
          .catch(() => {});
      } else {
        this.showPopUp();
      }
    },
  },
  data() {
    return {
      payLoad: {
        Type: Enum.stateFromQuestion.TrueFalse,
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
      editorData: "Nhập câu hỏi tại đây...",

      editorConfig: {
        placeholder: "Nhập câu hỏi tại đây...",
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

      answers: ["Đúng", "Sai"],
      imageAttach: "",
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
    }
  }
}
.form-header {
  position: relative;
  background-color: #fff2ab;
  .add-image-list {
    position: absolute;
    bottom: 8px;
    display: flex;
  }

  .choose-file {
    position: absolute;
    right: -120px;
    opacity: 0;
    cursor: pointer;
  }
  .image-attach {
    position: relative;
    box-sizing: border-box;
    padding: 4px;
    border-radius: 4px;

    margin-left: 8px;
    width: 140px;
    height: 80px;
    background: #ffffff;
    .del-img {
      cursor: pointer;
      position: absolute;
      right: -4px;
      top: -4px;
      i {
        color: red;
        background-color: white;
        border-radius: 50%;
      }
    }
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .uplaod-img-btn {
    margin-left: 8px;
    cursor: pointer;
    width: 140px;
    height: 80px;
    background: #ffffff;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img-icon {
    i {
      color: var(--active-primary);
    }
  }
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
  justify-content: center;

  margin-top: calc(var(--height-ckeditor) + 60px);
  padding: 0 24px;
}
</style>
