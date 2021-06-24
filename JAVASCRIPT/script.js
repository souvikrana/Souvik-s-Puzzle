var moves = 0;
var table;
var rows = 4;
var columns = 4;
var textMoves;
var arrayForBoard;
var bleep = new Audio();
bleep.src = "audio.mp3";
var music = new Audio();
music.src = "bgm.mp3"
music.play()



function start() {
    var button = document.getElementById("newGame");
    button.addEventListener("click", startNewGame, false);
    textMoves = document.getElementById("moves");
    textMovesmed = document.getElementById("movesmed");
    tim = document.getElementById("timeShow");
    timmed = document.getElementById("timeShowmed");
    table = document.getElementById("table");
    rows = 4;
    columns = 4;
    startNewGame();
}

function startNewGame() {
    var arrayOfNumbers = new Array();
    var arrayHasNumberBeenUsed;
    var randomNumber = 0;
    var count = 0;
    moves = 0;
    showtime = 0;
    rows = 4;
    columns = 4;
    textMoves.innerHTML = moves;
    textMovesmed.innerHTML = moves;
    tim.innerHTML = showtime;
    timmed.innerHTML = showtime;
    arrayForBoard = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arrayForBoard[i] = new Array(columns);
    }
    arrayHasNumberBeenUsed = new Array(rows * columns);
    for (var i = 0; i < rows * columns; i++) {
        arrayHasNumberBeenUsed[i] = 0;
    }

    for (var i = 0; i < rows * columns; i++) {
        randomNumber = Math.floor(Math.random() * rows * columns);
        if (arrayHasNumberBeenUsed[randomNumber] == 0) {
            arrayHasNumberBeenUsed[randomNumber] = 1;
            arrayOfNumbers.push(randomNumber);
        }
        else
        {
            i--;
        }
    }

    count = 0;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            arrayForBoard[i][j] = arrayOfNumbers[count];

            count++;
        }
    }
    timeshow();
    showTable();
}

function showTable() {
    var outputString = "";
    for (var i = 0; i < rows; i++) {
        outputString += "<tr>";
        for (var j = 0; j < columns; j++) {
            if (arrayForBoard[i][j] == 0) {
                outputString += "<td class=\"blank\" > </td>";
            }
            else {
                outputString += "<td class=\"tile\" onclick=\"moveThisTile(" + i + ", " + j + ")\"onmousedown=\"bleep.play()\">" + arrayForBoard[i][j] + "</td>";
            }
        }
        outputString += "</tr>";
    }

    table.innerHTML = outputString;
}

function moveThisTile(tableRow, tableColumn) {
    if (checkIfMoveable(tableRow, tableColumn, "up") ||
        checkIfMoveable(tableRow, tableColumn, "down") ||
        checkIfMoveable(tableRow, tableColumn, "left") ||
        checkIfMoveable(tableRow, tableColumn, "right")) {
        incrementMoves();
    }


    if (checkIfWinner()) {
        alert("Congratulations! You solved the puzzle in " + moves + " moves.");
        startNewGame();
    }
}

function checkIfMoveable(rowCoordinate, columnCoordinate, direction) {

    rowOffset = 0;
    columnOffset = 0;
    if (direction == "up") {
        rowOffset = -1;
    }
    else if (direction == "down") {
        rowOffset = 1;
    }
    else if (direction == "left") {
        columnOffset = -1;
    }
    else if (direction == "right") {
        columnOffset = 1;
    }

    if (rowCoordinate + rowOffset >= 0 && columnCoordinate + columnOffset >= 0 &&
        rowCoordinate + rowOffset < rows && columnCoordinate + columnOffset < columns) {
        if (arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] == 0) {
            arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] = arrayForBoard[rowCoordinate][columnCoordinate];
            arrayForBoard[rowCoordinate][columnCoordinate] = 0;
            showTable();
            return true;
        }
    }
    return false;
}

function checkIfWinner() {
    var count = 1;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
            if (arrayForBoard[i][j] != count) {
                if (!(count === rows * columns && arrayForBoard[i][j] === 0)) {
                    return false;
                }
            }
            count++;
        }
    }

    return true;
}

function incrementMoves() {
    moves++;
    if (textMoves) {
        textMoves.innerHTML = moves;
        textMovesmed.innerHTML = moves;
        
        playAudio();
    }
    

}

function timeshow() {
    setInterval(timing, 1000);
}
function timing() {
    if (moves > 0) {

        showtime++;
        tim.innerHTML = showtime + 's';
        timmed.innerHTML = showtime + 's';

    }
}
var on = 0;
function musicnav() {

    if (on % 2 == 0) {

        music.pause();
        toggle = document.getElementById("musicbtn")
        toggle1 = document.getElementById("musicbtnmed")
        toggle.innerHTML = 'BGM On'
        toggle1.innerHTML = 'BGM On'
        on++;
    }
    else {
        music.play();
        toggle = document.getElementById("musicbtn")
        toggle2 = document.getElementById("musicbtnmed")
        toggle.innerHTML = 'BGM Off'
        toggle2.innerHTML = 'BGM Off'
        on++;
    }

}
var on1 = 0;
function musicnav2() {

    if (on1 % 2 == 0) {

        bleep.src = "";
        toggle = document.getElementById("musicbtn1")
        toggle.innerHTML = 'Click On'
        toggle1 = document.getElementById("musicbtn1med")
        toggle1.innerHTML = 'Click On'
        on1++;
    }
    else {
        bleep.src = "audio.mp3";
        toggle = document.getElementById("musicbtn1")
        toggle.innerHTML = 'Click Off'
        toggle1 = document.getElementById("musicbtn1med")
        toggle1.innerHTML = 'Click Off'
        on1++;
    }

}
alert('15 PUZZLE\r\nScroll down to see the rules and regulation')
window.addEventListener("load", start, false);
