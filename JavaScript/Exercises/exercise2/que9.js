// 9. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ convert​ ​ a ​ ​ Unix​ ​timestamp​ ​ to​​ time.

console.log(new Date(1607518718 * 1000));

function unixToTime(sec) {
  let date = new Date(sec * 1000);
  return date;
}
console.log(unixToTime(1607518718));
