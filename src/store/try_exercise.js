import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const TryExercise = {
  //Khối lớp
  state: {
    musics: [
      {
        id: 1,
        isPlay: false,
        audio: new Audio(
          "https://vnso-zn-5-tf-mp3-320s1-zmp3.zadn.vn/be530a5f7a1e9340ca0f/2607708514391672519?authen=exp=1646554653~acl=/be530a5f7a1e9340ca0f/*~hmac=bfb028fa88c4d5a0c82989d7bb81677c&fs=MTY0NjM4MTg1MzmUsICyNHx3ZWJWNnwwfDU4LjE4Ny4xNjmUsICdUngODg"
        ),
        bgimage: "Background_1366_Sea.e17b18eb.jpg",
      },
      {
        id: 2,
        isPlay: false,
        audio: new Audio(
          "https://vnso-zn-23-tf-mp3-320s1-zmp3.zadn.vn/6439a37bce3a27647e2b/4974064795925961644?authen=exp=1646554631~acl=/6439a37bce3a27647e2b/*~hmac=08c083352dca4b981018983da9085cca&fs=MTY0NjM4MTgzMTgzMHx3ZWJWNnwwfDE0LjIzMy44Ny4xMjY"
        ),
        bgimage: "Background_1366_Jungle.de33a34a.jpg",
      },
      {
        id: 3,
        isPlay: false,
        audio: new Audio(
          "https://vnso-zn-23-tf-mp3-320s1-zmp3.zadn.vn/0edb9a5dec1c05425c0d/7478680816675085652?authen=exp=1646554670~acl=/0edb9a5dec1c05425c0d/*~hmac=c86298e90b2e45e9c462e120208a2e53&fs=MTY0NjM4MTg3MDUwOHx3ZWJWNnwwfDE3MS4yMzmUsICdUngMjM3Ljg5"
        ),
        bgimage: "Background_1366_Space.daf26776.jpg",
      },
      {
        id: 4,
        isPlay: false,
        bgimage: "Background_1366_Basic.60f94e74.jpg",
      },
    ],

    currentMusic: {},
    tryAnswers: [],
    //Phần chọn đáp án
    tryChoose: {
      id: null,
      chooseIndex: null,
      answer: false, //kiểm tra câu hỏi đúng hay sai
      isDone: false, //kiểm tra đã làm hay chưa
    },
    //làm thử câu điền vào chỗ trống
    tryFillTheBlank: {
      id: null,
      blanks: [],
      answers: [],
      isDone: false, //kiểm tra đã làm hay chưa
    },
    //làm thử câu hỏi tự luận
    tryFillEassy: {
      id: null,
      text: "",
      answer: false,
      isDone: false, //kiểm tra đã làm hay chưa
    },
  },

  mutations: {
    /**
     *
     * @param {*} state
     * @param {*} payload
     */
    resetTryAnswers(state) {
      //reset lại câu trả lời
      state.tryAnswers = [];
    },

    /**
     * Tạo mảng lưu trữ các câu trả lời từ người dùng
     */
    createTryAnswers(state, payload) {
      if (state.tryAnswers.length == 0) {
        // map các câu hỏi và và số lượng đáp án tương ứng
        if (Array.isArray(payload.questions)) {
          payload.questions.forEach((question) => {
            switch (question.Type) {
              case 1: //Câu chọn đáp án đúng
                //gán id
                state.tryChoose.id = question.QuestionID;
                state.tryAnswers.push(
                  JSON.parse(JSON.stringify(state.tryChoose))
                );
                break;
              case 2: //Câu hỏi đúng sai
                state.tryChoose.id = question.QuestionID;
                state.tryAnswers.push(
                  JSON.parse(JSON.stringify(state.tryChoose))
                );
                break;
              case 3: //Câu điền vào chỗ trống
                state.tryFillTheBlank.id = question.QuestionID;
                state.tryAnswers.push(
                  JSON.parse(JSON.stringify(state.tryFillTheBlank))
                );
                break;
              case 4: //Câu hỏi tự luận
                state.tryFillEassy.id = question.QuestionID;
                state.tryAnswers.push(
                  JSON.parse(JSON.stringify(state.tryFillEassy))
                );
                break;
              default:
                break;
            }
          });
        }
      }
    },

    /**
     * Bật tắt music
     * @param {*} state
     */
    toggleMusic(state, payload) {
      if (payload.toggle) {
        state.currentMusic.audio.play();
      } else {
        state.currentMusic.audio.pause();
      }
    },

    resetCurrentMusic(state) {
      //reset lại bài hát hiện tại
      if (Object.prototype.hasOwnProperty.call(state.currentMusic, "isPlay")) {
        if (Object.prototype.hasOwnProperty.call(state.currentMusic, "audio")) {
          state.currentMusic.audio.pause();
          state.currentMusic.audio.currentTime = 0;
        }
        state.currentMusic.isPlay = false;
      }
      //
      state.currentMusic = {};
    },
    playSound(state, payload) {
      //tìm bài hát đang được dispatch
      state.currentMusic = state.musics.find((music) => {
        return music.id == payload.id;
      });
      if (
        JSON.stringify(state.currentMusic) !== "{}" &&
        Object.prototype.hasOwnProperty.call(state.currentMusic, "isPlay")
      ) {
        state.currentMusic.isPlay = !state.currentMusic.isPlay;
        if (Object.prototype.hasOwnProperty.call(state.currentMusic, "audio")) {
          if (state.currentMusic.isPlay) {
            console.log(`palay`, state.currentMusic.audio.play());
            state.currentMusic.audio.play();
          } else {
            state.currentMusic.audio.pause();
            state.currentMusic.audio.currentTime = 0;
          }
        }
      }
    },
  },
  actions: {},
};

export default TryExercise;
