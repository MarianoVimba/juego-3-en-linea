import { useState } from 'react'
import './App.css'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkEndGame, checkWinner } from './logic/board'
import { Winner } from './components/Winner'
import { jsx } from 'react/jsx-runtime'


function App() {
  const [board,setBoard] = useState(() =>{
      const boardFromStorage = window.localStorage.getItem('board')
      if(boardFromStorage) return JSON.parse(boardFromStorage)
      return Array(9).fill(null)
    })
      
  const [turn,setTurn] = useState(() =>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.x//si es null retorno el turno de la x
  })

  const [winner,setWinner] = useState(null) //no hay ganador
  
  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
  
  const updateBoard = (index) =>{

    if(board[index] || winner) return //si tiene datos q salga

    //actualizo el juego
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    //actualizo turnos
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x 
    setTurn(newTurn)
    //guardo partida
    window.localStorage.setItem('board',JSON.stringify(newBoard))
    window.localStorage.setItem('turn',JSON.stringify(newTurn))

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }
  return(
    <main className='board'>
      <h1>3 en linea</h1>
        <button onClick={resetGame}>Empezar de Nuevo</button>
        <section className='game'>
          {
            board.map((square,index)=>{
              return(
                <Square
                  key = {index}
                  index = {index}
                  updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
              )
            })
          }
        </section>
        <section className='turn'>
          <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
          <Square isSelected={turn ===TURNS.o}>{TURNS.o}</Square>
        </section>
      
          <Winner resetGame={resetGame} winner={winner}/>
      </main>
  )
}

export default App
