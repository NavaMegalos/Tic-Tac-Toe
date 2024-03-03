let winner = false
let turn = ''
const cells = document.getElementsByTagName('td')

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


const getTurn = () => {
    turn == turns[0] ?
        turn = turns[1] :
            turn = turns[0]

    return turn
}

const resetGame = () => {
    for(let i = 0; i < cells.length; i ++) {
        cells[i].textContent = ''
    }
    turn = ''
    winner = false
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
            winner = false
            return
        }
    })

}

const onClickCell = ( value ) => {
    if (!value.textContent && !winner) {
        value.textContent = getTurn()
        checkWinner()
        return
    }

    console.log("Invalid position")


}