// 15. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ delete​ ​ particular​ ​object​ ​ from​ ​ array​ ​ and​ ​ add​ ​
// new​ ​ object​ ​ at particular​ ​ position. Also if the position does not exist then error message
// should be shown to the user.

static_array = [
  { name: "Jack", age: 23 },
  { name: "Sam", age: 12 },
  { name: "Max", age: 20 },
];

function deleteOrInsert() {
  let ans = prompt("Insert or delete?", "");
  if (ans == "insert") {
    let pos = +prompt("insert position?", 0);
    if (pos < 0 || pos >= static_array.length)
      return alert("Error: Out of bound");
    else {
      let age = +prompt("insert age?", 0);
      let name = prompt("insert name?", "John");
      static_array.splice(pos, 0, { name: name, age: age });
    }
  } else {
    let pos = +prompt("delete position?", 0);
    if (pos < 0 || pos >= static_array.length)
      return alert("Error: Out of bound");
    else {
      static_array.splice(pos, 1);
    }
  }
}
deleteOrInsert();
console.log(static_array);
