<template>
  <div class="add-image-list">
    <div
      v-for="(image, index) in this.question.Attachments"
      :key="index"
      class="image-attach"
    >
      <div class="del-img" @click="deleteImgOnclick(index)">
        <i class="fas fa-times-circle"></i>
      </div>
      <img
        v-if="image"
        :src="require(`../assets/subjects-avatar/${image}`)"
        alt=""
        class="img"
      />
    </div>
    <div class="uplaod-img-btn">
      <input
        class="choose-file"
        id="choose-file"
        name="avatar"
        type="file"
        @change="attachImageOnclick"
      />
      <label class="img-icon" for="choose-file">
        <i class="fas fa-plus"></i>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    question: Object,
  },
  methods: {
    /**
    Tải file ảnh đính kèm
    Author:NVTAM (7/2/2021)
     */
    attachImageOnclick(e) {
      const file = e.target.files[0];
      this.imageAttach = URL.createObjectURL(file);
      this.images.push(file.name);
      this.question.Attachments = this.images;
    },
    /**
    Xóa file ảnh đính kèm
    Author:NVTAM (7/2/2021)
     */
    deleteImgOnclick(index) {
      this.question.Attachments.splice(index, 1);
    },
  },
  data() {
    return {
      imageAttach: "",
      images: [],
    };
  },
};
</script>
<style lang="scss" scoped>
.add-image-list {
  position: absolute;
  bottom: 8px;
  display: flex;
}

.choose-file {
  position: absolute;
  right: -120px;
  opacity: 0;
  cursor: pointer;
}
.image-attach {
  position: relative;
  box-sizing: border-box;
  padding: 4px;
  border-radius: 4px;

  margin-left: 8px;
  width: 140px;
  height: 80px;
  background: #ffffff;
  .del-img {
    cursor: pointer;
    position: absolute;
    right: -4px;
    top: -4px;
    i {
      color: red;
      background-color: white;
      border-radius: 50%;
    }
  }
  .img {
    width: 100%;
    height: 100%;
  }
}
.uplaod-img-btn {
  margin-left: 8px;
  cursor: pointer;
  width: 140px;
  height: 80px;
  background: #ffffff;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-icon {
  i {
    color: var(--active-primary);
  }
}
</style>
