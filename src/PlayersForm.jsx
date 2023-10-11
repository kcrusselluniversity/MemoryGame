import { useState } from "react";

export default function PlayersForm({ setPlayer1, setPlayer2, setPlayersEntered, setCurrentPlayer }) {

    const [form1Input, setform1Input] = useState('')
    const [form2Input, setform2Input] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        
        const formData = new FormData(e.target)
        const [player1, player2] = [formData.get('player1'), formData.get('player2')]
        setPlayer1(player1)
        setPlayer2(player2)
        setPlayersEntered(true)
        setCurrentPlayer(player1)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input  onChange={e => e.target.value} type="text" name="player1" placeholder="player 1" />
            <input  onChange={e => e.target.value} type="text" name="player2" placeholder="player 2" />
            <button type="submit">Play</button>
        </form>
    )
}