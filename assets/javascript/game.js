// Create arrays that list word dictionary and user choices for valid keys.
var wordChoices = ["SPARTACUS", "SHINING", "CLOCKWORK", "DROOGIE", "HORRORSHOW", "MONOLITH", "OVERLOOK", "REDRUM"];
var userChoices = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W" , "X", "Y", "Z"]

// Define all the required variables for functions
var wins = 0;
var losses = 0;
var guesses = 12;
var chosenWord;
var guessesList = [];
var wordArray;
var underscoresArray = [];
var userChoice;
var startGame = false;
var underscoreString;
var validKey = false;
console.log(validKey);
console.log(wins);

// Create variables that hold references to the places in the HTML where we want to display output
var directionsText = document.getElementById("directions-text");
var wordChoiceText = document.getElementById("wordchoice-text");
var guessesText = document.getElementById("guesses-text");
var guessesListText = document.getElementById("guesseslist-text");
var userChoiceText = document.getElementById("userchoice-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var newMessageText = document.getElementById("newmessage-text");

//Functions to be used for playing the game

// Starts a new game and resets variablesjh
function newGame() {
    startGame = true;
    validkey = false;
    guessesList = [];
    guesses = 12;
    chosenWord = wordChoices[(Math.floor(Math.random() * wordChoices.length))];
    underscoreString = chosenWord.replace(/.{1}/g, "_ ");
    wordArray = chosenWord.split('');
    underscoresArray = underscoreString.split('');
    wordChoiceText.textContent = underscoresArray;
    guessesText.textContent = guesses;
}

//Compares the current letter choice to the hidden word for matches and reveals them visually
function revealMatch(userChoice) {
    for (i = 0; i < chosenWord.length; i++) {
        if (userChoice == wordArray[i]) {
            underscoresArray[i * 2] = userChoice;
        }   
    }
    wordChoiceText.textContent = underscoresArray.join("");
}

//Did the user press a valid key (upper or lower case letter)
function keyCheck(userChoice) {  
    if (userChoices.indexOf(userChoice) != -1) {
        validKey = true;
    }    
    else {
        validKey = false;
    }
}

// This primary function is run whenever the user presses a key
document.onkeypress = function(event) {
    if (startGame == false) {    
    directionsText.textContent = ""; //hide the instructions upon first key press
    newGame();
    }
    else {
        userChoice = (event.key);
        userChoice = userChoice.toUpperCase();
        revealMatch(userChoice);
        if (underscoresArray.indexOf("_") === -1) {
        wins++;
        newMessageText.textContent = "You must have cheated. Well done.";
        newGame(event.key);
        }
    else {
        userChoice = (event.key)
        userChoice = userChoice.toUpperCase();
        keyCheck(userChoice);
        revealMatch(userChoice);
        if ((guessesList.indexOf(userChoice) === -1) && (validKey == true)) {
        guesses--;
        guessesList.push(userChoice);
        }
        if (guesses == 0) {
            newMessageText.textContent = "This farce is over loser. You've been reset.";
            newGame();
            losses++
        }
    }
    }
    
    // Display the correct letters, letters chosen, wins & losses
    wordChoiceText.textContent = underscoresArray.join(" ");
    guessesText.textContent = "Choose wisely: " + guesses;
    guessesListText.textContent = "Your past mistakes: " + guessesList.join(" "); 
    winsText.textContent = "# of times you cheated: " + wins;
    lossesText.textContent = "Pathetic losses: " + losses;

};