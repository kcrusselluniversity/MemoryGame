export default function getPokemonFromId(pokemonCards, selectedPokemonId) {
    return pokemonCards.find((pokemon) => pokemon.id === selectedPokemonId);
}
