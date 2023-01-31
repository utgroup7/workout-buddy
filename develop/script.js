// declare DOM element variables
var exerciseChoiceEl = document.getElementById("exercise-sel");
var muscleChoiceEl = document.getElementById("muscle-sel");
var difficultyChoiceEl = document.getElementById("difficulty-sel");
var submitBtnEl = document.getElementById("submit-btn");
var exercisesAPIKey = "k+TTZg5W7abWENrPVaEK3A==zHLpPbG3n2YNutwf";
var exerciseDisplay = document.getElementById("exercise-container");

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
    clearCards();
    // clear local storage
    getWorkouts();
}

function clearCards() {
    while (exerciseDisplay.firstChild) {
        exerciseDisplay.removeChild(exerciseDisplay.firstChild);
    }
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
            // create variables for API data
            var exerciseName = data[i].name;
            var exerciseDifficulty = data[i].difficulty;
            var exerciseMuscle = data[i].muscle;
            var exerciseEquipment = data[i].equipment;
            var exerciseType = data[i].type;
            var exerciseInstructions = data[i].instructions;

            // create boxes for exercises
            var exerciseCard = document.createElement("div")
            var cardName = document.createElement("p4");
            var cardDifficulty = document.createElement("p");
            var cardMuscle = document.createElement("p");
            var cardEquipment = document.createElement("p");
            var cardType = document.createElement("p");
            var cardInstuctions = document.createElement("p");

            // append text to card, and card to container
            exerciseCard.appendChild(cardName);
            exerciseCard.appendChild(cardDifficulty);
            exerciseCard.appendChild(cardMuscle);
            exerciseCard.appendChild(cardEquipment);
            exerciseCard.appendChild(cardType);
            exerciseCard.appendChild(cardInstuctions);
            exerciseDisplay.appendChild(exerciseCard);

            // add text from API to created elements
            cardName.textContent = exerciseName;
            cardDifficulty.textContent = "Difficulty: " + exerciseDifficulty;
            cardMuscle.textContent = "Muscle group: " + exerciseMuscle;
            cardEquipment.textContent = "Equipment required: " + exerciseEquipment;
            cardType.textContent = "Type: " + exerciseType;
            cardInstuctions.textContent = "Instructions: " + exerciseInstructions;
        }
    });
}

submitBtnEl.addEventListener("click", getUserInput);