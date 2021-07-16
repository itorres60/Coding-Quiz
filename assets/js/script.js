var choicesIdCounter = 0;
var timeLeft = 75
var startButtonEl = document.getElementById("start-button");
var highScoresEl = document.getElementById("high-scores");
var timerEl = document.getElementById("timer");
var containerEl = document.querySelector("#container");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var h1El = document.getElementById("h1");
var pEl = document.getElementById("introduction");
var questionsArray = ["What type of file holds the styling attributes to an HTML document?", "An HTML file can have more than one CSS file linked to it.", "A CSS rule consists of a selector and a declaration.  What is the proper syntax structure of a declaration following the selector?", "Which method is used to store data to the browsers storage?", "Javescript can be written and executed within an HTML file."];
var a1Array = [".html", ".css", ".js", ".com"];
var a2Array = ["True", "False"];
var a3Array = ["{propert:value}", "[property:value;]", "property:value;", "{property:value;}"];
var a4Array = ["localStorage.storeData", "localStorage.setItem", "localData.storeObject", "localStorage.getItem"];
var a5Array = ["True", "False"];
var counter = 0;
var questionsObj = {
  question: questionsArray,
  choices: [a1Array, a2Array, a3Array, a4Array, a5Array]
}
var score = [];


var beginQuiz = function() {
  // Start Timer
  var timer = setInterval(function() {
    document.getElementById('timer').innerHTML = "Time: " + timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
    }
  }, 1000);
  
  //remove welcome elements
  h1El.style.display = "none";
  pEl.style.display = "none";
  startButtonEl.remove();
  // go to questions function
  questions();
}

// Begin Questions
function questions() {
  // Cycle through the arrays of questions and answer chocices
  questionEl.removeAttribute("class");
  choicesEl.removeAttribute("class");
  questionEl.textContent = questionsObj.question[counter];
  choicesEl.textContent = questionsObj.choices[counter];
  
  if (counter < questionsObj.choices.length) {
    counter++;
    // assign choices array values to li elements in the DOM
    var text = "<ul id = 'answers'>";
    questionsObj.choices[counter - 1].forEach(listValues);
    text += "</ul>";
    choicesEl.innerHTML = text;
    
    function listValues(value) {
      text += "<li>" + value + "</li>";
    }
  } else {
    endQuiz();
  }
  // assign Id to each individual choices array value
  var choiceId = document.getElementById("choices");
  var x = choiceId.querySelectorAll("li");
  for (var i = 0; i < x.length; i++) {
    x[i].id = "ans" + choicesIdCounter;;
    choicesIdCounter++;
  }


  // initiate click functionality listen to CORRECT answers.  All others are wrong.
  document.getElementById("answers").addEventListener("click", function(e) {
  if ((e.target && e.target.matches("li#ans0")) || (e.target && e.target.matches("li#ans4")) || (e.target && e.target.matches("li#ans9")) || (e.target && e.target.matches("li#ans11")) || (e.target && e.target.matches("li#ans14"))) {
    score.push(20);
    questions();
  } else {
    timeLeft---
    timeLeft---
    timeLeft---
    questions();
    return;
  }
  });
}

var endQuiz = function() {
  var submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  h1El.style.display = "block";
  h1El.textContent = "All done!";
  pEl.style.display = "inline";
  pEl.textContent = "Your final score is: " + score.reduce((a,b) => a + b,0);
  
  var form = document.createElement("div");
  var input = document.createElement("input");
  input.type = "text";
  input.name = "enter-initials";
  input.placeholder = "Enter initials here";
  form.textContent = "Enter initials here: "
  containerEl.appendChild(form);
  form.appendChild(input);
  form.appendChild(submitButton);

  var startOver = document.createElement("p");
  startOver.textContent = "Start Over";
  containerEl.appendChild(startOver);
}

var viewHighScores = function() {
  highScoresEl.setAttribute("type", "button");
}

startButtonEl.onclick = beginQuiz;
questionEl.addEventListener("click", questions);
viewHighScores();