<template>
  <div class="demo">
    <div class="t-btn">
      <label for="button">button</label>
      <base-button />
    </div>
    <div class="t-combobox">
      <label for="t-combobox">combobox</label>
      <base-combobox />
    </div>
    <div class="t-card">
      <label for="t-card">card</label>
      <base-card />
    </div>
    <div class="input-search">
      <label for="input-search">input search</label>
      <base-input />
    </div>
    <base-form />
    <base-popup />
    <base-input-fill-blank />
  </div>
</template>
<script>
import BaseButton from "../components/BaseButton.vue";
import BaseCombobox from "../components/BaseCombobox.vue";
import BaseCard from "../components/BaseCard.vue";
import BaseInput from "../components/BaseInputSearch.vue";
import BaseForm from "../views/courseware/CoursewareDetail.vue";
import BaseInputFillBlank from "../components/layout/question-type/BaseInputFillBlank.vue";
import BasePopup from "../components/BasePopup.vue";

export default {
  components: {
    BaseButton,
    BaseCombobox,
    BaseCard,
    BaseInput,
    BaseForm,
    BaseInputFillBlank,
    BasePopup,
  },
  name: "Demo",
};
</script>

<style lang="scss">
.el-input__inner {
  border-radius: 10px;
}
</style>
