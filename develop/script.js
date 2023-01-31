// declare DOM element variables
var exerciseChoiceEl = document.getElementById("exercise-sel");
var muscleChoiceEl = document.getElementById("muscle-sel");
var difficultyChoiceEl = document.getElementById("difficulty-sel");
var submitBtnEl = document.getElementById("submit-btn");
var exercisesAPIKey = "k+TTZg5W7abWENrPVaEK3A==zHLpPbG3n2YNutwf";

// get user inputs from dropdown options
function getUserInput() {
    var exerciseType = exerciseChoiceEl.options[exerciseChoiceEl.selectedIndex].text;
    var muscleType = muscleChoiceEl.options[muscleChoiceEl.selectedIndex].text;
    var difficultyType = difficultyChoiceEl.options[difficultyChoiceEl.selectedIndex].text;
    // functionality to check if all options are selected
    if (exerciseType === "" && muscleType === "" && difficultyType === "") {
        console.log("Please choose at least one option");
        return;
    }
    getWorkouts();
}

function getWorkouts() {
    var exerciseType = exerciseChoiceEl.options[exerciseChoiceEl.selectedIndex].text;
    var muscleType = muscleChoiceEl.options[muscleChoiceEl.selectedIndex].text;
    var difficultyType = difficultyChoiceEl.options[difficultyChoiceEl.selectedIndex].text;
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

        for (var i=0; i<8; i++) {
            var exerciseName = data[i].name;
            var exerciseDifficulty = data[i].difficulty;
            var exerciseMuscle = data[i].muscle;
            var exerciseEquipment = data[i].equipment;
            var exerciseType = data[i].type;
            var exerciseInstructions = data[i].instructions;

            
        }
    });
}

submitBtnEl.addEventListener("click", getUserInput);