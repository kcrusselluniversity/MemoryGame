// Change the loading h2 element to be a div with a class of 'loading' that 
// makes it a spinning wheel 
import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import useGameList from "./useGameList";

export default function Gameboard() {
    const [gameList, setGameList] = useGameList();
    
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [seenPokemon, setSeenPokemon] = useState([]);
    const [score, setScore] = useState(0);
    const lastCardClickedRef = useRef('None');
    
    console.log(gameList)

    useEffect(() => {
        // Disable seen Pokemon and let them be visible
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
        score, 
        setScore, 
        gameList,
        setGameList,
        lastCardClickedRef,
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
