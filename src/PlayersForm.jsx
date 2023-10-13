// TODO: FIX MODE BUTTONS NOT BEING TABBED OVER IN FORM
import ModeButtons from "./modeButtons";
import { EASY_MODE } from "./App";

export default function PlayersForm({ setPlayer1, setPlayer2, setPlayersEntered, setCurrentPlayer, setMode }) {

    function handleSubmit(e) {
        e.preventDefault()
        
        const formData = new FormData(e.target)
        const [player1, player2] = [formData.get('player1'), formData.get('player2')]
        const mode = formData.get('mode') || EASY_MODE

        setMode(mode)
        setPlayer1(player1)
        setPlayer2(player2)
        setCurrentPlayer(player1)
        setPlayersEntered(true)
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