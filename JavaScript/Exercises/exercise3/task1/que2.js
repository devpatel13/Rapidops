// 2. Write​ ​ a ​​ JavaScript​ ​ function​ ​ to​ ​ hide​ ​ email​ ​ addresses​ ​ to​ ​ protect​ ​ from​ ​ unauthorized​ ​ user.
// The number of star will be equal to the number of characters hidden, and make this program dynamic.

function hideEmail(email) {
  let ans = "";

  let prefix = email.indexOf("@");
  // console.log(prefix);
  if (prefix < 4) {
    for (let i = 0; i < email.length; i++) {
      if (i < prefix) ans += "*";
      else ans += email[i];
    }
  }

  for (let i = 0; i < email.length; i++) {
    if (i > 1 && i < prefix - 1) ans += "*";
    else ans += email[i];
  }
  return ans;
}

console.log(hideEmail("wdds@gmail.in"));
