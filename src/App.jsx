import GameboardPage from "./Gameboard_Page";
import PlayersForm from "./PlayersForm";
import GameOver from "./GameOver";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { gameStateAtom } from "./atoms/atoms";
import "./App.css";

function App() {
    const gameState = useAtomValue(gameStateAtom);
    const { playersEntered, gameOver, restartGame } = gameState;
    const [timer, setTimer] = useState([]);
    const [highScore, setHighScore] = useState({ time: null, player: null });

    let page = null;
    if (playersEntered === false) {
        page = <PlayersForm />;
    } else if (gameOver === true) {
        page = (
            <GameOver
                timerState={{ timer, setTimer }}
                highScoreState={{ highScore, setHighScore }}
            />
        );
    } else if (gameOver === false || restartGame === true) {
        page = (
            <GameboardPage
                timerState={{ timer, setTimer }}
                highScore={highScore}
            />
        );
    }
    return (
        <>
            <h1>Memory Game</h1>
            {page}
        </>
    );
}

export default App;
