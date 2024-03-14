let winner = false
let turn = 'X'
const cells = document.getElementsByClassName('cell')
const imgTurn = document.getElementById('turn')
const selection = document.getElementsByClassName("game__selection")
const playing = document.getElementsByClassName("game__playing")
const playerOptions = document.getElementsByName('selected')
let playerTurn = ""
let gameVersus = false

const turns = [
    "X", "O"
];

const winnerCombinations = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 0, 4, 8 ],
    [ 2, 4, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
]

//I HAVE TO RESET TO EMPTY VALUE THE CELLS FOR BEING ABLE TO DO THE HOVER TRICK OF EACH TURN
//(ALSO, I AM NOT SURE THAT I HAVE TO DO THIS BUT I AM SO LAZY FOR SEARCH FOR AN OPTIMAL SOLUTION AT THE MOMENT)
for(let i = 0; i < cells.length; i ++) {
    cells[i].textContent = ''
}

const showTurn = () => {
    if(turn === turns[0]) {
        imgTurn.setAttribute("src", "../assets/icon-x.svg")
    }
    else if(turn === turns[1]) {
        imgTurn.setAttribute("src", "../assets/icon-o.svg")
    }

}


const changeTurn = () => {
    turn == turns[0] ?
        turn = turns[1] :
            turn = turns[0]

    return turn
}

const resetGame = () => {
    for(let i = 0; i < cells.length; i ++) {
        cells[i].textContent = ''
        cells[i].className = "cell"
    }
    turn = 'X'
    showTurn()
    winner = false
    if(gameVersus === "CPU") startGameVsCpu()
}

const checkWinner = () => {
    winnerCombinations.forEach( combination => {
        let xCounts = 0
        let oCounts = 0
        combination.forEach( c => {
            if(cells[c].textContent) {
                if(cells[c].textContent == turns[0]) xCounts++
                if(cells[c].textContent == turns[1]) oCounts++
            }
        })

        if(xCounts == 3) {
            alert("X Winner") 
            winner = true
            return 
        }

        if(oCounts == 3) {
            alert("O Winner")
            winner = true
            return
        }
    })

}


const shadowTurn = ( square ) => {
    if(!square.textContent && square.className !== "clicked" && !winner) {
        if(turn === turns[0])
            square.classList.toggle('x_hover')
        if(turn === turns[1])
            square.classList.toggle('o_hover')

    }
}

const getPlayerSelection = () => {
    let option
    playerOptions.forEach( opt => {
        if( opt.checked )
            option = opt.value

    })
    return  option
}

const CPUMove = () => {
    let randomNumber = Math.floor(Math.random()*10)
    while(onClickCell( cells[randomNumber]) === 0 ) {
        randomNumber = Math.floor(Math.random()*10)
    }

}

const startGameVsCpu = () => {
    selection[0].style.display = "none"
    playing[0].style.display = "block"
    gameVersus = "CPU"
    playerTurn = getPlayerSelection()
    if(turn !== playerTurn) {
        let randomNumber = Math.floor(Math.random() * 8)
        console.log(randomNumber)
        while(onClickCell(cells[randomNumber]) === 0) {
            randomNumber = Math.floor(Math.random() * 8)
        }
    }
}

const startGameVsPlayer = () => {
    selection[0].style.display = "none"
    playing[0].style.display = "block"
}

const onClickCell = ( square ) => {
    if (square.textContent != turns[0] && square.textContent != turns[1] && !winner) {
        square.textContent = turn
        turn = changeTurn()
        showTurn()
        square.className = "cell"
        square.classList.add('clicked')
        if(square.textContent === turns[0]) {
            square.classList.add('x_clicked')
        } else{
            square.classList.add('o_clicked')
        }
        checkWinner()
        playerTurn = getPlayerSelection()
        if(gameVersus === "CPU" && turn !== playerTurn && !winner) {
            let randomNumber = Math.floor(Math.random() * 8)
            while(onClickCell(cells[randomNumber]) === 0) {
                randomNumber = Math.floor(Math.random() * 8)
            }
            checkWinner()
        }
        return 1
    }

    return 0
}

showTurn()