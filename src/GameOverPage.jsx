import { useAtom } from "jotai";
import { gameStateAtom } from "./atoms/atoms";
import stopWatch from "./utils/stopwatch";

function GameOverPage({ timerState, highScoreState }) {
    const [gameState, setGameState] = useAtom(gameStateAtom);
    const { player1, player2, currentPlayer } = gameState;
    const { highScore, setHighScore } = highScoreState;
    const { timer, setTimer } = timerState;

    const timeString = stopWatch(timer[1], timer[0]);
    const timeInt = parseFloat(timeString);

    function handleRestart() {
        if (highScore.time === null || timeInt < highScore.time) {
            setHighScore({ time: timeInt, player: currentPlayer });
        }

        setTimer([]);
        setGameState({
            ...gameState,
            restartGame: true,
            isLoaded: false,
            gameOver: false,
            isGameStarted: false,
            currentPlayer: currentPlayer === player1 ? player2 : player1,
        });
    }

    return (
        <main className="gameOverPage">
            <h1>{currentPlayer}</h1>
            <h2>{timeString} seconds</h2>
            <button className="restartButton" onClick={handleRestart}>
                Restart
            </button>
        </main>
    );
}

export default GameOverPage;
