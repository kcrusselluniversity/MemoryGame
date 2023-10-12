import stopWatch from "./utils/stopwatch";

// TODO: NEED TO BE ABLE TO RESET SEEN POKEMON, OR FIGURE OUT A BETTER WAY TO HANDLE THE GAME LOGIC TO END THE GAME

export default function GameOver({ timer, setRestartGame, player1, player2, currentPlayer, setCurrentPlayer, setGameOver }) {
    function handleRestart() {
        setRestartGame(true)
        setGameOver(false)
        currentPlayer === player1 ? setCurrentPlayer(player2) : setCurrentPlayer(player1)
    }   

    return (
        <>
            <h1 style={{gridRowStart: 4}}>{stopWatch(timer[1], timer[0])}</h1>
            <button className='restartButton' onClick={handleRestart}>Restart</button>
        </>
    )
}