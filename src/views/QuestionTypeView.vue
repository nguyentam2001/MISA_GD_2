<template>
  <div class="question-type-view">
    <the-question-type-header />
    <div v-if="showQuestionContentType === showContentQuestionView">
      <the-question-type-content />
    </div>
    <div v-if="showQuestionResult === showContentQuestionView">
      <the-question-result />
    </div>
  </div>
</template>
<script>
import TheQuestionTypeHeader from "../components/layout/question-type/TheQuestionTypeHeader.vue";
import TheQuestionTypeContent from "../components/layout/question-type/TheQuestionTypeContent.vue";

import Enum from "../script/enum.js";

import { mapState } from "vuex";

export default {
  name: "QuestionTypeView",
  components: {
    TheQuestionTypeHeader,
    TheQuestionTypeContent,
    TheQuestionResult: () =>
      import("../components/layout/question-type/TheQuestionResult.vue"),
  },
  data() {
    return {
      showQuestionContentType: Enum.stateShowQuestionView.QuestionContent,
      showQuestionResult: Enum.stateShowQuestionView.QuestionList,
    };
  },
  computed: {
    ...mapState(["showContentQuestionView"]),
  },
};
</script>
