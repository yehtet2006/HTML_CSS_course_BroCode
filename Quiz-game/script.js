// DOM elements selecetor

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-button");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
    {
        question: "What is the capital of France?",
        answer: [
            {text: "London", correct: false},
            {text: "Berlin", correct: false},
            {text: "Paris", correct: true},
            {text: "Milan", correct: false},
        ]
    },
    {
        question: "What is the currency of France?",
        answer: [
            {text: "Dollar", correct: false},
            {text: "Euro", correct: true},
            {text: "Francs", correct: false},
            {text: "Riyal", correct: false},
        ]
    },
    {
        question: "What is the capital of The Netherlands?",
        answer: [
            {text: "Amsterdam", correct: true},
            {text: "Berlin", correct: false},
            {text: "Haalem", correct: false},
            {text: "Dronten", correct: false},
        ]
    },
    {
        question: "What is the capital of Italy?",
        answer: [
            {text: "London", correct: false},
            {text: "Berlin", correct: false},
            {text: "Paris", correct: false},
            {text: "Milan", correct: true},
        ]
    },
    {
        question: "What is the capital od Germany?",
        answer: [
            {text: "London", correct: false},
            {text: "Berlin", correct: true},
            {text: "Paris", correct: false},
            {text: "Milan", correct: false},
        ]
    },

];

// Quiz state var

let currentQuestionIndex = 0;
let score = 0
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", startQuiz)
restartButton.addEventListener("click", restartQuiz)

function startQuiz(){
    // reset variables
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function restartQuiz(){
    resultScreen.classList.remove("active")

    startQuiz()
}

function showQuestion(){
    answerDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progressPrcnt = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPrcnt + "%"; 

    questionText.textContent = currentQuestion.question
    answersContainer.innerHTML = "";
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")

        button.dataset.correct = answer.correct

        button.addEventListener("click", selectAnswer)

        answersContainer.appendChild(button)
    })
}

function selectAnswer(event){
    if(answerDisabled) return

    answerDisabled = true;
    const selectedButton = event.target;

    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
            
    });

    if (isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        } else {
            showResult()
        }
    }, 500)
}

function showResult(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100

    if (percentage == 100){
        resultMessage.textContent = "Perfect you are a genius!!"
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }

}
