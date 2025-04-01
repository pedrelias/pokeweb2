// pokemonapi.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {
  constructor(private firestore: AngularFirestore) {}

  getPokemons(): Observable<any[]> {
    console.log('Buscando Pokémons...');
    return this.firestore.collection('Pokemons').valueChanges().pipe(
      catchError(err => {
        console.error('Erro ao buscar Pokémons:', err); // Verifique o erro
        return []; // Retorna um array vazio em caso de erro
      })
    );
  }

  getRandomPokemon(): Observable<any> {
    console.log('Bujbuguguhjgufg...');
    return this.getPokemons().pipe(
      map(pokemons => {
        if (!pokemons || pokemons.length === 0) {
          throw new Error('Nenhum Pokémon encontrado.');
        }
        return pokemons[Math.floor(Math.random() * pokemons.length)];
      })
    );
  }
}
