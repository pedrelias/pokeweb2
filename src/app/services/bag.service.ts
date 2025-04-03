import { Injectable } from '@angular/core';
import { Firestore,addDoc, collection, collectionData, deleteDoc, doc, updateDoc, increment } from '@angular/fire/firestore';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BagService {

  constructor(private firestore: Firestore, private auth: Auth) { }


  getUserBag(): Observable<any[]> {
    return new Observable(observer => {
      onAuthStateChanged(this.auth, (user: User | null) => {
        if (!user) {
          observer.error(new Error('Usuário não autenticado'));
          return;
        }

        const bagRef = collection(this.firestore, `Users/${user.uid}/Bag`);
        collectionData(bagRef, { idField: 'id' }).subscribe(
          (data) => observer.next(data),
          (error) => observer.error(error)
        );
      });
    });
  }

  async soltarPokemon(pokemonId: string) {
    const user = this.auth.currentUser;
    if (!user) {
      console.error('Usuário não autenticado');
      return;
    }
    const userId = user.uid;
    const pokemonDoc = doc(this.firestore, `Users/${userId}/Bag/${pokemonId}`);

    try {
      await deleteDoc(pokemonDoc);
      console.log('Pokemon removido da bag com sucesso!');
    } catch (error) {
      console.error('Erro ao remover Pokemon da bag:', error);
    }
  }


  async fortalecerPokemon(pokemonId: string) {
    const user = this.auth.currentUser;
    if (!user) {
      console.error('Usuário não autenticado');
      return;
    }
  
    const incremento = Math.floor(Math.random() * 100) + 1; 
    const pokemonDoc = doc(this.firestore, `Users/${user.uid}/Bag/${pokemonId}`);
  
    try {
      await updateDoc(pokemonDoc, { forca: increment(incremento) });
      console.log(`Pokemon fortalecido em +${incremento} de força!`);
    } catch (error) {
      console.error('Erro ao fortalecer Pokemon:', error);
    }
  }
  
  async addPokemonToBag(pokemon:any){
    const user = this.auth.currentUser;
    if (!user) {
      console.error('Usuário não autenticado');
      return;
    }
    const userId = user.uid;
    const bagRef = collection(this.firestore, `Users/${userId}/Bag`);

    const pokemonData = { 
      nome : pokemon.nome,
      imagemUrl: pokemon.imagemUrl,
      tipo1: pokemon.tipo1,
      tipo2: pokemon.tipo2,
      forca: Math.floor(Math.random() * 1000) + 1,
    };

    try{
      await addDoc(bagRef, pokemonData);
      console.log('Pokemon adicionado ao bag com sucesso!');
    }catch(error){
      console.error('Erro ao adicionar Pokemon ao bag:', error);
    }
  }
}
