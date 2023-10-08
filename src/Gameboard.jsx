import Card from "./Card"
import useGameList from "./useGameList";

export default function Gameboard() {
    const gameList = useGameList();
    

    if (gameList === null) return <h2>Loading ...</h2>
    
    return (
        <div className="gameboard">
            {gameList.map((pokemon, index) => 
                <Card key={index} name={pokemon.name} imgUrl={pokemon.imgUrl} />)}
        </div>
    )
}
