// Thought Process
// Flow: 
// 0.   randomizeQuizAnswers
// 1.   Present a question and answer options one at a time
// 2.   checkAnswer => update score => next question
// 3.   Finish with alert

var score = 0;
var difficulty;
var totalQuestion;
var currentQuestion = 0;
var question;
var correctAnswer;
var incorrectAnswers;
var quiz = new Object();
var quizArray = new Array();
var quizAPIData;

 const startQuiz = async () => {
    difficulty = document.querySelector("input[name=difficultyLevel]:checked").value;
    totalQuestion = document.querySelector("#totalQuestions").value;
    quizURL = prepareQuizURL(totalQuestion, difficulty);
    data = await fetch(quizURL);
    data = await data.json();    
    quizAPIData = data.results;
    displayQuiz();
    };
function displayQuiz() {
    document.querySelector("#examOptions").style.display = "none";
    document.querySelector("#exam").style.display = "block";
    document.querySelector("#progress").style.display = "block";
    document.querySelector("#nextQuestionButton").style.display = "none";
    document.querySelector("#answersArea").innerHTML = "";
    question = decodeURIComponent(quizAPIData[currentQuestion].question);
    document.querySelector("#question").innerText = question;
    correctAnswer = quizAPIData[currentQuestion].correct_answer;
    console.log("correct: " + correctAnswer);
    incorrectAnswers = quizAPIData[currentQuestion].incorrect_answers;
    var a = currentQuestion + 1;
    document.querySelector("#questionNumber").innerText = "Question " + a + " of " + totalQuestion;
    var options = randomizeQuizAnswers(correctAnswer, incorrectAnswers);
    for (i = 0; i < options.length; i++) {
        var newOption = document.createElement("input");
        newOption.type = "radio";
        newOption.name = "answer";
        newOption.id = "answer" + i;
        newOption.className = "form-check-input";
        newOption.value = options[i];
        var newLabel = document.createElement("label");
        newLabel.innerText = decodeURIComponent(options[i]);
        newLabel.htmlFor = "answer" + i;
        newLabel.className = "form-check-label";
        var breakLine = document.createElement("br");
        document.querySelector("#answersArea").appendChild(newOption);
        document.querySelector("#answersArea").appendChild(newLabel);
        document.querySelector("#answersArea").appendChild(breakLine);
    };
    document.querySelector("#answerStatus").innerText = "Please select an answer and then press Check.";
    document.querySelector("#answerStatus").className="text-center alert alert-primary";
    document.querySelector(".progress-bar").style.width = ((parseInt(currentQuestion) + 1) / parseInt(totalQuestion)) * 100 + "%";
};

function prepareQuizURL(totalQuestion, difficulty) {
    return "https://opentdb.com/api.php?amount=" + totalQuestion + "&category=18&difficulty=" + difficulty +"&encode=url3986";
};

function randomizeQuizAnswers(correctAnswer, incorrectAnswers) {
    //This function will receive correct and incorrect answers.
    //It will then randomize the answers and return.
    incorrectAnswers.push(correctAnswer);
    return shuffle(incorrectAnswers);
};
//https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
};

function checkAnswer() {
    //It will check if the answer is correct >>update score
    //Toggle nextQuestionButton to display: block
    //checkButton to display: none

    if (document.querySelector('input[name="answer"]:checked') == null) {
        document.querySelector("#answerStatus").innerText = "Please select an answer and then press Check.";
        document.querySelector("#answerStatus").className="text-center alert alert-warning";

    } else {
        var userAnswer = document.querySelector('input[name="answer"]:checked').value;
        quizArray.push({
            question: question,
            correctAnswer: correctAnswer,
            options: incorrectAnswers,
            userAnswer: userAnswer
        });
        console.log(quizArray);
        if (userAnswer == correctAnswer) {
            correctAns();
        } else incorrectAns();
    };
};

function correctAns() {
    increaseScore();
    document.querySelector("#answerStatus").innerText = "Answer is correct!";
    document.querySelector("#answerStatus").className="text-center alert alert-success";
    document.querySelector("#checkButton").style.display = "none";
    document.querySelector("#nextQuestionButton").style.display = "inline-block";
};

function increaseScore() {
    score++;
    document.querySelector("#currentScore").innerText = score;
};

function incorrectAns() {
    document.querySelector("#answerStatus").innerText = "Answer is incorrect!";
    document.querySelector("#answerStatus").className="text-center alert alert-danger";
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
        document.querySelector(".progress-bar").style.width = ((parseInt(currentQuestion) + 1) / parseInt(totalQuestion)) * 100 + "%";
        document.querySelector("#answerStatus").innerText = "Test is over. Your score is: " + score;
        document.querySelector("#answerStatus").className="text-center alert alert-success";
        document.querySelector("#exam").innerHTML = "";
        return
    } else {
        displayQuiz();
        document.querySelector("#checkButton").style.display = "inline-block";
        document.querySelector(".progress-bar").style.width = ((parseInt(currentQuestion) + 1) / parseInt(totalQuestion)) * 100 + "%";
    };
};

