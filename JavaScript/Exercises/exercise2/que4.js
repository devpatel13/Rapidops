// 4. Write​ ​ a ​ ​ JavaScript​ ​ program​ ​ to​ ​ shuffle​ ​ an​ ​array.

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // i+1 includes "i" too
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  console.log(arr);
}

shuffle([1, 2, 3, 4, 5]);
