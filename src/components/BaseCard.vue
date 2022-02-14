<template>
  <div class="t-card">
    <div class="t-card-header">
      <div class="t-card-header-title">
        {{ `${exercise.GradeName} - ${exercise.SubjectName}` }}
      </div>
      <div class="t-card-header-img">
        <img
          :src="
            require(`../assets/subjects-avatar/${
              exercise.Avatar.fileName || 'toan.png'
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
        <div class="icon"></div>
      </div>
      <div class="t-card-body-footer">
        <div class="quantities">
          <div class="icon"></div>
          <div class="text">{{ exercise.Questions.length || "20" }} câu</div>
        </div>
        <!-- <div class="t-button">Dữ liệu mẫu</div> -->
        <BaseButton :styleObject="styleObject" :text="textBtn" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import BaseButton from "../components/BaseButton.vue";

export default {
  props: {
    exercise: Object,
  },
  components: {
    BaseButton,
  },
  computed: {
    ...mapGetters(["grades"]),
  },
  data() {
    return {
      styleObject: {
        backgroundColor: "#e8e1fd",
        borderRadius: "4px",
        border: "none",
        width: "68px",
        height: "24px",
        fontSize: "10px",
        padding: "0px 2px",
        cursor: "pointer",
        color: "#8a6bf6",
        marginLeft: "12px",
      },
      textBtn: "Dữ liệu mẫu",
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
      }
      .icon {
        width: 8px;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
        height: 20px;
        background-image: url("../assets/icons/Group_47776.svg");
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
  }
}
</style>
