<template>
  <div class="t-input-blank">
    <div class="list-item">
      <span class="item" v-for="(value, index) in values" :key="value">
        <span class="item-text">{{ value }}</span>
        <i class="item-icon" @click="delValueOnClick(index)"></i>
      </span>
    </div>
    <input
      class="input-text"
      type="text"
      name="input-text"
      v-model="text"
      @keydown="eventOnKeyDown($event)"
      id=""
      placeholder="Nhập đáp án rồi nhấn Enter..."
    />
  </div>
</template>
<script>
export default {
  methods: {
    /**
     * Thêm đáp án vào input khi người dùng nhấn enter
     * Author: NVTAM(9/2/2022)
     */
    eventOnKeyDown(event) {
      if (event.keyCode == 13 && this.text != null) {
        this.values.push(this.text);
        this.text = null; //reset lại text input
      }
    },

    /**
     * Xóa đáp án
     * Author: NVTAM(9/2/2022)
     */
    delValueOnClick(index) {
      if (this.values.length != 0) {
        this.values.splice(index, 1);
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
