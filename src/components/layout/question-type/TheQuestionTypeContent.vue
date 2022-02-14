<template>
  <div class="question-type-content">
    <div class="content">
      <div class="title">
        Nhập khẩu / Tách câu hỏi tự động sử dụng công nghệ AI
      </div>
      <div class="content-body">
        <div class="icon"></div>
        <p class="text">
          Nhấn để tải lên file bài tập hoặc kéo thả file vào đây.File có định
          dạng xls, xlsx, doc, docx, pdf
        </p>
        <div class="btn-excel flex-center">Tải tệp Excel mẫu</div>
      </div>
    </div>
    <div class="create-new-title">Tạo câu hỏi mới</div>
    <div class="group-items">
      <div class="item" @click="showFormQuestion(stateFromQuestion.Choose)">
        <div class="item-icon choose"></div>
        <div class="item-text">Chọn đáp án</div>
      </div>
      <div class="item" @click="showFormQuestion(stateFromQuestion.TrueFalse)">
        <div class="item-icon true-false"></div>
        <div class="item-text">Đúng sai</div>
      </div>
      <div class="item" @click="showFormQuestion(stateFromQuestion.FillBlank)">
        <div class="item-icon fill-blank"></div>
        <div class="item-text">Điền vào chỗ trống</div>
      </div>
      <div class="item" @click="showFormQuestion(stateFromQuestion.Essay)">
        <div class="item-icon essay"></div>
        <div class="item-text">Tự luận</div>
      </div>
      <div class="item">
        <div class="item-icon sentences"></div>
        <div class="item-text">Câu ghép nối</div>
      </div>
      <div
        class="item"
        @click="showFormQuestion(stateFromQuestion.GroupQuestion)"
      >
        <div class="item-icon group-question"></div>
        <div class="item-text">Câu hỏi nhóm</div>
      </div>
    </div>
    <question-type-detail />
    <courseware-detail />
    <base-popup />
  </div>
</template>
<script>
import QuestionTypeDetail from "../../../views/question-type/QuestionTypeDetail.vue";
import CoursewareDetail from "../../../views/courseware/CoursewareDetail.vue";
import BasePopup from "../../BasePopup.vue";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    QuestionTypeDetail,
    CoursewareDetail,
    BasePopup,
  },
  computed: {
    ...mapState(["stateFromQuestion"]),
  },
  methods: {
    ...mapMutations(["showFormQuestion"]),
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.question-type-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  .create-new-title {
    margin-top: 54px;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-color);
  }
  .group-items {
    margin-top: 30px;
    display: flex;
    width: 50%;
    justify-content: space-between;
    .item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      .item-icon {
        width: 64px;
        height: 64px;
        background-repeat: no-repeat;
        background-position: center;
      }
      .choose {
        background-image: url("../../../assets/icons/Group_52346.svg");
      }
      .true-false {
        background-image: url("../../../assets/icons/Group_52347.svg");
      }
      .fill-blank {
        background-image: url("../../../assets/icons/Group_52348.svg");
      }
      .essay {
        background-image: url("../../../assets/icons/Group_52349.svg");
      }
      .sentences {
        background-image: url("../../../assets/icons/Group_52350.svg");
      }
      .group-question {
        background-image: url("../../../assets/icons/Group_52351.svg");
      }
      .item-text {
        margin-top: 20px;
        font-size: 16px;
      }
    }
  }
  .content {
    text-align: center;
    margin-top: 54px;
  }
  .title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 30px;
  }
  .content-body {
    width: 838px;
    min-height: 228px;
    .icon {
      width: 64px;
      height: 64px;
      background-image: url("../../../assets/icons/Group_52284.svg");
    }

    .text {
      display: block;
      max-width: 340px;
    }
  }
  .btn-excel {
    background-color: rgba(138, 107, 246, 0.2);
    border-radius: 10px;
    padding: 0 10px;
    height: 40px;
    max-width: 128px;
    overflow: hidden;
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .content-body {
    background-color: #ffffff;
    border-radius: 9.5px;
    border: 1px dashed #b6b9ce;
    width: 50%;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
