// Task 1

// 1. Write​ ​ a ​​ pattern​ ​ that​ ​can identify an​ ​ e-mail​ ​ address.

function isValid(email) {
  let temp = email.split("@");
  if (temp.length != 2) return "Invalid Email";
  if (temp[0][0] == "-" || temp[0][0] == "_") return "Invalid Email";
  // check username
  for (let i = 0; i < temp[0].length; i++) {
    if (
      (temp[0][i] > "a" && temp[0][i] < "z") ||
      (temp[0][i] > "A" && temp[0][i] < "Z") ||
      (temp[0][i] >= 0 && temp[0][i] <= 9) ||
      temp[0][i] == "-" ||
      temp[0][i] == "_"
    )
      continue;
    else return "Invalid Email";
  }

  // check domain
  if (temp[1].includes("..")) return "Invalid Email";
  let domain = temp[1].slice(temp[1].lastIndexOf("."));
  if (domain.length < 3 || domain.length > 5) return "Invalid Email";

  return "Valid Email";
}

console.log(isValid("t1st@gmail.comnd"));
