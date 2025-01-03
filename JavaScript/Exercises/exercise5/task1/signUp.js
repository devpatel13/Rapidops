let form = document.forms[0].elements;
let field;
let flag = true;
let userDetails = {};
let users = [];

function formValidate() {
  // Name validation
  flag = validateUsername(false);

  // Email validation
  flag = validateEmail(false);

  // Password Validation
  flag = validatePassword(false);

  // Role validation
  flag = validateRole(false);

  // Terms and Conditions Validation
  flag = validateTermsAndCondition(false);

  if (flag) {
    removeErrors();
    let existingUsers = JSON.parse(localStorage.getItem("users"));
    if (existingUsers != null) {
      if (!validateUser(existingUsers)) {
        alert("This user already exists");
        document.querySelector("#emailError")?.remove();
        document.querySelector("#usernameError")?.remove();
        return false;
      }
    } else existingUsers = [];
    existingUsers.push(userDetails);
    usersJson = JSON.stringify(existingUsers);
    localStorage.setItem("users", usersJson);
    window.location.href = "./login.html";

    return false;
  }

  return false;
}

function isValidEmail(email) {
  let temp = email.split("@");
  if (temp.length != 2) return false;
  if (temp[0][0] == "-" || temp[0][0] == "_") return false;
  // check username
  for (let i = 0; i < temp[0].length; i++) {
    if (
      (temp[0][i] >= "a" && temp[0][i] <= "z") ||
      (temp[0][i] >= "A" && temp[0][i] <= "Z") ||
      (temp[0][i] >= 0 && temp[0][i] <= 9) ||
      temp[0][i] == "-" ||
      temp[0][i] == "_"
    )
      continue;
    else return false;
  }

  // check domain
  if (temp[1].includes("..")) return false;
  let domain = temp[1].slice(temp[1].lastIndexOf("."));
  if (domain.length < 4 || domain.length > 5) return false;

  return true;
}

function validateUsername(doFocus = true) {
  field = form.username;
  if (field.value.length < 3 || field.value.length > 12) {
    if (document.querySelector("#usernameError") == null) {
      addErrorElement(
        field,
        "Username must be 3 to 12 characters long",
        "usernameError"
      );
    }
    // if (doFocus) field.focus();
    return false;
  } else {
    userDetails.username = field.value;
    document.querySelector("#usernameError")?.remove();
    return true;
  }
}

function validateEmail(doFocus = true) {
  field = form.email;
  if (!isValidEmail(field.value)) {
    if (document.querySelector("#emailError") == null) {
      addErrorElement(field, "Email is not valid", "emailError");
    }
    // if (doFocus) field.focus();
    console.log(`${flag} email`);

    return false;
  } else {
    userDetails.email = field.value;
    document.querySelector("#emailError")?.remove();
    return true;
  }
}

function validatePassword(doFocus = true) {
  field = form.pass1;
  if (field.value.length < 3 || field.value.length > 12) {
    if (document.querySelector("#passwordError") == null) {
      addErrorElement(
        field,
        "Password must be 3 to 12 characters long",
        "passwordError"
      );
    }
    // if (doFocus) field.focus();
    console.log(`${flag} pass`);

    return false;
  }
  return true;
}

function validateConfirmPassword() {
  let confirmPass = form.pass2;
  field = form.pass1;

  if (!(field.value === confirmPass.value)) {
    document.querySelector("#passwordError")?.remove();
    if (document.querySelector("#confirmPassError") == null) {
      addErrorElement(confirmPass, "Password must be same", "confirmPassError");
      console.log(`${flag} conPass`);

      return false;
    }
  } else {
    userDetails.password = field.value;
    document.querySelector("#passwordError")?.remove();
    document.querySelector("#confirmPassError")?.remove();
    return true;
  }
}

function validateRole() {
  userDetails.role = document.getElementById("role").value;
}

function validateTermsAndCondition(doFocus = true) {
  field = form.termsandcondition;
  if (!field.checked) {
    if (document.querySelector("#termsandconditionError") == null) {
      addErrorElement(
        field,
        "Please agree to the Terms & Conditions",
        "termsandconditionError"
      );
    }
    // if (doFocus) field.focus();
    console.log(`${flag} t&c`);

    return false;
  } else {
    document.querySelector("#termsandconditionError")?.remove();
    return true;
  }
}

function addErrorElement(adjacentField, text, id) {
  let p = document.createElement("p");
  p.style = "color:red; ";
  p.id = id;
  p.innerText = text;
  adjacentField.after(p);
  adjacentField.focus();
}

function removeErrors() {
  document.querySelectorAll("p").forEach((pElem) => {
    if (!(pElem.id === "redirectLink")) pElem.remove();
  });
  flag = true;
}

function validateUser(existingUsers) {
  let username = userDetails.username;
  let email = userDetails.email;
  for (let user of existingUsers) {
    if (username === user.username || email === user.email) {
      return false;
    }
  }
  return true;
}
