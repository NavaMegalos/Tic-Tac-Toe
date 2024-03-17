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
let counterBoard = 9
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
    counterBoard = 9
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
        if (
            squares[combination[0]].classList.contains('x_clicked') &&
            squares[combination[1]].classList.contains('x_clicked') &&
            squares[combination[2]].classList.contains('x_clicked')) {
            winner = true
            winnerCombination = combination
            winnerSymbol = turns[0]
            return
        }
        else if (
            squares[combination[0]].classList.contains('o_clicked') &&
            squares[combination[1]].classList.contains('o_clicked') &&
            squares[combination[2]].classList.contains('o_clicked')) {
            winner = true
            winnerCombination = combination
            winnerSymbol = turns[1]
            return
        }
    })
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
    for(let i = 0; i < squares.length; i++) {
        if(!squares[i].classList.contains('clicked')) {
            return squares[i]
        }
    }
}


const CPUMakeMove = () => {
    if(counterBoard == 1) {
        counterBoard--
        onClickCell(getTheLastSquare())
        checkWinner()
        if(boardIsFull() && !winner) {
            alert('Draw')
        }
        return
    }
    let randomNumber = Math.floor(Math.random() * 8)
    while (squares[randomNumber].classList.contains('clicked')) {
        randomNumber = Math.floor(Math.random() * 8)
    }
    onClickCell(squares[randomNumber])
    checkWinner()
}

const hideMenu = () => { selection[0].style.display = "none" }

const displayBoard = () => { playing[0].style.display = "block" }


const checkEmptySquare = (square) => {
    return !square.classList.contains('clicked')
}

const addContentSquare = (square) => {
    square.className = "cell"
    square.classList.add('clicked')
    if (turn === turns[0]) {
        square.classList.add('x_clicked')
    } else if(turn === turns[1]){
        square.classList.add('o_clicked')
    }
}

const boardIsFull = () => {
    for(let i = 0; i < squares.length; i++) {
        if(!squares[i].classList.contains('clicked')) {
            return false
        }
    }

    return true
}

const onClickCell = ( square ) => {

    if(winner || boardIsFull()) return
    if (checkEmptySquare(square) && !winner && !boardIsFull()) {
        counterBoard--
        addContentSquare(square)
        turn = changeTurn()
        showTurn()
        checkWinner()
        if(boardIsFull() && !winner) {
            alert('Draw')
        }
        if(winner && winnerCombination.length == 3)
            showWinnerCombinationColors(winnerCombination, winnerSymbol)
        playerTurn = getPlayerSelection()
        if (gameVersus === "CPU" && turn !== playerTurn && !winner && !boardIsFull()) {
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