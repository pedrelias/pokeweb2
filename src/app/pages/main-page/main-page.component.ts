import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { query } from 'express';


@Component({
  selector: 'app-main-page',
  standalone: false,
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  pokemons: any[] = [];

  constructor(private router: Router, private firestore: AngularFirestore) {}

  getPokemons(): Observable<any[]> {
    return this.firestore.collection('pokemons').valueChanges();
  }

  capturarPokemon() {
    this.router.navigate(['/capture']);
  }
}
