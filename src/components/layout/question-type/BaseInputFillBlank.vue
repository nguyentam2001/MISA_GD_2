<template>
  <div class="t-input-blank">
    <div class="list-item">
      <span
        class="item"
        v-for="(value, index) in Blanks[payload.blankId].Content"
        :key="index"
      >
        <span class="item-text">{{ value }}</span>
        <i
          class="item-icon"
          @click="delValueOnClick(index, payload.blankId)"
        ></i>
      </span>
    </div>
    <input
      class="input-text"
      type="text"
      name="input-text"
      v-model="text"
      @keydown="eventOnKeyDown($event, payload.blankId)"
      id=""
      placeholder="Nhập đáp án rồi nhấn Enter..."
    />
    <div class="delete" @click="delBlankOnClick(payload.blankId)">
      <img
        src="https://sisapapp.misacdn.net/lms/img/ic_remove.4c9d3209.svg"
        alt=""
      />
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    payload: Object,
  },
  computed: {
    ...mapState({
      Blanks: (state) => state.questions.FillTheBlank.Answers,
    }),
  },

  methods: {
    ...mapMutations(["pushAnswerInBlank", "delAnswerInBlank", "deleteAnswer"]),

    /**
     * Thêm đáp án vào input khi người dùng nhấn enter
     * Author: NVTAM(9/2/2022)
     */
    eventOnKeyDown(event, blankId) {
      if (event.keyCode == 13 && this.text != null) {
        this.pushAnswerInBlank({ blankId: blankId, text: this.text });
        console.log(`this.blank`, this.Blanks[blankId].Content);
        this.text = null; //reset lại text input
      }
    },

    /**
     * Xóa ô trống onclick
     * Author: NVTAM(9/2/2022)
     */
    delBlankOnClick(blankId) {
      this.deleteAnswer({ name: "FillTheBlank", id: blankId });
    },

    /**
     * Xóa đáp án
     * Author: NVTAM(9/2/2022)
     */
    delValueOnClick(index, blankId) {
      if (this.Blanks[this.payload.blankId].Content.length != 0) {
        this.delAnswerInBlank({ blankId: blankId, textIndex: index });
      }
    },
  },
  data() {
    return {
      values: [],
      text: null,
      bgItem: {
        backgroundColor: "#afeca4",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.t-input-blank {
  display: flex;
  align-items: center;
  border: 1px solid #a6a9be;
  height: 40px;
  width: 100%;
  border-radius: 10px;
}
.list-item {
  display: flex;
  align-items: center;
}
.delete {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  cursor: pointer;
  height: 100%;
}
.item {
  display: flex;
  align-items: center;
  margin-left: 4px;
  padding: 6px;
  border-radius: 10px;
  background-color: #afeca4;
}
.item-icon {
  width: 12px;
  height: 12px;
  margin-left: 8px;
  background-position: center;
  background-image: url("../../../assets/icons/Group_48764_3.svg");
  cursor: pointer;
}
.input-text {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: var(--text-color);
  padding-left: 8px;
}
.input-text::placeholder {
  color: #a6a9be;
}
</style>
