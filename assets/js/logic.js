document.addEventListener("DOMContentLoaded", function () {
    // reference index.html HTML elements
    const startButton = document.getElementById("start");
    const startScreen = document.getElementById("start-screen");
    const questionsContainer = document.getElementById("questions");
    const choicesContainer = document.getElementById("choices");
    const endScreen = document.getElementById("end-screen");
    const finalScoreElement = document.getElementById("final-score");
    const initialsInput = document.getElementById("initials");
    const submitButton = document.getElementById("submit");
    const feedbackElement = document.getElementById("feedback");
    const timeElement = document.getElementById("time");

    // intialise variables
    let currentQuestionIndex = 0;
    let timer;
    let timeLeft = 60;

    // event listeners for start quiz and submit score buttons
    startButton.addEventListener("click", startQuiz);
    submitButton.addEventListener("click", submitScore);
});