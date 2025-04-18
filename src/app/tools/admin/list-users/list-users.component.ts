import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, updateDoc, doc, getDocs, CollectionReference, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-users',
  standalone: false,
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  users$!: Observable<any[]>;

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const usersCollection = collection(this.firestore, 'Users');
    this.users$ = collectionData(usersCollection, { idField: 'id' }); // Garante que cada usuário tenha um 'id'
  }

  changeRole(user: any) {
    // Verifica se `role` está definido
    if (!user.role) {
      console.error('Erro: role não definida para o usuário.');
      return;
    }

    // Define os papéis de acordo com a escolha
    user.isAdmin = user.role === 'admin';
    user.isHunter = user.role === 'hunter';

    // Atualiza no Firebase
    const userDocRef = doc(this.firestore, `Users/${user.id}`);
    updateDoc(userDocRef, { isAdmin: user.isAdmin, isHunter: user.isHunter })
      .then(() => console.log(`Usuário ${user.publicName} atualizado com sucesso!`))
      .catch((error) => console.error('Erro ao atualizar usuário:', error));
  }

 async mostrarPokemons(user: any) {
    user.showPokemons = !user.showPokemons;

    if (user.showPokemons && !user.pokemons) {
      try {
        const bagRef = collection(this.firestore, `Users/${user.id}/Bag`) as CollectionReference;
        const q = query(bagRef);
        const querySnapshot = await getDocs(q);
  
        user.pokemons = querySnapshot.docs.map(doc => doc.data());
      } catch (error) {
        console.error('Erro ao buscar pokémons do usuário:', error);
      }
    }
  }
}
