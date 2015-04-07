var QUESTIONS = [
  {
    id: "wofuer",
    title: "Wofür?",
    question: "Wofür benutzt du das Auto?",
    answers: {
      "arbeit": {
        name: "Arbeit",
        next: ["pendeln"],
      },
      "familie": {
        name: "Familienauto",
        next: [],
      }
    },
  },
  {
    id: "pendeln",
    title: "Pendeln?",
    question: "Pendelst du mit dem Auto?",
    answers: {
      "ja": {
        name: "Ja",
        next: [],
      },
      "nein": {
        name: "Nein",
        next: [],
      }
    },
  },
  {
    id: "test",
    title: "Test",
    question: "FDSfsdfsdfsdf",
    answers: {
      "test": {
        name: "test",
        next: [],
      }
    }
  }
];

var DEFAULT_QUESTIONS = ["wofuer", "test"];

function getQuestion(id) {
  for (i in QUESTIONS)
    if (QUESTIONS[i].id == id)
      return QUESTIONS[i];
}

function displayQuestion(question) {
  console.log("displayQuestion", question);
  $("#question").html(question.question);
  $("#answers").empty();
  for (id in question.answers) {
    var answer = question.answers[id];
    var div = $("<div class='checkbox'></div>");
    var label = $("<label></label>");
    var input = $("<input />");
    input.attr("type", "checkbox");
    input.data("id", id);
    label.append(input);
    label.append(answer.name);
    div.append(label);
    $("#answers").append(div);
  }
}

var questions = DEFAULT_QUESTIONS;
var currentQuestion = null;

var answers = {};

function nextQuestion() {
  if (questions.length == 0) {
    alert("Fertig!");
    console.log(answers);
    return;
  }
  currentQuestion = getQuestion(questions.shift());
  displayQuestion(currentQuestion);
}

$(window).ready(function() {  
  nextQuestion();
  $("#next").click(function() {
    var currentAnswers = [];
    $(".checkbox input:checked").each(function(index) {
      var id = $(this).data("id");
      currentAnswers.push(id);
      var answer = currentQuestion.answers[id];
      for (i in answer.next) {
        var id = answer.next[i];
        if (!(id in answers) && questions.indexOf(id) == -1) {
          console.log("unshift", id);
          questions.unshift(id);
        }
      }
    });
    answers[currentQuestion.id] = currentAnswers;
    
    nextQuestion();
  });
});
