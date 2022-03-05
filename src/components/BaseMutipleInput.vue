<template>
  <div class="t-input-blank-wrap">
    <div class="t-input-blank" id="style-16">
      <span class="item" v-for="(value, index) in exercise.Tags" :key="index">
        <span class="item-text">{{ value }}</span>
        <i class="item-icon" @click="delValueOnClick(index)"></i>
      </span>

      <input
        class="input-text"
        type="text"
        name="input-text"
        v-model="text"
        @keydown="eventOnKeyDown($event)"
        placeholder=""
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    exercise: Object,
  },

  mounted() {
    console.log("ex", this.exercise);
  },
  methods: {
    /**
     * Thêm đáp án vào input khi người dùng nhấn enter
     * Author: NVTAM(9/2/2022)
     */
    eventOnKeyDown(event) {
      if (event.keyCode == 13 && this.text != null) {
        this.exercise.Tags.push(this.text);
        this.text = null;
      }
    },

    /**
     * Xóa đáp án
     * Author: NVTAM(9/2/2022)
     */
    delValueOnClick(index) {
      this.exercise.Tags.splice(index, 1);
    },
  },
  data() {
    return {
      text: null,
      bgItem: {
        backgroundColor: "#afeca4",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.t-input-blank-wrap {
  overflow: hidden;
  border: 1px solid #a6a9be;
  overflow: hidden;
  padding: 4px 10px 4px 0px;
  border-radius: 10px;
  width: 100%;
}
.t-input-blank {
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;

  height: 80px;
  width: 100%;
  padding: 4px;
  border-radius: 10px;
}

#style-16::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 10px;
}

#style-16::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

#style-16::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #fff;
  background-image: -webkit-linear-gradient(
    top,
    #e4f5fc 0%,
    #bfe8f9 50%,
    #9fd8ef 51%,
    #2ab0ed 100%
  );
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
  margin: 4px;
  max-height: 21px;
  padding: 6px;
  border-radius: 10px;
  background-color: #f1f2f7;
}
.item-icon {
  width: 12px;
  height: 12px;
  margin-left: 8px;
  background-position: center;
  background-image: url("../assets/icons/Group_48764_3.svg");
  cursor: pointer;
}
.input-text {
  border: none;
  display: block;
  max-height: 40px;
  outline: none;
  font-size: 16px;
  color: var(--text-color);
  padding-left: 8px;
}
.input-text::placeholder {
  color: #a6a9be;
}
</style>
