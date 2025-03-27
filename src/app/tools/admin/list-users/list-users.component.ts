import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user-management',
  standalone: false,
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {

  users$: any;

  constructor(private firestore: AngularFirestore) {
    this.users$ = this.firestore.collection('users').valueChanges();
  }

  // Método para salvar as alterações no usuário
  saveUser(user: any) {
    // Atualiza o usuário no banco de dados
    this.firestore.collection('users').doc(user.id).update({
      role: user.role
    }).then(() => {
      alert('Alterações salvas com sucesso!');
    }).catch((error) => {
      console.error('Erro ao salvar alterações: ', error);
      alert('Houve um erro ao salvar as alterações.');
    });
  }
}
