import { useEffect, useState } from "react";
import Card from "./Card";
import useGameList from "./useGameList";

export default function Gameboard() {
    const [gameList, setGameList] = useGameList();
    
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [activeCards, setActiveCards] = useState([null, null]);
    const [seenPokemon, setSeenPokemon] = useState([]);

    useEffect(() => {
        // Disable seen Pokemon and let them be visible anytime seenPokemon
        // is updated
        const updatedList = gameList.map(pokemon => {
            if (seenPokemon.includes(pokemon.name)) {
                pokemon.visible = true;
                pokemon.disabled = true;
            }
            return pokemon
        })
        setGameList(updatedList)
    }, [seenPokemon])

    const stateProps = {
        firstCard, 
        setFirstCard, 
        secondCard, 
        setSecondCard, 
        gameList,
        setGameList,
        seenPokemon, 
        setSeenPokemon}

    if (gameList.length === 0) return <div className="spinnerContainer"><div className="loadingSpinner"></div></div>

    if (gameList.length > 0 && gameList.length/2 === seenPokemon.length) {
        return <h1 style={{fontSize: '10rem'}}>You Won!</h1>
    }
    
    return (
        <div className="gameboard">
            {gameList.map((pokemon, index) => 
                <Card 
                    key={index} 
                    name={pokemon.name} 
                    imgUrl={pokemon.imgUrl} 
                    disabled={pokemon.disabled}
                    visible={pokemon.visible}
                    id={pokemon.id}
                    {...stateProps}
                />)}
        </div>
    )
}
