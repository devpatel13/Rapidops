// 1.

function makePattern(num) {
  let str = "";
  let last = num - 1;
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      if (i == j) str += "*";
      if (j == last) {
        str += "*";
        last--;
      }
      str += " ";
    }
    str += "\n";
  }
  return str;
}

console.log(makePattern(8));
