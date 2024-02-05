// 2. Write​ ​ a ​ ​ JavaScript​ ​ program​ ​ which​ ​ accepts​ ​ a ​ ​ number​​ as​ ​ input​ ​ and​ ​ insert​ ​ dashes​ ​ (-) between​ ​
// each​ ​ two​ ​ even​ ​ numbers.

function addDashes(str) {
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "-") continue;
    if (!(+str[i] % 2) && !(+str[i + 1] % 2)) {
      newStr += str[i];
      if (!(i + 1 == str.length)) newStr += "-";
    } else newStr += str[i];
  }
  str = newStr;
  return newStr;
}

console.log(addDashes("02544168"));
