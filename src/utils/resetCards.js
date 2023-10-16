// This function resets the cards after two cards have been turned face up
function resetCards(pokemonCards, setPokemonCards, seenPokemonIds){
    const updatedPokemonCards = pokemonCards.map(pokemon => {
        if(seenPokemonIds.includes(pokemon.id)) {
            pokemon.disabled = true;
            pokemon.visible = true;
        } else {
            pokemon.disabled = false;
            pokemon.visible = false;
        }
        return pokemon
    })
    setPokemonCards(updatedPokemonCards)
}

export default resetCards
