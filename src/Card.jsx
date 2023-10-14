// TODO: USE FLIP-HORIZONTALLY PROP of TILT to have a nice animation
// when the card flips over
import Tilt from 'react-parallax-tilt';

export default function Card({ 
    name, imgUrl, disabled, visible, id, 
    activeCards, setActiveCards, 
    gameList, setGameList,
    setLoadedImageCount, 
    timer, setTimer,
    setIsGameStarted, setNoClickEvents }) {

    function handleClick() {         
        if (disabled) return;

        // Current pokemon
        const currentPokemon = gameList.find(pokemon => pokemon.id === id)

        // Make current pokemon visible and disable functionality of all cards
        const updatedGameList = gameList.map(pokemon => {
            pokemon.disabled = true
            if (pokemon.id === id) pokemon.visible = true
            return pokemon
        })
        
        setGameList(updatedGameList)
        setActiveCards([...activeCards, currentPokemon])
    }

    return (
        <Tilt tiltEnable={!disabled} transitionSpeed={600} perspective={1000} scale={1.02} tiltMaxAngleX={0} tiltMaxAngleY={20}>
            <div className="card" onClick={handleClick}>
                <div className={visible ? null : 'hidden'}>
                    <h3 style={{margin: '0px', paddingBottom: '6px', color: 'black'}}>{name}</h3>
                    <img onLoad={() => {setLoadedImageCount(loadedImageCount => loadedImageCount + 1)}}src={imgUrl} style={{height: '150px', width: '150px'}}/>
                </div>
            </div>
        </Tilt>
    )
}