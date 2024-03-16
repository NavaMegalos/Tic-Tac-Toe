let winner = false
let turn = 'X'
const squares = document.getElementsByClassName('cell')
const imgTurn = document.getElementById('turn')
const selection = document.getElementsByClassName("game__selection")
const playing = document.getElementsByClassName("game__playing")
const playerOptions = document.getElementsByName('selected')
let imgContainer = document.createElement('img')
let playerTurn = ""
let gameVersus = ""
let winnerSymbol = ""
let winnerCombination = []

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

const resetGame = () => {
    turn = 'X'
    showTurn()
    winner = false
    resetTheSquares()
    if (gameVersus === "CPU") startGameVsCpu()
}

const showWinnerCombinationColors = ( combination, winnerTurn ) => {
    
    if(winnerTurn === turns[0]) {
        squares[combination[0]].classList.add('winner-cell-x')

        squares[combination[1]].classList.add('winner-cell-x')

        squares[combination[2]].classList.add('winner-cell-x')
    }
    if(winnerTurn === turns[1]) {
        squares[combination[0]].classList.add('winner-cell-o')
        squares[combination[1]].classList.add('winner-cell-o')
        squares[combination[2]].classList.add('winner-cell-o')
    }

}

const checkWinner = () => {
    winnerCombinations.forEach(combination => {
        console.log()
        if (
            squares[combination[0]].classList.contains('x_clicked') &&
            squares[combination[1]].classList.contains('x_clicked') &&
            squares[combination[2]].classList.contains('x_clicked')) {
            alert("X")
            winner = true
            winnerCombination = combination
            winnerSymbol = turns[0]
            return
        }
        else if (
            squares[combination[0]].classList.contains('o_clicked') &&
            squares[combination[1]].classList.contains('o_clicked') &&
            squares[combination[2]].classList.contains('o_clicked')) {
            alert("O")
            winner = true
            winnerCombination = combination
            winnerSymbol = turns[1]
            return
        }
    })

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

const CPUMakeMove = () => {
    let randomNumber = Math.floor(Math.random() * 8)
    while (onClickCell(squares[randomNumber]) === 0) {
        randomNumber = Math.floor(Math.random() * 8)
    }
    checkWinner()
}

const hideMenu = () => { selection[0].style.display = "none" }

const displayBoard = () => { playing[0].style.display = "block" }


const checkEmptySquare = (square) => {
    return !square.classList.contains('clicked')
}

const addContentSquare = (square) => {
    // square.textContent = turn
    square.className = "cell"
    square.classList.add('clicked')
    if (turn === turns[0]) {
        square.classList.add('x_clicked')
    } else if(turn === turns[1]){
        square.classList.add('o_clicked')
    }
}

const onClickCell = ( square ) => {

    if (checkEmptySquare(square) && !winner) {
        addContentSquare(square)
        turn = changeTurn()
        showTurn()
        checkWinner()
        if(winner === true && winnerCombination.length == 3)
            showWinnerCombinationColors(winnerCombination, winnerSymbol)
        playerTurn = getPlayerSelection()
        if (gameVersus === "CPU" && turn !== playerTurn && !winner) {
            CPUMakeMove()
            if(winner && winnerCombination.length == 3)
                showWinnerCombinationColors(winnerCombination, winnerSymbol)
        }
        return 1
    }
    return 0
}

const startGameVsCpu = () => {
    hideMenu()
    displayBoard()
    gameVersus = "CPU"
    playerTurn = getPlayerSelection()
    if (turn !== playerTurn) {
        CPUMakeMove()
    }
}

const startGameVsPlayer = () => {
    hideMenu()
    displayBoard()
    gameVersus = "PLAYER"
}

resetTheSquares()
showTurn()