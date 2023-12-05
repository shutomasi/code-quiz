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

    // start quiz function
    function startQuiz() {
        startScreen.classList.add("hide"); // hide start screen
        questionsContainer.classList.remove("hide"); // show question screen
        showQuestion(); // show question
        timer = setInterval(updateTimer, 1000); // start timer
    }

    // end quiz function
    function endQuiz() {
        clearInterval(timer); // stop timer
        questionsContainer.classList.add("hide"); // hides question container
        endScreen.classList.remove("hide"); // shows end screen
        finalScoreElement.textContent = timeLeft; // display score
    }

    // timer function
    function updateTimer() {
        if (timeLeft > 0) { // count down timer and run end quiz function if timer finishes
            timeLeft--;
            timeElement.textContent = timeLeft;
        } else {
            endQuiz();
        }
    }

    // display question function
    function showQuestion() {
        const currentQuestion = quizData[currentQuestionIndex]; // grab question array
        document.getElementById("question-title").textContent = currentQuestion.question; // display value in "question" key from question object in quizData array
        choicesContainer.innerHTML = ""; // clear last choice so questions don't overlap
        currentQuestion.answers.forEach((answer) => { // create button element for each answer
            const button = document.createElement("button");
            button.textContent = answer;
            button.addEventListener("click", checkAnswer);
            choicesContainer.appendChild(button);
        });
    }

    // check answer function
    function checkAnswer(event) {
        const selectedAnswer = event.target.textContent; // grab selected answer
        const correctAnswer = quizData[currentQuestionIndex].correctAnswer; // grab correct answer from quizData array
        if (selectedAnswer === correctAnswer) { // provide feedback regarding answer choice - subtract 10 seconds from timer for incorrect answers
            feedbackElement.textContent = "Correct!";
        } else {
            feedbackElement.textContent = "Incorrect!";
            timeLeft -= 10;
        }
        setTimeout(() => { // delay
            feedbackElement.textContent = ""; // clears text from feedback element
            currentQuestionIndex++; // adds 1 to current question index to move to next question
            if (currentQuestionIndex < quizData.length) { // check if there are more questions, if there is then run show question function if not then run end quiz function
                showQuestion();
            } else {
                endQuiz();
            }
        }, 1000);
    }

    // submit score function
    function submitScore() {
        const initials = initialsInput.value.trim(); // grab user's initials
        if (initials !== "") { // check that there is valid input
            const scoreData = { // stores initials and score to object
                score: timeLeft,
                initials: initials,
            };
            const highScores = JSON.parse(localStorage.getItem("highScores")) || []; // gets high scores from localStorage
            highScores.push(scoreData); // adds score to high scores array
            highScores.sort((a, b) => b.score - a.score); // sorts high scores in descending order
            localStorage.setItem("highScores", JSON.stringify(highScores)); // updates localStorage
            window.location.href = "highscores.html"; // sends user to highscores.html page
        }
    }
});