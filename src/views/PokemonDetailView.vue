<template>
  <div v-if="pokemon" class="pokemon-detail">
    <h3><b>{{ pokemon.name }}</b></h3>
    <img :src="pokemon.sprites.other.dream_world.front_default" alt="Imagen de {{ pokemon.name }}">
    <p><strong style="color: purple;">Altura:</strong> {{ pokemon.height }}</p>
    <p><strong style="color: palevioletred;">Peso:</strong> {{ pokemon.weight }}</p>
    <p><strong style="color: mediumslateblue;">Habilidades:</strong></p>
    <ul>
      <li v-for="ability in pokemon.abilities" :key="ability.ability.name" class="ability">{{ ability.ability.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices';

export default {
  name: 'PokemonDetailView',
  props: ['name'],
  data() {
    return {
      pokemon: null
    };
  },
  async created() {
    this.pokemon = await PokemonServices.getPokemonsDetail(this.name);
  }
};
</script>

<style scoped>
.pokemon-detail {
  text-align: center;
  font-family: Arial, sans-serif;
}
p {
  font-size: 18px;
  color: black;
}

ul {
  list-style-type: none;
  padding: 0;
}

li.ability {
  display: inline-block;
  background-color: rgb(101, 101, 162); 
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  color: #000; 
}
.move-list {
  list-style-type: none;
  padding: 0;
}

.move {
  display: inline-block; /* Colocar los elementos uno al lado del otro */
  margin-right: 10px; /* Espacio entre los movimientos */
  background-color: rgb(39, 167, 167);

}


img {
  width: 250px;
  height: 260px;
}
</style>