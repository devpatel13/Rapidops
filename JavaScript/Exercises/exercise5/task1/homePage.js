let admin = false;
// let loggedInUser;
let loggedInUser = JSON.parse(
  document.cookie.substring(document.cookie.indexOf("=") + 1)
);
let enrolledCourse = {};
console.log(document.cookie);
console.log(loggedInUser);
if (loggedInUser.username === "admin") admin = true;

if (admin) {
  document.getElementById("adminDiv").hidden = false;
  document.getElementById("adminDiv").className = "user";
  document.getElementById("adminDiv").id = "user";
  document.getElementById("role").innerHTML = "Admin";
  document.getElementById("addCourseBtn").hidden = false;
} else {
  document.getElementById("studentDiv").hidden = false;
  document.getElementById("studentDiv").className = "user";
  document.getElementById("studentDiv").id = "user";
  document.getElementById("role").innerHTML = "Student";
}

class Course {
  _courses;
  constructor(courses) {
    this._courses = courses;
  }

  getCourses() {
    return this._courses;
  }

  showCourses() {
    for (let course in this._courses) {
      displayCourseOnPage(course, this._courses);
    }
  }
}

function displayCourseOnPage(course, courses) {
  let cardDiv = createElem("div", course);
  cardDiv.id = course;
  cardDiv.className = "card";
  cardDiv.style = "width: 18rem; padding: 10px 20px";
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  let courseName = createElem("h2", 0, course);
  courseName.className = "card-title";
  let courseTitle = createElem("p", 0, courses[course]);
  courseTitle.className = "card-text";
  if (admin) {
    let removeButton = createElem(
      "button",
      `${course.coursename}RemoveBtn`,
      "Remove Course"
    );
    removeButton.addEventListener("click", (e) => {
      removeCourse(e);
    });
    // removeButton.style = "width: 200px";
    cardBody.append(courseName, courseTitle);
    cardDiv.append(cardBody, removeButton);
  } else {
    cardBody.append(courseName, courseTitle);
    cardDiv.append(cardBody);
  }

  document.getElementById("user").append(cardDiv);
}

function removeCourse(event) {
  let cardDiv = event.target.closest("div");
  let coursename = cardDiv.id;
  let coursesObj = courses.getCourses();
  if (coursesObj != "undefined" && coursesObj != null && coursesObj != "null") {
    delete coursesObj[coursename];
    console.log(coursesObj);
    let assignedCourse = localStorage.getItem("assignedCourse");

    if (
      assignedCourse != null &&
      assignedCourse != "null" &&
      assignedCourse != "undefined"
    ) {
      assignedCourse = JSON.parse(assignedCourse);
      for (let elem in assignedCourse) {
        assignedCourse[elem].forEach((course, index) => {
          if (course === coursename) {
            assignedCourse[elem].splice(index, 1);
          }
        });
      }
      console.log(assignedCourse);
      // console.log(assignedCourse);
    }
    localStorage.setItem("courses", JSON.stringify(coursesObj));
    localStorage.setItem("assignedCourse", JSON.stringify(assignedCourse));

    document.getElementById(coursename).remove();
  }
}

function goToAddCourse() {
  location.href = "./addCourse.html";
}

function createElem(name, id, innerHTML = "") {
  let elem = document.createElement(name);
  if (!id) elem.id = id;
  elem.innerHTML = innerHTML;
  return elem;
}

function logout() {
  document.cookie = "";
  window.location.href = "./login.html";
}
let assignedCourse = localStorage.getItem("assignedCourse");
if (
  assignedCourse != "undefined" &&
  assignedCourse != null &&
  assignedCourse != "null"
) {
  assignedCourse = JSON.parse(assignedCourse);
  console.log(assignedCourse);
  let courses = localStorage.getItem("courses");
  if (courses != "undefined" && courses != null && courses != "null") {
    courses = JSON.parse(courses);
    assignedCourse[loggedInUser.username].forEach((elem) => {
      enrolledCourse[elem] = courses[elem];
    });
    // console.log(assignedCourse[loggedInUser.username]);
  }
}
courses = new Course(enrolledCourse);
console.log(courses.getCourses());
courses.showCourses();
