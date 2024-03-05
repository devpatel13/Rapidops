let admin = false;
let loggedInUser = JSON.parse(
  document.cookie.substring(document.cookie.indexOf("=") + 1)
);
let enrolledCourse = [];
let courses = localStorage.getItem("courses");
let courseDetails = {};

if (loggedInUser.role === "admin") admin = true;

if (admin) {
  document.getElementById("adminDiv").hidden = false;
  document.getElementById("adminDiv").className = "user";
  document.getElementById("adminDiv").id = "user";
  document.getElementById("role").innerHTML = "Admin";
  document.getElementById("addCourseBtn").hidden = false;

  if (courses != "undefined" && courses != null && courses != "null") {
    courses = JSON.parse(courses);
    courseDetails = { ...courses };
  }
} else {
  document.getElementById("studentDiv").hidden = false;
  document.getElementById("studentDiv").className = "user";
  document.getElementById("studentDiv").id = "user";
  document.getElementById("role").innerHTML = "Student";
  let studentToCourseMap = localStorage.getItem("studentToCourseMap");
  if (
    studentToCourseMap != "undefined" &&
    studentToCourseMap != null &&
    studentToCourseMap != "null"
  ) {
    studentToCourseMap = JSON.parse(studentToCourseMap);
    for (let elem of studentToCourseMap) {
      if (elem[0] === loggedInUser.username) enrolledCourse.push(elem[1]);
    }
  }

  if (courses != "undefined" && courses != null && courses != "null") {
    courses = JSON.parse(courses);
    enrolledCourse.forEach((elem) => {
      courseDetails[elem] = courses[elem];
    });
  }
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
    let editButton = createElem(
      "button",
      `${course.coursename}editBtn`,
      "Edit Course"
    );
    editButton.addEventListener("click", (e) => {
      editCourse(e);
    });
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

function editCourse(event) {}

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

courses = new Course(courseDetails);
console.log(courses.getCourses());
courses.showCourses();
