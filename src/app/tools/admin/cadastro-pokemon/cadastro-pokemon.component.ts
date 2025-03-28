import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonService } from '../../../services/pokemon.service';  // Importando o serviço
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
    'fire', 'water', 'grass', 'electric', 'normal', 
    'bug', 'psychic', 'fairy', 'dark', 'fighting'
  ];  // 10 tipos de Pokémon

  constructor(
    private fb: FormBuilder,
    private pokemonService: PokemonService,  // Injetando o serviço
    private auth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.pokemonForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      forca: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      chanceCaptura: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
      imagemUrl: ['', Validators.required]  // Link da imagem
    });
  }

  // Função de cadastro do Pokémon
  async cadastrarPokemon() {
    if (this.pokemonForm.valid) {
      try {
        const user = await this.auth.currentUser;
        
        if (!user) {
          alert('Usuário não autenticado!');
          return;
        }

        // Dados do Pokémon
        const pokemonData = {
          ...this.pokemonForm.value,
          userId: user.uid  // Associando ao usuário autenticado
        };

        // Chamada de API (fazendo o cadastro do Pokémon)
        await this.pokemonService.addPokemon(pokemonData);
        alert('Pokémon cadastrado com sucesso!');
        this.pokemonForm.reset();  
      } catch (err) {
        console.error('Erro ao cadastrar Pokémon:', err);
        alert('Ocorreu um erro ao cadastrar o Pokémon');
      }
    }
  }
}
