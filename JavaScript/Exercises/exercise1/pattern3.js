// 3.

function makePattern(num) {
  let str = "";
  let mod = num;
  let mid_add, mid_sub;
  let even = false;
  if (num % 2 == 0) even = true;
  if (even) {
    mid_sub = Math.floor((num - 1) / 2);
    mid_add = Math.floor((num - 1) / 2) + 1;
  } else {
    mid_sub = Math.floor((num - 1) / 2);
    mid_add = Math.floor((num - 1) / 2);
  }
  // console.log(`${mid_sub}, ${mid_add}`);
  for (let i = 0; i < num; i++) {
    let j_1 = mid_sub - i;
    let j_2 = mid_add + i;

    if (!even && i > mid_add) {
      mod = num - 1;
    }
    if (j_1 < 0) {
      j_1 = (j_1 + mod) % mod;
    } else j_1 = j_1 % mod;
    if (j_2 < 0) j_2 = (j_2 + mod) % mod;
    else j_2 = j_2 % mod;
    // console.log(`(${i}, ${j_1}), (${i}, ${j_2})`);
    for (let j = 0; j < num; j++) {
      if (j == j_1 || j == j_2) {
        str += "*";
      } else str += "_";
    }
    str += "\n";
  }
  return str;
}
console.log(makePattern(22));
