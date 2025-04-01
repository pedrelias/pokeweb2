// capture.component.ts
import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../../services/pokemonapi.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-capture',
  standalone: false,
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.css']
})
export class CaptureComponent implements OnInit {
  pokemon: any = null;
  hp: number = 100;
  loading = true;
  error: string | null = null;

  constructor(private pokemonApiService: PokemonApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadRandomPokemon();
  }

  loadRandomPokemon(): void {
    this.loading = true;
    this.error = null;
    this.pokemonApiService.getRandomPokemon().pipe(
      tap(pokemon => {
        this.pokemon = pokemon;
        this.hp = 100;
        this.preloadImage(pokemon.imagemUrl);
      })
    ).subscribe(
      () => {},
      err => {
        this.error = 'Erro ao carregar Pokémon';
        console.error(err);
      },
      () => this.loading = false
    );
  }

  private preloadImage(url: string): void {
    const img = new Image();
    img.src = url;
  }

  attack(): void {
    if (!this.pokemon || this.hp <= 0) return;
    this.hp = Math.max(this.hp - (Math.random() < 0.5 ? 20 : 15), 0);
    if (this.hp === 0) {
      alert(`Você derrotou ${this.pokemon.nome}!`);
      this.router.navigate(['/main-page']);
    }
  }

  tryCapture(): void {
    if (!this.pokemon) return;
    alert(this.pokemon.chanceCaptura ? `Você capturou ${this.pokemon.nome}!` : `${this.pokemon.nome} escapou! Continue tentando.`);
  }
}