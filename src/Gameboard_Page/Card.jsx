// TODO: USE FLIP-HORIZONTALLY PROP of TILT to have a nice animation
// when the card flips over
// TODO: Add the back of the card as an image in the assets and use that
// for the facedown visible side
import Tilt from 'react-parallax-tilt';

export default function Card({ 
    pokemon, 
    gameState, 
    setGameState,
    pokemonCardsState,
    activeCardsState, 
    loadedImageCountRef }) 
{   
    const { name, imgUrl, disabled, visible, id } = pokemon;
    const { pokemonCards, setPokemonCards } = pokemonCardsState;
    const { activeCards, setActiveCards } = activeCardsState;
    const { mode } = gameState;
    const totalImagesToLoad = mode * 2;
 
    function handleClick() {         
        if (disabled) return;

        // Current pokemon
        const currentPokemon = pokemonCards.find(pokemon => pokemon.id === id)

        // Make current pokemon visible and disable functionality of all cards
        const updatedpokemonCards = pokemonCards.map(pokemon => {
            pokemon.disabled = true
            if (pokemon.id === id) pokemon.visible = true
            return pokemon
        })
        
        setPokemonCards(updatedpokemonCards)
        setActiveCards([...activeCards, currentPokemon])
    }

    const handleOnLoad = () => {
        loadedImageCountRef.current += 1;
        if (loadedImageCountRef.current === totalImagesToLoad) {
            setGameState({...gameState, isLoaded: true})
        }
    }

    return (
        <Tilt tiltEnable={!disabled} transitionSpeed={600} perspective={1000} scale={1.02} tiltMaxAngleX={0} tiltMaxAngleY={20}>
            <div className="card" onClick={handleClick}>
                <div className={visible ? 'card-faceup' : 'hidden'}>
                    <h3>{name}</h3>
                    <img onLoad={handleOnLoad} src={imgUrl}/>
                </div>
            </div>
        </Tilt>
    )
}