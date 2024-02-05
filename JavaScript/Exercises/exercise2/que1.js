// 1. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ get​ ​the​ ​ first​ ​ and​ ​ last​ ​ element​ ​ of​ ​ an​ ​ array.​ ​ Passing​ ​ a
//  parameter​ ​ 'n'​ ​ will​ ​return​ ​ the​ ​ first​ ​ 'n'​ ​ elements​ ​ of​ ​ the​ ​ array​ ​ and​ ​last​ ​ ‘n’​ ​ elements​ ​ of​ ​ the array.

static_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
function getFirstnElements(arr, num) {
  console.log(arr.slice(0, num));
  console.log(arr.slice(num));
}
getFirstnElements(static_array, 3);
