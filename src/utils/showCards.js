// This function shows all cards except for the active and seen cards,
// The isDisabled parameter allows you to control whether the remaining 
// cards are disabled or enabled
function showCards(
    pokemonCards,
    setPokemonCards,
    activeCardIds,
    seenPokemonIds,
    isDisabled = false
) {
    const updatedPokemonCards = pokemonCards.map((pokemon) => {
        if (
            activeCardIds.includes(pokemon.id) ||
            seenPokemonIds.includes(pokemon.id)
        ) {
            pokemon.disabled = true;
            pokemon.visible = true;
        } else {
            pokemon.disabled = isDisabled;
        }
        return pokemon;
    });
    setPokemonCards(updatedPokemonCards);
}

export default showCards;
