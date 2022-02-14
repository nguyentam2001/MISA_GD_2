import Vue from "vue";
import Vuex from "vuex";
import grades from "./grades.js";
import questions from "./questions.js";
import Enum from "../script/enum.js";
import popup from "./popup.js";

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
      AddAnswers: "5",
      GroupQuestion: "6",
    },

    exercises: [
      {
        ExerciseID: 1,
        Title: "Bảng cửu chương",
        GradeID: 2,
        GradeName: "Khối 2",
        SubjectID: 1,
        SubjectName: "Toán",
        Avatar: {
          fileName: "toan.png",
        },
        Tags: ["a", "b"],
        Topics: ["a", "b"],
        Status: 0,
        Questions: [
          {
            Type: 1,
            Content: "abcdgs",
            Attachments: [{}],
            Answers: [
              {
                Content: "x",
                Correct: false,
                Image: {},
              },
              {
                Content: "think;thinks",
                Correct: false,
                Image: {},
              },
              {
                Content: "",
                Correct: false,
                Image: {},
              },
            ],
            Hint: "",
          },
        ],
      },

      {
        ExerciseID: "2",
        Title: "Bài tập luyện hằng đẳng thức",
        GradeID: 2,
        GradeName: "Khối 2",
        SubjectID: 1,
        SubjectName: "Toán",
        Avatar: {
          fileName: "toan.png",
        },
        Tags: ["Bình phương tổng", "bình phương hiệu"],
        Topics: [1, 2],
        Status: 0, //đang lưu nháp
        Questions: [
          {
            Type: 1, //Chọn đáp án đúng
            Content: "Bình phương của một hiệu ( A - B )2 là:",
            Attachments: [{}],
            Answers: [
              {
                Content: "A2 + 2AB + B2",
                Correct: false,
                Image: {},
              },
              {
                Content: "A2 - 2AB + B2",
                Correct: true,
                Image: {},
              },
              {
                Content: "( A - B )( A + B )",
                Correct: false,
                Image: {},
              },
              {
                Content: "( A - B )+( A + B )",
                Correct: false,
                Image: {},
              },
            ],
            Hint: "Câu hỏi cấp 1",
          },
        ],
      },
      {
        ExerciseID: "3",
        Title: "Bài tập thì hiện tại đơn",
        GradeID: 6,
        GradeName: "Khối 6",
        SubjectID: 2,
        SubjectName: "Tiếng anh",
        Avatar: {
          fileName: "tienganh.png",
        },
        Tags: ["Ngữ pháp", "Phát âm", "Đọc", "Viết"],
        Topics: [2, 3],
        Status: 1, //đang lưu nháp
        Questions: [
          {
            Type: 1, //Chọn đáp án đúng
            Content: "My brother and I ... television every evening.",
            Attachments: [{}],
            Answers: [
              {
                Content: "watches",
                Correct: false,
                Image: {},
              },
              {
                Content: "listen",
                Correct: true,
                Image: {},
              },
              {
                Content: "Are",
                Correct: false,
                Image: {},
              },
              {
                Content: "watch",
                Correct: true,
                Image: {},
              },
            ],
            Hint: "Câu hỏi cấp 1",
          },
        ],
      },
      {
        ExerciseID: "4",
        Title: "Bài tập lịch sử việt nam",
        GradeID: 6,
        GradeName: "Khối 6",
        SubjectID: 4,
        SubjectName: "Lịch sử",
        Avatar: {
          fileName: "lichsu.png",
        },
        Tags: ["Việt Nam", "Thế giới"],
        Topics: [5],
        Status: 0, //đang lưu nháp
        Questions: [
          {
            Type: 1, //Chọn đáp án đúng
            Content: "Vị vua cuối cùng của chế độ phong kiến nước ta là ai:",
            Attachments: [],
            Answers: [
              {
                Content: "Khải Định",
                Correct: false,
                Image: {},
              },
              {
                Content: "Hàm Nghi",
                Correct: true,
                Image: {},
              },
              {
                Content: "Bảo Đại",
                Correct: true,
                Image: {},
              },
              {
                Content: " Phong Nhã",
                Correct: false,
                Image: {},
              },
            ],
            Hint: "Câu hỏi cấp 2",
          },
        ],
      },
    ],
    //Môn học
    subjects: [
      {
        SubjectID: 1,
        SubjectName: "Toán",
        SubjectCode: "TOAN",
        SubjectImg: "toan.png",
      },
      {
        SubjectID: 2,
        SubjectName: "Tiếng anh",
        SubjectCode: "TA",
        SubjectImg: "tienganh.png",
      },
      {
        SubjectID: 3,
        SubjectName: "Địa lý",
        SubjectCode: "DL",
        SubjectImg: "diali.png",
      },

      {
        SubjectID: 4,
        SubjectName: "Lịch sử",
        SubjectCode: "LS",
        SubjectImg: "lichsu.png",
      },
      {
        SubjectID: 5,
        SubjectName: "Ngữ văn",
        SubjectCode: "NV",
        SubjectImg: "nguvan.png",
      },
      {
        SubjectID: 6,
        SubjectName: "Giáo dục công dân",
        SubjectCode: "GDCD",
        SubjectImg: "gdcd.png",
      },
    ],

    topics: [
      {
        TopicId: 1,
        TopicName: "Cộng và trừ",
        SubjectID: 1,
        GradeID: 2,
      },
      {
        TopicId: 2,
        TopicName: "Thì hiện tại đơn",
        SubjectID: 2,
        GradeID: 3,
      },
      {
        TopicId: 3,
        TopicName: "Thì hiện tại tiếp diễn",
        SubjectID: 2,
        GradeID: 4,
      },
      {
        TopicId: 4,
        TopicName: "Chiến tranh TG thứ nhất",
        SubjectID: 3,
        GradeID: 5,
      },
    ],
    //đối tượng exercise
    exerciseObj: {
      Title: "",
      ExerciseID: 10,
      Status: 0,
      Questions: [],
      SubjectID: "",
      GradeID: "",
      TopicID: "",
      GradeName: "Khối 6",
      SubjectName: "Tiếng anh",
    },
    exerciseReset: {
      Title: "",
      ExerciseID: 10,
      Status: 0,
      Questions: [],
      SubjectID: "",
      GradeID: "",
      TopicID: "",
      GradeName: "Khối 6",
      SubjectName: "Tiếng anh",
    },
    //định nghĩa các giá trị lấy ra từ combobox
    SubjectID: "",
    GradeID: "",
    topic: "",
    exercise: "",
    //biến ẩn hiện view QuestionTypeDetail component
    isHide: true,
    //thay đổi QuestionTypeDetail component
    showQuestionType: null,
    //Hiện danh sách câu hỏi đã soạn
    showContentQuestionView: null,
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
      if (value && typeCb) {
        state[typeCb] = value;
      }
    },
    /**
     * Ẩm poup form question
     * @param {*} state
     * Author: NVTAM (7/2/2022)
     */
    hideFormQuestion(state) {
      state.isHide = true;
      state.showQuestionType = null; //reset giá trị của form question là null
    },
    /**
     * Thay đổi popup kiểu câu hỏi
     * @param {*} state
     * @param {*} payload
     * Author: NVTAM (7/2/2022)
     */
    showFormQuestion(state, payload) {
      state.isHide = false;
      state.showQuestionType = payload;
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
      state.showContentQuestionView = state.stateShowQuestionView.QuestionList;
      if (payload.Type) {
        if (payload.Type == Enum.stateFromQuestion.TrueFalse) {
          state.questions.Questions.push(state.questions.QuestionTrueFalse);
        } else {
          //Lưu câu hỏi
          state.questions.Questions.push(state.questions.Question);
        }
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
      state.exercises.push(state.exerciseObj);
      console.log(`state.exerciseObj`, state.exerciseObj);
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
  },
  actions: {},
  modules: {
    grades,
    questions,
    popup,
  },
});
