var startButtonEl = document.getElementById("start-button");
var timerEl = document.getElementById("timer");
var containerEl = document.querySelector("#container");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("answer-choices");
var pEl = document.getElementById("introduction");
var questionsArray = ["What type of file holds the styling attributes to an HTML document?", "An HTML file can have more than one CSS file linked to it.", "q3", "q4", "q5"];
var a1Array = [".html", ".css", ".js", ".com"];
var a2Array = ["true", "false"];
var a3Array = ["c1", "a2", "a3", "a4"];
var a4Array = ["d1", "a2", "a3", "a4"];
var a5Array = ["e1", "a2", "a3", "a4"];
var counter = 0;
var questionsObj = {
  question: questionsArray,
  choices: [a1Array, a2Array, a3Array, a4Array, a5Array]
}


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
  questionEl.textContent = questionsObj.question[counter];
  choicesEl.textContent = questionsObj.choices[counter];
  if (counter < questionsObj.choices.length) {
    counter++;
  } else {
    location.reload();
  }
}





startButtonEl.onclick = beginQuiz;
choicesEl.addEventListener("click", questions);

