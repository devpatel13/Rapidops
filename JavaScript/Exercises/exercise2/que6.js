// 6. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ fill​ ​ an​ ​ array​ ​with​ ​ values​ ​ (either
//   numeric or​ string​ ​ with​ ​ one character)​ ​ on​ ​ supplied​ ​ bounds.

static_array = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function num_string_range(start, end, jump) {
  let currIndex = 0;
  let tempArr = static_array.slice(
    static_array.indexOf(start),
    static_array.indexOf(end) + 1
  );
  console.log(tempArr);
  let ans = [];
  for (let i = 0; i < tempArr.length; i += jump) {
    ans.push(tempArr[i]);
  }
  return ans;
}

console.log(num_string_range("a", "z", 2));
