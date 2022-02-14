import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const questions = {
  state: {
    Questions: [],

    Question: {
      Type: 1, //Chọn đáp án đúng
      Content: "Bình phương của một hiệu ( A - B )2 là:",
      Attachments: [],
      Answers: [
        {
          Content: "A2 + 2AB + B2",
          Correct: false,
          Image: {},
          color: "#ffaec7",
        },
        {
          Content: "A2 - 2AB + B2",
          Correct: true,
          Image: {},
          color: "#afeca4",
        },
        {
          Content: "( A - B )( A + B )",
          Correct: false,
          Image: {},
          color: "#f9c3b7",
        },
        {
          Content: "( A - B )+( A + B )",
          Correct: false,
          Image: {},
          color: "#b7dfff",
        },
      ],
      Hint: "Câu hỏi cấp 1",
    },
    QuestionTrueFalse: {
      Type: 2, //Câu hỏi đúng sai
      Content: "1+1 = 2 đúng hay sai",
      Attachments: [],
      Answers: [
        {
          Content: "ĐÚNG",
          Correct: false,
          Image: {},
          color: "#afeca4",
        },
        {
          Content: "SAI",
          Correct: true,
          Image: {},
          color: "#ffaec7",
        },
      ],
    },
    Answer: {
      Content: "",
      Correct: false,
      Image: {},
      color: "#ffaec7",
    },
    ruleValid: {
      isValid: true,
      msg: "",
    },
  },
  mutations: {
    /**
     * Map những đáp án được chọn
     * Author: NVTAM (10/2/2022)
     * @param {*} state
     * @param {*} payload
     */
    chooseTheAnswer(state, payload) {
      if (payload.Index != null) {
        switch (payload.Type) {
          case 1:
            console.log(payload);
            state.Question.Answers[payload.Index].Correct = payload.Correct;

            break;
          case 2:
            state.QuestionTrueFalse.Answers[payload.Index].Correct =
              payload.Correct;

            break;

          default:
            break;
        }
      }
    },
    /**
     * Thêm mới đáp án
     * Anthor:NVTAM (13/2/2022)
     * @param {*} state
     * @param {*} payload
     */
    addNewAnswer(state, payload) {
      console.log(`payload`, payload);
      switch (payload.type) {
        case "1":
          state[payload.name].Answers.push({ ...state.Answer });
          break;
        default:
          break;
      }
    },
    deleteAnswer(state, payload) {
      if (payload != null) {
        state.Question.Answers.splice(payload, 1);
      }
    },
    /**
     * Validate Answers question
     * Author: NVTAM (12/2/2022)
     */
    validateAnswer(state, payload) {
      let checkValid = []; //mảng lưu giá trị đúng
      //Kiểm tra nội dung hoặc file đính kèm
      if (
        state[payload.name].Content ||
        state[payload.name].Attachments.length != 0
      ) {
        //câu chọn đáp án đúng
        switch (payload.type) {
          case "1": //Câu chọn đáp án đúng
            state.ruleValid.isValid = state[payload.name].Answers.some(
              (element) => {
                return element.Correct == true;
              }
            );
            if (!state.ruleValid.isValid) {
              state.ruleValid.msg = "Nội cần ít nhất 1 đáp án đúng";
            }
            break;
          case "2": //Câu hỏi đúng sai
            state[payload.name].Answers.forEach((element) => {
              if (element.Correct) {
                checkValid.push(element); //Nếu đáp án đúng thì cho vào mảng
              }
            });
            if (checkValid.length != 1) {
              state.ruleValid.isValid = false;
            } else {
              state.ruleValid.isValid = true;
            }
            if (!state.ruleValid.isValid) {
              state.ruleValid.msg = "Nội cần ít nhất 1 đáp án đúng";
            }
            break;

          default:
            break;
        }
      } else {
        state.ruleValid.isValid = false;
        state.ruleValid.msg =
          "Nội dung câu hỏi hoặc file đính kèm không để trống";
      }
    },
    /**
     * Chỉnh sửa câu hỏi
     * Author: NVTAM 14/2/2022
     */
    updateQuestion(state, payload) {
      console.log(payload);
      state.Questions[payload.id]; //id là index của câu hỏi
      //bind dữ liệu vào form câu hỏi đồng thời hiện popup tương ứng
    },
  },
  actions: {},
  modules: {},
};
export default questions;
