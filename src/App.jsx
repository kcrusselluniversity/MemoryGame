import GameboardPage from './Gameboard_Page'
import PlayersForm from './PlayersForm'
import GameOver from './GameOver'
import './App.css'
import { useState } from 'react'

export const EASY_MODE = 4;
export const MEDIUM_MODE = 6;
export const HARD_MODE = 9;

function App() {
  const [timer, setTimer] = useState([]);
  const [highScore, setHighScore] = useState({time: null, player: null})
  const [gameState, setGameState] = useState({
    mode: EASY_MODE,
    player1: null,
    player2: null,
    currentPlayer: null,
    playersEntered: false,
    isGameStarted: false,
    gameOver: false,
    restartGame: false,
  })

  const {playersEntered, gameOver, restartGame} = gameState;
  
  let page = null;
  if (playersEntered === false) {  
    page = <PlayersForm gameState={gameState} setGameState={setGameState}/>
  } else if (gameOver === true) {
    page = <GameOver
      gameState={gameState} 
      setGameState={setGameState} 
      timer={timer} 
      setTimer={setTimer} 
      highScore={highScore} 
      setHighScore={setHighScore}/> 
  } else if (gameOver === false || restartGame === true) {
    page = <GameboardPage 
      gameState={gameState} 
      setGameState={setGameState}
      timer={timer} 
      setTimer={setTimer} 
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