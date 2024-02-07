// alert('hello world');
// alert('world');

// COMMENTS

// one line comment
/* multi line 
    comment */

// function hideEmail(email) {
//   let ans = "";

//   let prefix = email.indexOf("@");
//   // console.log(prefix);
//   if (prefix < 4) {
//     for (let i = 0; i < email.length; i++) {
//       if (i < prefix) ans += "*";
//       else ans += email[i];
//     }
//   }

//   for (let i = 0; i < email.length; i++) {
//     if (i > 1 && i < prefix - 1) ans += "*";
//     else ans += email[i];
//   }
//   return ans;
// }

// console.log(hideEmail("wdds@gmail.in"));

// 3. Write​ ​ a ​​ JavaScript​ ​ function​ ​ to​ ​ remove​ ​ HTML/XML​ ​ tags​ ​ from​ ​ string.

// let intput_string =
//   "<p><strong>Javascript <i>hi</i> Exercdfdsgises</strong></p>";

// function removeTags(str) {
//   let ans = "";
//   let start = 0,
//     end = str.length - 1,
//     count = 0,
//     tagCount = 0;
//   for (; start < str.length; start++) {
//     if (str[start] == "<") {
//       while (str[start] != ">") {
//         start++;
//       }
//     }
//     if (str[start] == ">") continue;
//     ans += str[start];
//   }
//   return ans;
// }

// console.log(removeTags(intput_string));

// 4. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ that​ ​ creates​ ​ a ​ ​ table,​ ​ by accepting​ ​ row
// and ​ column​ ​ numbers​ ​ from​ ​ the user,​ ​ and​ ​input​s ​ row-column​ ​ number​ ​ as​ ​ content​ ​
// (e.g.​ ​ Row-0​ ​ Column-0)​ ​ of​ ​ a ​ ​ cell.

// function printTable(row, col) {
//   let str = "\t\t\t";
//   for (let i = 0; i < col; i++) {
//     str += `col:${i + 1}\t`;
//   }
//   str += "\n\n";
//   for (let i = 0; i < row; i++) {
//     str += `row: ${i + 1}\t`;
//     for (let j = 0; j < col; j++) {
//       // str += ``;
//       if (i > 9) str += `\t${i} ${j}`;
//       else str += `\t${i} ${j}\t`;
//     }
//     str += "\n\n";
//   }
//   return str;
// }

// console.log(printTable(13, 13));

// Task 2

// Write​ ​ a ​ ​ JavaScript​ ​ program ​ that​ ​ displays​ ​ a list​ ​ of​ ​ names​ ​ according​ ​ to​ ​ the sports​ group.

// let static_array = [
//   {
//     Name: "Ravindra",
//     Sports: ["Chess", "Cricket"],
//   },

//   {
//     Name: "Ravi",
//     Sports: ["Cricket", "Football"],
//   },

//   {
//     Name: "Rishabh",
//     Sports: ["Table-Tennis", "Football"],
//   },
// ];

// let answer = [
//   { Chess: ["Ravindra"] },
//   { Cricket: ["Ravindra", "Ravi"] },
//   { Football: ["Ravi", "Rishabh"] },
//   { Table_Tennis: ["Rishabh"] },
// ];

// function sortBySports(arr) {
//   let sportsName = [];
//   // console.log(players);

//   let ans = [];
//   let players = {};
//   arr.map((person) => {
//     person.Sports.forEach((game) => {
//       if (sportsName.includes(game)) players[game].push(person.Name);
//       else {
//         players[game] = [person.Name];
//         sportsName.push(game);
//       }
//     });
//   });
//   for (let elem in players) {
//     ans.push({ [elem]: players[elem] });
//     // console.log(players[elem]);
//   }
//   return ans;
// }

// console.log(sortBySports(static_array));
