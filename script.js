// tiny data sets of questions/answers that I'm sure ought to be in their own file when they get bigger.
const questions = [
    {
        question: "Who won Wedding Cakes?",
        answers: [
            {text: "Keith", correct: false},
            {text: "Eugene", correct: false},
            {text: "Marissa", correct: true},
            {text: "Zach", correct: false},
        ]
    },
    {
        question: "Who won Illusion Cakes?",
        answers: [
            {text: "Keith", correct: true},
            {text: "Kwesi", correct: false},
            {text: "Marissa", correct: false},
            {text: "Eugene", correct: false},
        ]
    },
    {
        question: "Who won Sandwiches?",
        answers: [
            {text: "Keith", correct: false},
            {text: "Desiree", correct: false},
            {text: "Jared", correct: false},
            {text: "Zach", correct: true},
        ]
    },
];

// variables that allow access to HTML elements via their ID's
const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

// variables that declare where to start in the questions, and the score
let currentQuestionIndex = 0;
let score = 0;

// this is the function that triggers the quiz. it is called at the very bottom of this file, and inside the nextButton() function.  
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {   
    // to clear the previous question/answers
    resetState();

    // going thru the questions
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    // getting the answers for the buttons
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    // this walks the dom and updates the rules like display
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
} )

startQuiz();
