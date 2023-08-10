"use strict";
let random = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
let inputValue = document.querySelector("#inputNumber");
let guessStatus = function (message) {
  document.querySelector("#guessStatus").textContent = message;
};
let guessBackground = function (color) {
  document.querySelector("body").style.backgroundColor = color;
};
let reveal=function(number){
  document.querySelector('#number').textContent=number;
}
let check = function () {
  guessBackground("#dcdde1");
  setTimeout(() => {
    if (score > 0) {
      guessBackground("#4cd137");
      const number = inputValue.value;
      if (!number) {
        guessStatus("⚠️Invalid");
      } else if (number == random) {
        reveal(number);
        guessBackground("#fbc531");
        guessStatus("🥳You win");
        if (score > highscore) {
          highscore = score;
          document.querySelector("#highscore").textContent = highscore;
        }
      } else {
        score--;
        document.querySelector("#score").textContent = score;
        guessStatus(number < random ? "📈Higher" : "📉Lower");
        guessBackground(number < random ? "#e74c3c" : "#718093");
      }
    } else {
      guessStatus("💀You Lose");
    }
  }, 100);
};
document.querySelector("#btn-check").addEventListener("click", check);
document.querySelector("#btn-again").addEventListener("click", function () {
  guessBackground("#dcdde1");
  setTimeout(() => {
    reveal('?');
    score = 20;
    random = Math.floor(Math.random() * 20) + 1;
    guessBackground("#4cd137");
    guessStatus("😎Guessing...");
    inputValue.value = "";
    document.querySelector("#score").textContent = "20";
  }, 100);
});
inputValue.addEventListener('click',function(){
  inputValue.value = "";
})
document.addEventListener("keydown", function (event) {
  if (event.target.id !== "inputNumber") {
    if (event.key === "ArrowUp") {
      if (!inputValue.value) inputValue.value = 1;
      else if (parseInt(inputValue.value))
        inputValue.value = parseInt(inputValue.value) + 1;
    } else if (event.key === "ArrowDown") {
      if (inputValue.value !== "" && parseInt(inputValue.value) > 1) {
        inputValue.value = parseInt(inputValue.value) - 1;
      }
    } else if (event.key === "Enter") check();
  } else if (event.target.id === "inputNumber" && event.key === "Enter") {
    check();
  }
});

