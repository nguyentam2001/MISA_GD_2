class Common {
  constructor() {}
  /**
   * Hàm tĩnh format date
   * Author:Nguyễn Văn Tâm (02/02/2022)
   * @param {Date} date
   *
   */
  static formatDateDDMMYYYY(date) {
    if (date) {
      const newDate = new Date(date);
      let dateCur = newDate.getDate();
      let monthCur = newDate.getMonth() + 1;
      let yearCur = newDate.getFullYear();
      dateCur = dateCur < 10 ? `0${dateCur}` : dateCur;
      monthCur = monthCur < 10 ? `0${monthCur}` : monthCur;
      return `${dateCur}/${monthCur}/${yearCur}`;
    } else return "";
  }
  static subjectOfGrade(exercises) {
    if (exercises) {
      var grade = exercises["GradeName"].replace(/^\D+/g, "");
      return `${exercises["SubjectName"]} ${grade}`;
    } else {
      return "";
    }
  }

  static AddItemNotExists(a, item) {
    var index = a.findIndex((x) => x.name == item.name);
    if (index === -1) {
      a.push(item);
    } else {
     return;
    }
  }
  // check if an element exists in array using a comparer function
// comparer : function(currentElement)

}
export default Common;
