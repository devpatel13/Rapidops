// 4. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ that​ ​ creates​ ​ a ​ ​ table,​ ​ by accepting​ ​ row
// and ​ column​ ​ numbers​ ​ from​ ​ the user,​ ​ and​ ​input​s ​ row-column​ ​ number​ ​ as​ ​ content​ ​
// (e.g.​ ​ Row-0​ ​ Column-0)​ ​ of​ ​ a ​ ​ cell.

function printTable(row, col) {
  let str = "\t\t\t";
  for (let i = 0; i < col; i++) {
    str += `col:${i + 1}\t`;
  }
  str += "\n\n";
  for (let i = 0; i < row; i++) {
    str += `row: ${i + 1}\t`;
    for (let j = 0; j < col; j++) {
      // str += ``;
      if (i > 9) str += `\t${i} ${j}`;
      else str += `\t${i} ${j}\t`;
    }
    str += "\n\n";
  }
  return str;
}

console.log(printTable(13, 13));
