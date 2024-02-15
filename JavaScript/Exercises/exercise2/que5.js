// 5. Write​ ​ a ​ ​ JavaScript​ ​ program​ ​ to​ ​ compute​ ​ the​ ​ union​ ​of​ ​ two​ ​ arrays,​ ​ and​ ​ Write​ ​ a ​ ​
// JavaScript function​ ​ to​ ​ find​ ​ the​ ​ difference​ ​ of​ ​ two​ ​ arrays, and intersection of two arrays.

function union_array(arr1, arr2) {
  let unionArr = arr1.concat(arr2);
  unionArr.sort((a, b) => a - b);

  unionArr.map((_, index) => {
    if (unionArr[index] === unionArr[index + 1]) unionArr.splice(index, 1);
  });
  return unionArr;
}

function intersection_array(arr1, arr2) {
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);
  let ans = [];

  arr1.forEach((element) => {
    if (arr2.includes(element) && !ans.includes(element)) ans.push(element);
  });
  return ans;
}

function aMinusb_array(arr1, arr2) {
  let tempArr = intersection_array(arr1, arr2);
  tempArr.forEach((element) => {
    let index = arr1.indexOf(element);
    arr1.splice(index, 1);
  });
  return arr1;
}
console.log(union_array([0, 2, 4, 3], [3, 4, 5]));
console.log(intersection_array([0, 4, 3, 3], [3, 4, 5]));
console.log(aMinusb_array([0, 2, 2, 3], [3, 4, 5]));
console.log(aMinusb_array([3, 4, 5], [0, 2, 2, 3]));
