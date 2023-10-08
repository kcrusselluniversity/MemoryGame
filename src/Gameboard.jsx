import { useRef, useState } from "react";
import Card from "./Card";
import useGameList from "./useGameList";

export default function Gameboard() {
    const [gameList, setGameList] = useGameList();
    
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [score, setScore] = useState(0);

    const lastCardClickedRef = useRef('None');

    const stateProps = {
        firstCard, 
        setFirstCard, 
        secondCard, 
        setSecondCard, 
        score, 
        setScore, 
        gameList,
        setGameList,
        lastCardClickedRef}

    if (gameList.length === 0) return <h2>Loading ...</h2>
    
    return (
        <div className="gameboard">
            {gameList.map((pokemon, index) => 
                <Card 
                    key={index} 
                    name={pokemon.name} 
                    imgUrl={pokemon.imgUrl} 
                    disabled={pokemon.disabled}
                    {...stateProps}
                />)}
        </div>
    )
}
