import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  @Input() show: boolean = false;

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onContinueClick(nameInput: HTMLInputElement, descriptionInput: HTMLTextAreaElement) {
    const name = nameInput.value;
    const description = descriptionInput.value;
    
    try {
      const user = await this.auth.currentUser;
      
      if (!user) {
        alert('Usuário não autenticado!');
        return;
      }

      const userRef = doc(this.firestore.firestore, 'Users', user.uid);
      
      await setDoc(userRef, {
        publicName: name,
        description: description,
        isAdmin: false,
        isHunter: true
      });

      alert("Perfil criado com sucesso!");
      nameInput.value = "";
      descriptionInput.value = "";
      this.router.navigate(['/main-page']);
      
      
    } catch (err) {
      console.error('Erro ao criar perfil:', err);
      alert('Ocorreu um erro ao criar o perfil');
    }
  }
}