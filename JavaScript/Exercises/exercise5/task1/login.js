let form = document.forms[0].elements;
let field;
let users = [];
if (localStorage.getItem("users")) {
  let tempArr = JSON.parse(localStorage.getItem("users"));
  users.push(...tempArr);
}

function validateUser() {
  let username = form.username.value;
  let password = form.password.value;
  for (let user of users) {
    if (username === user.username && password === user.password) {
      let loggedInUser = JSON.stringify({
        username,
        password,
        role: user.role,
      });
      document.cookie = `loggedInUser=${loggedInUser}; path=/Exercises/exercise5/task1/`;
      window.location.href = "./homePage.html";
      return false;
    }
  }
  addErrorElement(
    document.getElementById("passwordDiv"),
    "Invalid Credentials",
    "loginError"
  );
  return false;
}

function addErrorElement(adjacentField, text, id) {
  let p = document.createElement("p");
  p.style = "color:red; ";
  p.id = id;
  p.innerText = text;
  adjacentField.append(p);
  adjacentField.focus();
}

function removeErrors() {
  document.querySelectorAll("p").forEach((pElem) => {
    if (!(pElem.id === "redirectLink")) pElem.remove();
  });
  flag = true;
}

function goToSignUpPage() {
  window.location.href = "./signUp.html";
}
