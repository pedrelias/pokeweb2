import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app'; // Importa a tipagem do erro do Firebase

@Component({
  selector: 'app-email-verification',
  standalone: false,
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  emailVerified = false;
  message = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.emailVerified = user.emailVerified;
        if (!this.emailVerified) {
          this.message = "Seu e-mail ainda não foi verificado. Enviamos um link de verificação.";
          this.sendVerificationEmail(user); // Chama o método para enviar o email
        } else {
          this.router.navigate([""]); // Redireciona após a verificação
        }
      } else {
        this.router.navigate([""]); // Redireciona se não estiver logado
      }
    });
  }

  sendVerificationEmail(user: any) {
    if (!user.emailVerified) {
      user.sendEmailVerification().then(() => {
        this.message = "Novo e-mail de verificação enviado. Verifique sua caixa de entrada!";
      }).catch((error: FirebaseError) => { // Tipando o erro como FirebaseError
        this.message = `Erro ao enviar e-mail: ${error.message}`;
      });
    }
  }

  onResendClick() {
    this.afAuth.currentUser.then(user => {
      if (user && !user.emailVerified) {
        this.sendVerificationEmail(user);
      }
    });
  }
}
