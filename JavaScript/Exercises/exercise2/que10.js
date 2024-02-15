// 10. Write​ ​ a ​ ​ JavaScript​ ​ function​ ​ to​ ​ get​ ​ time​ ​differences​ ​ in​ ​ years,​ ​ months,​ ​ weeks,​ ​
// days,​ ​ hours and​ ​ minutes​ ​ between​ ​ two​ ​ dates.

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
  let ans = [];

  // ***

  ans.push(
    `${Math.floor(year)} years, ${Math.floor(months)} months and ${Math.floor(
      days
    )} days`
  );

  ans.push(`Or ${Math.floor(year * 12)} months, ${Math.floor(days)} days`);

  ans.push(
    `Or ${Math.floor((year * 365) / 7)} weeks, ${Math.floor(
      (year * 365) % 7
    )} days`
  );

  ans.push(`Or ${Math.floor(year * 365)} days`);

  ans.push(`Or ${Math.floor(year * 365 * 24)} hours`);

  ans.push(`Or ${Math.floor(year * 365 * 24 * 60)} minutes`);

  return ans.join("\n");
}

console.log(dateDiff("01/07/2018", "03/05/2020"));
