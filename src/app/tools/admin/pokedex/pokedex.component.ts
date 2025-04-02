import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonApiService } from '../../../services/pokemonapi.service';

@Component({
  selector: 'app-pokedex',
  standalone: false,
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent implements OnInit{
  pokemons: any[] = [];

  constructor(private pokemonApiService: PokemonApiService) { }

  ngOnInit(): void {
      this.getPokemons();
  }

  getPokemons(){
    this.pokemonApiService.getPokemons().subscribe({
      next: (data: any) => {
        this.pokemons = data;
      },
      error: (error) => {
        console.error('Erro ao carregar Pokémon:', error);
      }
    });
  }
}
