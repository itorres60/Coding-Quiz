var startButtonEl = document.getElementById("start-button");
var timerEl = document.getElementById("timer");
var containerEl = document.querySelector("#container");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("answer-choices");
var pEl = document.getElementById("introduction");
var questionsArray = ["q1", "q2", "q3", "q4", "q5"];
var a1Array = ["a1", "a2", "a3", "a4"];
var a2Array = ["a1", "a2", "a3", "a4"];
var a3Array = ["a1", "a2", "a3", "a4"];
var a4Array = ["a1", "a2", "a3", "a4"];
var a5Array = ["a1", "a2", "a3", "a4"];
var counter = 0;


var beginQuiz = function() {
  // Start Timer
  var timeLeft = 75
  var timer = setInterval(function() {
    document.getElementById('timer').innerHTML = "Time: " + timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
    }
  }, 1000);

  //remove welcome elements
  document.getElementById("welcome").remove();
  document.getElementById("introduction").remove();
  startButtonEl.remove();
  // go to questions function
  questions();
}

// Begin Questions
var questions = function () {
  questionEl.removeAttribute("class");
  choicesEl.removeAttribute("class");
  questionEl.textContent = questionsArray[counter];
  if (counter < questionsArray.length) {
    counter++;
  } else {
    location.reload();
  }

}



  




startButtonEl.onclick = beginQuiz;
choicesEl.addEventListener("click", questions);

