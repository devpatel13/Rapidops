// 3. Write​ ​ a ​​ JavaScript​ ​ function​ ​ to​ ​ remove​ ​ HTML/XML​ ​ tags​ ​ from​ ​ string.

let intput_string =
  "<p><strong>Javascript <i>hi</i> Exercdfdsgises</strong></p>";

function removeTags(str) {
  let ans = "";
  let start = 0,
    end = str.length - 1,
    count = 0,
    tagCount = 0;
  for (; start < str.length; start++) {
    if (str[start] == "<") {
      while (str[start] != ">") {
        start++;
      }
    }
    if (str[start] == ">") continue;
    ans += str[start];
  }
  return ans;
}

console.log(removeTags(intput_string));
