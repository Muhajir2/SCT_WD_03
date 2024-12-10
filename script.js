let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const cells = document.querySelectorAll('.cell');
const turnIndicator = document.getElementById('turnIndicator');

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

function handleCellClick(index) {
  if (gameBoard[index] !== '' || isGameOver) return; 
  
  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer.toLowerCase());
  cells[index].classList.add('disabled');
  
  if (checkWinner()) {
    turnIndicator.textContent = Player ${currentPlayer} Wins!;
    isGameOver = true;
  } else if (gameBoard.every(cell => cell !== '')) {
    turnIndicator.textContent = 'It\'s a Draw!';
    isGameOver = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnIndicator.textContent = Player ${currentPlayer}'s Turn;
    updateTurnIndicatorColor();
  }
}

function updateTurnIndicatorColor() {
  if (currentPlayer === 'X') {
    turnIndicator.style.backgroundColor = 'lightblue';
  } else {
    turnIndicator.style.backgroundColor = 'lightcoral';
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];
  
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  return false;
}

function restartGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  isGameOver = false;
  turnIndicator.textContent = Player ${currentPlayer}'s Turn;
  updateTurnIndicatorColor();
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'disabled');
  });
}