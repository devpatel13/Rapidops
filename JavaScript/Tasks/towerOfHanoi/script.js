class GameOfHanoi {
  constructor() {
    this.towerA = [];
    this.towerB = [];
    this.towerC = [];
  }

  async solution(n, src, middle, dest) {
    if (n > 0) {
      await this.solution(n - 1, src, dest, middle);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const disc = src.pop();
      dest.push(disc);
      await this.solution(n - 1, middle, src, dest);
    } else {
      this.displayState();
    }
  }

  startGame() {
    this.totalDiscs = this.towerA.length;
    this.solution(this.towerA.length, this.towerA, this.towerB, this.towerC);
  }

  addDisc(numDiscs) {
    for (let i = numDiscs; i >= 1; i--) this.towerA.push(i);
  }

  displayState() {
    console.log(this.towerA, this.towerB, this.towerC);
    render(this.towerA, this.towerB, this.towerC);
  }
}

function addDiscs() {
  const numDiscs = +document.getElementById("discInput").value;
  const tower1 = [];
  adjustHeight(numDiscs);
  for (let i = numDiscs; i >= 1; i--) tower1.push(i);
  render(tower1);
}

function startGame() {
  document.querySelector("#startBtn").disabled = true;
  document.querySelector("#addBtn").disabled = true;
  const numDiscs = document.querySelectorAll(".disc").length;
  console.log(length);
  const game = new GameOfHanoi();
  game.addDisc(numDiscs);
  game.startGame();
  //   game.displayState();
}

function render(tower1Arr = [], tower2Arr = [], tower3Arr = []) {
  const tower1 = document.getElementById("tower1");
  const tower2 = document.getElementById("tower2");
  const tower3 = document.getElementById("tower3");
  tower1.innerHTML = "";
  tower2.innerHTML = "";
  tower3.innerHTML = "";

  if (tower1Arr.length) createDiscs(tower1, tower1Arr);
  if (tower2Arr.length) createDiscs(tower2, tower2Arr);
  if (tower3Arr.length) createDiscs(tower3, tower3Arr);
}

function createDiscs(tower, towerArr) {
  const discWidthIncrement = 20;
  towerArr.forEach((i, index) => {
    const disc = document.createElement("div");
    disc.classList.add("disc");
    disc.innerText = i;
    disc.id = i;
    disc.style.width = `${50 + i * discWidthIncrement}px`;
    disc.style.bottom = `${20 * index}px`;
    tower.appendChild(disc);
  });
}

function adjustHeight(numDiscs) {
  const towerHeight = numDiscs * 20 + 20;
  document.getElementById("tower1").style.height = `${towerHeight}px`;
  document.getElementById("tower2").style.height = `${towerHeight}px`;
  document.getElementById("tower3").style.height = `${towerHeight}px`;
}
