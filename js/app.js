'use strict';

const grid = document.getElementById('grid');
const numRows = 3;
const numCols = 3;
const maxInARow = 3;
const lines = [
  [
    { row: 0, col: 1 }, // RIGHT
    { row: 0, col: -1 }, // LEFT
  ],
  [
    { row: 1, col: 0 }, // DOWN
    { row: -1, col: 0 }, // UP
  ],
  [
    { row: 1, col: 1 }, // DOWN RIGHT
    { row: -1, col: -1 }, // UP LEFT
  ],
  [
    { row: -1, col: 1 }, // UP RIGHT
    { row: 1, col: -1 }, // DOWN LEFT
  ]
];

var allCells = [];
var currentPlayer = 0;

function initBoard() {
  for (var r = 0; r < numRows; r++) {
    var trEl = document.createElement('tr');
    trEl.classList.add('gridRow');

    for (var c = 0; c < numCols; c++) {
      var tdEl = document.createElement('td');
      tdEl.classList.add('gridCell');
      tdEl.location = { row: r, col: c };
      tdEl.player = null;
      allCells.push(tdEl);
      tdEl.setAttribute('id', getCellID(r, c));
      tdEl.addEventListener('click', handleCellClick);
      trEl.appendChild(tdEl);
    }
    grid.appendChild(trEl);
  }
}

function nextPlayer() {
  if (currentPlayer === 0) {
    currentPlayer = 1;
  } else if (currentPlayer === 1) {
    currentPlayer = 0;
  }
}

function getCellID(r, c) {
  return 'row_' + r + '_cell_' + c;
}

function getCell(r, c) {
  return document.getElementById(getCellID(r, c));
}

function checkForWin(cellEl) {
  var sourceLocation = cellEl.location;
  var sourcePlayer = cellEl.player;

  // cellEl.classList.add('explainSource');

  for (var l = 0; l < lines.length; l++) {
    var currentLine = lines[l];
    var validCount = 1;
    for (var directionNum = 0; directionNum < currentLine.length; directionNum++) {
      var currentDirection = currentLine[directionNum];
      for (var distance = 1; distance < numRows; distance++) {
        var locationToCheck = {
          row: sourceLocation.row + (currentDirection.row * distance),
          col: sourceLocation.col + (currentDirection.col * distance),
        };

        var elToCheck = getCell(locationToCheck.row, locationToCheck.col);

        if (elToCheck !== null) {
          //elToCheck.classList.add('explainCheck');
        
          if (elToCheck.player === sourcePlayer) {
            validCount += 1;
          }

          //elToCheck.classList.remove('explainCheck');

          //elToCheck.classList.add('explainScanned');
        }
      }
    }

    // finished going in that line in both directions for the distance we needed
    if (validCount >= maxInARow){
      return true;
    }
  }

  // cellEl.classList.remove('explainSource');

  // for (var i = 0; i < allCells.length; ++i) {
  //   allCells[i].classList.remove('explainScanned');
  //   allCells[i].classList.remove('explainCheck');
  // }
  return false;
}

function handleCellClick(event) {
  var cellEl = event.target;

  if (cellEl.player !== null) {
    return;
  }
  cellEl.player = currentPlayer;
  cellEl.classList.add('cellPlayer_' + currentPlayer);

  if (checkForWin(cellEl)){
    alert('roar ' + (currentPlayer + 1) + ' won');
  }
  nextPlayer();
}

initBoard();
