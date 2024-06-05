import axios from 'axios';

async function idsForGame() {
  let list = [];
  for (let i = 0; i < 4; i++) { 
    list[i] = Math.floor(Math.random() * 649) + 1;
  }
  return list;
}

export default {
  async getPokemons(start, end) {
    let gottenPokemons = [];
    for (let i = start; i <= end; i++) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const itemPokemon = response.data;
        if (itemPokemon) {
          const addedPokemon = {
            id: itemPokemon.id,
            name: itemPokemon.name,
            image: itemPokemon.sprites.other.dream_world.front_default
          };
          gottenPokemons.push(addedPokemon);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return gottenPokemons;
  },
  async getPokemonsForGame() {
    const list = await idsForGame(); 
    return list;
  },
  async getPokemonsDetail(name) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const pokemonData = response.data;
      const imageUrl = pokemonData.sprites.other.dream_world.front_default;
      return { ...pokemonData, image: imageUrl };
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  async getSilhouetteUrl(pokemonId) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const pokemonData = response.data;
    const silhouetteUrl = pokemonData.sprites.other["official-artwork"].front_default;
    return silhouetteUrl;
  } catch (error) {
    console.log(error);
    return null;
  }
}

};
