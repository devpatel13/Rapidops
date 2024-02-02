// 2.

function makePattern(num) {
  let str = "";

  for (let i = 0; i <= num - 1; i++) {
    for (let j = 0; j <= num - 1; j++) {
      if (i == 0 || j == 0 || i == num - 1 || j == num - 1) str += "*";
      else str += " ";
    }
    str += "\n";
  }
  return str;
}

console.log(makePattern(3));
// console.log(makePattern(4));
