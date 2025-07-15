import { WINNER_COMBOS } from "../constants"
import confetti from "canvas-confetti"

export  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] ===boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        //ganador
        confetti()
        return boardToCheck[a]
      }
      
    }
    return null
  }

export const checkEndGame = (newBoard) =>{
    //se fija si todas las posiciones fueron ocupadas
    return newBoard.every((Square) => Square !== null)//si todo esta ocupado true
  }