import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private firestore: AngularFirestore) {}


  async addPokemon(pokemonData: any): Promise<void> {
    try {
      await this.firestore.collection('Pokemons').doc(pokemonData.nome).set({
        ...pokemonData,
        dataCadastro: new Date()
      });
    } catch (error) {
      console.error('Erro ao adicionar Pokémon:', error);
      throw error;
    }
  }
}