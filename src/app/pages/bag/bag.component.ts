import { Component, OnInit } from '@angular/core';
import { BagService } from '../../services/bag.service';


@Component({
  selector: 'app-bag',
  standalone: false,
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.css'
})
export class BagComponent implements OnInit {
  pokemons: any[] = [];
  constructor(private bagService: BagService) { }

  ngOnInit(): void {
    this.loadBag();
  }

  loadBag(): void{
    this.bagService.getUserBag().subscribe((pokemons) => {
      this.pokemons = pokemons;
    }, (error) => {
      console.error('Erro ao carregar o bag:', error);
    });
  }

  async soltarPokemon(pokemonId: string) {
    await this.bagService.soltarPokemon(pokemonId);
    this.loadBag(); 
  }

  async fortalecerPokemon(pokemonId: string) {
    await this.bagService.fortalecerPokemon(pokemonId);
    this.loadBag();
  }

}
