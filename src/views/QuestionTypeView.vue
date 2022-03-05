<template>
  <div class="question-type-view">
    <the-question-type-header />
    <router-view />
  </div>
</template>
<script>
import TheQuestionTypeHeader from "../components/layout/question-type/TheQuestionTypeHeader.vue";
export default {
  name: "QuestionTypeView",
  components: {
    TheQuestionTypeHeader,
  },
};
</script>
