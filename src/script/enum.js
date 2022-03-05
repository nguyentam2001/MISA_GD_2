class Enum {
  static stateCb = {
    Grade: 1,
    Subject: 2,
  };
  static stateFromQuestion = {
    Choose: "1",
    TrueFalse: "2",
    FillTheBlank: "3",
    Essay: "4",
  };
  static stateQuestionType = {
    Question: "1",
    QuestionTrueFalse: "2",
    FillTheBlank: "3",
    Essay: "4",
  };
  static typeForm = {
    showDetail: 1,
    showUpDate: 2,
  };
  static typePopup = {
    PopupChoose: 1,
  };
  static stateShowQuestionView = {
    QuestionContent: "1",
    QuestionList: "2",
  };
  static typeFormQuestion = {
    AddQuestion: 1,
    UpDateQuestion: 2,
    DeleteQuestion: 3,
  };
}

export default Enum;
