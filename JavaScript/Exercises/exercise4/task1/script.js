let time, timerID;

let hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0;

let timeFormatArr = ["00", "00", "00", "00"];

window.onload = function () {
  let date = new Date().toLocaleDateString("en-IN", {
    day: "numeric",

    month: "short",

    year: "numeric",
  });

  document.getElementById("date").innerHTML = date;

  setTimeout(() => {
    let time = document.getElementById("time");

    let currTime = new Date().toTimeString().slice(0, 8);

    time.innerText = currTime;
  }, 0);

  setInterval(() => {
    let time = document.getElementById("time");

    let currTime = new Date().toTimeString().slice(0, 8);

    time.innerText = currTime;
  }, 1000);
};

// helper function for starting a setInterval function

function helper() {
  return setInterval(() => {
    let watch = document.getElementById("watch");

    let msFormatted;

    milliseconds += 100;

    if (milliseconds >= 1000) {
      seconds++;

      milliseconds = 0;

      timeFormatArr[0] = `${milliseconds}`.padStart(2, "0");

      if (seconds >= 60) {
        minutes++;

        seconds = 0;

        timeFormatArr[1] = `${seconds}`.padStart(2, "0");

        if (minutes >= 60) {
          hours++;

          minutes = 0;

          timeFormatArr[2] = `${minutes}`.padStart(2, "0");

          timeFormatArr[3] = `${hours}`.padStart(2, "0");
        } else timeFormatArr[2] = `${minutes}`.padStart(2, "0");
      } else timeFormatArr[1] = `${seconds}`.padStart(2, "0");
    } else {
      msFormatted = milliseconds / 100;

      timeFormatArr[0] = `${msFormatted}`.padStart(2, "0");
    }

    watch.innerText = `${timeFormatArr[3]}:${timeFormatArr[2]}:${timeFormatArr[1]}:${timeFormatArr[0]}`;
  }, 100);
}

function startWatch() {
  timerID = helper();

  document.getElementById("start").disabled = true;

  document.getElementById("resume").disabled = true;

  document.getElementById("stop").disabled = false;

  document.getElementById("reset").disabled = false;
}

function stopWatch() {
  clearInterval(timerID);

  document.getElementById("resume").disabled = false;
}

function resumeWatch() {
  timerID = helper();

  document.getElementById("resume").disabled = true;
}

function resetWatch() {
  clearInterval(timerID);

  (hours = 0), (minutes = 0), (seconds = 0), (milliseconds = 0);

  timeFormatArr = ["00", "00", "00", "00"];

  document.getElementById("start").disabled = false;

  document.getElementById("resume").disabled = true;

  document.getElementById("stop").disabled = true;

  let watch = document.getElementById("watch");

  watch.innerText = "00:00:00:00";
}
