let users = localStorage.getItem("users");
let allStudents = [];
if (users != null && users != "null" && users != "undefined") {
  users = JSON.parse(users);
} else users = [];

function setOptions() {
  if (!users) return;
  for (let user of users) {
    if (user.role === "student") {
      allStudents.push(user.username);
      let option = new Option(user.username, user.username);
      document.getElementById("studentName").append(option);
    }
  }
}
setOptions();

let form = document.forms[0].elements;
let field;
let flag = true;

function addCourse() {
  let coursename = document.getElementById("coursename").value;
  let coursetitle = document.getElementById("coursetitle").value;

  flag = validateCourseName();
  flag = validateCourseTitle();

  if (flag) {
    let selectedUsers = document.getElementById("studentName").selectedOptions;
    let studentToCourseMap = localStorage.getItem("studentToCourseMap");
    let newStudentToCourseMap = [];
    console.log(selectedUsers);
    let courses = localStorage.courses;
    if (courses != "undefined" && courses != null && courses != "null") {
      courses = JSON.parse(courses);
      let courseNames = Object.keys(courses);
      if (courseNames.includes(coursename)) {
        addErrorElement(
          document.getElementById("students"),
          "Course Already Exists",
          "courseError"
        );
        return false;
      } else courses[coursename] = coursetitle;
    } else {
      courses = {};
      courses[coursename] = coursetitle;
    }
    console.log(newStudentToCourseMap);
    console.log(courses);

    if (selectedUsers.length) {
      if (
        studentToCourseMap != null &&
        studentToCourseMap != "null" &&
        studentToCourseMap != "undefined"
      ) {
        studentToCourseMap.forEach((elem) => {
          if (!(elem[1] === coursename)) newStudentToCourseMap.push(elem);
        });
      }

      for (let user of selectedUsers) {
        newStudentToCourseMap.push([user.value, coursename]);
      }
    }
    localStorage.setItem(
      "studentToCourseMap",
      JSON.stringify(newStudentToCourseMap)
    );
    localStorage.setItem("courses", JSON.stringify(courses));
    window.location.href = "./homePage.html";
  }
  return false;
}

function validateCourseName() {
  field = form.coursename;
  if (field.value.length <= 0) {
    if (document.querySelector("#coursenameError") == null) {
      addErrorElement(field, "Coursename cannot be empty", "coursenameError");
    }
    return false;
  } else {
    document.querySelector("#coursenameError")?.remove();
    return true;
  }
}

function validateCourseTitle() {
  field = form.coursetitle;
  if (field.value.length <= 0) {
    if (document.querySelector("#coursetitleError") == null) {
      addErrorElement(field, "Coursetitle cannot be empty", "coursetitleError");
    }
    return false;
  } else {
    document.querySelector("#coursetitleError")?.remove();
    return true;
  }
}

function addErrorElement(adjacentField, text, id) {
  let p = document.createElement("p");
  p.style = "color:red";
  p.id = id;
  p.innerText = text;
  adjacentField.after(p);
  adjacentField.focus();
}

function removeCourseError() {
  document.getElementById("courseError")?.remove();
}

function goToHome() {
  window.location.href = "./homePage.html";
}
