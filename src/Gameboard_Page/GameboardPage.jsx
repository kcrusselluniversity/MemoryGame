// TODO: FIX USING CSS TO CONTROL EVERYTHING - COULD USE STATE + CONDITIONAL RENDERING INSTEAD OF HIDING
// THIS RESULTS IN UNNECCESSARY PAINTING TO THE DOM PER RENDER OF THE COMPONENT
// TODO: REFACTOR CSS LAYOUT EG (GRID) TO BE SPECIFIC TO EACH PAGE INSTEAD OF SETTING IT ON THE ROOT ELEMENT

import { useEffect, useState } from "react";
import usePokemonCards from "../hooks/usePokemonCards";
import LoadingSpinner from "./LoadingSpinner";
import PlayersDisplay from "./PlayersDisplay";
import HighScoreDisplay from "./HighScoreDisplay";
import Gameboard from "./Gameboard";

function GameboardPage({ 
    gameState, 
    setGameState, 
    timer, 
    setTimer, 
    highScore }) 
{
    const {mode} = gameState;
    const {isLoaded} = gameState;
    const [activeCards, setActiveCards] = useState([]);
    const [seenPokemon, setSeenPokemon] = useState([]);
    const [pokemonCards, setPokemonCards] = usePokemonCards(mode);

    useEffect(() => {
        if (activeCards.length == 1) {
            const activePokemon = activeCards[0]
            
            // Reenable all cards except for the active card
            const updatedpokemonCards = pokemonCards.map(pokemon => {
                pokemon.disabled = pokemon.id === activePokemon.id ? true : false
                return pokemon
            })
            setPokemonCards(updatedpokemonCards)
        }

        if (activeCards.length == 2) {        
            setTimeout(() => {
                const [firstCard, secondCard] = activeCards;
                if (firstCard.name === secondCard.name) {
                    // Add this pokemon to seen
                    setSeenPokemon([...seenPokemon, firstCard.name]);

                    // Reenable all cards except for the two active cards (as they match)
                    const updatedpokemonCards = pokemonCards.map(pokemon => {
                        if (pokemon.id != firstCard.id && pokemon.id != secondCard.id && !seenPokemon.find(seen => seen == pokemon.name)) {
                            pokemon.disabled = false;
                            pokemon.visible = false;
                        }    
                        return pokemon
                    })
                    setPokemonCards(updatedpokemonCards);               
                }

                const updatedpokemonCards = pokemonCards.map(pokemon => {
                    pokemon.disabled = false;
                    if (!seenPokemon.find(seen => seen == pokemon.name)) pokemon.visible = false;    
                    return pokemon
                })

                setPokemonCards(updatedpokemonCards);   
                setActiveCards([]);
            }, 300)
        }
    }, [activeCards])

    useEffect(() => {
        // Disable seen Pokemon and let them be visible anytime seenPokemon
        // is updated
        const updatedList = pokemonCards.map(pokemon => {
            if (seenPokemon.includes(pokemon.name)) {
                pokemon.visible = true;
                pokemon.disabled = true;
            }
            return pokemon
        })
        setPokemonCards(updatedList)
    }, [seenPokemon])

    useEffect(() => {
        if ((seenPokemon.length === pokemonCards.length/2) && seenPokemon.length > 0) {
            setTimer(timer => [...timer, new Date()])
            setGameState({...gameState, gameOver: true})
        }
    }, [seenPokemon])
    
    return (
        <>
            <LoadingSpinner gameState={gameState} />
            {isLoaded && <>
                <PlayersDisplay gameState={gameState} setGameState={setGameState}/>
                <HighScoreDisplay highScore={highScore} />
            </>}
            <Gameboard 
                gameState={gameState}
                setGameState={setGameState}
                pokemonCardsState={{pokemonCards, setPokemonCards}}
                activeCardsState={{activeCards, setActiveCards}}
                timerState={{timer, setTimer}}
            />
        </>)         
}

export default GameboardPage