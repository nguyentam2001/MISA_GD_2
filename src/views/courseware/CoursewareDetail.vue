<template>
  <div class="dialog" v-bind:class="{ 'is-show': isShow }">
    <div class="form-detail">
      <el-form label-width="120px" class="demo-ruleForm">
        <div class="form-wrapper">
          <div class="form-cancel" @click="hideFromOnClick('ruleForm')"></div>
          <div class="form-header margin-bottom-4">Thông tin bổ sung</div>
          <div class="form-content">
            <div class="form-left">
              <div class="avatar-title margin-bottom-4">Ảnh đại diện</div>
              <div class="avatar-img">
                <label for="upload-avatar" class="btn-upload-img"></label>
                <input
                  id="upload-avatar"
                  name="avatar"
                  type="file"
                  @change="onAvatarChange"
                />
                <img
                  v-if="url || `../../assets/subjects-avatar/default.png`"
                  :src="
                    url ||
                    require(`../../assets/subjects-avatar/${imagSubject}`)
                  "
                  alt=""
                  class="img"
                />
              </div>
            </div>
            <div class="form-right">
              <el-row>
                <el-col :span="24"
                  ><div class="grid-content bg-purple-dark margin-bottom-4">
                    <div class="margin-bottom-4">Tên bài tập</div>
                    <el-form-item prop="Title">
                      <div
                        class="form-item-wrapper"
                        v-bind:class="{ showMsg: rules.Title.showMsg }"
                      >
                        <el-input
                          v-model="exerciseObj.Title"
                          @input="checkErrorOnInput($event, 'Title')"
                        ></el-input>
                        <span class="form-label">{{
                          rules.Title.showMsg ? rules.Title.message : null
                        }}</span>
                      </div>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12"
                  ><div class="grid-content bg-purple">
                    <div class="margin-bottom-4">Môn học</div>
                    <el-form-item prop="SubjectID">
                      <div
                        class="form-item-wrapper"
                        v-bind:class="{ showMsg: rules.SubjectID.showMsg }"
                      >
                        <el-select
                          v-model="exerciseObj.SubjectID"
                          :placeholder="subjectsTitle"
                          @input="checkErrorOnInput($event, 'SubjectID')"
                          @change="avatarOnChangeCb(exerciseObj.SubjectID)"
                        >
                          <el-option
                            v-for="subject in subjects"
                            :key="subject.SubjectID"
                            :label="subject.SubjectName"
                            :value="subject.SubjectID"
                          >
                          </el-option>
                        </el-select>
                        <span class="form-label">{{
                          rules.SubjectID.showMsg
                            ? rules.SubjectID.message
                            : null
                        }}</span>
                      </div>
                    </el-form-item>
                  </div></el-col
                >

                <el-col :span="12"
                  ><div class="grid-content bg-purple-light margin-bottom-4">
                    <div class="margin-bottom-4">Khối lớp</div>
                    <el-form-item prop="GradeID">
                      <div
                        class="form-item-wrapper"
                        v-bind:class="{ showMsg: rules.GradeID.showMsg }"
                      >
                        <el-select
                          v-model="exerciseObj.GradeID"
                          :placeholder="gradesTitle"
                          @input="checkErrorOnInput($event, 'GradeID')"
                        >
                          <el-option
                            v-for="grade in grades.grades"
                            :key="grade.GradeID"
                            :label="grade.GradeName"
                            :value="grade.GradeID"
                          >
                          </el-option>
                        </el-select>
                        <span class="form-label">{{
                          rules.GradeID.showMsg ? rules.GradeID.message : null
                        }}</span>
                      </div>
                    </el-form-item>
                  </div></el-col
                >
              </el-row>

              <el-row>
                <el-col :span="24"
                  ><div class="grid-content bg-purple-dark margin-bottom-4">
                    <div class="margin-bottom-4">Chủ đề</div>
                    <el-form-item prop="TopicID">
                      <el-select
                        v-model="exerciseObj.TopicID"
                        :placeholder="topicsTitle"
                      >
                        <el-option
                          v-for="topic in topics"
                          :key="topic.TopicId"
                          :label="topic.TopicName"
                          :value="topic.TopicId"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <div class="col-search">
                <div class="grid-content margin-bottom-4">Thẻ tìm kiếm</div>
              </div>
              <div class="row-search margin-bottom-8">
                <div class="col-search">
                  <div class="btn-tags">Ngữ pháp</div>
                </div>
                <div class="col-search">
                  <div class="btn-tags">Phát âm</div>
                </div>
                <div class="col-search"><div class="btn-tags">Đọc</div></div>
                <div class="col-search"><div class="btn-tags">Viết</div></div>
              </div>

              <el-form-item>
                <el-input type="textarea" v-model="exerciseObj.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="btn-hide" @click="hideFromOnClick()"
                  >Đóng</el-button
                >
                <div class="margin-left-16">
                  <router-link :to="`${pathQuestionType}`">
                    <el-button
                      class="btn-primary t-btn t-btn-primary"
                      type="primary"
                      @click="
                        submitForm(),
                          showContentQuestion(
                            stateShowQuestionView.QuestionContent
                          )
                      "
                    >
                      Lưu
                    </el-button>
                  </router-link>
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import resource from "../../script/resource.js";
import custom from "../../script/custom.js";
import Enum from "../../script/enum.js";

import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  props: {
    hideFormFormOnClick: Function,
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
    ...mapState({
      isShow: (state) => state.popup.isShow,
      FormDetail: (state) => state.popup.FormDetail,
    }),
  },

  data() {
    return {
      rules: {
        Title: {
          required: true,
          message: "Tên bài tập không được để trống",
          showMsg: false,
          trigger: "blur",
        },

        TopicID: {
          required: false,
        },

        SubjectID: {
          required: true,
          showMsg: false,
          message: "Môn học không được để trống",
          trigger: "change",
        },

        GradeID: {
          required: true,
          showMsg: false,
          message: "Khối không được để trống",
          trigger: "change",
        },
      },
      subjectsObject: custom.Subject,
      topicsObject: custom.Topic,
      gradesObject: custom.Grade,
      topicsTitle: resource.Topic.TopicsTitle,
      subjectsTitle: resource.Subject.SubjectsTitle,
      gradesTitle: resource.Grade.GradesTitle,
      //file ảnh
      url: null,
      // link đến tạo câu hỏi
      pathQuestionType: "/",
      imagSubject: "default.png",
    };
  },
  methods: {
    ...mapMutations([
      "showContentQuestion",
      "setExercise",
      "resetExcercies",
      "hideForm",
    ]),
    mapingStateData() {
      //mapping khối lớp vào dữ liệu
      this.gradesObject.data = this.grades.grades;
      //mapping môn học vào dữ liệu
      this.subjectsObject.data = this.subjects;
      //mapping chủ đề vào dữ liệu
      this.topicsObject.data = this.topics;
    },

    submitForm() {
      //Kiểm tra validate
      let isValid = this.validateRules();
      if (isValid) {
        this.pathQuestionType = "/question-type";
        //Duyệt và lấy dữ liệu từng rule
        this.setExercise(this.ruleForm);
        console.log(`exerciseObj`, this.exerciseObj);
        //Ẩn form
        this.hideForm();
      }
    },

    /**
     * Kiểm tra lỗi từng rule
     * Author: NVTAM (13/2/2021);
     */
    checkErrorOnInput(value, typeRuler) {
      if (value) {
        this.rules[typeRuler].showMsg = false;
      } else {
        this.rules[typeRuler].showMsg = true;
      }
    },
    /**
     * Validate lỗi khi nhấn btn lưu
     */

    validateRules(reset) {
      let isValidate = true;
      for (const rule in this.rules) {
        if (this.rules[rule].required && !this.exerciseObj[rule]) {
          if (!reset) {
            //mở form
            this.rules[rule].showMsg = true;
          } else {
            this.rules[rule].showMsg = false;
          }
          isValidate = false;
        }
      }

      return isValidate;
    },
    hideFromOnClick() {
      if (this.FormDetail == Enum.typeForm.showDetail) {
        this.resetExcercies();
      }
      this.hideForm();
      //reset lại validate
      this.validateRules(true);
    },
    /**
      Chọn avatar
      Author: NVTAM(4/2/2022)
     */
    onAvatarChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      if (file) {
        this.exerciseObj.Avatar = { fileName: file.name };
      }
    },

    /**
      thay đổi avatar trong cb
      Author: NVTAM(4/2/2022)
     */
    avatarOnChangeCb(value) {
      let subjectObj = this.subjects.find((subject) => {
        return subject.SubjectID == value;
      });
      this.imagSubject = subjectObj.SubjectImg;
      this.exerciseObj.Avatar = { fileName: this.imagSubject };
    },
  },
  created() {
    this.mapingStateData();
  },
};
</script>
<style lang="scss" scoped>
.dialog {
  display: none;
}
.dialog.is-show {
  display: block;
}
::v-deep .el-input__inner::placeholder {
  color: var(--text-color);
}

.form-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000041;
}
.form-header {
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
  color: #4e5b6a;
}
::v-deep .form-wrapper {
  position: relative;
  padding: 16px 24px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
  width: 801px;
  height: 541px;
  overflow: hidden;
}
::v-deep .el-form-item__content {
  margin-left: 0px !important;
}
::v-deep .el-select {
  width: 100%;
}
::v-deep .el-form-item__content {
  display: flex;
  justify-content: flex-end;
}
.btn-hide {
  border-radius: 10px;
  background-color: rgb(241, 242, 247);
  border: 1px solid rgb(166, 169, 190);
  color: var(--text-color);
}

.form-right {
  width: 100%;
  padding-left: 32px;
}

.form-cancel {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 16px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("../../assets/icons/Group_26699.svg");
}
.form-content {
  display: flex;
  margin-top: 26px;
}

.avatar-img {
  border-radius: 10px;
  width: 270px;
  height: 156px;
  overflow: hidden;
  position: relative;
}
.btn-upload-img {
  position: absolute;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("../../assets/icons/ic_Photo_36.svg");
  right: 12px;
  bottom: 12px;
}
.img {
  width: 100%;
  height: 100%;
}
.row-search {
  display: flex;
}
.btn-tags {
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #b6b9ce;
  padding: 8px 12px;
  margin-right: 4px;
  overflow: hidden;
}
.showMsg ::v-deep .el-input__inner {
  border: 1px solid red !important;
}
::v-deep .el-textarea__inner {
  height: 80px;
}
::v-deep .el-input__inner {
  border-radius: 10px;
  color: var(--text-color);
  border: 1px solid #a6a9be;
  height: 40px;
  background: none;
}

::v-deep.el-select-dropdown__item.selected {
  color: var(--text-color);
  font-weight: 500;
  background: #ece7fe;
  margin: 8px;
  border-radius: 10px;
}
.form-item-wrapper {
  width: 100%;
  position: relative;
}
.form-label {
  position: absolute;
  top: 100%;
  margin-top: 4px;
  color: red;
  left: 0;
  font-size: 12px;
}
::v-deep .el-form-item__content {
  line-height: 10px !important;
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
::v-deep .el-button {
  border-radius: 10px;
}
::v-deep .el-textarea__inner {
  border-radius: 10px;
  border: 1px solid #a6a9be;
}
#upload-avatar {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
</style>
