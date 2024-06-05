<template>
  <div v-if="pokemon" class="pokemon-detail">
    <h3><b>{{ pokemon.name }}</b></h3>
    <img :src="pokemon.sprites.other.dream_world.front_default" alt="Imagen de {{ pokemon.name }}">
    <p><strong style="color: purple;">Altura:</strong> {{ pokemon.height }}</p>
    <p><strong style="color: palevioletred;">Peso:</strong> {{ pokemon.weight }}</p>
    <p><strong style="color: salmon;">Tipo:</strong> {{ getType }}</p>
    <p><strong style="color: mediumslateblue;">Habilidades:</strong></p>
    <ul>
      <li v-for="ability in pokemon.abilities" :key="ability.ability.name" class="ability">{{ ability.ability.name }}</li>
    </ul>
    <p><strong style="color: darkorange;">Caracteristicas:</strong></p>
    <ul>
      <li v-for="(stat, index) in pokemon.stats" :key="index" class="stat">{{ stat.stat.name }}: {{ stat.base_stat }}</li>
    </ul>
    <p><strong style="color: darkcyan;">Movimientos:</strong></p>
    <ul class="move-list">
      <li v-for="(move, index) in importantMoves" :key="index" class="move">{{ move.move.name }}</li>
    </ul>
  </div>
</template>

<script>
import PokemonServices from '@/services/PokemonServices';
import { useRoute } from 'vue-router';

export default {
  name: 'PokemonDetailView',
  data() {
    return {
      pokemon: null,
      name:''
    };
  },
  async created() {
    const route = useRoute()
    this.name = route.params.name
    this.pokemon = await PokemonServices.getPokemonsDetail(this.name);
  },
  computed: {
    getType() {
      if (this.pokemon && this.pokemon.types) {
        return this.pokemon.types.map(type => type.type.name).join(', ');
      } else {
        return 'Desconocido';
      }
    },
    importantMoves() {
      return this.pokemon.moves.slice(0, 4);
    }
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
  background-color: rgb(133, 133, 185); 
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  color: #000; 
}

li.stat {
  display: inline-block;
  background-color: darkorange; 
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  color: #fff; 
}

.move-list {
  list-style-type: none;
  padding: 0;
}

.move {
  display: inline-block;
  margin-right: 10px;
  background-color: darkcyan;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
}

img {
  width: 200px;
  height: 210px;
}
</style>
