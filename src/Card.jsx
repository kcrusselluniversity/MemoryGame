// TODO: Handle what happens if the user clicks on a card before the 500ms is 
// up as currently it lets you reveal however many you want

// TODO: Add an onLoad prop to the img tag and have a count in the App that 
// shows loading until all X cards have been fully loaded

export default function Card({ 
    name, imgUrl, disabled, visible, id, 
    firstCard, setFirstCard, secondCard, setSecondCard, 
    gameList, setGameList, seenPokemon, setSeenPokemon 
}) {
    function handleClick() { 
        // Make visible and disable functionality
        const updatedGameList = gameList.map(pokemon => {
            pokemon.disabled = true
            if (pokemon.id === id) pokemon.visible = true
            return pokemon
        })

        setGameList(updatedGameList)

        setTimeout(() => {
            
            if (secondCard) {
                // Compare the two cards
                if (firstCard === name && !seenPokemon.includes(name)) {
                    // Add the pokemon to the seen state
                    setSeenPokemon([...seenPokemon, name])
                } 
                setSecondCard(false)
                
                // Hide all unseen pokemon
                const updatedGameList = gameList.map(pokemon => {
                    
                    if (!seenPokemon.includes(pokemon.name)) pokemon.visible = false;
                    
                    return pokemon;
                })
                
                setGameList(updatedGameList)
                // Reenable cards
                setGameList(gameList.map(pokemon => {return {...pokemon, disabled: false}})) //DUPLICATE CODE :(
            }
        }, 500)
        

        // Reenable cards
        setGameList(gameList.map(pokemon => {return {...pokemon, disabled: false}}))

        setFirstCard(name)
        setSecondCard(true);
    }

    return (
        <div className="card" onClick={disabled ? null : handleClick}>
            <div className={visible ? null : 'hidden'}>
                <h3 style={{margin: '0px', paddingBottom: '6px', color: 'black'}}>{name}</h3>
                <img src={imgUrl} style={{height: '150px', width: '150px'}}/>
            </div>
        </div>
    )
}