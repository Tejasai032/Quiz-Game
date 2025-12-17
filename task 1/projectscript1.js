let questions = [
    {
        question: "What is the capital of India?",
        answers: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
        correct: 0
    },
    {
        question: "Which planet is known as Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: 1
    },
    {
        question: "Which is the largest ocean on Earth?",
        answers: ["Indian Ocean", "Atlantic Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        question: "Which gas do plants release during photosynthesis?",
        answers: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
        correct: 2
    },
    {
        question: "What do bees make?",
        answers: ["Butter", "Honey", "Milk", "Jam"],
        correct: 1
    }
];

let currentQuestion = 0;
let scoreValue = 0;


let initialScreen = document.getElementById("initialScreen");
let questionScreen = document.getElementById("questionScreen");
let resultScreen = document.getElementById("resultScreen");

let questionText = document.getElementById("questionText");
let AnswersBlock = document.getElementById("AnswersBlock");
let progress = document.getElementById("progress");
let scoreDisplay = document.getElementById("score").querySelector("span");
let finalscore = document.getElementById("finalscore");
let greetingText = document.getElementById("greetingText");
let progresswidth = document.getElementById("progresswidth");


document.getElementById("start").onclick = startQuiz;
document.getElementById("restartBtn").onclick = restartQuiz;

function startQuiz() {
    initialScreen.classList.remove("active");
    questionScreen.classList.add("active");
    showQuestion();
};


function showQuestion() {
    let q = questions[currentQuestion]; 

    questionText.innerText = q.question;
    progress.innerText = "Question " + (currentQuestion + 1) + " of " + questions.length;
    scoreDisplay.innerText = scoreValue;

    AnswersBlock.innerHTML = "";

    for (let i = 0; i < q.answers.length; i++) {
        let btn = document.createElement("button");
        btn.innerText = q.answers[i]; 
        btn.classList.add("button");
        btn.onclick = function () { checkAnswer(i) };
        AnswersBlock.appendChild(btn);
    }

    let progresspercentage = ((currentQuestion + 1) / questions.length) * 100;
    progresswidth.style.width = progresspercentage + "%";
}


function checkAnswer(selected)  {

    let allButtons = AnswersBlock.querySelectorAll("button");
    let clickedButton = allButtons[selected];
    let correctButton = allButtons[questions[currentQuestion].correct];


    if (selected === questions[currentQuestion].correct) {
        clickedButton.classList.add("correctanswer");
        scoreValue++;
    }
    else {
        clickedButton.classList.add("wronganswer");
        correctButton.classList.add("correctanswer");
    }

    scoreDisplay.innerText = scoreValue;

    setTimeout(() => {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }, 1000);   
   
}


function endQuiz() {
    questionScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalscore.innerText = scoreValue + "/" + questions.length;

    let greetingMessage = "";

    if (scoreValue === 5) {
        greetingMessage = "Perfect Score! You have done a great job";
    } else if (scoreValue >= 3) {
        greetingMessage = "Excellent Job! You have fantastic knowledge.";
    } else {
        greetingMessage = "Keep Practicing! Don't worry, everyone starts somewhere.";
    }

    greetingText.innerText = greetingMessage;

}


function restartQuiz() {
    currentQuestion = 0;
    scoreValue = 0;

    resultScreen.classList.remove("active");
    questionScreen.classList.add("active");
    showQuestion();
};
