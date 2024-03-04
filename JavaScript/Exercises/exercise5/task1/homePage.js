let admin = false;
let loggedInUser = JSON.parse(
  document.cookie.substring(document.cookie.indexOf("=") + 1)
);
console.log(loggedInUser);
if (loggedInUser.username === "admin") admin = true;

if (admin) {
  document.getElementById("adminDiv").hidden = false;
  document.getElementById("adminDiv").className = "user";
  document.getElementById("adminDiv").id = "user";
} else {
  document.getElementById("studentDiv").hidden = false;
  document.getElementById("studentDiv").className = "user";

  document.getElementById("studentDiv").id = "user";
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
  let courseDiv = createElem("div", course);
  let courseName = createElem("h2", 0, course);
  let courseTitle = createElem("h3", 0, courses[course]);
  if (admin) {
    let editButton = createElem(
      "button",
      `${course.coursename}EditBtn`,
      "Edit Course"
    );
    courseDiv.append(courseName, courseTitle, editButton);
  }
  courseDiv.append(courseName, courseTitle);

  document.getElementById("user").append(courseDiv);
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

let courses = new Course(JSON.parse(localStorage.getItem("courses")));
console.log(courses.getCourses());
courses.showCourses();
