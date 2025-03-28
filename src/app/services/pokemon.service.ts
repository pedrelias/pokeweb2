import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, setDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private firestore: AngularFirestore) {}


  async addPokemon(pokemonData: any) {
    try {

      const pokemonRef = doc(this.firestore.firestore, 'Pokemons', pokemonData.nome);


      await setDoc(pokemonRef, {
        nome: pokemonData.nome,
        tipo: pokemonData.tipo,
        forca: pokemonData.forca,
        chanceCaptura: pokemonData.chanceCaptura,
        imagemUrl: pokemonData.imagemUrl
      });

      console.log('Pokémon cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar Pokémon:', error);
      throw error;  
    }
  }
}
