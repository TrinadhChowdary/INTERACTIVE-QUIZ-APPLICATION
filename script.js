const questions = [
    { question: "Which is the largest planet in our solar system?", answers: [ { text: "Earth", correct: false }, { text: "Venus", correct: false }, { text: "Jupiter", correct: true }, { text: "Saturn", correct: false } ] },
    { question: "Who is known as the “Father of the Nation” in India?", answers: [ { text: "Sardar Patel", correct: false }, { text: "Mahatma Gandhi", correct: true }, { text: "Bhagat Singh", correct: false }, { text: "Jawaharlal Nehru", correct: false } ] },
    { question: "What is the boiling point of water at sea level?", answers: [ { text: "50°C", correct: false }, { text: "100°C", correct: true }, { text: "90°C", correct: false }, { text: "110°C", correct: false } ] },
    { question: "How many continents are there in the world?", answers: [ { text: "7", correct: true }, { text: "8", correct: false }, { text: "9", correct: false }, { text: "6", correct: false } ] },
    { question: "Who was the first man to step on the moon?", answers: [ { text: "Buzz Aldrin", correct: false }, { text: "Neil Armstrong", correct: true }, { text: "Yuri Gagarin", correct: false }, { text: "Michael Collins", correct: false } ] },
    { question: "What is the hardest natural substance on Earth?", answers: [ { text: "Gold", correct: false }, { text: "Quartz", correct: false }, { text: "Iron", correct: false }, { text: "Diamond", correct: true } ] },
    { question: "Which country is known as the Land of the Rising Sun?", answers: [ { text: "India", correct: false }, { text: "China", correct: false }, { text: "Japan", correct: true }, { text: "Korea", correct: false } ] },
    { question: "What is the capital of America?", answers: [ { text: "Los Angeles", correct: false }, { text: "Chicago", correct: false }, { text: "New York", correct: false }, { text: "Washington, D.C.", correct: true } ] },
    { question: "Which is the longest river in the world?", answers: [ { text: "Amazon River", correct: false }, { text: "Nile River", correct: true }, { text: "Mississippi River", correct: false }, { text: "Yangtze River", correct: false } ] },
    { question: "What is the capital of Australia?", answers: [ { text: "Sydney", correct: false }, { text: "Melbourne", correct: false }, { text: "Canberra", correct: true }, { text: "Brisbane", correct: false } ] }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerbtn");
const nextButton = document.getElementById("next");
const feedbackForm = document.getElementById("feedbackform");

let cqindex = 0;
let score = 0;

function startQuiz() {
    cqindex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const cquestion = questions[cqindex];
    questionElement.innerText = cquestion.question;

    cquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("ansbtn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.style.backgroundColor = "lightgreen";
        score++;
    } else {
        selectedBtn.style.backgroundColor = "lightcoral";
    }

    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = "lightgreen";
        }
    });

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    cqindex++;
    if (cqindex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerText = `Quiz Finished! \n You scored ${score} / ${questions.length}.`;

    if (score > 6) {
        questionElement.innerText += "\n\n CONGRATULATIONS! \n\n Well Done!";
    } else {
        questionElement.innerText += "\n\nBetter Luck Next Time!";
    }

    nextButton.style.display = "none";
    feedbackForm.style.display = "block";
}

document.getElementById("submitfeedback").addEventListener("click", () => {
    const feedbackText = document.getElementById("feedback").value;
    if (feedbackText.trim() !== "") {
        alert("Thank you for your feedback: ");
        window.location.href = "thankyou.html";
    } else {
        alert("Please write something before submitting.");
    }
});

startQuiz();

