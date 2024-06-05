<template>
    <div>
      <div class="row">
        <div class="col d-flex justify-content-center">
          <h3 class="text-primary">¿Quién es el Pokémon?</h3>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col d-flex justify-content-center">
          <img :src="silhouetteUrl" alt="Silueta del Pokémon" class="pokemon-silhouette pokemon-shadow hidden-image">
        </div>
      </div>
      <div class="row mt-3">
        <div class="col d-flex justify-content-center">
          <button v-for="(option, index) in options" :key="index" @click="checkAnswer(option)" class="btn btn-primary btn-option">{{ option }}</button>
        </div>
      </div>
      <div class="row mt-3" v-if="answered">
        <div class="col d-flex justify-content-center">
          <p>{{ feedback }}</p>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col d-flex justify-content-center">
          <button @click="resetGame" class="btn btn-secondary">Reiniciar juego</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import PokemonServices from '@/services/PokemonServices';
  
  export default {
    name: 'JuegoView',
    data() {
      return {
        options: [],
        correctPokemon: null,
        silhouetteUrl: '',
        answered: false,
        feedback: ''
      };
    },
    async created() {
      await this.generateQuestion();
    },
    methods: {
      async generateQuestion() {
        try {
          const randomIds = await PokemonServices.getPokemonsForGame();
          const pokemons = await Promise.all(randomIds.map(id => PokemonServices.getPokemonsDetail(id)));
          this.correctPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
          this.silhouetteUrl = await PokemonServices.getSilhouetteUrl(this.correctPokemon.id);
  
          const uniqueNames = [...new Set(pokemons.map(pokemon => pokemon.name))];
          this.options = this.shuffle([...uniqueNames, this.correctPokemon.name]).slice(0, 4);
  
          this.answered = false;
          this.feedback = '';
        } catch (error) {
          console.error('Error al generar la pregunta:', error);
        }
      },
      async checkAnswer(option) {
        if (!this.answered) {
          this.answered = true;
          if (option === this.correctPokemon.name) {
            this.feedback = '¡Respuesta correcta!';
          } else {
            this.feedback = 'Respuesta incorrecta.';
          }
        }
      },
      resetGame() {
        this.generateQuestion();
      },
      shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
    }
  };
  </script>
  
  <style>
  .pokemon-silhouette {
    width: 200px;
    height: 200px;
  }
  
  .pokemon-shadow {
    opacity: 1; 
  }
  
  .hidden-image {
    filter: brightness(0);
  }
  
  .btn-option {
    margin: 5px;
    background-color: lightblue; 
  }
  </style>
  