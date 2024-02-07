// Task 2

// Write​ ​ a ​ ​ JavaScript​ ​ program ​ that​ ​ displays​ ​ a list​ ​ of​ ​ names​ ​ according​ ​ to​ ​ the sports​ group.

let static_array = [
  {
    Name: "Ravindra",
    Sports: ["Chess", "Cricket"],
  },

  {
    Name: "Ravi",
    Sports: ["Cricket", "Football"],
  },

  {
    Name: "Rishabh",
    Sports: ["Table-Tennis", "Football"],
  },
];

function sortBySports(arr) {
  let sportsName = [];
  // console.log(players);

  let ans = [];
  let players = {};
  arr.map((person) => {
    person.Sports.forEach((game) => {
      if (sportsName.includes(game)) players[game].push(person.Name);
      else {
        players[game] = [person.Name];
        sportsName.push(game);
      }
    });
  });
  for (let elem in players) {
    ans.push({ [elem]: players[elem] });
    // console.log(players[elem]);
  }
  return ans;
}

console.log(sortBySports(static_array));
