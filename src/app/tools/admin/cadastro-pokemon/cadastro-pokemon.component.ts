import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonApiService } from '../../../services/pokemonapi.service';  
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-pokemon',
  standalone: false,
  templateUrl: './cadastro-pokemon.component.html',
  styleUrls: ['./cadastro-pokemon.component.css']
})
export class CadastroPokemonComponent implements OnInit {
  pokemonForm!: FormGroup;
  pokemonTipos: string[] = [
    'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy',
    'Fighting', 'Fire', 'Flying', 'Ghost', 'Grass',
    'Ground', 'Ice', 'Normal', 'Poison', 'Psychic',
    'Rock', 'Steel', 'Water'
  ];

  constructor(
    private fb: FormBuilder,
    private pokemonApiService: PokemonApiService, 
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.pokemonForm = this.fb.group({
      nome: ['', Validators.required],
      tipo1: ['', Validators.required],
      tipo2: [''],
      chanceCaptura: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
      imagemUrl: ['', Validators.required]
    });
  }

  // Função de cadastro do Pokémon na API
  async cadastrarPokemon() {
    if (this.pokemonForm.valid) {
      try {
        const user = await this.auth.currentUser;
        
        if (!user) {
          alert('Usuário não autenticado!');
          return;
        }

        const pokemonData = {
          nome: this.pokemonForm.value.nome,
          tipo1: this.pokemonForm.value.tipo1,
          tipo2: this.pokemonForm.value.tipo2 || null,
          chanceCaptura: this.pokemonForm.value.chanceCaptura,
          imagemUrl: this.pokemonForm.value.imagemUrl,
        };

        // Chama a API para cadastrar o Pokémon
        this.pokemonApiService.addPokemon(pokemonData).subscribe({
          next: () => {
            alert('Pokémon cadastrado com sucesso!');
            this.pokemonForm.reset();
          },
          error: (err) => {
            console.error('Erro ao cadastrar Pokémon:', err);
            alert('Erro ao cadastrar Pokémon.');
          }
        });

      } catch (err) {
        console.error('Erro inesperado:', err);
        alert('Erro inesperado ao cadastrar o Pokémon.');
      }
    }
  }
}
