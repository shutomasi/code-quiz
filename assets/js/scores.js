document.addEventListener("DOMContentLoaded", function () {
    // reference highscores.html elements
    const highscoresList = document.getElementById("highscores");
    const clearButton = document.getElementById("clear");

    // display high scores function
    function displayHighscores() {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || []; // get high scores from localStorage or create empty array if it doesn't exist
        highscoresList.innerHTML = ""; // clear list in HTML to stop scores showing up multiple times
        highScores.forEach((scoreData) => { // loop through high scores and add it to list
            const listItem = document.createElement("li"); // create new li element
            listItem.textContent = `${scoreData.initials} - ${scoreData.score}`; // li content to show initials and score
            highscoresList.appendChild(listItem); // add li to the list in HTML
        });
    }

    displayHighscores() // run high scores function

    // clear high scores function
    function clearHighscores() {
        localStorage.removeItem("highScores"); // remove highScores data from localStorage
        displayHighscores(); // run display high scores function to update page
    }

    clearButton.addEventListener("click", clearHighscores); // linked "clear highscores" function to clear button
});