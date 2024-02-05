// 12. Write​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ chop​ ​ a ​ ​ string​ ​into​ ​ chunks​ ​ of​ ​ a ​ ​ given​ ​ length.

function string_chop(str, jump) {
  let ans = [];
  for (let i = 0; i < str.length; i += jump) {
    ans.push(str.slice(i, i + jump));
  }
  return ans;
}

console.log(string_chop("RapidOpsSolution", 4));
