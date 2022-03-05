<template>
  <div class="block-center">
    <div class="form-value">
      <div class="form-header">
        <div class="title cb-header">
          <div class="cb-header cb-left">
            <!-- <div class="text">Câu hỏi nhóm</div>
            <div class="icon"></div> -->
          </div>
          <div class="cb-header cb-right">
            <el-switch v-model="turnOn"> </el-switch>
            <div class="text margin-left-8">Đánh số thứ tự câu hỏi nhỏ</div>
          </div>
        </div>
        <div class="text-editor">
          <ckeditor
            class="text-editer-style"
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
          ></ckeditor>
        </div>
      </div>
      <div class="form-content">
        <div class="content-left">
          <div class="index-questions">
            <div class="btn-index">1</div>
            <div class="btn-index">2</div>
            <div class="btn-index">3</div>
            <div class="btn-index">4</div>
            <div class="btn-index">
              <div class="icon-add"></div>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="content-editer">
            <div class="title">
              <div class="text">Câu 1-Chọn đáp án đúng</div>
              <div class="icon"></div>
            </div>
            <ckeditor
              class="text-editer-style"
              :editor="editor"
              v-model="editorData"
              :config="editorConfig"
            ></ckeditor>
          </div>
          <div class="form-footer">
            <base-card-item />
          </div>
        </div>
      </div>
    </div>
    <div class="group-btn margin-top-20 justify-between">
      <div class="btn-left">
        <div class="btn-with-112">
          <base-button :styleObject="btnStyleNormal" :text="addResult" />
        </div>
      </div>
      <div class="btns-right flex-algin">
        <div class="btn-with-112">
          <base-button
            :handleOnClick="hideFormQuestion"
            :styleObject="btnStyleNormal"
            :text="cancelText"
          />
        </div>
        <div class="margin-left-8">
          <base-button
            :styleObject="btnStyleNormal"
            :handleOnClick="showContentListQuestion"
            :text="save"
          />
        </div>
        <div class="margin-left-8">
          <base-button :handleOnClick="saveAnswerOnClick" :text="saveAdd" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseButton from "../../components/BaseButton.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BaseCardItem from "../../components/layout/question-type/BaseCardItem.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    BaseButton,
    BaseCardItem,
  },
  methods: {
    ...mapMutations(["hideFormQuestion", "showContentListQuestion"]),
    saveAnswerOnClick() {
      //Chuyển đến view danh sách các câu hỏi
      this.$router.push({ path: "/question-type/list" });
    },
  },

  data() {
    return {
      btnStyleNormal: {
        backgroundColor: "#f1f2f7",
        border: "1px solid #a6a9be",
        color: "var(--text-color)",
        padding: "0px",
        width: "112px",
      },
      addResult: "Thêm đáp án",
      cancelText: "Hủy",
      save: "Lưu và đóng",
      saveAdd: "Lưu và thêm câu",
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

      answers: [
        "Group_52237.svg",
        "Group_52215.svg",
        "Group_52209.svg",
        "Group_52210.svg",
      ],
      imageAttach: "",
      images: [],

      turnOn: false, // đánh số thứ tự câu hỏi nhóm
    };
  },
};
</script>
<style lang="scss" scoped>
.cb-header {
  display: flex;
  align-items: center;
  .cb-left {
    width: 280px;
    justify-content: space-between;
    min-width: 100px;
    padding-right: 12px;
  }
  .cb-right {
    height: 100%;
    margin-left: 59px;
    padding-left: 12px;
    border-left: 2px solid #dddada;
    font-size: 14px;
  }
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
      width: 1122px;
      height: 630px;
      overflow: hidden;
    }
    .title {
      position: absolute;
      z-index: 1;
      border-bottom-right-radius: 10px;
      background-color: #f8e373;
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
    .content-editer .title {
      border-top-left-radius: 10px;
      min-width: 290px;
      height: 36px;
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
::v-deep .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,
.ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners {
  background-color: #fff2ab;
}
.form-header ::v-deep .ck.ck-editor__main > .ck-editor__editable {
  background-color: #fff2ab;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  outline: none;
  border: none;
  width: 1122px;
  height: 184px;
  overflow: hidden;
}
.form-content {
  margin-top: 234px;
  margin-right: 16px;
  display: flex;
  justify-content: space-between;
}

.content-right {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  .content-editer {
    width: 100%;
    width: 1034px;
    border-radius: 10px;
    overflow: hidden;
  }
}
.content-left {
  flex: 1;
  display: flex;
  justify-content: center;
}
.index-questions {
  .btn-index {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(123, 126, 142, 0.2);
    border-radius: 10px;
    width: 40px;
    height: 40px;
    overflow: hidden;
    .icon-add {
      color: #62768e;
      width: 16px;
      height: 16px;
      background-image: url("../../assets/icons/Union_12.svg");
    }
  }
}
.form-content ::v-deep .ck.ck-editor__main > .ck-editor__editable {
  height: 80px;
  width: 1034px;
}
.form-footer {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 16px;
}
</style>
