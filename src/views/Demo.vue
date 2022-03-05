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
    <div @click="showPopover">
      Hiện pop over
      <base-popover :visible="visible" />
    </div>
    <div @click="showPopover">
      Hiện pop over
      <base-popover :visible="visible" />
    </div>
    <div @click="showPopover">
      Hiện pop over
      <base-popover :visible="visible" />
    </div>
    <div v-for="(question, index) in Questions" :key="index">
      <span>{{ question.content }}</span>
    </div>
    <div class="save-data" @click="saveData">Lưu dữ liệu</div>
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
import BasePopover from "../components/BasePopover.vue";
// import axios from "axios";
import { mapState } from "vuex";

export default {
  components: {
    BasePopover,
    BaseButton,
    BaseCombobox,
    BaseCard,
    BaseInput,
    BaseForm,
    BaseInputFillBlank,
    BasePopup,
  },
  computed: {
    ...mapState({
      Questions: (state) => state.questions.Questions,
    }),
  },
  updated() {},
  created() {
    this.$store.dispatch("loadQuestions");
  },
  mounted() {
    this.questions = this.Questions;
    console.log(this.questions);
  },
  methods: {
    showPopover() {
      this.visible = !this.visible;
    },

    saveData() {
      // this.$store.dispatch("loadQuestions");
      // var aVatar = [
      //   {
      //     FileName: "TiengAnh",
      //   },
      // ];
      // var exercies = {
      //   exerciseID: "",
      //   title:
      //     "Tâmlvzhyvxheenaqkjmygnnouybijsbpspisbgczppzvbpvzrvxdzbwcrhcthffwisiimrmfpnnbmrcqyxaemk",
      //   gradeID: 4,
      //   subjectID: 2,
      //   avatar: JSON.stringify(aVatar),
      //   topicID: 1,
      //   tagID: 5,
      //   status: 0,
      //   hint: "zgivfuoaojcixtlktcaieqxbnalkoviywcgbxgkdledofoouatylrukohswfssetaieggsylvmjvo",
      // };
      // axios.post("https://localhost:7291/api/v1/Exercises", exercies);
    },
  },
  data() {
    return {
      visible: false,
      questions: [],
    };
  },
  name: "Demo",
};
</script>

<style lang="scss">
.el-input__inner {
  border-radius: 10px;
}
</style>
