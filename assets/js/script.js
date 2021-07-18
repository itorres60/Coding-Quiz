var choicesIdCounter = 0;
var timeLeft = 50000
var startButtonEl = document.getElementById("start-button");
var highScoresEl = document.getElementById("high-scores");
var timerEl = document.getElementById("timer");
var containerEl = document.querySelector("#container");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var formEl = document.getElementById("form-div");
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
var nameForScore = [];

var timer = setInterval(function() {
  document.getElementById('timer').innerHTML = "Time: " + timeLeft;
    timeLeft--;
  if (timeLeft < 0) {
    alert("You have ran out of time!");
    clearInterval(timer);
    questionEl.remove();
    choicesEl.textContent = "";
    endQuiz();
  }
  }, 1000);



var initialsFormHandler = function (event) {
  event.preventDefault();

  initialsInput = document.getElementById("initials").value;
    // check if inputs are empty (validate)
    if (!initialsInput) {
      alert("You need to fill out the task form!");
      return false;
    }
  
    // reset form fields for next task to be entered
    document.querySelector("input[name='enter-initials']").value = "";

}

var beginQuiz = function() {
  // Start Timer
  timeLeft = 50;
  document.getElementById("timer").style.display = "inline"
  //remove welcome elements
  h1El.style.display = "none";
  pEl.style.display = "none";
  document.getElementById("start-button").remove();
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
    return;
  }
  // assign Id to each individual choices array value
  var choiceId = document.getElementById("choices");
  var x = choiceId.querySelectorAll("li");
  for (var i = 0; i < x.length; i++) {
    x[i].id = "ans" + choicesIdCounter;;
    choicesIdCounter++;

  }


  // initiate click functionality listen to CORRECT answers.  All others are wrong.
  document.getElementById("answers").addEventListener("click", function(choices) {
  if ((choices.target && choices.target.matches("li#ans0")) || (choices.target && choices.target.matches("li#ans4")) || (choices.target && choices.target.matches("li#ans9")) || (choices.target && choices.target.matches("li#ans11")) || (choices.target && choices.target.matches("li#ans14"))) {
    score.push(20);
    questions();
  } else {
    timeLeft += -10 //time = time + (-10)
    questions();
    return;
  }
  });
}

var endQuiz = function() {
  questionEl.remove();
  clearInterval(timer);
  timerEl.remove();
  var submitButton = document.createElement("button");
  submitButton.id = "submit";
  submitButton.textContent = "Submit";
  h1El.style.display = "block";
  h1El.textContent = "All done!";
  pEl.style.display = "inline";
  pEl.textContent = "Your final score is: " + score.reduce((a,b) => a + b,0);
  
 
  var form = document.createElement("form");
  var input = document.createElement("input");
  input.id = "initials"
  input.type = "text";
  input.name = "enter-initials";
  input.placeholder = "Enter initials here";
  form.textContent = "Enter initials here: "
  form.id = "form-div"
  containerEl.appendChild(form);
  form.appendChild(input);
  form.appendChild(submitButton);

  // document.getElementById("form-div").addEventListener("click", function (hello){
  //   if (hello.target && hello.target.matches("submit")) {
  //     alert("hello");
  //   }
  // });
  saveScore();
  
  document.getElementById("form-div").addEventListener("submit", initialsHandler)
}

var initialsHandler = function (event) {
  event.preventDefault();
  var initialsInput = document.getElementById("initials").value;
  if (!initialsInput) {
    alert("Please enter your intitials");
    return false;
  } else {
    nameForScore.push(initialsInput);
    localStorage.setItem("nameForScore", nameForScore);
  }
  alert("Your high score has been saved!");
  location.reload();

}
document.getElementById("high-scores").addEventListener("click", function (viewHighScores){
  if (viewHighScores.target && viewHighScores.target.matches("li#high-scores")) {
    if (localStorage.getItem("nameForScore") || localStorage.getItem("score")) {
    alert("High scores: \n" + localStorage.getItem("nameForScore") + ": " + localStorage.getItem("score"));
    } else {
      alert("No high scores yet.  Please comeplete the quiz to register a high score :D")
    }
  }
});

var saveScore = function() {
  localStorage.setItem("score", JSON.stringify(score.reduce((a,b) => a + b,0)));
}


startButtonEl.onclick = beginQuiz;
questionEl.addEventListener("click", questions);