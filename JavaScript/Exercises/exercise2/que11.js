// 11. Write​ ​ a ​ ​ JavaScript​ ​function​ ​ to​ ​ insert​ ​ a ​ ​ string​ ​ within​ ​ a ​ ​ string​ ​ at​ ​ a ​ ​ particular​ ​
// position (default​ ​ is​ ​ 1).

static_string = "This is a sample string";

function inputString(str, pos = 1) {
  return static_string.slice(0, pos) + str + static_string.slice(pos);
}

console.log(inputString("insert me"));
