import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  standalone: false,
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  emailVerified = false;
  showCreateProfile = false;
  message = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.emailVerified = user.emailVerified;
        if (!this.emailVerified) {
          this.message = "Seu e-mail ainda não foi verificado. Enviamos um link de verificação.";
        } else {
          this.router.navigate(["/create-profile"]); // Redireciona para a home após verificação
        }
      } else {
        this.router.navigate(["/"]); // Se não estiver logado, redireciona para login
      }
    });
  }

  async onResendClick() {
    const user = await this.afAuth.currentUser;
    if (user && !user.emailVerified) {
      try {
        await user.sendEmailVerification();
        this.message = "Novo e-mail de verificação enviado. Verifique sua caixa de entrada!";
      } catch (error) {
        this.message = `Erro ao enviar e-mail: ${error}`;
      }
    }
  }
}
