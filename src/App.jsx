import GameboardPage from "./Gameboard_Page";
import PlayersFormPage from "./PlayersForm_Page";
import GameOverPage from "./GameOverPage";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { gameStateAtom } from "./atoms/atoms";

function App() {
    const gameState = useAtomValue(gameStateAtom);
    const { playersEntered, gameOver, restartGame } = gameState;
    const [highScore, setHighScore] = useState({ time: null, player: null });
    const [timer, setTimer] = useState([]);

    let page = null;
    if (!playersEntered) {
        page = <PlayersFormPage />;
    } else if (gameOver) {
        page = (
            <GameOverPage
                timerState={{ timer, setTimer }}
                highScoreState={{ highScore, setHighScore }}
            />
        );
    } else if (!gameOver || restartGame) {
        page = (
            <GameboardPage
                timerState={{ timer, setTimer }}
                highScore={highScore}
            />
        );
    }
    return page;
}

export default App;
