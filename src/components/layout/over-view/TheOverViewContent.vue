<template>
  <div class="over-view-content padding-32">
    <div class="content-header">
      <div class="content-header-btn justify-between">
        <div class="content-btn-left algin-center">
          <div class="t-btn btn-no-border active margin-right-16">
            Của tôi(89)
          </div>
          <div class="t-btn btn-no-border margin-right-16">
            Chia sẻ của trường(19)
          </div>
          <div class="t-btn btn-no-border margin-right-16">Tham khảo(19)</div>
        </div>
        <div class="content-btn-right">
          <div class="btn-share margin-left-16">
            <base-button :styleObject="btnSreachShareStyle" :text="textShare" />
          </div>
          <div class="btn-compose-post margin-left-16">
            <base-button :handleOnClick="showDialogOnClick" />
          </div>
        </div>
      </div>
      <div class="content-function justify-between">
        <div class="select">
          <div class="margin-right-16">
            <base-combobox
              :selectorStyle="cbStyle"
              :options="grades"
              :label="gradesLabel"
              :propName="gradeID"
              :titleText="gradesTitle"
              :typeCb="gradeID"
            />
          </div>
          <div class="margin-right-16">
            <base-combobox
              :selectorStyle="cbStyle"
              :options="subjects"
              :label="subjectLabel"
              :propName="subjectID"
              :titleText="subjectTitle"
              :typeCb="subjectID"
            />
          </div>
          <div class="margin-right-16">
            <base-combobox
              :selectorStyle="cbStyle"
              :options="topics"
              :label="topicLabel"
              :propName="topicID"
              :titleText="topicTitle"
              :typeCb="topicID"
            />
          </div>
          <!-- <div class="margin-right-16">
            <base-combobox
              :inputValue="exercisesObject"
              :titleText="exercisesTitle"
            />
          </div> -->
        </div>
        <div class="search">
          <base-input-search />
        </div>
      </div>
    </div>
    <div class="content-list">
      <courseware-list />
    </div>
    <div
      class="content-footer padding-left-32 padding-right-32 justify-between"
    >
      <div class="total-record">Tổng {{ TotalRecord }} học liệu</div>
      <div class="pagging flex">
        <base-combobox
          :selectorStyle="cbStyle"
          :options="pageSizes"
          :label="Pagelabel"
          :propName="Pagevalue"
          :titleText="PageTitle"
          :PagingFirstDefault="PagingFirstDefault"
          :typeCb="PaingtypeCb"
        />
        <base-paging />
      </div>
    </div>
    <!-- CoursewareDetail -->
    <courseware-detail
      :isShow="isShow"
      @hideFormFormOnClick="hideFormFormOnClick"
    />
  </div>
</template>
<script>
import BaseButton from "../../BaseButton.vue";
import BaseCombobox from "../../BaseCombobox.vue";
import BaseInputSearch from "../../BaseInputSearch.vue";
import CoursewareList from "../../../views/courseware/CoursewareList.vue";
import BasePaging from "../../BasePaging.vue";
import resource from "../../../script/resource.js";
import style from "../../../script/style.js";
import custom from "../../../script/custom.js";
import Enum from "../../../script/enum.js";
import CoursewareDetail from "../../../views/courseware/CoursewareDetail.vue";

import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "TheOverViewContent",
  components: {
    BaseButton,
    BaseCombobox,
    BaseInputSearch,
    CoursewareList,
    BasePaging,
    CoursewareDetail,
  },

  methods: {
    ...mapMutations([
      "resetExcercies",
      "showDialog",
      "hideForm",
      "setTypeForm",
      "resetQuestions",
    ]),
    /**
     * map ping dữ liệu từ state trong store vào data
     * author:NVTAM (5/2/2022)
     */

    showDialogOnClick() {
      //reset lại list question
      this.resetQuestions();
      //reset from nhập liệu
      this.resetExcercies();
      this.showDialog({
        formState: Enum.typeForm.showDetail,
        name: "Thông tin học liệu",
      });
    },
    hideFormFormOnClick() {
      this.hideForm();
    },
  },
  mounted() {
    this.$store.dispatch("loadGrades");
    this.$store.dispatch("loadSubjects");
  },

  computed: {
    ...mapState({
      isShow: (state) => state.popup.isShow,
      exercises: (state) => state.exercises,
      grades: (state) => state.grades.grades,
      GradeID: (state) => state.GradeID,
      SubjectID: (state) => state.SubjectID,
      TopicID: (state) => state.TopicID,
      FormDetail: (state) => state.popup.FormDetail,
      TotalRecord: (state) => state.paging.TotalRecord,
      pageSizes: (state) => state.paging.pageSizes,
      PageSize: (state) => state.paging.PageSize,
    }),

    ...mapGetters(["subjects", "topics", "exercises"]),
  },
  watch: {
    //Load lại trang web khi filter giá trị
    GradeID() {
      this.$store.dispatch("loadExercises");
      this.$store.dispatch("loadTopics");
    },
    SubjectID() {
      this.$store.dispatch("loadExercises");
      this.$store.dispatch("loadTopics");
    },
    TopicID() {
      this.$store.dispatch("loadExercises");
      this.$store.dispatch("loadTopics");
    },
    PageSize() {
      this.$store.dispatch("loadExercises");
    },
  },

  data() {
    return {
      gradesLabel: custom.Grade.label,
      gradesTitle: resource.Grade.GradesTitle,
      gradeID: custom.Grade.value,
      subjectLabel: custom.Subject.label,
      subjectTitle: resource.Subject.SubjectsTitle,
      subjectID: custom.Subject.value,
      topicLabel: custom.Topic.label,
      topicTitle: resource.Topic.TopicsTitle,
      topicID: custom.Topic.value,
      btnSreachShareStyle: style.btnSreachShareStyle,
      cbStyle: style.cbStyle,
      textShare: resource.textBtn.share,
      //paging
      Pagelabel: "Pagelabel",
      Pagevalue: "Pagevalue",
      PageTitle: "phân trang",
      PagingFirstDefault: true,
      PaingtypeCb: "Paging",
    };
  },
};
</script>
<style lang="scss">
.over-view-content {
  .content-header {
    .content-header-btn {
      .content-btn-left {
        .btn-no-border {
          box-sizing: border-box;
          border-radius: 10px;
          min-width: 100px;
          padding: 12px;
          height: 44px;
          overflow: hidden;
          cursor: pointer;
        }
        .active {
          background-color: #ece7fe;
          color: var(--active-primary);
        }
      }
    }
    .content-btn-right {
      display: flex;
    }
    .content-function {
      padding-top: 28px;

      .select {
        display: flex;
      }
      .search {
        width: 320px;
      }
    }
  }
  .content-footer {
    background-color: #ffff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #ccc;
    height: var(--over-view-footer);
    left: 0;
    right: 0;
  }
}
</style>
