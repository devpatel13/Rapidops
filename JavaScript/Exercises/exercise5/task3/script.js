alert("Click Me!");

let containers = document.querySelectorAll(".container");
let colors = ["red", "yellow", "blue"];
let count = 0;

// document.getElementById("box2").style.backgroundColor = colors[count];

for (let elem of containers) {
  elem.hidden = false;
}

function startTimeout() {
  setInterval(() => {
    count++;
    count = count % 3;
    document.getElementById("box2").style.backgroundColor = colors[count];
  }, 3000);
}
startTimeout();

function clickEvent(event) {
  if (event.target.value === "box1") box1Event();
}
