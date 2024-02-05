// 7. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ get​ ​ the​ ​ month​ ​name​ ​ from​ ​ a ​ ​ particular​ ​ date.

function getMonthFromString(date) {
  const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let tempMonth = date.split(date[2]);
  // console.log(tempMonth);
  return monthNames[+tempMonth[1]];

  // if (date[3] == "0") return monthNames[date[4]];
  // else {
  //   let tempDate = date[3] + date[4];
  //   return monthNames[+tempDate];
  // }
}
console.log(getMonthFromString("01/01/2020"));
