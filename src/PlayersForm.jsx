import { useState } from "react";
import ModeButtons from "./modeButtons";

export default function PlayersForm({ setPlayer1, setPlayer2, setPlayersEntered, setCurrentPlayer, setMode }) {

    function handleSubmit(e) {
        e.preventDefault()
        
        const formData = new FormData(e.target)
        const [player1, player2] = [formData.get('player1'), formData.get('player2')]
        const mode = formData.get('mode')

        setPlayer1(player1)
        setPlayer2(player2)
        setPlayersEntered(true)
        setCurrentPlayer(player1)
        setMode(mode)
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