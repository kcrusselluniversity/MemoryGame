import stopWatch from "./utils/stopwatch";

function GameOver({ gameState, setGameState, timer, setTimer, highScore, setHighScore }) {
    const { player1, player2, currentPlayer } = gameState;
    
    const time = stopWatch(timer[1], timer[0]);
    
    function handleRestart() {
        if (highScore.time === null || time < highScore.time) {
            setHighScore({time: time, player: currentPlayer})
        }

        setTimer([])
        setGameState({
            ...gameState,
            restartGame: true,
            gameOver: false,
            isGameStarted: false,
            currentPlayer: currentPlayer === player1 ? player2 : player1
        })
    }   

    return (
        <>
            <h1 className="playerGametime">{currentPlayer}: {time} seconds</h1>
            <button className='restartButton' onClick={handleRestart}>Restart</button>
        </>
    )
}

export default GameOver