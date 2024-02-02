// 5.

function makePattern(num) {
  let str = "";
  let last = num - 1;
  let count_row = 0;
  let flag = true;
  for (let i = 0; i < 2 * num - 1; i++) {
    if (count_row == num) flag = false;
    if (flag) count_row++;
    else count_row--;
    count = count_row;
    for (let j = 1; j <= num; j++) {
      if (j < count) str += " ";
      else {
        str += count;
        str += " ";
        count++;
      }
    }
    str += "\n";
  }
  return str;
}

console.log(makePattern(19));
