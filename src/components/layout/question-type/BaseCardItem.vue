<template>
  <div class="content-wrapper">
    <div
      class="form-footer-item"
      v-for="(answer, index) in Answers"
      :key="index"
      v-bind:style="{ backgroundColor: answer.color }"
    >
      <div class="item-top">
        <div class="top-left">
          <div class="answer">
            <div>{{ convertOrder(index) }}</div>
          </div>
        </div>
        <div class="top-right">
          <div class="more" @click="deleteAnswerOnClick(index)">
            <span class="more-del">Xóa</span>
          </div>
          <div
            class="pick margin-left-8"
            @click="
              chooseTheAnswer({
                Index: index,
                Order: convertOrder(index),
                Correct: !answer.Correct,
                Type: 1,
              })
            "
            v-bind:class="{ correct: answer.Correct }"
          >
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
      <div class="content">
        <input
          v-bind:style="{ backgroundColor: answer.color }"
          v-model="answer.Content"
          type="text"
          placeholder="Nhập đáp án..."
          class="input-result"
          name="text"
          id=""
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  props: {
    cardStyle: Object,
  },

  computed: {
    ...mapState({
      Answers: (state) => state.questions.Question.Answers,
    }),
    ...mapGetters(["convertOrder"]),
  },
  methods: {
    ...mapMutations(["chooseTheAnswer", "deleteAnswer"]),
    deleteAnswerOnClick(index) {
      this.deleteAnswer({ name: "Question", id: index });
    },
  },
  data() {
    return {
      Correct: false,
      Content: "",
      Image: {},
    };
  },
};
</script>
<style lang="scss" scoped>
.correct {
  cursor: pointer;
  background-color: var(--active-primary) !important;
}
.content-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-left: -12px;
}

.form-footer-item {
  box-sizing: border-box;
  padding: 8px;
  background-color: #ffaec7;
  border-radius: 10px;
  width: 241px;
  height: 228px;
  margin-left: 24px;
  overflow: hidden;
  .item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .top-left {
    }
    .answer {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      font-size: 18px;
      font-weight: 600;
      border-radius: 10px;
      background-color: #fff;
    }
    .top-right {
      display: flex;
      align-items: center;
    }
    .more {
      position: relative;
      width: 34px;
      height: 34px;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("../../../assets/icons/Group_52239.svg");
    }
    .more-del {
      position: absolute;
      display: none;
      background-color: #fff;
      padding: 8px 12px;
      border-radius: 10px;
      left: -42px;
      bottom: -24px;
    }
    .more:hover .more-del {
      cursor: pointer;
      display: block;
    }
    .pick {
      cursor: pointer;
      width: 34px;
      height: 34px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: 10px;
      .icon-check {
        display: block;
        width: 16px;
        height: 13px;
        background-repeat: no-repeat;
        background-image: url("../../../assets/icons/_63144.svg");
      }
    }
  }
  .content {
    .input-result {
      background-color: #ffaec7;
      width: 95%;
      height: 160px;
      margin-right: 54px;
      outline: none;
      border: none;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>
