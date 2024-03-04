let form = document.forms[0].elements;
let field;
let users = [{ username: "admin", password: "admin" }];
if (localStorage.getItem("users")) {
  let tempArr = JSON.parse(localStorage.getItem("users"));
  users.push(...tempArr);
}

// Login Page
function validateUser() {
  let username = form.username.value;
  let password = form.password.value;
  for (let user of users) {
    if (username === user.username && password === user.password) {
      alert("Valid User");
      let loggedInUser = JSON.stringify({ username, password });
      document.cookie = `loggedInUser=${loggedInUser}; path=/Exercises/exercise5/task1/`;
      window.location.href = "./homePage.html";
      return false;
    }
  }
  alert("User does not exists");
  location.href = "../signUp/index.html";
  return false;
}
