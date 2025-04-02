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

  constructor(private pokemonApiService: PokemonApiService, private router: Router) {}

  ngOnInit(): void {
  }

  capturarPokemon(): void {
    this.router.navigate(['/capture']);
  }
}