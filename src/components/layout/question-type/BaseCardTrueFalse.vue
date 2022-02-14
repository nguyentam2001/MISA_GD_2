<template>
  <div class="card_true_Flase">
    <div
      class="form-footer-item margin-left-20"
      v-bind:style="{ backgroundColor: answer.color }"
      v-for="(answer, index) in AnswersTrueFalse"
      :key="index"
    >
      <div class="item-top">
        <div class="top-left"></div>
        <div class="top-right">
          <div
            class="pick margin-left-8"
            v-bind:class="{ correct: answer.Correct }"
            @click="
              chooseTheAnswer({
                Index: index,
                Order: convertOrder(index),
                Correct: !answer.Correct,
                Type: 2,
              })
            "
          >
            <div class="icon-check"></div>
          </div>
        </div>
      </div>
      <div class="content">
        <div
          class="input-result"
          v-bind:style="{ backgroundColor: answer.color }"
        >
          {{ answer.Content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  props: {
    answer: String,
    cardStyle: Object,
  },
  computed: {
    ...mapState({
      AnswersTrueFalse: (state) => state.questions.QuestionTrueFalse.Answers,
    }),
    ...mapGetters(["convertOrder"]),
  },
  methods: {
    ...mapMutations(["chooseTheAnswer"]),
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.card_true_Flase {
  display: flex;
}
.correct {
  cursor: pointer;
  background-color: var(--active-primary) !important;
}

.form-footer-item {
  box-sizing: border-box;
  padding: 8px;
  background-color: #ffaec7;
  border-radius: 10px;
  width: 241px;
  height: 228px;
  overflow: hidden;
  .item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .top-left {
    }
    .answer {
      width: 34px;
      height: 34px;
      background-repeat: no-repeat;
      background-position: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .top-right {
      display: flex;
      align-items: center;
    }
    .more {
      width: 34px;
      height: 34px;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("../../../assets/icons/Group_52239.svg");
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
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
  }
}
</style>
