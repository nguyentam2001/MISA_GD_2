<template>
  <div class="t-card">
    <div class="t-card-header">
      <div class="t-card-header-title">
        {{ `${gradeName()} - ${subjectName()}` }}
      </div>
      <div class="t-card-header-img">
        <img
          :src="
            require(`../assets/subjects-avatar/${
              avatar.fileName || 'toan.png'
            }`)
          "
          alt=""
          class="img"
        />
      </div>
    </div>
    <div class="t-card-body">
      <div class="t-card-body-title">
        <div class="name">
          {{ exercise.Title || "Bài tập luyện hằng đẳng thức" }}
        </div>
        <div class="icon more">
          <base-popover :exerciseID="exercise.ExerciseID" />
        </div>
      </div>
      <div class="t-card-body-footer">
        <div class="quantities">
          <div class="icon"></div>
          <div class="text">{{ exercise.QtyQuestions || "20" }} câu</div>
        </div>
        <span
          class="status-compos"
          v-bind:class="[exercise.Status ? 'confirmBG' : 'nomalBG']"
          >{{ exercise.Status ? texCF : textWait }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import BasePopover from "../components/BasePopover.vue";

export default {
  props: {
    exercise: Object,
  },
  components: {
    BasePopover,
  },

  methods: {
    gradeName() {
      //Kiểm tra xem grades có giá trị hay chưa
      if (this.grades.length > 0) {
        let gradeObj = this.grades.find((grade) => {
          return grade.GradeID == this.exercise.GradeID;
        });
        return gradeObj.GradeName;
      }
    },
    subjectName() {
      if (this.subjects.length > 0) {
        let subjectObj = this.subjects.find((subject) => {
          return subject.SubjectID == this.exercise.SubjectID;
        });
        return subjectObj.SubjectName;
      }
    },
  },

  computed: {
    avatar() {
      return JSON.parse(this.exercise.Avatar);
    },
    ...mapState({
      grades: (state) => state.grades.grades,
    }),
    ...mapState(["exerciseObj"]),
    ...mapGetters(["subjects"]),
  },
  data() {
    return {
      textWait: "Đang soạn",
      texCF: "Đã soạn",
      Avatar: "",
    };
  },
};
</script>
<style lang="scss" scoped>
.t-card {
  background-color: #ffffff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  width: 100%;

  max-height: 212px;
  .t-card-header-title {
    position: absolute;
    background-color: var(--active-primary);
    height: 44px;
    padding: 0px 12px;
    font-size: 16px;
    border-radius: 10px 0 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color: #ffffff;
  }
  .t-card-header-img {
    width: 100%;
    height: 126px;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .t-card-body {
    font-size: 16px;

    padding: 16px;
    .t-card-body-title {
      font-weight: 500;
      display: flex;
      justify-content: space-between;
      .name {
        max-width: 200px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .icon {
        width: 8px;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
        height: 20px;
        background-image: url("../assets/icons/Group_47776.svg");
      }
      .icon.more {
        position: relative;
        .menu {
          right: 10px;
          position: absolute;
          background: #fff;
          min-width: 150px;
          border-radius: 10px;
          border: 1px solid #ebeef5;
          padding: 12px;
          z-index: 2000;
          color: #606266;
          line-height: 1.4;
          text-align: justify;
          font-size: 14px;
          box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
          word-break: break-all;
          .item {
            display: block;
          }
        }
      }
    }
    .t-card-body-footer {
      display: flex;
      margin-top: 8px;
      .quantities {
        display: flex;

        .icon {
          width: 18px;
          height: 18px;
          background-repeat: no-repeat;
          background-position-x: center;
          cursor: pointer;
          background-image: url("../assets/icons/ic_hoclieu.svg");
        }
        .text {
          margin-left: 4px;
          font-size: 16px;
          font-weight: 200;
          color: #4e5b6a;
        }
      }
    }
    .status-compos {
      border-radius: 4px;
      /* width: 60px; */
      /* height: 24px; */
      display: block;
      font-size: 10px;
      /* max-width: 20px; */
      padding: 4px 8px;
      color: #8a6bf6;
      margin-left: 12px;
    }
    .confirmBG {
      display: none;
    }

    .nomalBG {
      background-color: #e8e1fd;
    }
  }
}
</style>
