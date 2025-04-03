import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonApiService } from '../../services/pokemonapi.service';
import { Router } from '@angular/router';
import { BagService } from '../../services/bag.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-capture',
  standalone: false,
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.css']
})
export class CaptureComponent implements OnInit, OnDestroy {
  pokemon: any = null;
  hpTotal: number = 0;
  hpAtual: number = 0;
  loading = true;
  error: string | null = null;
  battleMusic: HTMLAudioElement | null = null; 
  victoryMusic: HTMLAudioElement | null = null;

  constructor(private pokemonApiService: PokemonApiService, private bagService: BagService ,private router: Router) {}

  ngOnInit(): void {
    this.loadRandomPokemon();
    this.playBattleMusic();
  }

  ngOnDestroy(): void {
    this.stopBattleMusic();
  }

  playBattleMusic(): void {
    this.stopBattleMusic();
    this.battleMusic = new Audio('battle-theme.mp3');
    this.battleMusic.loop = true;
    this.battleMusic.volume = 0.5;

    this.battleMusic.play().catch(err => {
      console.error('Erro ao tocar música de batalha:', err);
    });
  }

  stopBattleMusic(): void {
    if (this.battleMusic) {
      this.battleMusic.pause();
      this.battleMusic.currentTime = 0;
    }
  }

  playVictoryMusic(): void {
    this.stopBattleMusic(); // Para a música de batalha primeiro
  
    this.victoryMusic = new Audio('victory-theme.mp3');
    this.victoryMusic.volume = 0.5;
  
    this.victoryMusic.play().then(() => {
      console.log('Música de vitória tocando...');
    }).catch(err => {
      console.error('Erro ao tocar música de vitória:', err);
    });
  }
  
  stopVictoryMusic(): void {
    if (this.victoryMusic) {
      this.victoryMusic.pause();
      this.victoryMusic.currentTime = 0; // Reseta o áudio para o início
    }
  }
  

  loadRandomPokemon(): void {
    this.loading = true;
    this.error = null;
    this.pokemonApiService.getRandomPokemon().pipe(
      tap(pokemon => {
        this.pokemon = pokemon;
        this.hpTotal = Math.ceil(Math.random() * 100); 
        this.hpAtual = this.hpTotal;
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
    if (typeof window !== 'undefined') { 
      const img = new Image();
      img.src = url;
    }
  }

  attack(): void {
    if (!this.pokemon || this.hpTotal <= 0) return;
    this.hpAtual = Math.max(this.hpAtual - (Math.random() < 0.5 ? 20 : 15), 0);
    if (this.hpAtual === 0) {
      alert(`Você derrotou ${this.pokemon.nome}!`);
      this.router.navigate(['/main-page']);
    }
  }

  tryCapture(): void {
    if (!this.pokemon) return;
    const randomCaptura = Math.random() * 100;
  
    if (randomCaptura < this.pokemon.chanceCaptura) {
      this.playVictoryMusic(); 
  
      setTimeout(() => {
        alert(`🎉 Você capturou ${this.pokemon.nome}!`);
        this.bagService.addPokemonToBag(this.pokemon).then(() => {
          console.log('Pokémon adicionado ao bag com sucesso!');
        }).catch(err => {
          console.error('Erro ao adicionar Pokémon ao bag:', err);
        });

        this.stopVictoryMusic()
        this.router.navigate(['/main-page']);
      }, 100); 
      
    } else {
      alert(`${this.pokemon.nome} escapou!`);
      this.router.navigate(['/main-page']);
    }
  }
}
