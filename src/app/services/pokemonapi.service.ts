// pokemonapi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {
  private apiUrl = 'http://localhost:3000/pokemons'; 

  constructor(private http: HttpClient) {}

  // Buscar todos os Pokémons
  getPokemons(): Observable<any[]> {
    console.log('Buscando Pokémons...');
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(err => {
        console.error('Erro ao buscar Pokémons:', err);
        throw err;
      })
    );
  }


  getRandomPokemon(): Observable<any> {
    console.log("Requisição sendo feita para:", `${this.apiUrl}/random`);
    return this.http.get<any>(`${this.apiUrl}/random`).pipe(
      catchError(err => {
        console.error('Erro ao buscar Pokémon aleatório:', err);
        throw err;
      })
    );
  }


  addPokemon(pokemon: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pokemon).pipe(
      catchError(err => {
        console.error('Erro ao adicionar Pokémon:', err);
        throw err;
      })
    );
  }


  deletePokemon(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Erro ao deletar Pokémon:', err);
        throw err;
      })
    );
  }
}
