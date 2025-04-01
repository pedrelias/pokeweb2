import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonApiService } from '../../services/pokemonapi.service';

@Component({
  selector: 'app-main-page',
  standalone: false,
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  pokemons: any[] = [];

  constructor(private pokemonApiService: PokemonApiService, private router: Router) {}

  ngOnInit(): void {
    this.carregarPokemons();
  }

  carregarPokemons(): void {
    this.pokemonApiService.getPokemons().subscribe(
      pokemons => this.pokemons = pokemons,
      error => console.error('Erro ao carregar Pokémons:', error)
    );
  }

  capturarPokemon(): void {
    this.router.navigate(['/capture']);
  }
}