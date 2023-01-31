// declare DOM element variables
var exerciseChoiceEl = document.getElementById("exercise-sel");
var muscleChoiceEl = document.getElementById("muscle-sel");
var difficultyChoiceEl = document.getElementById("difficulty-sel");
var submitBtnEl = document.getElementById("submit-btn");
var exercisesAPIKey = "k+TTZg5W7abWENrPVaEK3A==zHLpPbG3n2YNutwf";

function getUserInput() {
    var exerciseType = exerciseChoiceEl.options[exerciseChoiceEl.selectedIndex].text;
    var muscleType = muscleChoiceEl.options[muscleChoiceEl.selectedIndex].text;
    var difficultyType = difficultyChoiceEl.options[difficultyChoiceEl.selectedIndex].text;
    if (exerciseType === "Exercise Type") {
        console.log("Please choose an exercise Type");
    } else if (muscleType === "Muscle Group") {
        console.log("Please choose a muscle group");
    } else if (difficultyType === "Difficulty") {
        console.log("please choose a difficulty level");
    }
}

function getWorkouts() {
    var requestUrl = "https://api.api-ninjas.com/v1/exercises?&type=" + exerciseType + "&muscle=" + muscleType + "&difficulty=" + difficultyType

    fetch(requestUrl, {
        headers: {
            'X-API-Key': exercisesAPIKey
        },
    })
    .then(function (response) {
        if (response.status === 200){
            return response.json();
        } else {
            alert("The exercise API is currently down. Please try again later.");
            return;
        }
    })
    .then(function (data) {
        console.log(data);
    });
}

submitBtnEl.addEventListener("click", getUserInput);