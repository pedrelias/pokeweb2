import { Component, OnInit, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';


@Component({
  selector: 'app-capture',
  standalone: false,
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.css'],
})
export class CaptureComponent implements OnInit {
    private pokemonService = inject(PokemonService);
    
    pokemon: any = null;
    hp: number = 100;
    loading = true;
    error: string | null = null;
  
    ngOnInit(): void {
      this.loadRandomPokemon();
    }
  
    async loadRandomPokemon(): Promise<void> {
      try {
        this.loading = true;
        this.error = null;
        
        const pokemon = await this.pokemonService.getRandomPokemon().toPromise();
        
        if (pokemon) {
          this.pokemon = pokemon;
          this.hp = 100;
          this.preloadImage(pokemon.imagemUrl);
        }
      } catch (err) {
        this.error = 'Erro ao carregar Pokémon';
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  
    private preloadImage(url: string): void {
      const img = new Image();
      img.src = url;
    }

  attack(): void {
    if (!this.pokemon || this.hp <= 0) return;

    const damage = Math.floor(Math.random() * 2) === 0 ? 20 : 15;
    this.hp = Math.max(this.hp - damage, 0);
    
    if (this.hp === 0) {
      console.log(`${this.pokemon.nome} foi derrotado!`);
      // Adicione lógica de captura aqui se desejar
    }
  }

  tryCapture(): void {
    if (!this.pokemon) return;
    
    const success = Math.random() * 100 < this.pokemon.chanceCaptura;
    if (success) {
      alert(`Você capturou ${this.pokemon.nome}!`);
      this.loadRandomPokemon(); // Carrega um novo Pokémon após captura
    } else {
      alert(`${this.pokemon.nome} escapou! Continue tentando.`);
    }
  }
}