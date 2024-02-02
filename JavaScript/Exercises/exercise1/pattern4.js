// 4.

function makePattern(num) {
  let str = "";
  let mid = Math.floor(num / 2);
  let count = 0;
  let flag = true;

  for (let i = 0; i < num; i++) {
    if (count > mid && flag) flag = false;
    if (flag) count++;
    else count--;
    for (let j = 0; j < num; j++) {
      if (j < count) str += "*";
      else str += " ";
    }
    str += "\n";
  }
  return str;
}
console.log(makePattern(5));
