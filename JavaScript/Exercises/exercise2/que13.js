// 13. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ print​​ an​ ​ integer​ ​ with​ ​ commas​ ​ as​ ​ thousands​ ​ separators.

function addCommas(num) {
  return num.toLocaleString();
}
console.log(addCommas(1023165454197));
