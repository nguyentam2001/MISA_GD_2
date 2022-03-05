<template>
  <div :class="{ hideValidQuestion: isHideValidQuestion }">
    <div class="m-dialog">
      <div class="pop-up">
        <div class="pop-up-content">
          <div class="pop-up-text">
            <!-- gán text -->
            {{ Messages || "Thông tin trống" }}
          </div>
        </div>
        <div class="pop-up-footer">
          <div class="btn-wrapper-right">
            <base-button
              :handleOnClick="hidePopupValidOnClick"
              :text="confirm"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import BaseButton from "../components/BaseButton.vue";
import style from "../script/style.js";
export default {
  components: { BaseButton },

  computed: {
    ...mapState({
      isHideValidQuestion: (state) => state.popup.isHideValidQuestion,
      messages: (state) => state.questions.arrayMsgValid,
    }),
    Messages() {
      if (Array.isArray(this.messages)) {
        return this.messages.join(", ");
      } else {
        return this.messages;
      }
    },
  },
  methods: {
    ...mapMutations(["hidePopUp"]),
    hidePopupValidOnClick() {
      this.hidePopUp();
    },
  },
  data() {
    return {
      btnNomalStyle: style.btnNomalStyle,
      confirm: "Đồng ý",
    };
  },
};
</script>
<style lang="scss" scoped>
.hideValidQuestion {
  display: none;
}
.m-dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(46, 44, 44, 0.37);
}
.pop-up {
  padding: 28px;
  background-color: var(--white-color);
  border: 1px solid #babec5;
  box-sizing: border-box;
  width: 442px;
  border-radius: 10px;
  background-color: #fff;
}

.pop-up .pop-up-content {
  border-bottom: 1px solid #babec5;
  display: flex;
  align-items: center;
  padding-bottom: 32px;
}
.pop-up .pop-up-icon {
  margin-right: 20px;
  font-size: 36px;
  font-weight: 200;
}
.pop-up .pop-up-text {
  font-size: 18px;
  text-align: left;
}
.pop-up .pop-up-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.btn-wrapper-right {
  display: flex;
}
.btn-wrapper-right #btnNotConfirm {
  margin-right: 8px;
}
</style>
