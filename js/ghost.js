'use strict'
const GHOST = '👻'
var gGhosts = []
var gDeadGhosts = []
var gIntervalGhosts

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000)

}

function removeGhost(location) {
    var idx =-1
    for (var i = 0; i < gGhosts.length; i++) {
        const currGhost = gGhosts[i];
        if (currGhost.location.i === location.i &&
            currGhost.location.j === location.j){
            idx = i
            break
        }
    }
    
    if(idx === -1)return
   var removedGhosts= gGhosts.splice(idx,1);
   var removedGhost = removedGhosts[0];
   gDeadGhosts.push(removedGhost);
   if(removedGhost.currCellContent === FOOD){
    gFoodCount--
    updateScore(1)
   }
    
}

function renderGhosts(){
    for(var i =0;i<gGhosts.length;i++){
        const currGhost = gGhosts[i]
        renderCell(currGhost.location,getGhostHTML(currGhost));
    }
}

function reviveGhost(){
    gGhosts.push(...gDeadGhosts)
    gDeadGhosts=[];
}

function createGhost(board) {
    // DONE
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        icon: GHOST
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
    // console.log('')
}

function moveGhost(ghost) {
    // DONE: figure out moveDiff, nextLocation, nextCell
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    if (nextCell === PACMAN && gPacman.isSuper) return
    // DONE: hitting a pacman? call gameOver
    if (nextCell === PACMAN && !gPacman.isSuper) {
        const elh2 = document.querySelector('.title')
        elh2.innerText = 'Game Over you lose..😒'
        gameOver()
        return
    }

    // DONE: moving from current location:
    // DONE: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // DONE: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // DONE: Move the ghost to new location:
    // DONE: update the model (save cell contents)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(nextLocation, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    const icon = (gPacman.isSuper) ? '🧟' : ghost.icon
    return `<span>${icon}</span>`
}


