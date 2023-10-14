import stopWatch from "./utils/stopwatch";

export default function GameOver({ timer, setTimer, setRestartGame, player1, player2, currentPlayer, setCurrentPlayer, setGameOver, highScore, setHighScore }) {
    const time = stopWatch(timer[1], timer[0]);
    
    function handleRestart() {
        if (highScore.time === null || time < highScore.time) {
            setHighScore({time: time, player: currentPlayer})
        }
        setRestartGame(true)
        setTimer([])
        setGameOver(false)
        currentPlayer === player1 ? setCurrentPlayer(player2) : setCurrentPlayer(player1)
    }   

    return (
        <>
            <h1 className="playerGametime">{currentPlayer}: {time} seconds</h1>
            <button className='restartButton' onClick={handleRestart}>Restart</button>
        </>
    )
}