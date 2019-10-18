// Thought Process
// Flow: 
// 0.   randomizeQuizAnswers
// 1.   Present a question and answer options one at a time
// 2.   checkAnswer => update score => next question
// 3.   Finish with alert

var score = 0;
var difficulty;
var questionType;
var totalQuestion = 10;
var currentQuestion;

window.onload = function () {
    startQuiz(0);
};

function startQuiz(num) {
    currentQuestion = num;
    document.querySelector("#question").innerText = quiz.results[currentQuestion].question;
    document.querySelector("#answersArea").innerHTML = "";
    var correctAnswer = quiz.results[currentQuestion].correct_answer;
    console.log("The correct answer is " + correctAnswer);
    var incorrectAnswers = quiz.results[currentQuestion].incorrect_answers;
    console.log("The incorrect answers are " + incorrectAnswers);
    var options = randomizeQuizAnswers(correctAnswer, incorrectAnswers);
    console.log("I'm here");
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
};

function randomizeQuizAnswers(a, b) {
    //This function will receive correct and incorrect answers.
    //It will then randomize the answers and return.
    b.push(a);
    console.log("All the options are " + b);
    return b;
};

function checkAnswer(userAnswer, questionNo) {
    //This function will receive the user answer and the question number
    //It will check if the answer is correct >>update score
    //Toggle nextQuestionButton to display: block
    //checkButton to display: none

};

function nextQuestion() {
    //This fuction will check if there are any more questions left
    //If so, it will take the user to the next question
    //If no question are left, alert the user: Quiz over. Your final score: [score].
    //Toggle checkButton to display: block
    //Toggle nextQuestionButton to display: none
};

var quiz = {
    "response_code": 0,
    "results": [
        {
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "What does the &quot;MP&quot; stand for in MP3?",
            "correct_answer": "Moving Picture",
            "incorrect_answers": [
                "Music Player",
                "Multi Pass",
                "Micro Point"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "boolean",
            "difficulty": "easy",
            "question": "Linus Torvalds created Linux and Git.",
            "correct_answer": "True",
            "incorrect_answers": [
                "False"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
            "correct_answer": "Final",
            "incorrect_answers": [
                "Static",
                "Private",
                "Public"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "boolean",
            "difficulty": "easy",
            "question": "The programming language &quot;Python&quot; is based off a modified version of &quot;JavaScript&quot;.",
            "correct_answer": "False",
            "incorrect_answers": [
                "True"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "boolean",
            "difficulty": "easy",
            "question": "Pointers were not used in the original C programming language; they were added later on in C++.",
            "correct_answer": "False",
            "incorrect_answers": [
                "True"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "boolean",
            "difficulty": "easy",
            "question": "RAM stands for Random Access Memory.",
            "correct_answer": "True",
            "incorrect_answers": [
                "False"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "On Twitter, what is the character limit for a Tweet?",
            "correct_answer": "140",
            "incorrect_answers": [
                "120",
                "160",
                "100"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "boolean",
            "difficulty": "easy",
            "question": "The Windows ME operating system was released in the year 2000.",
            "correct_answer": "True",
            "incorrect_answers": [
                "False"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "The C programming language was created by this American computer scientist. ",
            "correct_answer": "Dennis Ritchie",
            "incorrect_answers": [
                "Tim Berners Lee",
                "al-Khw\u0101rizm\u012b",
                "Willis Ware"
            ]
        },
        {
            "category": "Science: Computers",
            "type": "multiple",
            "difficulty": "easy",
            "question": "In computing, what does LAN stand for?",
            "correct_answer": "Local Area Network",
            "incorrect_answers": [
                "Long Antenna Node",
                "Light Access Node",
                "Land Address Navigation"
            ]
        }
    ]
}