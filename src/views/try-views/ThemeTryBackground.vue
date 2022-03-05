<template>
  <div class="content">
    <img
      class="background-image"
      :src="
        require(`../../assets/subjects-avatar/${
          currentMusic.bgimage || 'Background_1366_Sea.e17b18eb.jpg'
        }`)
      "
      alt=""
    />
    <div class="choose-theme-container">
      <div class="choose-theme-bg bg-background-yellow"></div>
      <div class="choose-theme">
        <h3 class="choose-theme-header">Chọn giao diện làm bài</h3>
        <div class="theme-list">
          <div
            class="image-item"
            v-for="music in musics"
            :key="music.id"
            @click.prevent="playSoundOnClick(music.id)"
          >
            <img
              class="theme-image"
              v-bind:class="{ active: music.isPlay }"
              :src="require(`../../assets/subjects-avatar/${music.bgimage}`)"
              alt=""
            />
          </div>
        </div>
        <div class="theme-btns">
          <div class="btn">
            <base-button
              :handleOnClick="tryExerciseOnClick"
              :text="startText"
            />
          </div>
          <div class="btn">
            <base-button :handleOnClick="cancelTryOnclick" :text="cacelText" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import BaseButton from "../../components/BaseButton.vue";
export default {
  components: { BaseButton },
  computed: {
    ...mapState(["exerciseObj"]),
    ...mapState({
      musics: (state) => state.try_exercise.musics,
      currentMusic: (state) => state.try_exercise.currentMusic,
    }),
  },

  methods: {
    ...mapMutations(["playSound", "resetCurrentMusic", "createTryAnswers"]),
    //tạo một danh sách các câu trả lời bằng số câu hỏi

    tryExerciseOnClick() {
      let me = this;
      this.createTryAnswers({ questions: me.exerciseObj.questions }),
        this.$router
          .push({
            path: `/try-exercies/${this.$route.params.id}`,
          })
          .catch(() => {});
    },

    /**
     * Chọn nhạc và background image tương ứng
     * Author: NVTAM (3/1/2022)
     */
    playSoundOnClick(id) {
      this.resetCurrentMusic();
      this.playSound({ id });
      /* let me = this;
      //reset lại bài hát hiện tại
      me.resetCurrentMusic();
      //tìm bài hát đang được dispatch
      this.currentMusic = this.musics.find((music) => {
        return music.id == id;
      });
      if (
        JSON.stringify(me.currentMusic) !== "{}" &&
        Object.prototype.hasOwnProperty.call(me.currentMusic, "isPlay")
      ) {
        this.currentMusic.isPlay = !this.currentMusic.isPlay;
        if (Object.prototype.hasOwnProperty.call(me.currentMusic, "audio")) {
          if (this.currentMusic.isPlay) {
            this.currentMusic.audio.play();
          } else {
            this.currentMusic.audio.pause();
            this.currentMusic.audio.currentTime = 0;
          }
        }
      } else {
        return "Không có bài hát nào khớp";
      }*/
    },

    /**
     * trở lại giao diện soạn bài
     * Author: NVTAM (3/1/2022)
     */
    cancelTryOnclick() {
      //reset lại bài hát
      this.resetCurrentMusic();
      this.$router
        .push({
          path: `/question-type/${this.$route.params.id}/list`,
        })
        .catch(() => {});
    },
  },
  data() {
    return {
      startText: "Bắt đầu làm bài",
      cacelText: "Quay lại",
    };
  },
};
</script>
<style lang="scss" scoped>
.content {
  height: 100vh;
  width: 100%;
}
.background-image {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.choose-theme {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.choose-theme-container {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 1044px;
  height: 630px;
}
.choose-theme-bg {
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.5;
  border-radius: 10px;
}
.bg-background-yellow {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 248, 214, var(--tw-bg-opacity));
}
.choose-theme-header {
  display: flex;
  justify-content: center;
  --tw-text-opacity: 1;
  color: rgba(78, 91, 106, var(--tw-text-opacity));
  margin-top: 155px;
  font-size: 28px;
}
.theme-list {
  display: flex;
  justify-content: center;
  align-items: center;
}
.theme-image {
  object-fit: cover;
  height: 100%;
  width: 100%;
  width: 154px;
  aspect-ratio: auto 154 / 154;
  height: 154px;
  border-radius: 20px;
  margin-right: 24px;
}
.theme-image.active {
  border: 4px solid #8a6bf6;
  border-radius: 20px;
}
.theme-btns {
  margin-top: 28px;
  width: 300px;
  .btn {
    margin-top: 16px;
  }
}
</style>
