import Vue from "vue";
import Vuex from "vuex";
import grades from "./grades.js";
import questions from "./questions.js";
import Enum from "../script/enum.js";
import popup from "./popup.js";
import paging from "./paging.js";
import axios from "axios";
import try_exercise from "./try_exercise";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stateCb: {
      Grade: "GradeID",
      Subject: "SubjectID",
      Topic: "topic",
      Exercise: "exercise",
    },
    stateShowQuestionView: {
      QuestionContent: "1",
      QuestionList: "2",
    },
    stateFromQuestion: {
      Choose: "1",
      TrueFalse: "2",
      FillBlank: "3",
      Essay: "4",
      GroupQuestion: "5",
    },

    exercises: [],
    //Môn học

    subjects: [],
    topics: [],
    //đối tượng exercise
    exerciseObj: {
      Title: "",
      ExerciseID: "",
      Status: 0,
      Questions: [],
      SubjectID: "",
      Tags: [],
      GradeID: "",
      Avatar: {
        fileName: "default.png",
      },
    },
    exerciseReset: {
      Title: "",
      ExerciseID: "",
      Status: 0,
      Tags: [],
      Questions: [],
      SubjectID: "",
      Avatar: {
        fileName: "default.png",
      },
      GradeID: "",
    },
    //định nghĩa các giá trị lấy ra từ combobox
    SubjectID: "",
    GradeID: "",
    topic: "",
    TopicID: "",
    exercise: "",
    SubjectCode: "",
    //biến ẩn hiện view QuestionTypeDetail component
    isHide: true,
    //thay đổi QuestionTypeDetail component
    showQuestionType: null,
    //Hiện danh sách câu hỏi đã soạn
    showContentQuestionView: null,
    //Hiện form nhập câu hỏi (Thêm mới, hay sửa đổi )
    QuestionForm: Enum.typeFormQuestion.AddQuestion,
    newExerciseID: null,
    newQuestion: null,
    //PageIndex

    QuestionReset: null,
    QuestionID: null,
  },
  getters: {
    grades: (state) => state.grades,
    subjects: (state) => state.subjects,
    topics: (state) => state.topics,
    exercises: (state) => state.exercises,
    /**
     * Chuyển đổi số thứ tự thành chữ cái alphabets
     * Author: NVTAM (7/2/2022)
     */
    convertOrder: () => (index) => {
      let charCode = String.fromCharCode(65 + index);
      return charCode;
    },
  },

  mutations: {
    //Lấy Id học liệu mới
    setExerciseID(state, payload) {
      if (payload.ExerciseID) {
        state.newExerciseID = payload.ExerciseID;
      }
    },

    setExercise(state, payload) {
      //dải các state cũ của Học liệu
      state.exerciseObj = { ...payload, ...state.exerciseObj };
    },
    /**
     *  Hàm lấy ra các giá trị từ combobox
     * @param {trạng thái} state
     * @param {giá trị lấy ra từ cb sự kiện on change} value
     * @param {Kiểu cb} value
     * Author: NVTAM(4/2/2021)
     */
    chooseValueCb(state, { value, typeCb }) {
      if (typeCb == "Paging") {
        state.paging.PageSize = value;
      } else {
        if (value && typeCb) {
          console.log(value);
          state[typeCb] = value;
        }
      }
    },
    /**
     * Ẩm poup form question
     * @param {*} state
     * Author: NVTAM (7/2/2022)
     */
    hideFormQuestion(state) {
      state.isHide = true;
      if (state.showQuestionType == Enum.stateFromQuestion.Choose) {
        state.questions.Question = state.QuestionReset;
      }
    },
    /**
     * Thay đổi popup kiểu câu hỏi
     * @param {*} state
     * @param {*} payload
     * Author: NVTAM (7/2/2022)
     */
    showFormQuestion(state, payload) {
      state.isHide = false;
      //Kiểm tra xem payload chuyền vào có phải object không
      if (typeof payload === "object") {
        if (payload.questionForm) {
          //gán kiểu loại from question (thêm mới hay update)
          state.QuestionForm = payload.questionForm;
        } else {
          //mặc định là thêm mới
          state.QuestionForm = Enum.typeFormQuestion.AddQuestion;
        }
        state.showQuestionType = payload.questionType;
      } else {
        state.showQuestionType = payload;
      }
      //lấy copy question ở định dạng ban đầu
      state.QuestionReset = state.questions.QuestionsTmp.find((question) => {
        return question.Type == state.showQuestionType;
      });
      state.QuestionReset = JSON.parse(JSON.stringify(state.QuestionReset));
    },
    /**
     * Hiển thị màn hình chọn câu hỏi để soạn
     * @param {*} state
     * @param {*} payload
     * Author: NVTAM (7/2/2022)
     */
    showContentQuestion(state, payload) {
      console.log(`payload`, payload);
      state.showContentQuestionView = payload;
    },
    /**
     * Hiển thị màn hình câu các câu hỏi đã soạn
     * @param {*} state
     * Author: NVTAM (7/2/2022)
     */
    showContentListQuestion(state, payload) {
      if (payload.Type) {
        if (payload.Type == Enum.stateFromQuestion.TrueFalse) {
          state.newQuestion = JSON.parse(
            JSON.stringify(state.questions.QuestionTrueFalse)
          );
        } else if (payload.Type == Enum.stateFromQuestion.FillTheBlank) {
          state.newQuestion = JSON.parse(
            JSON.stringify(state.questions.FillTheBlank)
          );
        } else if (payload.Type == Enum.stateFromQuestion.Essay) {
          state.newQuestion = JSON.parse(JSON.stringify(state.questions.Essay));
        } else {
          //nếu không phải update thì thêm mới một câu hỏi
          state.newQuestion = JSON.parse(
            JSON.stringify(state.questions.Question)
          );
        }
        console.log(state.newQuestion);
        //state.questions.Questions.push({ ...state.newQuestion });
      }
    },

    /**
     *reset lại form nhập câu hỏi
     * @param {*} state
     */
    resetQuestion(state) {
      console.log(state.showQuestionType);
      if (state.showQuestionType == Enum.stateFromQuestion.Choose) {
        state.questions.Question = state.QuestionReset;
      }
    },

    /**
     * Hoàn thành nhập học liệu
     * @param {*} state
     * Author: NVTAM (7/2/2022)
     */
    completeQuestion(state) {
      //merger array question
      let newQuesstion = state.exerciseObj.Questions.concat(
        state.questions.Questions
      );
      state.exerciseObj.Questions = newQuesstion;
      // push thêm vào học liệu
      state.exercises.push({ ...state.exerciseObj });
    },
    /**
     * Reset lại đối tượng exercise
     * Author: NVTAM (13/2/2022)
     * @param {*} state
     */
    resetExcercies(state) {
      //reset đối tượng exercise
      state.exerciseObj = { ...state.exerciseReset };
    },
    questionFomart(state) {
      for (const prop in state.newQuestion) {
        if (Array.isArray(state.newQuestion[prop])) {
          state.newQuestion[prop] = JSON.stringify(state.newQuestion[prop]);
        }
      }
      //Thêm id học liệu vào question
      state.newQuestion.ExerciseID = state.exerciseObj.ExerciseID;
    },
    /**
     * parse file Avatar
     * @param {*} state
     * @param {*} payload
     */
    parseJsonAvatar(state) {
      state.exerciseObj.Avatar = JSON.parse(state.exerciseObj.Avatar);
    },

    /**
     * Parse Tags
     */
    ParseJsonTags(state) {
      state.exerciseObj.Tags = JSON.parse(state.exerciseObj.Tags);
    },

    /**
     * Xóa câu hỏi
     * @param {*} payload
     * @param {*} state
     */
    setFormMode(state, payload) {
      //Kiểu action xóa
      state.QuestionForm = payload.formMode;
      state.QuestionID = payload.id;
    },

    /**
     * giải mã chuỗi json cho property câu hỏi
     * @param {*} state
     */
    parseAnswers(state) {
      state.exerciseObj.questions.forEach((question, index) => {
        if (question.Answers) {
          //Map ping question hiện tại dưới store với dữ liệu serve
          state.exerciseObj.questions[index].Answers = JSON.parse(
            question.Answers
          );
        }
        if (question.Attachments) {
          state.exerciseObj.questions[index].Attachments = JSON.parse(
            question.Attachments
          );
        }
      });
    },
  },
  actions: {
    loadSubjects({ state }) {
      axios.get("https://localhost:7291/api/v1/Subjects").then((respose) => {
        state.subjects = respose.data;
        console.log(state.subjects);
      });
    },
    //cập nhật exercise hiện tại
    upDateExercies({ state }) {
      axios.put("https://localhost:7291/api/v1/Subjects").then((respose) => {
        state.subjects = respose.data;
        console.log(state.subjects);
      });
    },

    loadTopics({ state }) {
      if (state.GradeID && state.SubjectID) {
        //Lấy mã môn học
        let subjectPick = state.subjects.find((subject) => {
          return subject.SubjectID == state.SubjectID;
        });
        //lấy topic theo mã môn học
        axios
          .get(
            `https://localhost:7291/api/v1/Topics/filter?GradeID=${state.GradeID}&SubjectCode=${subjectPick.SubjectCode}`
          )
          .then((respose) => {
            state.topics = respose.data;
          });
      }
    },
    loadExercises({ state }, QueryText) {
      if (!state.popup.FormDetail) {
        //Nếu hiện form nhập liệu thì không load lại phân tìm kiếm
        if (!QueryText) {
          QueryText = "";
        }
        axios
          .get(
            `https://localhost:7291/api/v1/Exercises/filter?GradeID=${
              state.GradeID || ""
            }&TopicID=${state.TopicID || ""}&SubjectID=${
              state.SubjectID || ""
            }&QueryText=${QueryText}&PageIndex=${
              state.paging.PageIndex
            }&PageSize=${state.paging.PageSize}`
          )
          .then((respose) => {
            state.paging.TotalPage = respose.data.TotalPage;
            state.paging.TotalRecord = respose.data.TotalRecord;
            state.exercises = respose.data.Data;
          });
      }
    },

    loadExerciesByID({ commit, state }, ExerciseID) {
      axios
        .get(`https://localhost:7291/api/v1/Exercises/${ExerciseID}`)
        .then((respose) => {
          state.exerciseObj = respose.data;
          console.log("loadTags", state.exerciseObj.Tags);
          commit("parseAnswers");
          commit("parseJsonAvatar");
          commit("ParseJsonTags");
          state.questions.Questions = state.exerciseObj.questions;
          commit("hideFormQuestion");
        });
    },
    /**
     * Xóa ExercisebyID
     * @param {*} param0
     */

    delExerciesByID({ dispatch }, ExerciseID) {
      axios
        .delete(`https://localhost:7291/api/v1/Exercises/${ExerciseID}`)
        .then(() => {
          dispatch("loadExercises");
        });
    },

    handleQuestion({ commit, dispatch, state }) {
      //Thêm câu hỏi mới
      if (state.QuestionForm == Enum.typeFormQuestion.AddQuestion) {
        commit("questionFomart");

        axios
          .post("https://localhost:7291/api/v1/Question", state.newQuestion)
          .then((respose) => {
            console.log(respose);
          })
          .then(() => {
            //Load lại danh sách câu hỏi by ID
            dispatch("loadExerciesByID", state.exerciseObj.ExerciseID);
          })
          .catch((error) => {
            console.log(error);
          });
        //Sửa lại câu hỏi
      } else if (state.QuestionForm == Enum.typeFormQuestion.UpDateQuestion) {
        //fomart lại question
        commit("questionFomart");
        axios
          .put("https://localhost:7291/api/v1/Question", state.newQuestion)
          .then((respose) => {
            console.log(respose);
          })
          .then(() => {
            //Load lại danh sách câu hỏi by ID
            dispatch("loadExerciesByID", state.exerciseObj.ExerciseID);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (state.QuestionForm == Enum.typeFormQuestion.DeleteQuestion) {
        console.log(state.QuestionID);
        axios
          .delete(`https://localhost:7291/api/v1/Question/${state.QuestionID}`)
          .then((respose) => {
            console.log(respose);
          })
          .then(() => {
            //nếu số câu hỏi lớn hơn 1 thì load lại exercise
            if (state.exerciseObj.QtyQuestions > 1) {
              //Load lại danh sách câu hỏi by ID
              dispatch("loadExerciesByID", state.exerciseObj.ExerciseID);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      //reset lại kiểu form câu hỏi mặc định là thêm
      state.QuestionForm = Enum.typeFormQuestion.AddQuestion;
    },
  },
  modules: {
    grades,
    questions,
    popup,
    paging,
    try_exercise,
  },
});
