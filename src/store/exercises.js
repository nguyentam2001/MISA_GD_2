import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const exercises = {
  state: {
    exercises: [
      {
        ExerciseID: "1",
        Title: "Bảng cửu chương",
        GradeID: 2,
        GradeName: "Khối 2",
        SubjectID: "1",
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
            Attachments: [{}],
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
  },
};
export default exercises;
