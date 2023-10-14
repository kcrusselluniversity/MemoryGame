export default function PlayersDisplay({ gameState: {player1, player2, currentPlayer} }) {
        
    return <div className="playerContainer">
                <h2 className={player1 === currentPlayer ? 'currentPlayer' : ''}>
                    Player 1: {player1}
                </h2>
                <h2 className={player2 === currentPlayer ? 'currentPlayer' : ''}>
                    Player 2: {player2}
                </h2>
        </div>
    
}