// TODO: FIX REPEATED CODE USING HELPER FUNCTION updateGameList
// TODO: BREAK THIS COMPONENT DOWN INTO SMALLER COMPONENTS
// TODO: FIX USING CSS TO CONTROL EVERYTHING - COULD USE STATE + DATA-STRUCTURES 
//       INSTEAD

import { useEffect, useState } from "react";
import Card from "./Card";
import useGameList from "./useGameList";
import { EASY_MODE, MEDIUM_MODE, HARD_MODE } from "./App";

export default function Gameboard({ player1, player2, timer, setTimer, setGameOver, currentPlayer, mode, setMode, highScore }) {
    const [activeCards, setActiveCards] = useState([]);
    const [seenPokemon, setSeenPokemon] = useState([]);

    const [noClickEvents, setNoClickEvents] = useState(true);
    const [loadedImageCount, setLoadedImageCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [gameList, setGameList] = useGameList(mode);
    const [isGameStarted, setIsGameStarted] = useState(false);

    function gameboardClassName(){
        if (!isLoaded) return 'gameboard displayNone'
        if (noClickEvents) return 'gameboard noClick'
        return 'gameboard'  
    }

    function handleStart() {
        setIsGameStarted(true)
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
            console.log('Game end triggered')
            setTimer(timer => [...timer, new Date()])
            setGameOver(true)
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
        setIsGameStarted, 
        setNoClickEvents}

    useEffect(() => {
    if (gameList.length > 0 && gameList.length/2 === seenPokemon.length) {
            setGameOver(true)
        }
    }, [seenPokemon])
    
    function handleModeButton(mode){
        return () => {
            setLoadedImageCount(0)
            setMode(mode)
        }
    }
    return (
        <>
            <div className="playerContainer">
                <h2 className={player1 === currentPlayer ? 'currentPlayer' : ''}>Player 1: {player1}</h2>
                <h2 className={player2 === currentPlayer ? 'currentPlayer' : ''}>Player 2: {player2}</h2>
            </div>
            {highScore.time && <h2> High Score: {highScore.time} seconds ({highScore.player})</h2>}
            <button className={`${isLoaded ? 'startButton' : 'visibilityNone'} ${isLoaded && isGameStarted ? 'displayNone' : ''}`} 
            onClick={handleStart}>Start</button>

            <div className={isLoaded ? "displayNone" : "spinnerContainer"}><div className="loadingSpinner"></div></div>
            
            <div className={`${isLoaded && !isGameStarted ? 'gameMode' : 'visibilityNone'} ${isLoaded && isGameStarted ? 'displayNone' : ''}`}>
                <button onClick={handleModeButton(EASY_MODE)}>Easy</button>
                <button onClick={handleModeButton(MEDIUM_MODE)}>Medium</button>
                <button onClick={handleModeButton(HARD_MODE)}>Hard</button>
            </div>

            <div className={gameboardClassName()}>
                {gameList.map(pokemon => 
                    <Card 
                        key={pokemon.id} 
                        name={pokemon.name} 
                        imgUrl={pokemon.imgUrl} 
                        disabled={pokemon.disabled}
                        visible={pokemon.visible}
                        id={pokemon.id}
                        {...stateProps}
                    />)}
            </div>
        </>)         
}
