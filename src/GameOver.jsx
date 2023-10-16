import { useAtom } from "jotai";
import { gameStateAtom } from './atoms/atoms'
import stopWatch from "./utils/stopwatch";

function GameOver({ timer, setTimer, highScore, setHighScore }) {
    const [gameState, setGameState] = useAtom(gameStateAtom)
    const { player1, player2, currentPlayer } = gameState;
    
    const timeString = stopWatch(timer[1], timer[0]);
    const timeInt = parseFloat(timeString);
    
    function handleRestart() {
        if (highScore.time === null || timeInt < highScore.time) {
            setHighScore({time: timeInt, player: currentPlayer})
        }

        setTimer([])
        setGameState({
            ...gameState,
            restartGame: true,
            isLoaded: false,
            gameOver: false,
            isGameStarted: false,
            currentPlayer: currentPlayer === player1 ? player2 : player1
        })
    }   

    return (
        <>
            <h1 className="playerGametime">{currentPlayer}: {timeString} seconds</h1>
            <button className='restartButton' onClick={handleRestart}>Restart</button>
        </>
    )
}

export default GameOver