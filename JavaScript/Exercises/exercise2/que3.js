// 3. Write​ ​ a ​ ​ JavaScript​ ​ program​ ​ to​ ​ find​ ​ the​ ​ most​ ​frequent​ ​ item​ ​ of​ ​ an​ ​ array.

function mostFrequentElem(arr) {
  let max = 0,
    count = 1,
    ans = 0;
  arr.sort((a, b) => a - b);
  arr.forEach((index) => {
    if (index + 1 == arr.length);
    else {
      if (arr[index] === arr[index + 1]) {
        count++;
        if (count > max) {
          ans = arr[index];
          max = count;
        }
      } else count = 1;
    }
  });
  return ans;
}

console.log(mostFrequentElem([0, 1, 1, 2, 3, 4, 5, 5, 5, 6, 7, 7, 8, 9]));
