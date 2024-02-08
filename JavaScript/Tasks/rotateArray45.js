function rotate(arr) {
  let prev = 0;
  let top = 0,
    bottom = arr.length - 1,
    left = 0,
    right = arr[0].length - 1;

  for (let i = left; i <= right; i++) {
    if (top == 0 && i == 0) prev = arr[top][i];
    else {
      let temp = arr[top][i];
      arr[top][i] = prev;
      prev = temp;
    }
    // console.log(`${top} ${i}`);
  }
  top++;

  for (let i = top; i <= bottom; i++) {
    // console.log(`${i} ${right}`);
    let temp = arr[i][right];
    arr[i][right] = prev;
    prev = temp;
  }
  right--;

  for (let i = right; i >= left; i--) {
    // console.log(`${bottom} ${i}`);
    let temp = arr[bottom][i];
    arr[bottom][i] = prev;
    prev = temp;
  }
  bottom--;

  for (let i = bottom; i >= top - 1; i--) {
    // console.log(`${i} ${left}`);
    let temp = arr[i][left];
    arr[i][left] = prev;
    prev = temp;
  }

  return arr;
}

function rotateNDegree(arr, degree) {
  let count = degree / 45;
  while (count) {
    arr = rotate(arr);
    count--;
  }
  return arr;
}

let arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(rotateNDegree(arr, 90));
