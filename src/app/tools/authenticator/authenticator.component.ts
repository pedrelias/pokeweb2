import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router'; // Importa Router para navegação

@Component({
  selector: 'app-authenticator',
  standalone: false,
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent {
  currentView: 'login' | 'register' | 'forgot' = 'login';

  loginData = { email: '', password: '' };
  registerData = { email: '', password: '', confirmPassword: '' };
  resetData = { email: '' };

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    private auth: Auth,
    private router: Router // Injeta Router para redirecionamento
  ) {}

  async fazerCadastro() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.registerData.email,
        this.registerData.password
      );

      // Envia o e-mail de verificação
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        alert('Cadastro realizado! Verifique seu e-mail para ativar sua conta.');
        
        this.bottomSheetRef.dismiss(); // Fecha o modal
        this.router.navigate(['/email-verification']); // Redireciona para a verificação
      }
    } catch (error) {
      alert(this.traduzirErro(error as { code: string }));
    }
  }

  async fazerLogin() {
    try {
      await signInWithEmailAndPassword(
        this.auth,
        this.loginData.email,
        this.loginData.password
      );
      this.bottomSheetRef.dismiss();
      this.router.navigate(['/main-page']); // Redireciona para a página principal
    } catch (error) {
      alert(this.traduzirErro(error as { code: string }));
    }
  }

  async resetarSenha() {
    try {
      await sendPasswordResetEmail(this.auth, this.resetData.email);
      alert('Email de recuperação enviado!');
      this.bottomSheetRef.dismiss();
    } catch (error) {
      alert(this.traduzirErro(error as { code: string }));
    }
  }

  private traduzirErro(error: { code: string }): string {
    const erros = {
      'auth/email-already-in-use': 'Email já está em uso',
      'auth/invalid-email': 'Email inválido',
      'auth/weak-password': 'Senha fraca (mínimo 6 caracteres)',
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'default': 'Ocorreu um erro'
    };
    return erros[error.code as keyof typeof erros] || erros['default'];
  }

  mostrarLogin() {
    this.currentView = 'login';
  }

  mostrarCadastro() {
    this.currentView = 'register';
  }

  mostrarEsqueciSenha() {
    this.currentView = 'forgot';
  }
}
