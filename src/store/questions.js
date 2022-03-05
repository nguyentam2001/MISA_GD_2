import Vue from "vue";
import Vuex from "vuex";
import Enum from "../script/enum.js";
import axios from "axios";
Vue.use(Vuex);
const questions = {
  state: {
    Questions: [],
    ExerciseID: "",
    Question: {
      Type: 1, //Chọn đáp án đúng
      Content: "",
      Attachments: [],
      Answers: [
        {
          Content: "",
          Correct: false,
          Image: {},
          color: "#ffaec7",
        },
        {
          Content: "",
          Correct: false,
          Image: {},
          color: "#afeca4",
        },
        {
          Content: "",
          Correct: false,
          Image: {},
          color: "#f9c3b7",
        },
        {
          Content: "",
          Correct: false,
          Image: {},
          color: "#b7dfff",
        },
      ],
      Hint: "",
    },
    QuestionTrueFalse: {
      Type: 2, //Câu hỏi đúng sai
      Content: "",
      Attachments: [],
      Answers: [
        {
          Content: "ĐÚNG",
          Correct: true,
          Image: {},
          color: "#afeca4",
        },
        {
          Content: "SAI",
          Correct: false,
          Image: {},
          color: "#ffaec7",
        },
      ],
      Hint: "",
    },
    FillTheBlank: {
      Type: 3,
      Content: "",
      Attachments: [],
      Answers: [
        {
          Content: [],
          Correct: true,
          Image: {},
        },
        {
          Content: [],
          Correct: true,
          Image: {},
        },
        {
          Content: [],
          Correct: true,
          Image: {},
        },
      ],
      Hint: "",
    },
    Essay: {
      Type: 4, //Chọn đáp án đúng
      Content: "",
      Correct: true,
      Attachments: [],
      Hint: "",
      Answers: [],
    },
    GroupQuestions: {},
    //Để lưu trữ câu hỏi
    QuestionsTmp: [
      {
        Type: 1, //Chọn đáp án đúng
        Content: "",
        Attachments: [],
        Answers: [
          {
            Content: "",
            Correct: false,
            Image: {},
            color: "#ffaec7",
          },
          {
            Content: "",
            Correct: false,
            Image: {},
            color: "#afeca4",
          },
          {
            Content: "",
            Correct: false,
            Image: {},
            color: "#f9c3b7",
          },
          {
            Content: "",
            Correct: false,
            Image: {},
            color: "#b7dfff",
          },
        ],
        Hint: "",
      },
      {
        Type: 2, //Câu hỏi đúng sai
        Content: "",
        Attachments: [],
        Answers: [
          {
            Content: "ĐÚNG",
            Correct: true,
            Image: {},
            color: "#afeca4",
          },
          {
            Content: "SAI",
            Correct: false,
            Image: {},
            color: "#ffaec7",
          },
        ],
        Hint: "",
      },
      {
        Type: 3,
        Content: "",
        Attachments: [],
        Answers: [
          {
            Content: [],
            Correct: true,
            Image: {},
          },
          {
            Content: [],
            Correct: true,
            Image: {},
          },
          {
            Content: [],
            Correct: true,
            Image: {},
          },
        ],
        Hint: "",
      },
      {
        Type: 4, //Câu hỏi tự luận
        Content: "",
        Correct: true,
        Attachments: [],
        Hint: "",
      },
    ],
    Answer: {
      Content: "",
      Correct: false,
      Image: {},
      color: "#ffaec7",
    },
    AnswerBlank: {
      Content: [],
      Correct: true,
      Image: {},
    },
    ruleValid: {
      isValid: true,
      msg: "",
    },
    arrayMsgValid: [],
    //id câu hỏi
    questionId: null,
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
      switch (payload.type) {
        case "1":
          state[payload.name].Answers.push({ ...state.Answer });
          break;
        case "3":
          state[payload.name].Answers.push(
            JSON.parse(JSON.stringify(state.AnswerBlank))
          );
          break;
        default:
          break;
      }
    },
    /**
     * Thêm một đáp án vào ô trống dạng câu điền vào chỗ trống
     * @param {*} state
     * @param {*} payload
     */
    pushAnswerInBlank(state, payload) {
      state.FillTheBlank.Answers[payload.blankId].Content.push(payload.text);
    },
    /**
     * Thêm một đáp án vào ô trống dạng câu điền vào chỗ trống
     * @param {*} state
     * @param {*} payload
     */
    delAnswerInBlank(state, payload) {
      if (payload != null) {
        state.FillTheBlank.Answers[payload.blankId].Content.splice(
          payload.textIndex,
          1
        );
      }
    },

    /**
     * Xóa ô trống
     * @param {*} state
     * @param {*} payload
     */
    deleteAnswer(state, payload) {
      if (payload != null) {
        state[payload.name].Answers.splice(payload.id, 1);
      }
    },

    /**
     * Validate Answers question
     * Author: NVTAM (12/2/2022)
     * @param {*} state
     * @param {name: tên của câu hỏi, type: kiểu câu hỏi} payload
     */
    validateAnswer(state, payload) {
      let checkValid = []; //mảng lưu giá trị đúng
      state.arrayMsgValid = [];
      //Kiểm tra nội dung hoặc file đính kèm
      if (
        state[payload.name].Content ||
        state[payload.name].Attachments.length != 0
      ) {
        //câu chọn đáp án đúng
        switch (payload.type) {
          case Enum.stateFromQuestion.Choose: //Câu chọn đáp án đúng
            state.ruleValid.isValid = state[payload.name].Answers.some(
              (element) => {
                return element.Correct == true;
              }
            );
            if (!state.ruleValid.isValid) {
              state.ruleValid.msg = "Nội cần ít nhất 1 đáp án đúng";
              state.arrayMsgValid.push(state.ruleValid.msg);
            }
            break;
          case Enum.stateFromQuestion.TrueFalse: //Câu hỏi đúng sai
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
              state.arrayMsgValid.push(state.ruleValid.msg);
            }
            break;
          case Enum.stateFromQuestion.FillTheBlank:
            if (!state.FillTheBlank.Answers.length) {
              state.ruleValid.isValid = false;
              state.ruleValid.msg = "Phải có ít nhất một ô trống";
              state.arrayMsgValid.push(state.ruleValid.msg);
            } else {
              //lặp qua các đáp án bên trong ô trống và kiểm tra
              let arrayAnswers = state.FillTheBlank.Answers;
              for (let i = 0; i < arrayAnswers.length; i++) {
                if (!arrayAnswers[i].Content.length) {
                  state.ruleValid.isValid = false;
                  state.ruleValid.msg = `Ô trống ${
                    i + 1
                  } phải có ít nhất một đáp án`;
                  state.arrayMsgValid.push(state.ruleValid.msg);
                  break;
                }

                state.ruleValid.isValid = true;
              }
            }
            break;
          default:
            break;
        }
      } else {
        state.ruleValid.isValid = false;
        state.ruleValid.msg =
          "Nội dung câu hỏi hoặc file đính kèm không để trống";
        state.arrayMsgValid.push(state.ruleValid.msg);
      }
      console.log(`state.ruleValid.isValid`, state.ruleValid.isValid);
    },
    /**
     * Chỉnh sửa câu hỏi
     * Author: NVTAM 14/2/2022
     */
    bindQuestion(state, payload) {
      switch (payload.type) {
        case "1":
          //id là index của câu hỏi
          //bind dữ liệu vào form câu hỏi đồng thời hiện popup tương ứng
          state.Question = { ...state.Questions[payload.id] };
          break;
        case "2":
          //bind dữ liệu vào form câu hỏi đồng thời hiện popup tương ứng
          state.QuestionTrueFalse = { ...state.Questions[payload.id] };
          break;
        case "3":
          //bind dữ liệu vào form câu hỏi đồng thời hiện popup tương ứng
          state.FillTheBlank = { ...state.Questions[payload.id] };
          break;
        case "4":
          //bind dữ liệu vào form câu hỏi đồng thời hiện popup tương ứng
          state.Essay = { ...state.Questions[payload.id] };
          break;
        default:
          break;
      }
    },
    /**
     * Xóa câu hỏi
     * Author: NVTAM 14/2/2022
     */
    baseDelete(state, payload) {
      if (payload != null) {
        state[payload.name].splice(payload.id, 1);
      }
    },
    /**
     *reset lại danh sách câu hỏi
      Author: NVTAM 14/2/2022
     */
    resetQuestions(state) {
      state.Questions = [];
    },
    /**
     *
     * Set question
     */

    // Set_Question(state, question) {
    //   state.Questions = question;
    // },
  },
  actions: {
    loadQuestions({ state }) {
      let questionData = []; //Khai báo hàm lưu trữ data
      axios.get("https://localhost:7291/api/v1/Question").then((response) => {
        //Parse JSON
        if (Array.isArray(response.data)) {
          for (const question of response.data) {
            if (question.answers) {
              question.answers = JSON.parse(question.answers);
            }
            if (question.attachments) {
              question.attachments = JSON.parse(question.attachments);
            }
            questionData.push(question);
          }
          state.Questions = questionData;
          // commit("Set_Question", questionData);
          // console.log(questionData);
        }
      });
    },
  },
  modules: {},
};
export default questions;
