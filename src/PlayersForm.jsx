// TODO: FIX MODE BUTTONS NOT BEING TABBED OVER IN FORM
import ModeButtons from "./modeButtons";
import { EASY_MODE } from "./App";

export default function PlayersForm({ gameState, setGameState }) {

    function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const [playerName1, playerName2] = [formData.get('player1'), formData.get('player2')]
        const selectedMode = formData.get('mode') || EASY_MODE

        const obj = {
            ...gameState,
            mode: selectedMode,
            player1: playerName1,
            player2: playerName2,
            currentPlayer: playerName1,
            playersEntered: true
        }

        setGameState({
            ...gameState,
            mode: selectedMode,
            player1: playerName1,
            player2: playerName2,
            currentPlayer: playerName1,
            playersEntered: true
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input required type="text" name="player1" placeholder="player 1" />
            <input required type="text" name="player2" placeholder="player 2" />
            <ModeButtons />
            <button type="submit">Play</button>
        </form>
    )
}