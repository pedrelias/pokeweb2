import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private firestore = inject(AngularFirestore);

  getRandomPokemon(): Observable<any> {
    return this.firestore.collection('Pokemons').valueChanges().pipe(
      take(1),
      map(pokemons => {
        if (!pokemons || pokemons.length === 0) {
          throw new Error('Nenhum Pokémon encontrado');
        }
        const randomIndex = Math.floor(Math.random() * pokemons.length);
        return pokemons[randomIndex];
      })
    );
  }

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