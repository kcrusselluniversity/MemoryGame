export default async function fetchPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok)
        throw new Error(`HTTP error. Status code: ${response.status}`);

    const data = await response.json();

    const {
        name,
        sprites: { other: imgData },
    } = data;
    const imgUrl = imgData["official-artwork"]["front_default"];

    const pokemon = { name, imgUrl };

    return pokemon;
}
