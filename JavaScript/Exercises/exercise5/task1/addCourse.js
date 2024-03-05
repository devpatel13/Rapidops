let users = JSON.parse(localStorage.getItem("users"));
function setOptions() {
  if (!users) return;
  for (let user of users) {
    let option = new Option(user.username, user.username);
    document.getElementById("studentName").append(option);
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
    let assignedUsers,
      assignedCourse,
      newlyAssignedUsers = [];
    if (selectedUsers.length) {
      assignedCourse = localStorage.getItem("assignedCourse");

      if (
        assignedCourse != null &&
        assignedCourse != "null" &&
        assignedCourse != "undefined"
      ) {
        assignedCourse = JSON.parse(assignedCourse);
        assignedUsers = Object.keys(assignedCourse);
        for (let user of selectedUsers) {
          newlyAssignedUsers.push(user.value);
          if (assignedUsers.includes(user.value)) {
            if (!assignedCourse[user.value].includes(coursename)) {
              assignedCourse[user.value] = [
                coursename,
                ...assignedCourse[user.value],
              ];
            }
          } else {
            assignedCourse[user.value] = [coursename];
          }
        }
      } else {
        assignedCourse = {};
        assignedUsers = Object.keys(assignedCourse);
        //   let assignedCourse = new Map();
        for (let user of selectedUsers) {
          assignedCourse[user.value] = [coursename];
          newlyAssignedUsers.push(user.value);
        }
      }
      console.log(assignedCourse);
      assignedUsers.forEach((user, index) => {
        if (!newlyAssignedUsers.includes(user))
          assignedCourse[user].splice(
            assignedCourse[user].indexOf(coursename),
            1
          );
      });

      console.log(JSON.stringify(assignedCourse));
      localStorage.setItem("assignedCourse", JSON.stringify(assignedCourse));
    }

    let courses = localStorage.courses;
    if (courses != "undefined" && courses != null && courses != "null") {
      courses = JSON.parse(courses);
      courses[coursename] = coursetitle;
    } else {
      courses = {};
      courses[coursename] = coursetitle;
    }
    localStorage.setItem("courses", JSON.stringify(courses));
    console.log(courses);
    window.location.href = "./homePage.html";
  }

  //   if(assignedCourse)
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

function goToHome() {
  window.location.href = "./homePage.html";
}
