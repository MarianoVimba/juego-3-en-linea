export const Square = ({children,isSelected,updateBoard,index}) =>{ //cuadrado del tablero
  const className = `square ${isSelected ? 'is-selected' : "" }`
 
 const handleClick = () =>{
  updateBoard(index);
 }

  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}