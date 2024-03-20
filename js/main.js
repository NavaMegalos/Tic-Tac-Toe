const squares = document.querySelectorAll('.cell')
const imgTurn = document.querySelector('#turn')
const selection = document.querySelectorAll('.game__selection')
const playing = document.querySelectorAll(".game__playing")
const playerOptions = document.querySelectorAll('[name="selected"]')
const gameModalDescription = document.querySelectorAll('.game__modal-description')
const gameModalImgWinner = document.querySelectorAll('.game__modal-winner-img')
const gameModalWinner = document.querySelectorAll('.game__modal-winner')
const gameModal = document.getElementById('modal');
const resetModal = document.getElementById('reset_modal');
const gameModalWhiteBtn = document.getElementById('modal-white-btn')
const gameModalYellowBtn = document.getElementById('modal-yellow-btn')
const xTitle = document.getElementById('x_title')
const oTitle = document.getElementById('o_title')
const qtyX = document.getElementById('qty_x')
const qtyO = document.getElementById('qty_o')
const qtyTies = document.getElementById('qty_ties')

let winner = false
let turn = "X"
let playerTurn = ""
let gameVersus = ""
let winnerSymbol = ""
let counterBoard = 9
let winnerCombination = []
let points = { ties: 0, x: 0, o: 0 }

const turns = ["X", "O"];

const winnerCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [0, 4, 8], [2, 4, 6],
    [1, 4, 7], [2, 5, 8],
]

const showTurn = () => {
    const imgSrc = `./assets/icon-${turn.toLowerCase()}.svg`
    imgTurn.setAttribute("src", imgSrc)
}

const changeTurn = () => {
    turn = (turn === turns[0]) ? turns[1] : turns[0]
}

const resetTheSquares = () => {
    squares.forEach(square => square.className = 'cell')
}

const resetQty = () => {
    qtyX.innerText = qtyO.innerText = qtyTies.innerText = 0
    points.x = points.o = points.ties = 0
}

const resetGame = () => {
    turn = 'X'
    qtyO.innerText = points.o
    qtyX.innerText = points.x
    qtyTies.innerText = points.ties
    showTurn()
    winner = false
    counterBoard = 9
    resetTheSquares()
    hideResetModal()
    if (gameVersus === "CPU") startGameVsCpu()
}

const showWinnerCombinationColors = (combination, winnerTurn) => {
    const [a, b, c] = combination;
    const squareA = squares[a], squareB = squares[b], squareC = squares[c];

    squareA.classList.add(`winner-cell-${winnerTurn.toLowerCase()}`)
    squareB.classList.add(`winner-cell-${winnerTurn.toLowerCase()}`)
    squareC.classList.add(`winner-cell-${winnerTurn.toLowerCase()}`)

}

const checkWinner = () => {
    for (const combination of winnerCombinations) {
        const [a, b, c] = combination;
        const squareA = squares[a], squareB = squares[b], squareC = squares[c];

        if (squareA.classList.contains('x_clicked') &&
            squareB.classList.contains('x_clicked') &&
            squareC.classList.contains('x_clicked')) {
            points.x++;
            winner = true;
            winnerCombination = combination;
            winnerSymbol = turns[0];
            displayModal("X");
            return;
        } else if (squareA.classList.contains('o_clicked') &&
            squareB.classList.contains('o_clicked') &&
            squareC.classList.contains('o_clicked')) {
            points.o++;
            winner = true;
            winnerCombination = combination;
            winnerSymbol = turns[1];
            displayModal("O");
            return;
        }
    }

    if (boardIsFull() && !winner) {
        points.ties++;
        displayModal(null);
    }
}

const onHoverSquare = (square) => {
    if (!square.classList.contains("clicked") && !winner) {
            square.classList.toggle(`${turn.toLowerCase()}_hover`)
    }
}

const getPlayerSelection = () => {
    let option
    playerOptions.forEach(opt => {
        if (opt.checked)
            option = opt.value

    })
    return option
}

const getTheLastSquare = () => {
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i].classList.contains('clicked')) {
            console.log(squares[i])
            return squares[i]
        }
    }
}


const CPUMakeMove = () => {
    if (counterBoard == 1) {
        counterBoard--
        onClickCell(getTheLastSquare())
        return
    }
    let randomNumber = Math.floor(Math.random() * 8)
    while (squares[randomNumber].classList.contains('clicked')) {
        randomNumber = Math.floor(Math.random() * 8)
    }
    onClickCell(squares[randomNumber])
}

const hideMenu = () => { selection[0].style.display = "none" }

const hideBoard = () => { playing[0].style.display = "none" }

const hideModal = () => { gameModal.style.display = "none" }

const hideResetModal = () => { resetModal.style.display = "none" }

const displayMenu = () => { selection[0].style.display = "flex" }

const displayBoard = () => { playing[0].style.display = "block" }

const displayResetModal = () => { resetModal.style.display = "flex" }

const displayModal = (winnerSymbol) => {
    let winnerData = {}
    if (winnerSymbol == null) {
        gameModalDescription[0].style.display = "none"
        gameModalImgWinner[0].style.display = "none"
        gameModalWinner[0].innerText = "ROUND TIED"
        gameModalWinner[0].style.color = "hsl(198, 23%, 72%)"
        gameModal.style.display = "flex"
        return
    }

    if (winnerSymbol) {
        winnerData.takes = "TAKES THE ROUND"
        if (getPlayerSelection() != winnerSymbol) {
            if (gameVersus == "PLAYER") {
                winnerData.description = "PLAYER 2 WINS!"
            }
            else {
                winnerData.description = "OH NO, YOU LOST..."
            }
        } else {
            if (gameVersus == "PLAYER") {
                winnerData.description = "PLAYER 1 WINS!"
            } else {
                winnerData.description = "YOU WON!"
            }
        }
        winnerData.img = `./assets/icon-${winnerSymbol.toLowerCase()}.svg`

        if (winnerSymbol == "X") {
            winnerData.letterColor = "178, 60%, 48%"
        }
        if (winnerSymbol == "O") {
            winnerData.letterColor = "39, 100%, 69%"
        }
    }

    gameModalDescription[0].style.display = "block"
    gameModalImgWinner[0].style.display = "block"
    gameModalDescription[0].innerHTML = winnerData.description
    gameModalImgWinner[0].src = winnerData.img
    gameModalWinner[0].innerHTML = winnerData.takes
    gameModalWinner[0].style.color = `hsl(${winnerData.letterColor})`
    gameModal.style.display = "flex"
}

const checkEmptySquare = (square) => {
    return !square.classList.contains('clicked')
}

const addContentSquare = (square) => {
    square.className = "cell"
    square.classList.add('clicked')
    square.classList.add(`${turn.toLowerCase()}_clicked`)
}

const boardIsFull = () => {
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i].classList.contains('clicked')) {
            return false
        }
    }

    return true
}

const onClickCell = (square) => {
    if (winner || boardIsFull()) return
    if (checkEmptySquare(square) && !winner && !boardIsFull()) {
        counterBoard--
        addContentSquare(square)
        changeTurn()
        showTurn()
        checkWinner()
        if (winner && winnerCombination.length == 3)
            showWinnerCombinationColors(winnerCombination, winnerSymbol)
        playerTurn = getPlayerSelection()
        if (gameVersus === "CPU" && turn !== playerTurn && !winner && !boardIsFull()) {
            CPUMakeMove()
            if (winner && winnerCombination.length == 3)
                showWinnerCombinationColors(winnerCombination, winnerSymbol)
        }
        return 1
    }
    return 0
}

const setTitlesPoints = (player1, player2) => {
    if (getPlayerSelection() === turns[0]) {
        xTitle.innerText = `X (${player1})`
        oTitle.innerText = `O (${player2})`
    }
    else if (getPlayerSelection() === turns[1]) {
        xTitle.innerText = `X (${player2})`
        oTitle.innerText = `O (${player1})`
    }
}

const startGameVsCpu = () => {
    if (counterBoard < 8) {
        resetGame()
    }
    hideMenu()
    displayBoard()
    gameVersus = "CPU"
    playerTurn = getPlayerSelection()
    if (turn !== playerTurn) {
        CPUMakeMove()
    }
    setTitlesPoints("YOU", "CPU")
}

const startGameVsPlayer = () => {
    if (counterBoard < 9) {
        resetGame()
    }
    hideMenu()
    displayBoard()
    gameVersus = "PLAYER"
    setTitlesPoints("P1", "P2")
}

const nextRound = () => {
    hideModal()
    resetGame()
}

const quit = () => {
    gameVersus = ""
    hideModal()
    resetQty()
    hideBoard()
    displayMenu()
}

resetTheSquares()
showTurn()