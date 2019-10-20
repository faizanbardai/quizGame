// Thought Process
// Flow: 
// 0.   randomizeQuizAnswers
// 1.   Present a question and answer options one at a time
// 2.   checkAnswer => update score => next question
// 3.   Finish with alert

var score = 0;
var difficulty = "easy";
var totalQuestion = 2;
var currentQuestion = 0;
var question;
var correctAnswer;
var incorrectAnswers;
var quiz = new Object();
var quizArray = new Array();


window.onload = function () {
    startQuiz(currentQuestion);
};

function startQuiz(currentQuestion) {
    document.querySelector("#nextQuestionButton").style.display = "none";
    document.querySelector("#answersArea").innerHTML = "";
    document.querySelector("#answerStatus").innerText = "";
    quizURL = prepareQuizURL(totalQuestion, difficulty);

    fetch(quizURL)
        .then((data) => data.json())
        .then(function (data) {
            question = data.results[0].question;

            document.querySelector("#question").innerText = question;
            correctAnswer = data.results[0].correct_answer;

            incorrectAnswers = data.results[0].incorrect_answers;


            var a = currentQuestion + 1;
            document.querySelector("#questionNumber").innerText = "Question " + a + " of " + totalQuestion;

            var options = randomizeQuizAnswers(correctAnswer, incorrectAnswers);

            for (i = 0; i < options.length; i++) {
                var newOption = document.createElement("input");
                newOption.type = "radio";
                newOption.name = "answer";
                newOption.id = "answer" + i;
                newOption.value = options[i];
                var newLabel = document.createElement("label");
                newLabel.innerText = options[i];
                newLabel.htmlFor = "answer" + i;
                var breakLine = document.createElement("br");
                document.querySelector("#answersArea").appendChild(newOption);
                document.querySelector("#answersArea").appendChild(newLabel);
                document.querySelector("#answersArea").appendChild(breakLine);
            };
        });
};

function prepareQuizURL(a, b) {
    return "https://opentdb.com/api.php?amount=" + a + "&category=18&difficulty=" + b;
};

function randomizeQuizAnswers(a, b) {
    //This function will receive correct and incorrect answers.
    //It will then randomize the answers and return.
    b.push(a);
    return b;
};

function checkAnswer() {
    //It will check if the answer is correct >>update score
    //Toggle nextQuestionButton to display: block
    //checkButton to display: none

    if (document.querySelector('input[name="answer"]:checked') == null) {
        alert("Please select an answer and then press Check.");
    } else {
        var userAnswer = document.querySelector('input[name="answer"]:checked').value;
        quizArray.push({
            question: question,
            correctAnswer: correctAnswer,
            options: incorrectAnswers,
            userAnswer: userAnswer
        });
        console.log(quizArray);
        // quiz.question = question;
        // quiz.correctAnswer = correctAnswer;
        // quiz.options = incorrectAnswers;
        // quiz.userAnswer = userAnswer;
        // quizArray.push(quiz);        
        if (userAnswer == correctAnswer) {
            correctAns();
        } else incorrectAns();
    };
};

function correctAns() {
    increaseScore();
    document.querySelector("#answerStatus").innerText = "Answer is correct!";
    document.querySelector("#checkButton").style.display = "none";
    document.querySelector("#nextQuestionButton").style.display = "inline-block";
};

function increaseScore() {
    score++;
    document.querySelector("#currentScore").innerText = score;
};

function incorrectAns() {
    document.querySelector("#answerStatus").innerText = "Answer is incorrect!";
    document.querySelector("#checkButton").style.display = "none";
    document.querySelector("#nextQuestionButton").style.display = "inline-block";
};

function nextQuestion() {
    //This fuction will check if there are any more questions left
    //If so, it will take the user to the next question
    //If no question are left, alert the user: Quiz over. Your final score: [score].
    //Toggle checkButton to display: block
    //Toggle nextQuestionButton to display: none
    currentQuestion++;
    if (currentQuestion == totalQuestion) {
        alert("Test is over. Your score is: " + score);
        return
    } else {
        startQuiz(currentQuestion);
        document.querySelector("#checkButton").style.display = "inline-block";

    };

};

