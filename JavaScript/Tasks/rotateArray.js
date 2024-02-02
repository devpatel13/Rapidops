let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

function rotateArr(arr) {
  let ans = [];
  let n = arr.length;
  let m = arr[0].length;
  for (let i = 0; i < n; i++) {
    let tempArr = [];
    let count = 0;
    for (let j = m - 1; j >= 0; j--) {
      tempArr[count++] = arr[j][i];
    }
    ans.push(tempArr);
  }
  //   arr = ans;
  //   console.log(arr);
  return ans;
}

function rotate(arr, degree) {
  let counter = degree / 90;
  console.log(counter);
  while (--counter) {
    arr = rotateArr(arr);
  }
  arr = rotateArr(arr);
  return arr;
}

console.log(rotate(matrix, 360));
