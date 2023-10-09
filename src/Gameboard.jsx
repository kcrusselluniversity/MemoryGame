// TODO: FIX REPEATED CODE
// TODO: FIX USING CSS TO CONTROL EVERYTHING :(
import { useEffect, useState } from "react";
import Card from "./Card";
import useGameList from "./useGameList";
import stopWatch from "./utils/stopwatch";

const DESIRED_QUANTITY = 4;

export default function Gameboard() {
    const [gameList, setGameList] = useGameList(DESIRED_QUANTITY);
    const [activeCards, setActiveCards] = useState([]);
    const [seenPokemon, setSeenPokemon] = useState([]);
    const [timer, setTimer] = useState([]);
    const [noClickEvents, setNoClickEvents] = useState(true);
    const [loadedImageCount, setLoadedImageCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    
    console.log(gameList)

    function gameboardClassName(){
        if (!isLoaded) return 'gameboard displayNone'
        if (noClickEvents) return 'gameboard noClick'
        return 'gameboard'
        
    }
    function handleStart() {
        setNoClickEvents(false)
        setTimer([...timer, new Date()])
    }

    useEffect(() => {
        console.log(loadedImageCount)
        if (loadedImageCount === 2 * DESIRED_QUANTITY) {
            setIsLoaded(true)
        }
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
            }, 600)
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
            setTimer([...timer, new Date()])
        }
    }, [seenPokemon])

    const stateProps = {
        activeCards, 
        setActiveCards,
        gameList,
        setGameList,
        loadedImageCount,
        setLoadedImageCount}

    // if (!isLoaded) return <div className="spinnerContainer"><div className="loadingSpinner"></div></div>

    if (gameList.length > 0 && gameList.length/2 === seenPokemon.length) {
        return (
        <>
            <h1 style={{fontSize: '10rem'}}>You Won!</h1>
            <h1>{stopWatch(timer[1], timer[0])}</h1>
        </>)
    }
    
    return (
        <>
            <button className={isLoaded ? null : 'visibilityNone'}style={{fontSize:'1.5rem'}} onClick={handleStart}>Start</button>
            <div className={isLoaded ? "displayNone" : "spinnerContainer"}><div className="loadingSpinner"></div></div>
            <div className={gameboardClassName()}>
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
        </>)         
}
