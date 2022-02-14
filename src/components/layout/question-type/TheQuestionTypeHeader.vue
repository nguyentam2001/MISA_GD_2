<template>
  <div class="question-type-header">
    <div class="header-top algin-center">
      <router-link class="hide-link" to="/">
        <div class="icon-left margin-right-16"></div>
      </router-link>
      <div class="icon-subject margin-right-16"></div>
      <div class="title">Nhập tên bài tập...</div>
    </div>
    <div class="header-bottom justify-between">
      <div class="header-left algin-center">
        <div class="subjects selected margin-right-12">
          <el-select
            v-model="exerciseObj.SubjectID"
            :placeholder="subjectsTitle"
          >
            <el-option
              v-for="subject in subjects"
              :key="subject.SubjectID"
              :label="subject.SubjectName"
              :value="subject.SubjectID"
            >
            </el-option>
          </el-select>
        </div>
        <div class="grade selected margin-right-12">
          <el-select v-model="exerciseObj.GradeID" :placeholder="gradesTitle">
            <el-option
              v-for="grade in grades.grades"
              :key="grade.GradeID"
              :label="grade.GradeName"
              :value="grade.GradeID"
            >
            </el-option>
          </el-select>
        </div>
        <div class="update-info margin-right-12">
          <base-button
            :styleObject="btnStyleNormal"
            :handleOnClick="showFormDetailOnClick"
            :text="updateText"
          />
        </div>
        <div class="change-edit margin-right-12">
          <base-button :styleObject="btnStyleNormal" :text="changeText" />
        </div>
      </div>
      <div class="header-right algin-center">
        <div class="btn-try">
          <base-button :styleObject="btnStyleNormal" :text="tryText" />
        </div>
        <div class="btn-complete margin-left-16">
          <base-button :handleOnClick="completeQuestion" :text="completeText" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseButton from "../../BaseButton.vue";
import resource from "../../../script/custom.js";
import custom from "../../../script/custom.js";
import { mapMutations, mapState, mapGetters } from "vuex";

export default {
  components: {
    BaseButton,
  },
  computed: {
    ...mapGetters(["subjects", "grades", "topics", "exercises", "exerciseObj"]),
    ...mapState([
      "exerciseObj",
      "subjects",
      "SubjectID",
      "GradeID",
      "stateCb",
      "stateShowQuestionView",
    ]),
  },
  watch: {},
  methods: {
    ...mapMutations(["completeQuestion", "showDialog"]),
    mapingStateData() {
      //mapping khối lớp vào dữ liệu
      this.gradesObject.data = this.grades.grades;
      //mapping môn học vào dữ liệu
      this.subjectsObject.data = this.subjects;
    },
    showFormDetailOnClick() {
      this.showDialog();
    },
  },
  data() {
    return {
      subjectsObject: custom.Subject,
      gradesObject: custom.Grade,
      subjectsTitle: resource.Subject.SubjectsTitle,
      gradesTitle: resource.Grade.GradesTitle,
      btnStyleNormal: {
        backgroundColor: "#f1f2f7",
        border: "1px solid #a6a9be",
        color: "var(--text-color)",
        padding: "0px",
      },
      updateText: "Bổ sung thông tin",
      changeText: "Đổi kiểu soạn",
      tryText: "Làm thử",
      completeText: "Hoàn thành",
    };
  },
};
</script>
<style lang="scss" scoped>
.question-type-header {
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
  width: 100%;
  box-sizing: border-box;
  height: 120px;
  padding: 12px 12px 12px 24px;
  .header-top {
    .icon-left {
      background-image: url("../../../assets/icons/ic_Down.svg");
      width: 18px;
      height: 17px;
    }
    .icon-subject {
      background-image: url("../../../assets/icons/img_eng.svg");
      border-radius: 50%;
      width: 40px;
      height: 40px;
      overflow: hidden;
    }
    .title {
      font-size: 20px;
      font-weight: 600;
      color: #4e5b6a;
    }
  }
  .header-bottom {
    margin-top: 16px;
    .header-left {
      .subjects {
        width: 158px;
      }
      .grade {
        width: 100px;
      }
      .update-info {
        width: 138px;
      }
      .change-edit {
        width: 112px;
      }
    }
  }
}
::v-deep .router-link-active {
  border-bottom: none;
}
::v-deep .el-input__inner {
  border-radius: 10px;
  color: var(--text-color);
  border: 1px solid #a6a9be;
  height: 40px;
  background: none;
}

::v-deep .el-input__inner::placeholder {
  color: var(--text-color);
}

::v-deep.el-select-dropdown__item.selected {
  color: var(--text-color);
  font-weight: 500;
  background: #ece7fe;
  margin: 8px;
  border-radius: 10px;
}
.el-select-dropdown__item {
  margin: 0px 8px;
  padding: 0 8px;
  color: var(--text-color);
}
::v-deep .el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  border-radius: 10px;
}
</style>
