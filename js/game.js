'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPER_FOOD = '*'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gIntervalCherry


function onInit() {
    //console.log('hello')

    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    gGame.isOn = true
    gGame.score = 0
    document.querySelector('.score').innerText = gGame.score
    gFoodCount = 60
    gIntervalCherry = setInterval(() => addCherry(gBoard), 15000);
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = SUPER_FOOD
    board[1][8] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    board[8][8] = SUPER_FOOD

    return board
}



function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


function updateScore(diff) {
    // DONE: update model and dom

    // update model
    gGame.score += diff
    // update dom
    document.querySelector('.score').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    // TODO
    const elModal = document.querySelector('.modal');
    elModal.classList.remove('hide');
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
};

function playAgain() {
    const elModal = document.querySelector('.modal');
    elModal.classList.add('hide');
    onInit();
}

function getSpanHTML(title) {
    return `<span>${title}</span>`
};

function getEmptyCell(board) {
    const emptyPoses = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyPoses.push({ i, j })
            }
        }
    }
    if(emptyPoses.length === 0)return null;
    return emptyPoses[getRandomIntInclusive(0,emptyPoses.length-1)]
}

function addCherry(board){
    var emptyCell = getEmptyCell(board)
    if(!emptyCell)return
    //model
    board[emptyCell.i][emptyCell.j] = CHERRY;
    //dom
    renderCell(emptyCell,CHERRY);
}
