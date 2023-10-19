import GameboardPage from "./Gameboard_Page";
import PlayersForm from "./PlayersForm";
import GameOverPage from "./GameOverPage";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { gameStateAtom } from "./atoms/atoms";

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
            <GameOverPage
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
    return page;
}

export default App;
