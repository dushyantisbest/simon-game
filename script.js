// get all the elements

heading = document.querySelector("h3");
one = document.querySelector(".one");
two = document.querySelector(".two");
three = document.querySelector(".three");
four = document.querySelector(".four");
let finalScoreElement = document.querySelector("#finalScore");
let scoreDisplay = document.querySelector("#scoreDisplay");
let restartButton = document.querySelector("#restartButton");
let startButton = document.querySelector("#startButton");

let running = true;
let level = 0;
let sequence = [];
let checkSequence = [];
let userTurn = false;

// Define the startGame function in the global scope
function startGame() {
  level = 0;
  sequence = [];
  finalScoreElement.style.display = "none"; // Hide final score
  heading.innerHTML = "Level 1";
  nextLevel();
}

// Start the game when the button is clicked
startButton.addEventListener("click", function () {
  startButton.style.display = "none"; // Hide the start button
  startGame(); // Call the global startGame function
});

// Start the game when a key is pressed (for desktop users)
document.addEventListener("keydown", function () {
  startButton.style.display = "none"; // Hide the start button
  startGame(); // Call the global startGame function
});

// Proceed to the next level
function nextLevel() {
  level++;
  heading.innerHTML = "Level " + level;
  checkSequence = [];
  userTurn = false;

  // Generate a new random number and add it to the sequence
  let randomNumber = Math.floor(Math.random() * 4) + 1;
  sequence.push(randomNumber);

  // Flash the sequence to the user
  flashSequence(sequence, () => {
    userTurn = true;
  });
}

// Flash the sequence to the user
function flashSequence(sequence, callback) {
  let i = 0;
  function flashNext() {
    if (i < sequence.length) {
      boxFlash(sequence[i]);
      i++;
      setTimeout(flashNext, 800);
    } else {
      callback();
    }
  }
  flashNext();
}

// Handle user clicks
function handleClick(number) {
  if (!userTurn) return;

  boxFlash(number);
  checkSequence.push(number);

  // Check if the user's input matches the sequence so far
  if (
    checkSequence[checkSequence.length - 1] !==
    sequence[checkSequence.length - 1]
  ) {
    gameOver();
    return;
  }

  // If the user completes the sequence, go to the next level
  if (checkSequence.length === sequence.length) {
    setTimeout(nextLevel, 1000);
  }
}

// End the game
function gameOver() {
  running = false;
  heading.innerHTML = "Game Over!";
  scoreDisplay.innerHTML = level - 1; // Display the score based on levels
  finalScoreElement.style.display = "block"; // Show final score and restart button
  document.removeEventListener("click", clickHandler);
  startButton.style.display = "block"; // Show the start button again
}

// Flash a box when clicked
function clickHandler(event) {
  if (event.target.classList.contains("one")) handleClick(1);
  if (event.target.classList.contains("two")) handleClick(2);
  if (event.target.classList.contains("three")) handleClick(3);
  if (event.target.classList.contains("four")) handleClick(4);
}

// Add event listeners for clicks
document.addEventListener("click", clickHandler);

// Restart button functionality
restartButton.addEventListener("click", function () {
  heading.innerHTML = "Press any key to start game";
  startGame();
});

// box flash function
function boxFlash(number) {
  if (number == 1) {
    one.style.backgroundColor = "white";
    setTimeout(() => {
      one.style.backgroundColor = "rgb(230, 128, 51)";
    }, 500);
  } else if (number == 2) {
    two.style.backgroundColor = "white";
    setTimeout(() => {
      two.style.backgroundColor = "rgb(44, 153, 211)";
    }, 500);
  } else if (number == 3) {
    three.style.backgroundColor = "white";
    setTimeout(() => {
      three.style.backgroundColor = "rgb(90, 200, 65)";
    }, 500);
  } else if (number == 4) {
    four.style.backgroundColor = "white";
    setTimeout(() => {
      four.style.backgroundColor = "violet";
    }, 500);
  } else {
    console.log("Number is not between 1-4");
  }
}
