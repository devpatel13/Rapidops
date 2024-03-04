alert("Click Me!");

let containers = document.querySelectorAll(".container");
let colors = ["red", "yellow", "blue"];
let count1 = 0;
let count2 = 0;
let timer = 0;

// document.getElementById("box2").style.backgroundColor = colors[count];

for (let elem of containers) {
  elem.hidden = false;
}

function helper() {
  return setInterval(() => {
    count2++;
    count2 = count2 % 3;
    document.getElementById("box4").style.backgroundColor = colors[count2];
    console.log("in");
  }, 5000);
}

document.body.addEventListener("keydown", function (event) {
  let key = event.key;
  if (key === "ArrowRight" || key === "ArrowUp") {
    window.clearInterval(timer);
    count2++;
    count2 = count2 % 3;
    document.getElementById("box4").style.backgroundColor = colors[count2];
    timer = helper();
  }
  if (key === "ArrowLeft" || key === "ArrowDown") {
    window.clearInterval(timer);

    count2++;
    count2 = count2 % 3;
    document.getElementById("box4").style.backgroundColor = colors[count2];
    window.clearInterval(timer);
    timer = helper();
  }
});

function startTimeout() {
  setInterval(() => {
    count1++;
    count1 = count1 % 3;
    document.getElementById("box2").style.backgroundColor = colors[count1];
  }, 3000);
}

function box1ClickEvent(event) {
  document.getElementById("box3H5").hidden = false;
  timer = helper();
  document.getElementById("box1").onclick = "";
}

startTimeout();
