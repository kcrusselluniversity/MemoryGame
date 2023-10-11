// TODO: Add an onLoad prop to the img tag and have a count in the App that 
// shows loading until all X cards have been fully loaded

export default function Card({ 
    name, imgUrl, disabled, visible, id, 
    activeCards, setActiveCards, 
    gameList, setGameList,
    setLoadedImageCount, 
    timer, setTimer,
    setIsGameStarted, setNoClickEvents }) {

    function handleClick() {         
        if (disabled) return;

        // Current pokemon
        const currentPokemon = gameList.find(pokemon => pokemon.id === id)

        // Make current pokemon visible and disable functionality of all cards
        const updatedGameList = gameList.map(pokemon => {
            pokemon.disabled = true
            if (pokemon.id === id) pokemon.visible = true
            return pokemon
        })
        
        setGameList(updatedGameList)
        setActiveCards([...activeCards, currentPokemon])
    }

    return (
        <div className="card" onClick={handleClick}>
            <div className={visible ? null : 'hidden'}>
                <h3 style={{margin: '0px', paddingBottom: '6px', color: 'black'}}>{name}</h3>
                <img onLoad={() => {setLoadedImageCount(loadedImageCount => loadedImageCount + 1)}}src={imgUrl} style={{height: '150px', width: '150px'}}/>
            </div>
        </div>
    )
}