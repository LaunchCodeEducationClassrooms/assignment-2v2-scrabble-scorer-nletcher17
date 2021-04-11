// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 };

 function transform(anyName) {
  let newObject = {};
  for (let key in anyName){
    for (let i = 0; i < anyName[key].length; i++) {
      newObject[anyName[key][i].toUpperCase()] = Number(key);
    }
  }
  return newObject;
};

let newPointStructure = transform(oldPointStructure);

newPointStructure[" "] = 0;

function initialPrompt() {
  console.log("Let's play some scrabble!\n");
  word = input.question("Enter a word to score: ");
  return word;
};

let simpleScore = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scorerFunction: function(word) {
    score = word.length;
    return score;
  }
};

let vowelBonusScore = {
  name: "Vowel Bonus Score",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: function(word) {
    word = word.toUpperCase();
    score = 0;
    for (i = 0; i < word.length; i++) {
      if (word[i] === "A") {
        score = score + 3;
      } else if (word[i] === "E") {
        score = score + 3;
      } else if (word[i] === "I") {
        score = score + 3;
      } else if (word[i] === "O") {
        score = score + 3;
      } else if (word[i] === "U") {
        score = score + 3;
      } else {
        score = score + 1;
      }
    }
  return score;
  }
};

let scrabbleScore = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scorerFunction: function(word){
    word = word.toUpperCase();
    score = 0;
    for (let i = 0; i < word.length; i++){
      letterValue = word[i];
      score += newPointStructure[letterValue];
    }
    return score;
  }
};

const scoringAlgorithms = [simpleScore, vowelBonusScore, scrabbleScore];

function scorerPrompt() {
    console.log(
    "Which scoring algorithm would you like to use?\n\n" + 
    "0 - Simple: One point per character\n" + 
    "1 - Vowel Bonus: Vowels are worth 3 points\n" +
    "2 - Scrabble: Uses scrabble point system");

    userInput = input.question("Enter 0, 1, or 2: ");

    return userInput;
};

function scoreOutput() {
  userInput = Number(userInput);

  while (userInput != 0) {
   if (userInput == 1) {
      break;
    } else if (userInput == 2) {
      break;
    } else {
     userInput = input.question("Please enter a valid number: ");
    }
};

  score = scoringAlgorithms[userInput].scorerFunction(word);

  return score;
};

function runProgram() {
   initialPrompt();
   scorerPrompt();
   scoreOutput();

  console.log("Score for '" + word + "': " + score);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

