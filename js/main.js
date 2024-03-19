const squares = document.getElementsByClassName('cell')
const imgTurn = document.getElementById('turn')
const selection = document.getElementsByClassName("game__selection")
const playing = document.getElementsByClassName("game__playing")
const playerOptions = document.getElementsByName('selected')
const gameModal = document.getElementById('modal');
const resetModal = document.getElementById('reset_modal');
const gameModalDescription = document.getElementsByClassName('game__modal-description')
const gameModalImgWinner = document.getElementsByClassName('game__modal-winner-img')
const gameModalWinner = document.getElementsByClassName('game__modal-winner')
const gameModalWhiteBtn = document.getElementById('modal-white-btn')
const gameModalYellowBtn = document.getElementById('modal-yellow-btn')
const xTitle = document.getElementById('x_title')
const oTitle = document.getElementById('o_title')
const qtyX = document.getElementById('qty_x')
const qtyO = document.getElementById('qty_o')
const qtyTies = document.getElementById('qty_ties')
let winner = false
let turn = 'X'
let playerTurn = ""
let gameVersus = ""
let winnerSymbol = ""
let counterBoard = 9
let winnerCombination = []
let points = {
    ties: 0,
    x: 0,
    o: 0
}

const turns = [
    "X", "O"
];

const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [2, 5, 8],
]

const showTurn = () => {
    if (turn === turns[0]) {
        imgTurn.setAttribute("src", "../assets/icon-x.svg")
    }
    else if (turn === turns[1]) {
        imgTurn.setAttribute("src", "../assets/icon-o.svg")
    }

}


const changeTurn = () => {
    return turn == turns[0] ?
        turn = turns[1] :
        turn = turns[0]

}

const resetTheSquares = () => {
    for (let i = 0; i < squares.length; i++) {
        squares[i].className = "cell"
    }

}

const resetQty = () => {
    qtyX.innerText = 0
    qtyO.innerText = 0
    qtyTies.innerText = 0
    points.x = 0
    points.o = 0
    points.ties = 0
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

    if (winnerTurn === turns[0]) {
        squares[combination[0]].classList.add('winner-cell-x')
        squares[combination[1]].classList.add('winner-cell-x')
        squares[combination[2]].classList.add('winner-cell-x')
    }
    if (winnerTurn === turns[1]) {
        squares[combination[0]].classList.add('winner-cell-o')
        squares[combination[1]].classList.add('winner-cell-o')
        squares[combination[2]].classList.add('winner-cell-o')
    }

}

const checkWinner = () => {
    winnerCombinations.forEach(combination => {
        if (
            squares[combination[0]].classList.contains('x_clicked') &&
            squares[combination[1]].classList.contains('x_clicked') &&
            squares[combination[2]].classList.contains('x_clicked')) {
            points.x++
            winner = true
            winnerCombination = combination
            winnerSymbol = turns[0]
            displayModal("X")
            return
        }
        else if (
            squares[combination[0]].classList.contains('o_clicked') &&
            squares[combination[1]].classList.contains('o_clicked') &&
            squares[combination[2]].classList.contains('o_clicked')) {
            points.o++
            winner = true
            winnerCombination = combination
            winnerSymbol = turns[1]
            displayModal("O")
            return
        }
    })
    if (boardIsFull() && !winner) {
        points.ties++
        displayModal(null)
        return
    }
    return

}

const onHoverSquare = (square) => {
    if (!square.classList.contains("clicked") && !winner) {
        if (turn === turns[0])
            square.classList.toggle('x_hover')
        if (turn === turns[1])
            square.classList.toggle('o_hover')
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
    if(winnerSymbol == null) {
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
            if(gameVersus == "PLAYER") {
                winnerData.description = "PLAYER 2 WINS!"
            }
            else {
                winnerData.description = "OH NO, YOU LOST..."
            }
        } else {
            if(gameVersus == "PLAYER") {
                winnerData.description = "PLAYER 1 WINS!"
            } else {
                winnerData.description = "YOU WON!"
            }
        }

        if (winnerSymbol == "X") {
            winnerData.img = "../assets/icon-x.svg"
            winnerData.letterColor = "178, 60%, 48%"
        }
        if (winnerSymbol == "O") {
            winnerData.img = "../assets/icon-o.svg"
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
    if (turn === turns[0]) {
        square.classList.add('x_clicked')
    } else if (turn === turns[1]) {
        square.classList.add('o_clicked')
    }
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
        turn = changeTurn()
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
    if(counterBoard < 8) {
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
    if(counterBoard < 9) {
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