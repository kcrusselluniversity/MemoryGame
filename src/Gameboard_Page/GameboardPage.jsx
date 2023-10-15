// TODO: FIX REPEATED CODE USING HELPER FUNCTION updateGameList
// TODO: FIX USING CSS TO CONTROL EVERYTHING - COULD USE STATE + DATA-STRUCTURES INSTEAD
// TODO: REFACTOR CSS LAYOUT EG (GRID) TO BE SPECIFIC TO EACH PAGE INSTEAD OF SETTING IT ON THE ROOT ELEMENT

import { useEffect, useState } from "react";
import useGameList from "../hooks/useGameList";
import LoadingSpinner from "./LoadingSpinner";
import PlayersDisplay from "./PlayersDisplay";
import HighScoreDisplay from "./HighScoreDisplay";
import StartButton from "./StartButton";
import Gameboard from "./Gameboard";

function GameboardPage({ 
    gameState, 
    setGameState, 
    timer, 
    setTimer, 
    highScore }) 
{
    const {mode} = gameState;
    const [activeCards, setActiveCards] = useState([]);
    const [seenPokemon, setSeenPokemon] = useState([]);
    
    const [noClickEvents, setNoClickEvents] = useState(true);
    const [loadedImageCount, setLoadedImageCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [gameList, setGameList] = useGameList(mode);
    
    function handleStart() {
        setGameState({
            ...gameState,
            isGameStarted: true
        })
        setNoClickEvents(false)
        setTimer([...timer, new Date()])
    }
    
    useEffect(() => {
        const loadCondition = loadedImageCount === 2 * mode;
        setIsLoaded(loadCondition)
    }, [loadedImageCount])

    useEffect(() => {
        if (activeCards.length == 1) {
            const activePokemon = activeCards[0]
            
            // Reenable all cards except for the active card
            const updatedGameList = gameList.map(pokemon => {
                pokemon.disabled = pokemon.id === activePokemon.id ? true : false
                return pokemon
            })
            setGameList(updatedGameList)
        }

        if (activeCards.length == 2) {        
            setTimeout(() => {
                const [firstCard, secondCard] = activeCards;
                if (firstCard.name === secondCard.name) {
                    // Add this pokemon to seen
                    setSeenPokemon([...seenPokemon, firstCard.name]);

                    // Reenable all cards except for the two active cards (as they match)
                    const updatedGameList = gameList.map(pokemon => {
                        if (pokemon.id != firstCard.id && pokemon.id != secondCard.id && !seenPokemon.find(seen => seen == pokemon.name)) {
                            pokemon.disabled = false;
                            pokemon.visible = false;
                        }    
                        return pokemon
                    })
                    setGameList(updatedGameList);               
                }

                const updatedGameList = gameList.map(pokemon => {
                    pokemon.disabled = false;
                    if (!seenPokemon.find(seen => seen == pokemon.name)) pokemon.visible = false;    
                    return pokemon
                })

                setGameList(updatedGameList);   
                setActiveCards([]);
            }, 300)
        }
    }, [activeCards])

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

    useEffect(() => {
        if ((seenPokemon.length === gameList.length/2) && seenPokemon.length > 0) {
            setTimer(timer => [...timer, new Date()])
            setGameState({...gameState, gameOver: true})
        }
    }, [seenPokemon])

    const stateProps = {
        activeCards, 
        setActiveCards,
        gameList,
        setGameList,
        loadedImageCount,
        setLoadedImageCount,
        timer, setTimer,
        setNoClickEvents}

    useEffect(() => {
    if (gameList.length > 0 && gameList.length/2 === seenPokemon.length) {
            setGameState({...gameState, gameOver: true})
        }
    }, [seenPokemon])
    
    return (
        <>
            <PlayersDisplay gameState={gameState} setGameState={setGameState}/>
            <HighScoreDisplay highScore={highScore} />
            <StartButton isLoaded={isLoaded} handleStart={handleStart} gameState={gameState}/>
            <LoadingSpinner isLoaded={isLoaded} />
            <Gameboard 
                gameState={gameState}
                gameList={gameList} 
                isLoaded={isLoaded}
                noClickEvents={noClickEvents}
                stateProps={stateProps}
            />
        </>)         
}

export default GameboardPage