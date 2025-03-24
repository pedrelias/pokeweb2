import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-authenticator',
  standalone: false,
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent {
  // Estados possíveis
  currentView: 'login' | 'register' | 'forgot' = 'login';
  
  // Dados dos formulários
  loginData = { email: '', password: '' };
  registerData = { email: '', password: '', confirmPassword: '' };
  resetData = { email: '' };

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    private auth: Auth
  ) {}

  // ----- FUNÇÕES PRINCIPAIS -----

  // 1. LOGIN
  async fazerLogin() {
    try {
      await signInWithEmailAndPassword(
        this.auth,
        this.loginData.email,
        this.loginData.password
      );
      this.bottomSheetRef.dismiss();
    } catch (error) {
      alert(this.traduzirErro(error as { code: string }));
    }
  }

  // 2. CADASTRO
  async fazerCadastro() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        this.auth,
        this.registerData.email,
        this.registerData.password
      );
      this.bottomSheetRef.dismiss();
    } catch (error) {
      alert(this.traduzirErro(error as { code: string }));
    }
  }

  // 3. RESETAR SENHA
  async resetarSenha() {
    try {
      await sendPasswordResetEmail(this.auth, this.resetData.email);
      alert('Email de recuperação enviado!');
      this.bottomSheetRef.dismiss();
    } catch (error) {
      alert(this.traduzirErro(error as { code: string }));
    }
  }

  // ----- FUNÇÕES AUXILIARES -----

  // Traduz os erros do Firebase
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

  // ----- FUNÇÕES DE CONTROLE DE TELA -----
  
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