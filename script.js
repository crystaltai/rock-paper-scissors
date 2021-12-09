// Pull DOM nodes of each Player button option
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');

// Pull DOM node of Player selection section (to hide when game ends)
const playerOptions = document.querySelector('.player-options');

// Pull DOM node of winner anouncement
const winnerAnnouncer = document.getElementById('winner-announcer');

// Pull DOM nodes of Player and Computer scores
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');

// Pull DOM nodes of Player and Computer selected options (to display images of selected options)
const playerSelection = document.getElementById('player-selection');
const computerSelection = document.getElementById('computer-selection');

// Pull DOM node of popup box and restart button (to display when game ends)
const popupBox = document.querySelector('.popup-container');
const restartButton = document.querySelector('.restart');

// Global variables for Player and Computer points tracker (initialize to 0)
let playerPointsCount = 0;
let computerPointsCount = 0;

// Add event listener to Player button options
// display Player's selection and play game
rock.addEventListener('click', () => {
    playerSelection.innerHTML = '<i class="fas fa-hand-rock"></i>';
    game('rock');
}); 

paper.addEventListener('click', () => {
    playerSelection.innerHTML = '<i class="fas fa-hand-paper"></i>';
    game('paper');
});

scissors.addEventListener('click', () => {
    playerSelection.innerHTML = '<i class="fas fa-hand-peace"></i>';
    game('scissors');
});

// Add event listener to restart button to reset the game when clicked
restartButton.addEventListener('click', resetGame);

// Game points tracker
function game(playerSelection) {
        
    // Prompt Player to input choice; random selection of Computer choice
    let playerMove = playerSelection;
    let computerMove = computerPlay();

    // Update the display to reflect Computer's selection
    if (computerMove == 'rock') {
        computerSelection.innerHTML = '<i class="fas fa-hand-rock"></i>'
        
    } else if (computerMove == 'paper') {
        computerSelection.innerHTML = '<i class="fas fa-hand-paper"></i>'
        
    } else {
        computerSelection.innerHTML = '<i class="fas fa-hand-peace"></i>'
    }
    
    // Run a game round and assign the winner return value to 'winner' variable
    let winner = gameRound(playerMove, computerMove);

    // If gameRound returns 1, then add a point to player; otherwise add a point to computer
    // Update DOM with new score and winner announcement
    if (winner === 1) {
        playerPointsCount = playerPointsCount + 1;
        playerScore.innerHTML = `${playerPointsCount}`;
        roundWinner('You win this round!');
    } else if (winner === 0) {
        computerPointsCount = computerPointsCount + 1;
        computerScore.innerHTML = `${computerPointsCount}`;
        roundWinner('Computer wins this round!');
    } else {
        // do nothing if tie (null)
        roundWinner('It\'s a tie!');
    }   
    
    // Check to see if either player or computer has reached 5 points
    checkGameStatus();
}

// Select random option for computer
function computerPlay() {
    let computerOptions = ['rock', 'paper', 'scissors'];
    let computerChoice = computerOptions[Math.floor(Math.random() * computerOptions.length)];
    return computerChoice; 
}

// Logic for single round of game
function gameRound(playerSelection, computerSelection) {
    // return 1 if player wins round; return 0 if computer wins round; return null if tie
    if (playerSelection === 'rock' && computerSelection === 'scissors') {
        return 1;
    } else if (playerSelection === 'rock' && computerSelection === 'paper') {
        return 0;
    } else if (playerSelection === 'scissors' && computerSelection === 'rock') {
        return 0;
    } else if (playerSelection === 'scissors' && computerSelection === 'paper') {
        return 1;
    } else if (playerSelection === 'paper' && computerSelection === 'rock') {
        return 1;
    } else if (playerSelection === 'paper' && computerSelection === 'scissors') {
        return 0;
    } else {
        return null;
    }
}

// Select a random option for Computer
function computerPlay() {
    let computerOptions = ['rock', 'paper', 'scissors'];
    let computerChoice = computerOptions[Math.floor(Math.random() * computerOptions.length)];
    return computerChoice;        
}

// Check to see if either Player or Computer has reached 5 points; if yes, open restart popup
function checkGameStatus() {
    if (playerPointsCount === 5) {
        winnerAnnouncer.innerHTML = 'You beat the computer!';
        winnerAnnouncer.style.color = "#20BF6B";
        openPopup();
    } else if (computerPointsCount === 5) {
        winnerAnnouncer.innerHTML = 'The computer beat you!';
        winnerAnnouncer.style.color = "#EB3B5A";
        openPopup();
    } else {
        // do nothing
    }
}

// Update winner announcer to indicate who won the round
function roundWinner(roundResult) {
    winnerAnnouncer.innerHTML = roundResult;
}

// Open popup box that asks Player to restart game
function openPopup() {
    popupBox.style.display = "flex";
    playerOptions.style.display = "none";
}

// Reset the game back to default settings and scores back to 0
function resetGame() {
    // reset score back to 0
    playerPointsCount = 0;
    computerPointsCount = 0;

    playerScore.innerHTML = `${playerPointsCount}`;
    computerScore.innerHTML = `${computerPointsCount}`;

    // reset winner announcer back to 'Score' and default color
    winnerAnnouncer.innerHTML = 'Score';
    winnerAnnouncer.style.color = "#424242";

    // Display player options
    playerOptions.style.display = "flex";

    // Hide reset button
    popupBox.style.display = "none";
}