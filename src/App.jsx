import Gameboard from './Gameboard'
import PlayersForm from './PlayersForm'
import GameOver from './GameOver'
import './App.css'
import { useState } from 'react'

export const EASY_MODE = 4;
export const MEDIUM_MODE = 6;
export const HARD_MODE = 12;

function App() {

  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [playersEntered, setPlayersEntered] = useState(false);
  const [gameOver, setGameOver] = useState(false)
  const [restartGame, setRestartGame] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [timer, setTimer] = useState([]);
  const [mode, setMode] = useState(EASY_MODE)
  const [highScore, setHighScore] = useState({time: null, player: null})
  
  let page = null;
  if (playersEntered === false) {
    
    page = <PlayersForm 
      setPlayer1={setPlayer1}
      setPlayer2={setPlayer2}
      setPlayersEntered={setPlayersEntered}
      setCurrentPlayer={setCurrentPlayer}
      setMode={setMode}/>
  } else if (gameOver === true) {

    page = <GameOver 
      timer={timer} setRestartGame={setRestartGame}
      player1={player1} player2={player2}
      currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer}
      setGameOver={setGameOver} setTimer={setTimer} 
      highScore={highScore} setHighScore={setHighScore}/>
    
  } else if (gameOver === false || restartGame === true) {

    page = <Gameboard 
      player1={player1} player2={player2} 
      timer={timer} setTimer={setTimer} 
      setGameOver={setGameOver} 
      currentPlayer={currentPlayer}
      mode={mode} 
      highScore={highScore}/>
  }
  return (
    <>
      <h1>Memory Game</h1>
      {page}
    </>
  )
}

export default App