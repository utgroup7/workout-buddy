// declare DOM element variables
var exerciseChoiceEl = document.getElementById("exercise-sel");
var muscleChoiceEl = document.getElementById("muscle-sel");
var difficultyChoiceEl = document.getElementById("difficulty-sel");
var submitBtnEl = document.getElementById("submit-btn");
var exercisesAPIKey = "k+TTZg5W7abWENrPVaEK3A==zHLpPbG3n2YNutwf";
var exerciseDisplay = document.getElementById("exercise-container");
var exerciseType = "";
var muscleType = "";
var difficultyType = "";

// loads local storage on refresh
function LoadStorage() {
  var savedWorkouts = JSON.parse(localStorage.getItem("savedWorkouts")) || [];

  if (savedWorkouts != "") {
    exerciseType = savedWorkouts[0].exercise;
    muscleType = savedWorkouts[0].muscle;
    difficultyType = savedWorkouts[0].difficulty;
    getApi();

  } else {
    return;
  }
}

// run functions to clear cards, get inputs and then call API
function getExercises() {
  clearCards();
  getUserInput();
  getApi();
}

// clears existing cards
function clearCards() {
  while (exerciseDisplay.firstChild) {
    exerciseDisplay.removeChild(exerciseDisplay.firstChild);
  }
}

// verifies userInputs from dropdown menu
function getUserInput() {
  exerciseType = exerciseChoiceEl.options[exerciseChoiceEl.selectedIndex].text
    .split(" ")
    .join("_");
  muscleType = muscleChoiceEl.options[muscleChoiceEl.selectedIndex].text
    .split(" ")
    .join("_");
  difficultyType = difficultyChoiceEl.options[
    difficultyChoiceEl.selectedIndex
  ].text
    .split(" ")
    .join("_");
  saveLocalStorage();
}

function saveLocalStorage() {
  var savedWorkouts = [
    {
      exercise: exerciseType,
      muscle: muscleType,
      difficulty: difficultyType,
    },
  ];
  localStorage.setItem("savedWorkouts", JSON.stringify(savedWorkouts));
}

// resets local storage
function resetLocalStorage() {
  localStorage.clear();
}

function getApi() {
  // takes selected options, and puts them into API call
  var requestUrl =
    "https://api.api-ninjas.com/v1/exercises?&type=" +
    exerciseType +
    "&muscle=" +
    muscleType +
    "&difficulty=" +
    difficultyType;

  // fetch data with API key
  fetch(requestUrl, {
    headers: {
      "X-API-Key": exercisesAPIKey,
    },
  })
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        alert("The exercise API is currently down. Please try again later.");
        return;
      }
    })
    .then(function (data) {
      if (data.length == 0) {
        alert(
          "Sorry, no exercises were found for your selection. Please change your search criteria!"
        );
        resetLocalStorage();
        return;
      } else {
        console.log(data);

        // loop through 8 results, and display them
        for (var i = 0; i < 8; i++) {
          // create variables for API data
          var exerciseName = data[i].name;
          var exerciseDifficulty = data[i].difficulty;
          var exerciseMuscle = data[i].muscle;
          var exerciseEquipment = data[i].equipment;
          var exerciseType = data[i].type;
          var exerciseInstructions = data[i].instructions;

          // create boxes for exercises
          var exerciseCard = document.createElement("div");
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
          cardEquipment.textContent =
            "Equipment required: " + exerciseEquipment;
          cardType.textContent = "Type: " + exerciseType;
          cardInstuctions.textContent = "Instructions: " + exerciseInstructions;
        }
      }
    });
}

function fetchweather() {
  var whichcity;
  whichcity = document.querySelector(".cityname").value.trim();
  if (whichcity == "") {
  } else {
    whichcity = whichcity[0].toUpperCase() + whichcity.slice(1);
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        whichcity +
        //api key
        "&appid=1c1db37f109216f4015898ae7bfc7c96"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        console.log(data);

        if (data.cod === "404") {
          $(".search-city").css("font-weight", "bold").html("City Not Found");
        } else {
          $(".search-city").css("font-weight", "bold").html(`${data.name}`);
          var d = new Date();
          $(".date")
            .css("font-weight", "bold")
            .html(`(${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()})`);
          $(".todayweather")
            .css("font-weight", "bold")
            .html(`Today's weather:${data.weather[0].main}`);
          $(".weathericon").attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              data.weather[0].icon +
              "@2x.png"
          );
          if (
            data.main.temp < 283.15 ||
            data.weather[0].main == "Rain" ||
            data.weather[0].main == "Snow" 
            
          ) {
            $(".gym-or-outside")
              .css("font-weight", "bold")
              .html("Go to the gym");
          } else {
            $(".gym-or-outside")
              .css("font-weight", "bold")
              .html("Go out and exercise!");
          }
          
        }
        
        showdialog();
      });
  }
}

//local storage for city
var cityhistory = [];
function savecity() {
  if (cityhistory.includes(whichcity)) {
  } else {
    cityhistory.push(whichcity);
    //remove repeat city
    cityhistory = [...new Set(cityhistory)];
  }

  localStorage.setItem("dataset", JSON.stringify(cityhistory));
}
//show dialog
function showdialog() {
  $(".dialog").dialog();
}

//clear weather info!!!
function clearweather() {
  $(".search-city").html("");
  $(".date").html("");
  $(".todayweather").html("");
  $(".weathericon").attr("src", "");
  $(".gym-or-outside").html("");
}

// search button in page 1
submitBtnEl.addEventListener("click", function () {
  getExercises();
  fetchweather();
  $(".page1").css("display", "none");
  $(".page2").css("display", "block");
});

//return button in page 2
document.querySelector(".returnbtn").addEventListener("click", function () {
  $(".page1").css("display", "block");
  $(".page2").css("display", "none");
  clearweather();
});

LoadStorage();