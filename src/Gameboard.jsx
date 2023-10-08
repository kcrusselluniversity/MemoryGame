import { useRef, useState } from "react";
import Card from "./Card"
import useGameList from "./useGameList";

export default function Gameboard() {
    const gameList = useGameList();
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [score, setScore] = useState(0);
    const lastCardClickedRef = useRef(null);

    const stateProps = {
        firstCard, 
        setFirstCard, 
        secondCard, 
        setSecondCard, 
        score, 
        setScore, 
        lastCardClickedRef}

    if (gameList === null) return <h2>Loading ...</h2>
    
    return (
        <div className="gameboard">
            {gameList.map((pokemon, index) => 
                <Card 
                    key={index} 
                    name={pokemon.name} 
                    imgUrl={pokemon.imgUrl} 
                    {...stateProps}
                />)}
        </div>
    )
}
