const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const player1ScoreDisplay = document.getElementById('player1-score');
const player2ScoreDisplay = document.getElementById('player2-score');
const tiesDisplay = document.getElementById('ties');
const cells = document.querySelectorAll('.cell');
const newGameBtn = document.getElementById('new-game-button');
const resetBtn = document.getElementById('reset-button');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = false;

let player1Name = 'Player 1';
let player2Name = 'Player 2';
let player1Score = 0;
let player2Score = 0;
let tieScore = 0;
let namesSet = false;

const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

newGameBtn.addEventListener('click', newGame);
resetBtn.addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell-index'));

    if (boardState[cellIndex] !== '' || !isGameActive) {
        return;
    }

    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        isGameActive = false;
        if (currentPlayer === 'X') {
            player1Score++;
            player1ScoreDisplay.textContent = `Score: ${player1Score}`;
            alert(`${player1Name} wins!`);
        } else {
            player2Score++;
            player2ScoreDisplay.textContent = `Score: ${player2Score}`;
            alert(`${player2Name} wins!`);
        }
        return;
    }

    if (boardState.every(cell => cell !== '')) {
        isGameActive = false;
        tieScore++;
        tiesDisplay.textContent = `Ties: ${tieScore}`;
        alert("It's a draw!");
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }
    return false;
}

function newGame() {
    // Only prompt for names if they haven't been set yet
    if (!namesSet) {
        const name1 = prompt("Enter name for Player 1 (X):");
        const name2 = prompt("Enter name for Player 2 (O):");
        
        if (name1) {
            player1Name = name1;
        }
        if (name2) {
            player2Name = name2;
        }
        namesSet = true;
        
        player1.textContent = player1Name + ": X";
        player2.textContent = player2Name + ": O";
        player1ScoreDisplay.textContent = `Score: ${player1Score}`;
        player2ScoreDisplay.textContent = `Score: ${player2Score}`;
    }
    
    // Clear the board and start game
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    cells.forEach(cell => cell.textContent = '');
}

function resetGame() {
    player1Name = 'Player 1';
    player2Name = 'Player 2';
    player1Score = 0;
    player2Score = 0;
    tieScore = 0;
    namesSet = false;
    
    player1.textContent = 'Player 1: X';
    player2.textContent = 'Player 2: O';
    player1ScoreDisplay.textContent = 'Score: 0';
    player2ScoreDisplay.textContent = 'Score: 0';
    tiesDisplay.textContent = 'Ties: 0';
    
    // Clear the board
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = false;
    cells.forEach(cell => cell.textContent = '');
}