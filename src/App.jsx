import Gameboard from './Gameboard'
import PlayersForm from './PlayersForm'
import GameOver from './GameOver'
import './App.css'
import { useState } from 'react'

function App() {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [playersEntered, setPlayersEntered] = useState(false);
  const [gameOver, setGameOver] = useState(false)
  const [restartGame, setRestartGame] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [timer, setTimer] = useState([]);
  
  let page = null;
  if (playersEntered === false) {
    page = <PlayersForm 
    setPlayer1={setPlayer1}
    setPlayer2={setPlayer2}
    setPlayersEntered={setPlayersEntered}
    setCurrentPlayer={setCurrentPlayer}/>
  } else if (gameOver === false || restartGame === true) {
    page = <Gameboard 
      player1={player1} player2={player2} 
      timer={timer} setTimer={setTimer} 
      setGameOver={setGameOver} 
      currentPlayer={currentPlayer}/>
  } else if (gameOver === true) {
    page = <GameOver 
      timer={timer} setRestartGame={setRestartGame}
      player1={player1} player2={player2}
      currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}/>
  }

  return (
    <>
      <h1>Memory Game</h1>
      {page}
    </>
  )
}

export default App