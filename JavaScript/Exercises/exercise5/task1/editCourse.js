let users = localStorage.getItem("users");
let allStudents = [];
if (users != null && users != "null" && users != "undefined") {
  users = JSON.parse(users);
} else users = [];

const searchParams = new URLSearchParams(window.location.search);
const coursename = searchParams.get("Coursename");
console.log(coursename);

let isInNotAssignedList = [];
let studentToCourseMap = localStorage.getItem("studentToCourseMap");
if (
  studentToCourseMap != null &&
  studentToCourseMap != "null" &&
  studentToCourseMap != "undefined"
) {
  studentToCourseMap = JSON.parse(studentToCourseMap);
  for (let elem of studentToCourseMap) {
    let option = new Option(elem[0], elem[0]);
    option.id = `${elem[0]}Option`;
    option.addEventListener("click", (e) => {
      changeAssignment(e);
    });
    if (elem[1] === "Java")
      document.getElementById("assignedStudentName").append(option);
    else {
      document.getElementById("notAssignedStudentName").append(option);
      isInNotAssignedList.push(elem[0]);
    }
  }
}

for (let user of users) {
  if (!isInNotAssignedList.includes(user.username) && user.role === "student") {
    let option = new Option(user.username, user.username);
    option.id = `${user.username}Option`;
    option.addEventListener("click", (e) => {
      changeAssignment(e);
    });
    document.getElementById("notAssignedStudentName").append(option);
  }
}

function changeAssignment(event) {
  if (event.target.closest("select").id === "assignedStudentName") {
    let id = event.target.id;
    let studentName = event.target.value;
    document.getElementById(id).remove();
    let option = new Option(studentName, studentName);
    option.id = id;
    option.addEventListener("click", (e) => {
      changeAssignment(e);
    });
    document.getElementById("notAssignedStudentName").append(option);
  } else if (event.target.closest("select").id === "notAssignedStudentName") {
    let id = event.target.id;
    let studentName = event.target.value;
    document.getElementById(id).remove();
    let option = new Option(studentName, studentName);
    option.id = id;
    option.addEventListener("click", (e) => {
      changeAssignment(e);
    });
    document.getElementById("assignedStudentName").append(option);
  }
}

let form = document.forms[0].elements;
let field;
let flag = true;

function editCourse() {
  let newCoursename = document.getElementById("coursename").value;
  let newCoursetitle = document.getElementById("coursetitle").value;

  flag = validateCourseName();
  flag = validateCourseTitle();

  if (flag) {
    let courses = localStorage.courses;
    if (courses != "undefined" && courses != null && courses != "null") {
      courses = JSON.parse(courses);
      courses[newCoursename] = newCoursetitle;
      delete courses[coursename];
    }

    let selectedUsers = document.getElementById("assignedStudentName").options;
    let newStudentToCourseMap = [];
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
        newStudentToCourseMap.push([user.value, newCoursename]);
      }
    }
    console.log(newStudentToCourseMap);
    console.log(courses);
    localStorage.setItem(
      "studentToCourseMap",
      JSON.stringify(newStudentToCourseMap)
    );
    localStorage.setItem("courses", JSON.stringify(courses));
    window.location.href = "./homePage.html";
  }
  //   console.log(courses);

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
