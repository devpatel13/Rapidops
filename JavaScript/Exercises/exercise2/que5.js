// 5. Write​ ​ a ​ ​ JavaScript​ ​ program​ ​ to​ ​ compute​ ​ the​ ​ union​ ​of​ ​ two​ ​ arrays,​ ​ and​ ​ Write​ ​ a ​ ​
// JavaScript function​ ​ to​ ​ find​ ​ the​ ​ difference​ ​ of​ ​ two​ ​ arrays, and intersection of two arrays.

function union_array(arr1, arr2) {
  unionArr = arr1.concat(arr2);
  unionArr.sort((a, b) => a - b);

  unionArr.map((index) => {
    if (unionArr[index] === unionArr[index + 1]) unionArr.splice(index, 1);
  });
  return unionArr;
}

function intersection_array(arr1, arr2) {
  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);
  let ans = [];

  arr1.forEach((element) => {
    if (arr2.includes(element)) ans.push(element);
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
console.log(aMinusb_array([0, 1, 2, 3], [3, 4, 5]));
