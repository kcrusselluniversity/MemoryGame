// FIX BUG WHERE YOU CAN CLICK ON A FACEUP CARD AND IT ACCEPTS
// IT AS A CARD
import classNames from "classnames";
import Card from "./Card";
import StartButton from "./StartButton";
import { HARD_MODE, MEDIUM_MODE } from "../App";
import { useRef } from "react";

export default function Gameboard({ 
    gameState,
    setGameState,
    pokemonCardsState,
    activeCardsState,
    timerState}) 
{
    const { pokemonCards, setPokemonCards } = pokemonCardsState;
    const { activeCards, setActiveCards } = activeCardsState;
    const { timer, setTimer } = timerState;

    
    const loadedImageCountRef = useRef(0);

    const classList = classNames('gameboard', {
        'displayNone': !gameState.isLoaded,
        'medModeMaxWidth': gameState.mode == MEDIUM_MODE,
        'hardModeMaxWidth': gameState.mode == HARD_MODE 
    });

    function handleStart() {
        setGameState({
            ...gameState,
            isGameStarted: true
        })
        setPokemonCards(pokemonCards.map(pokemon => {
            return {...pokemon, disabled: false}
        }))
        setTimer([...timer, new Date()])
    }

    return <div className={classList}>
        <StartButton handleStart={handleStart} gameState={gameState}/>
        {pokemonCards.map(pokemon =>
            <Card
                key={pokemon.id}
                pokemon={pokemon}
                gameState={gameState}
                setGameState={setGameState}
                pokemonCardsState={{pokemonCards, setPokemonCards}}
                activeCardsState={{activeCards, setActiveCards}}
                loadedImageCountRef={loadedImageCountRef}
            />)}
        </div>
}