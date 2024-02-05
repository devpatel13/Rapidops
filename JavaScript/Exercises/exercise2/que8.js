// 8. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ get​ ​ difference​ ​between​ ​ two​ ​ dates,​ ​ from​ ​ maximum​ ​ unit​ ​ to minimum​ ​ unit.

function dateDiff(date1, date2) {
  let arrDate1 = date1.split("/");
  let arrDate2 = date2.split("/");
  let tempDate1 = [arrDate1[2], arrDate1[1], arrDate1[0]].join("/");
  let tempDate2 = [arrDate2[2], arrDate2[1], arrDate2[0]].join("/");
  let year =
    Math.abs(Date.parse(tempDate1) - Date.parse(tempDate2)) /
    (24 * 3600 * 365 * 1000);
  let months = year * 12 - Math.floor(year) * 12;
  let days = months * 30 - Math.floor(months) * 30;
  return `${Math.floor(year)} years, ${Math.floor(
    months
  )} months and ${Math.floor(days)} days`;
}

console.log(dateDiff("01/07/2018", "03/05/2020"));
