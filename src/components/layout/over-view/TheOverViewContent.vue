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
              :inputValue="gradesObject"
              :titleText="gradesTitle"
            />
          </div>
          <div class="margin-right-16">
            <base-combobox
              :inputValue="subjectsObject"
              :titleText="subjectsTitle"
            />
          </div>
          <div class="margin-right-16">
            <base-combobox
              :inputValue="topicsObject"
              :titleText="topicsTitle"
            />
          </div>
          <div class="margin-right-16">
            <base-combobox
              :inputValue="exercisesObject"
              :titleText="exercisesTitle"
            />
          </div>
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
      <div class="total-record">Tổng {{ exercises.length }} học liệu</div>
      <div class="pagging">
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
    ]),
    /**
     * map ping dữ liệu từ state trong store vào data
     * author:NVTAM (5/2/2022)
     */
    mapingStateData() {
      //mapping khối lớp vào dữ liệu
      this.gradesObject.data = this.grades.grades;
      //mapping môn học vào dữ liệu
      this.subjectsObject.data = this.subjects;
      //mapping chủ đề vào dữ liệu
      this.topicsObject.data = this.topics;
      this.exercisesObject.data = this.exercises;
    },
    showDialogOnClick() {
      //reset from nhập liệu
      this.resetExcercies();
      this.showDialog(Enum.typeForm.showDetail);
      console.log(this.isShow);
    },
    hideFormFormOnClick() {
      this.hideForm();
    },
  },
  created() {
    this.mapingStateData();
  },
  computed: {
    ...mapState({
      isShow: (state) => state.popup.isShow,
      exercises: (state) => state.exercises,
    }),
    ...mapGetters(["subjects", "grades", "topics", "exercises"]),
  },

  data() {
    return {
      btnSreachShareStyle: style.btnSreachShareStyle,
      cbStyle: style.cbStyle,
      gradesObject: custom.Grade,
      topicsObject: custom.Topic,
      subjectsObject: custom.Subject,
      exercisesObject: custom.Exercises,
      topicsTitle: resource.Topic.TopicsTitle,
      subjectsTitle: resource.Subject.SubjectsTitle,
      gradesTitle: resource.Grade.GradesTitle,
      exercisesTitle: resource.Exercises.ExeTitle,
      textShare: resource.textBtn.share,
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
