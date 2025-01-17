$(document).ready(function () {
    $(".instructions-container").show();
    $(".header, .image_content, .word_guess, .result_message").hide();

    $(".start_game").on("click", function () {
        $(".instructions-container").hide();
        $(".header, .image_content, .word_guess, .result_message").show();
    });
});

let puzzleArray = [
    {
        word: "train",
        images: ["./images/medium/puzzle1/image_1.jpg",
            "./images/medium/puzzle1/image_2.jpg",
            "./images/medium/puzzle1/image_3.jpg",
            "./images/medium/puzzle1/image_4.jpg"
        ],
        hint: "Medium used for travel, workouts, and skill-building"
    },
    {
        word: "heavy",
        images: ["./images/medium/puzzle2/image_1.jpg",
            "./images/medium/puzzle2/image_2.jpg",
            "./images/medium/puzzle2/image_3.jpg",
            "./images/medium/puzzle2/image_4.jpg"
        ],
        hint: "Weighs a lot, a burden to carry"
    },
    {
        word: "trunk",
        images: ["./images/medium/puzzle3/image_1.jpg",
            "./images/medium/puzzle3/image_2.jpg",
            "./images/medium/puzzle3/image_3.jpg",
            "./images/medium/puzzle3/image_4.jpg"
        ],
        hint: "Found in cars, trees, and elephants"
    },
    {
        word: "level",
        images: ["./images/medium/puzzle4/image_1.jpg",
            "./images/medium/puzzle4/image_2.jpg",
            "./images/medium/puzzle4/image_3.jpg",
            "./images/medium/puzzle4/image_4.jpg"
        ],
        hint: "Balanced, a stage in a game, or a tool for straightening"
    },
    {
        word: "arrow",
        images: ["./images/medium/puzzle5/image_1.jpg",
            "./images/medium/puzzle5/image_2.jpg",
            "./images/medium/puzzle5/image_3.jpg",
            "./images/medium/puzzle5/image_4.jpg"
        ],
        hint: "Points the way, used in archery, or a keyboard key"
    },
    {
        word: "sweet",
        images: ["./images/medium/puzzle6/image_1.jpg",
            "./images/medium/puzzle6/image_2.jpg",
            "./images/medium/puzzle6/image_3.jpg",
            "./images/medium/puzzle6/image_4.jpg"
        ],
        hint: "A pleasant taste, often associated with desserts, candy, and happiness."
    },
    {
        word: "match",
        images: ["./images/medium/puzzle7/image_1.jpg",
            "./images/medium/puzzle7/image_2.jpg",
            "./images/medium/puzzle7/image_3.jpg",
            "./images/medium/puzzle7/image_4.jpg"
        ],
        hint: "A perfect pair, a sporting contest, or something to light a fire."
    },
    {
        word: "salty",
        images: ["./images/medium/puzzle8/image_1.jpg",
            "./images/medium/puzzle8/image_2.jpg",
            "./images/medium/puzzle8/image_3.jpg",
            "./images/medium/puzzle8/image_4.jpg"
        ],
        hint: "A taste often found in snacks, seas, and tears."
    },
    {
        word: "curly",
        images: ["./images/medium/puzzle9/image_1.jpg",
            "./images/medium/puzzle9/image_2.jpg",
            "./images/medium/puzzle9/image_3.jpg",
            "./images/medium/puzzle9/image_4.jpg"
        ],
        hint: "Twisted, spiraled, or wavy—often describes hair or ribbons."
    },
    {
        word: "fluff",
        images: ["./images/medium/puzzle10/image_1.jpg",
            "./images/medium/puzzle10/image_2.jpg",
            "./images/medium/puzzle10/image_3.jpg",
            "./images/medium/puzzle10/image_4.jpg"
        ],
        hint: "Soft, light, and airy; found on bunnies, blankets, and clouds.."
    }
];

let mainImageDiv = document.querySelector(".image_section");
let resultMessage = document.querySelector(".result_message");
let resultText = document.createElement("p");
resultText.classList.add("result_text");
resultMessage.appendChild(resultText);

let scoreText = document.createElement("p");
scoreText.classList.add("score_text");
resultMessage.appendChild(scoreText);

let hintText = document.querySelector(".hint");
let hintMessage = document.querySelector(".hint_message");
let currentAttempt = 0;
let currentPuzzleIndex = 0;

const showHint = () => {
    let currentPuzzle = puzzleArray[currentPuzzleIndex];
    hintMessage.textContent = currentPuzzle.hint;
    hintMessage.classList.add("active");
};

const resetGame = () => {
    currentAttempt = 0;
    currentPuzzleIndex = 0;
    hintMessage.textContent = "";
    resultText.textContent = "";
    scoreText.textContent = "";
    loadPuzzle();
};

const loadPuzzle = () => {
    mainImageDiv.innerHTML = "";
    hintMessage.textContent = "";
    hintMessage.classList.remove("active");
    hintText.disabled = false;

    let currentPuzzle = puzzleArray[currentPuzzleIndex];

    currentPuzzle.images.forEach(imagePath => {
        let imageContainer = document.createElement("img");
        imageContainer.src = imagePath;
        imageContainer.alt = "image_clue";
        imageContainer.classList.add("puzzle_images");
        mainImageDiv.appendChild(imageContainer);
    });

    resultText.textContent = "";
    scoreText.textContent = "";
    document.querySelector("#guessed_word").value = "";
};

let correctAnswers = 0;
let wrongAnswers = 0;   
let puzzleTransitionInProgress = false; 

let enterButton = document.querySelector(".enter_button");
enterButton.addEventListener("click", () => {

    if (puzzleTransitionInProgress) return; 

    let wordInput = document.querySelector("#guessed_word");
    let userGuess = wordInput.value.toLowerCase();
    let currentPuzzle = puzzleArray[currentPuzzleIndex];
    let puzzleLength = puzzleArray.length;
    let remainingPuzzles = (puzzleLength - 1) - currentPuzzleIndex;

    currentAttempt++;

    if (userGuess === currentPuzzle.word) {
        correctAnswers++; 
        console.log(`correct- ${correctAnswers}, wrong-${wrongAnswers}`);
        resultText.textContent = `Right Guess! ${remainingPuzzles} puzzles left.`;

        puzzleTransitionInProgress = true;
        enterButton.disabled = true;

        setTimeout(() => {
            currentAttempt = 0; 
            currentPuzzleIndex++;
            puzzleTransitionInProgress = false;
            enterButton.disabled = false;

            if (currentPuzzleIndex < puzzleArray.length) {
                loadPuzzle();
            } else {
                console.log(`correct- ${correctAnswers}, wrong-${wrongAnswers}`);
                resultText.textContent = `Game Over! Correct Guesses: ${correctAnswers}, Wrong Guesses: ${wrongAnswers}.`;
                enterButton.disabled = true; 
                scoreText.textContent = `Thanks for playing. Click on "Replay" button to play again`;
            }
        }, 2500);

    } else if (currentAttempt >= 5) {
        wrongAnswers++;
        console.log(`wrong: ${wrongAnswers}`)
        resultText.textContent = `Attempts exceeded! The correct answer was "${currentPuzzle.word}".`;

        puzzleTransitionInProgress = true;
        enterButton.disabled = true;

        setTimeout(() => {
            currentAttempt = 0; 
            currentPuzzleIndex++;
            puzzleTransitionInProgress = false;
            enterButton.disabled = false;

            if (currentPuzzleIndex < puzzleArray.length) {
                loadPuzzle();
            } else {
                console.log(`correct- ${correctAnswers}, wrong-${wrongAnswers}`);
                resultText.textContent = `Game Over! Correct Guesses: ${correctAnswers}, Wrong Guesses: ${wrongAnswers}.`;
                enterButton.disabled = true; 
                scoreText.textContent = `Thanks for playing. Click on "Replay" button to play again`;
            }
        }, 2500);

    } else {
        let attemptNumber = 5 - currentAttempt;
        resultText.textContent = `Wrong! ${attemptNumber} attempts left.`;
    }
});


hintText.addEventListener("click", () => {

    if (currentPuzzleIndex >= puzzleArray.length) {
        resultText.textContent = "No more puzzles left. Click Replay to start again.";
        hintText.disabled = true; 
        return; 
    }

    const currentPuzzle = puzzleArray[currentPuzzleIndex];
    if (hintMessage.classList.contains("active")) {
        hintMessage.classList.remove("active");
        hintMessage.textContent = "";
    } else {
        hintMessage.classList.add("active");
        hintMessage.textContent = currentPuzzle.hint;
        hintText.disabled = true;
    }
});

let replayButton = document.querySelector(".replay_button");
replayButton.addEventListener("click", () => {
    resetGame();
    enterButton.disabled = false; 
});

loadPuzzle();

