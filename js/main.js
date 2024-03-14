let winner = false
let turn = 'X'
const squares = document.getElementsByClassName('cell')
const imgTurn = document.getElementById('turn')
const selection = document.getElementsByClassName("game__selection")
const playing = document.getElementsByClassName("game__playing")
const playerOptions = document.getElementsByName('selected')
let playerTurn = ""
let gameVersus = ""

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

//I HAVE TO RESET TO EMPTY VALUE THE CELLS FOR BEING ABLE TO DO THE HOVER TRICK OF EACH TURN
//(ALSO, I AM NOT SURE THAT I HAVE TO DO THIS BUT I AM SO LAZY FOR SEARCH FOR AN OPTIMAL SOLUTION AT THE MOMENT)
// for (let i = 0; i < iws.length; i++) {
//     squares[i].textContent = ''
// }

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
        squares[i].textContent = ''
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

const checkWinner = () => {
    winnerCombinations.forEach(combination => {
        if (
            squares[combination[0]].textContent == turns[0] &&
            squares[combination[1]].textContent == turns[0] &&
            squares[combination[2]].textContent == turns[0]) {
            alert("X")
            winner = true
            return
        }
        else if (
            squares[combination[0]].textContent == turns[1] &&
            squares[combination[1]].textContent == turns[1] &&
            squares[combination[2]].textContent == turns[1]) {
            alert("O")
            winner = true
            return
        }
    })

}


const onHoverSquare = (square) => {
    if (!square.textContent && square.className !== "clicked" && !winner) {
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
    return (square.textContent != turns[0] && square.textContent != turns[1])
}

const addContentSquare = (square) => {
    square.textContent = turn
    square.className = "cell"
    square.classList.add('clicked')
    if (square.textContent === turns[0]) {
        square.classList.add('x_clicked')
    } else {
        square.classList.add('o_clicked')
    }
}

const onClickCell = ( square ) => {
    if (winner == true) return
    if (checkEmptySquare(square) && !winner) {
        addContentSquare(square)
        turn = changeTurn()
        showTurn()
        checkWinner()
        playerTurn = getPlayerSelection()
        if (gameVersus === "CPU" && turn !== playerTurn && !winner) {
            CPUMakeMove()
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