import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, getDoc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  name: string = '';
  description: string = '';
  isLoading: boolean = true;

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  async ngOnInit() {
    try {
      const user = await this.auth.currentUser;
      if (!user) {
        alert('Usuário não autenticado!');
        return;
      }

      this.userId = user.uid;
      const userRef = doc(this.firestore.firestore, 'Users', this.userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        this.name = userData['publicName'] || '';
        this.description = userData['description'] || '';
      }
    } catch (err) {
      console.error('Erro ao carregar perfil:', err);
      alert('Erro ao carregar perfil.');
    } finally {
      this.isLoading = false;
    }
  }

  async onSaveClick() {
    if (!this.userId) return;

    try {
      const userRef = doc(this.firestore.firestore, 'Users', this.userId);
      await updateDoc(userRef, {
        publicName: this.name,
        description: this.description
      });

      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao salvar perfil:', err);
      alert('Erro ao salvar perfil.');
    }
  }
}
